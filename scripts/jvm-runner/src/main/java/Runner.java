// Runs Cypher and JPA exercises for scripts/test-databases.js.
//   java -cp target/classes:target/lib/* Runner jobs.json
// jobs.json is a list of jobs; the results are printed as one JSON list, in order.
//   {"kind":"cypher","setup":"...","code":"...","queries":["MATCH ... RETURN ..."]}
//     fresh graph, run setup then code (statements split on ;), then each query.
//     codeResult is what the last statement of code returned.
//   {"kind":"jpa","code":"@Entity class ...","setup":"INSERT ...","queries":["jpql: ...","sql: ...","columns: student"]}
//     compile the entity classes, let Hibernate create the tables in H2 (snake_case names,
//     like Spring Boot), run the setup SQL, then each query.
// Rows print as "a, b; c, d", null as "null", and no rows as "(no rows)".
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.BootstrapServiceRegistryBuilder;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.boot.model.naming.CamelCaseToUnderscoresNamingStrategy;
import org.neo4j.dbms.api.DatabaseManagementService;
import org.neo4j.dbms.api.DatabaseManagementServiceBuilder;
import org.neo4j.graphdb.GraphDatabaseService;
import org.neo4j.graphdb.Node;
import org.neo4j.graphdb.Relationship;
import org.neo4j.graphdb.Result;
import org.neo4j.graphdb.Transaction;

