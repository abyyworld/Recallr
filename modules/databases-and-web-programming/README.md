# Databases and Web Programming (SQL, Cypher, JPA, JPQL, JDL)

57 exercises for weeks 1-5, each with a variation:

- Week 1: ER modelling in JDL: entities, field types, validations, enums, OneToOne, ManyToOne, OneToMany, ManyToMany, lists as relationships
- Week 2: CREATE TABLE and keys, INSERT, SELECT, UPDATE, DELETE, update anomaly, 1NF, 2NF and 3NF in practice
- Week 3: importing a CSV with `\copy`, ALTER TABLE, COUNT, SUM, MIN, MAX, AVG and ROUND, GROUP BY, WHERE and HAVING, JOIN, views, PREPARE and EXECUTE, DROP and TRUNCATE, DO blocks
- Week 4: INNER, LEFT, RIGHT, FULL and NATURAL JOIN, rows with no match, three-table joins, JPA entities, `@Column`, `@Transient`, `@ManyToOne` and `@OneToMany`, `@ManyToMany`, JPQL path navigation, JOIN and GROUP BY
- Week 5: Neo4j and Cypher: CREATE, MATCH and direction, WHERE and NULL, relationship properties, ORDER BY, SKIP and LIMIT, count, WITH, MERGE, OPTIONAL MATCH, SET and REMOVE, DELETE and DETACH DELETE, friends of friends with WHERE NOT, UNION

Every answer runs on a real engine: PostgreSQL (PGlite) for SQL, embedded Neo4j for Cypher, Hibernate on H2 for JPA and JPQL (with Spring Boot's column naming), and the JHipster parser for JDL. On the page, SQL answers are marked by running them on PostgreSQL in the browser.

Week 6's new topics (vector databases, the web set-up) are not assessed, so they are left out; its Cypher revision examples are part of Week 5. Liquibase isn't covered because nothing here can run it to check an answer.

Check and build:

```sh
npm install
node scripts/test-databases.js modules/databases-and-web-programming   # needs Java 21 and Maven for Cypher and JPA
node scripts/build.js
```