import javax.tools.*;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.OutputStream;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class Runner {
    static final ObjectMapper JSON = new ObjectMapper();
    static DatabaseManagementService neo;
    static GraphDatabaseService graph;
    static int jpaCount = 0;

    public static void main(String[] args) throws Exception {
        JsonNode jobs = JSON.readTree(new File(args[0]));
        ArrayNode out = JSON.createArrayNode();
        try {
            for (JsonNode job : jobs) {
                ObjectNode r = JSON.createObjectNode();
                try {
                    if ("cypher".equals(job.path("kind").asText())) cypher(job, r);
                    else jpa(job, r);
                    r.put("ok", true);
                } catch (Throwable e) {
                    if (System.getenv("RUNNER_DEBUG") != null) e.printStackTrace();
                    r.put("ok", false);
                    r.put("error", message(e));
                }
                out.add(r);
            }
        } finally {
            if (neo != null) neo.shutdown();
        }
        System.out.println(JSON.writeValueAsString(out));
        System.exit(0);
    }

    // The innermost cause that has a message.
    static String message(Throwable e) {
        String m = null;
        for (Throwable t = e; t != null; t = t.getCause() == t ? null : t.getCause())
            if (t.getMessage() != null) m = t.getMessage();
        return (m == null ? e.getClass().getSimpleName() : m).trim();
    }

    // ---------- formatting ----------
    static String value(Object v) {
        if (v == null) return "null";
        if (v instanceof Double d) return d == Math.rint(d) && !d.isInfinite() ? String.valueOf(d.longValue()) : d.toString();
        if (v instanceof Float f) return value(f.doubleValue());
        if (v instanceof java.math.BigDecimal b) return b.toPlainString();
        if (v instanceof Node n) {
            String labels = "";
            for (var l : n.getLabels()) labels += ":" + l.name();
            return "(" + labels + " " + props(n.getAllProperties()) + ")";
        }
        if (v instanceof Relationship rel) return "[:" + rel.getType().name() + "]";
        if (v instanceof List<?> l) return "[" + l.stream().map(Runner::value).collect(Collectors.joining(", ")) + "]";
        if (v instanceof Object[] a) return value(Arrays.asList(a));
        if (v instanceof Map<?, ?> m) return props(m);
        return v.toString();
    }
    static String props(Map<?, ?> m) {
        return "{" + new TreeMap<>(m).entrySet().stream().map(e -> e.getKey() + ": " + value(e.getValue())).collect(Collectors.joining(", ")) + "}";
    }
    static String rows(List<List<Object>> rows) {
        if (rows.isEmpty()) return "(no rows)";
        return rows.stream().map(r -> r.stream().map(Runner::value).collect(Collectors.joining(", "))).collect(Collectors.joining("; "));
    }

    // ---------- Cypher ----------
    static void cypher(JsonNode job, ObjectNode r) throws Exception {
        if (graph == null) {
            Path home = Files.createTempDirectory("recallr-neo4j");
            neo = new DatabaseManagementServiceBuilder(home).build();
            graph = neo.database("neo4j");
        }
        exec("MATCH (n) DETACH DELETE n");
        for (String c : list("SHOW CONSTRAINTS YIELD name RETURN name")) exec("DROP CONSTRAINT " + c);
        for (String i : list("SHOW INDEXES YIELD name, type WHERE type <> 'LOOKUP' RETURN name")) exec("DROP INDEX " + i);
        for (String s : split(job.path("setup").asText(""))) exec(s);
        String last = null;
        for (String s : split(job.path("code").asText(""))) last = exec(s);
        if (last != null) r.put("codeResult", last);
        ArrayNode res = r.putArray("results");
        for (JsonNode q : job.path("queries")) {
            try { res.add(exec(q.asText())); }
            catch (Throwable e) { res.addObject().put("error", message(e)); }
        }
    }
    static List<String> list(String q) {
        List<String> names = new ArrayList<>();
        try (Transaction tx = graph.beginTx(); Result res = tx.execute(q)) {
            while (res.hasNext()) names.add(String.valueOf(res.next().get("name")));
            tx.commit();
        }
        return names;
    }
    static String exec(String q) {
        try (Transaction tx = graph.beginTx(); Result res = tx.execute(q)) {
            List<String> cols = res.columns();
            List<List<Object>> rows = new ArrayList<>();
            while (res.hasNext()) {
                Map<String, Object> row = res.next();
                List<Object> vals = new ArrayList<>();
                for (String c : cols) vals.add(row.get(c));
                rows.add(vals);
            }
            String out = cols.isEmpty() ? "(no rows)" : rows(rows);
            tx.commit();
            return out;
        }
    }
    // Splits on ; outside quotes and comments; drops empty statements.
    static List<String> split(String src) {
        List<String> out = new ArrayList<>();
        StringBuilder cur = new StringBuilder();
        char quote = 0;
        for (int i = 0; i < src.length(); i++) {
            char c = src.charAt(i);
            if (quote == 0 && ((c == '/' && next(src, i) == '/') || (c == '-' && next(src, i) == '-'))) {
                while (i < src.length() && src.charAt(i) != '\n') i++;
                cur.append('\n');
                continue;
            }
            if (quote != 0) { if (c == quote) quote = 0; }
            else if (c == '\'' || c == '"' || c == '`') quote = c;
            else if (c == ';') { add(out, cur); cur.setLength(0); continue; }
            cur.append(c);
        }
        add(out, cur);
        return out;
    }
    static char next(String s, int i) { return i + 1 < s.length() ? s.charAt(i + 1) : 0; }
    static void add(List<String> out, StringBuilder s) { if (!s.toString().isBlank()) out.add(s.toString().trim()); }

    // ---------- JPA ----------
    static final Pattern IMPORT = Pattern.compile("(?m)^\\s*import\\s+[\\w.*]+\\s*;\\s*$");
    static final Pattern CLASS = Pattern.compile("\\b(class|enum)\\s+(\\w+)");

    static void jpa(JsonNode job, ObjectNode r) throws Exception {
        String code = job.path("code").asText("");
        Matcher im = IMPORT.matcher(code);
        StringBuilder imports = new StringBuilder("import jakarta.persistence.*;\nimport java.util.*;\nimport java.time.*;\nimport java.math.*;\n");
        while (im.find()) imports.append(im.group().trim()).append('\n');
        String body = IMPORT.matcher(code).replaceAll("");
        body = body.replaceAll("\\bpublic\\s+(abstract\\s+)?(class|enum)\\s", "$1$2 ");
        List<String> names = new ArrayList<>();
        Matcher cm = CLASS.matcher(body);
        while (cm.find()) names.add(cm.group(2));
        if (names.isEmpty()) throw new IllegalArgumentException("no class found");
        String unit = "Ex" + (++jpaCount);
        String pkg = "ex" + jpaCount;
        String src = "package " + pkg + ";\n" + imports + body;
        int header = (int) ("package " + pkg + ";\n" + imports).chars().filter(c -> c == '\n').count() - (code.split("\n", -1).length - body.split("\n", -1).length);
        ClassLoader loader = compile(pkg + "." + unit, src, header);

        String url = "jdbc:h2:mem:" + unit + ";DB_CLOSE_DELAY=-1;MODE=PostgreSQL;DATABASE_TO_LOWER=TRUE;DEFAULT_NULL_ORDERING=HIGH;NON_KEYWORDS=YEAR,VALUE,USER,MONTH,DAY,KEY";
        var bootstrap = new BootstrapServiceRegistryBuilder().applyClassLoader(loader).build();
        var registry = new StandardServiceRegistryBuilder(bootstrap)
            .applySetting("hibernate.connection.url", url)
            .applySetting("hibernate.connection.username", "sa")
            .applySetting("hibernate.hbm2ddl.auto", "create")
            .applySetting("hibernate.hbm2ddl.halt_on_error", "true")
            .applySetting("hibernate.physical_naming_strategy", CamelCaseToUnderscoresNamingStrategy.class.getName())
            .applySetting("hibernate.show_sql", "false")
            .build();
        EntityManagerFactory emf = null;
        try {
            MetadataSources sources = new MetadataSources(registry);
            for (String n : names) {
                Class<?> k = loader.loadClass(pkg + "." + n);
                if (k.isAnnotationPresent(jakarta.persistence.Entity.class)) sources.addAnnotatedClass(k);
            }
            emf = sources.buildMetadata().buildSessionFactory();
            try (Connection con = DriverManager.getConnection(url, "sa", ""); Statement st = con.createStatement()) {
                for (String s : split(job.path("setup").asText(""))) st.execute(s);
            }
            ArrayNode res = r.putArray("results");
            for (JsonNode q : job.path("queries")) {
                try { res.add(jpaQuery(emf, url, q.asText())); }
                catch (Throwable e) { res.addObject().put("error", message(e)); }
            }
        } finally {
            if (emf != null) emf.close();
            StandardServiceRegistryBuilder.destroy(registry);
        }
    }

    static String jpaQuery(EntityManagerFactory emf, String url, String q) throws Exception {
        int colon = q.indexOf(':');
        String kind = q.substring(0, colon).trim(), text = q.substring(colon + 1).trim();
        if (kind.equals("jpql")) {
            EntityManager em = emf.createEntityManager();
            try {
                List<?> result = em.createQuery(text).getResultList();
                List<List<Object>> rows = new ArrayList<>();
                for (Object o : result) rows.add(o instanceof Object[] a ? Arrays.asList(a) : Collections.singletonList(o));
                return rows(rows);
            } finally { em.close(); }
        }
        String sql = kind.equals("columns")
            ? "SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = '" + text.toLowerCase() + "' ORDER BY ordinal_position"
            : kind.equals("tables")
            ? "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE' ORDER BY table_name"
            : text;
        try (Connection con = DriverManager.getConnection(url, "sa", ""); Statement st = con.createStatement(); ResultSet rs = st.executeQuery(sql)) {
            int n = rs.getMetaData().getColumnCount();
            List<List<Object>> rows = new ArrayList<>();
            while (rs.next()) {
                List<Object> row = new ArrayList<>();
                for (int i = 1; i <= n; i++) row.add(rs.getObject(i));
                rows.add(row);
            }
            if (kind.equals("columns") || kind.equals("tables"))
                return rows.isEmpty() ? "(no rows)" : rows.stream().map(x -> value(x.get(0))).collect(Collectors.joining(", "));
            return rows(rows);
        }
    }

    // Compiles one source file in memory and returns a class loader for it.
    static ClassLoader compile(String className, String src, int header) throws Exception {
        JavaCompiler javac = ToolProvider.getSystemJavaCompiler();
        Map<String, ByteArrayOutputStream> classes = new HashMap<>();
        DiagnosticCollector<JavaFileObject> diags = new DiagnosticCollector<>();
        StandardJavaFileManager std = javac.getStandardFileManager(diags, null, null);
        JavaFileManager fm = new ForwardingJavaFileManager<>(std) {
            @Override public JavaFileObject getJavaFileForOutput(Location loc, String name, JavaFileObject.Kind kind, FileObject sibling) {
                return new SimpleJavaFileObject(URI.create("mem:///" + name.replace('.', '/') + kind.extension), kind) {
                    @Override public OutputStream openOutputStream() { return classes.computeIfAbsent(name, k -> new ByteArrayOutputStream()); }
                };
            }
        };
        JavaFileObject file = new SimpleJavaFileObject(URI.create("string:///" + className.replace('.', '/') + ".java"), JavaFileObject.Kind.SOURCE) {
            @Override public CharSequence getCharContent(boolean ignore) { return src; }
        };
        List<String> opts = List.of("-classpath", System.getProperty("java.class.path"), "-proc:none", "-nowarn");
        boolean ok = javac.getTask(null, fm, diags, opts, null, List.of(file)).call();
        if (!ok) {
            String errs = diags.getDiagnostics().stream().filter(d -> d.getKind() == Diagnostic.Kind.ERROR)
                .map(d -> "line " + (d.getLineNumber() - header) + ": " + d.getMessage(null)).collect(Collectors.joining("\n"));
            throw new IllegalArgumentException("does not compile\n" + errs);
        }
        return new ClassLoader(Runner.class.getClassLoader()) {
            @Override protected Class<?> findClass(String name) throws ClassNotFoundException {
                ByteArrayOutputStream b = classes.get(name);
                if (b == null) throw new ClassNotFoundException(name);
                byte[] bytes = b.toByteArray();
                return defineClass(name, bytes, 0, bytes.length);
            }
        };
    }
}
