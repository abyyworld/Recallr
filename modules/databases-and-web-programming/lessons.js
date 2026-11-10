// Lesson cards shown before a new skill: what it does, one example traced step by step, and one tip.
// Every example is run by scripts/test-databases.js, and the last step must be exactly what it gives.
const LESSONS = {
// ---------------- Week 1 ----------------
"w1entityTypes": {
  what: "An entity describes one table: each line inside it is a field name, then a JDL type.",
  example: "fields GymClass",
  trace: [
    { line: "entity GymClass {", note: "no id line: JHipster adds id by itself" },
    { line: "instructor String,", note: "text" },
    { line: "capacity Integer,", note: "a whole number" },
    { line: "startDate LocalDate,", note: "a date with no time" },
    { line: "indoor Boolean, fee BigDecimal", note: "true or false; exact money" },
    { line: "= instructor String, capacity Integer, startDate LocalDate, indoor Boolean, fee BigDecimal", note: "" },
  ],
  tip: "The field list holds only the lines you wrote, in your order: the id JHipster adds is never in it." },
"w1validations": {
  what: "Validations are rules written after a field's type, such as required or a smallest value.",
  example: "fields Runner",
  trace: [
    { line: "bib Integer required unique min(1),", note: "never empty, no repeats, at least 1" },
    { line: "name String required minlength(2) maxlength(40),", note: "a String: limit its length, 2 to 40" },
    { line: "age Integer min(16) max(99)", note: "a number: limit its value, 16 to 99" },
    { line: "fields Runner", note: "each field: name, type, then its rules in order" },
    { line: "= bib Integer required unique min(1), name String required minlength(2) maxlength(40), age Integer min(16) max(99)", note: "" },
  ],
  tip: "min and max are for numbers; for the length of a String use minlength and maxlength." },
"w1enum": {
  what: "An enum is a fixed list of allowed values, and you can use its name as a field's type.",
  example: "entities",
  trace: [
    { line: "enum Level {", note: "a list of values, not an entity" },
    { line: "BEGINNER, INTERMEDIATE, ADVANCED", note: "the only values a level can take" },
    { line: "entity Course {", note: "the only entity here" },
    { line: "level Level required", note: "the enum's name used as a type" },
    { line: "= Course", note: "" },
  ],
  tip: "The entities check lists only names declared with entity, so an enum never appears in it." },
"w1oneToOne": {
  what: "A relationship links two entities; the {name} on a side is the field that side uses to reach the other.",
  example: "relationships",
  trace: [
    { line: "relationship OneToOne {", note: "one employee, one badge" },
    { line: "Employee{badge}", note: "employee.getBadge() reaches the badge" },
    { line: "to Badge{employee}", note: "badge.getEmployee() goes back: bidirectional" },
    { line: "= OneToOne Employee{badge} to Badge{employee}", note: "" },
  ],
  tip: "A side with no {name} cannot navigate, and the check prints that side with no {}." },
"w1manyToOne": {
  what: "Read ManyToOne from the left: many of the first entity point to one of the second.",
  example: "relationships",
  trace: [
    { line: "relationship ManyToOne {", note: "many bookings, one room" },
    { line: "Booking{room}", note: "a booking reaches its room through room" },
    { line: "to Room", note: "no {name}: a room cannot list its bookings" },
    { line: "= ManyToOne Booking{room} to Room", note: "" },
  ],
  tip: "Each line in a block is a separate relationship of that type; the check sorts them A to Z with ; between them." },
"w1oneToMany": {
  what: "OneToMany puts the one side first, and the foreign key it makes is never one of the fields.",
  example: "fields Flight",
  trace: [
    { line: "Airline{flights} to Flight{airline}", note: "one airline, many flights" },
    { line: "flight table: airline_id column", note: "the foreign key, on the many side" },
    { line: "entity Flight { code String required }", note: "the only field written" },
    { line: "= code String required", note: "" },
  ],
  tip: "The relationship makes the foreign key for you, so neither it nor {airline} is in the field list." },
"w1manyToMany": {
  what: "ManyToMany links many to many, and JHipster makes the join table for you.",
  example: "entities",
  trace: [
    { line: "entity Recipe { ... }", note: "declared with entity" },
    { line: "entity Ingredient { ... }", note: "declared with entity" },
    { line: "Recipe{ingredients} to Ingredient{recipes}", note: "ManyToMany: a join table is added" },
    { line: "entities", note: "only names declared with entity, A to Z" },
    { line: "= Ingredient, Recipe", note: "" },
  ],
  tip: "Never declare the join table: it comes from the relationship, so it is not an entity." },
"w1noLists": {
  what: "JDL has no List type, so a list of things becomes its own entity, linked by a relationship.",
  example: "fields Trip",
  trace: [
    { line: "waypoints List<String>", note: "not JDL: there is no List type" },
    { line: "entity Waypoint { ... }", note: "the list's items become their own entity" },
    { line: "Trip{waypoints} to Waypoint{trip}", note: "OneToMany holds the list" },
    { line: "fields Trip", note: "waypoints is a link, not a field" },
    { line: "= name String required", note: "" },
  ],
  tip: "The list lives in the relationship, so the entity keeps only its plain fields." },
"w1miniModel": {
  what: "A model has one relationship block per type, and you pick each type from the sentence.",
  example: "relationships",
  trace: [
    { line: "Club{players} to Player{club}", note: "OneToMany: one club, many players" },
    { line: "Club{sponsors} to Sponsor{clubs}", note: "ManyToMany: many on both sides" },
    { line: "relationships", note: "sorted A to Z, so ManyToMany comes first" },
    { line: "= ManyToMany Club{sponsors} to Sponsor{clubs}; OneToMany Club{players} to Player{club}", note: "" },
  ],
  tip: "ManyToOne is OneToMany read from the other end: the type follows the side you write first." },

// ---------------- Week 2 ----------------
"w2createTable": {
  what: "CREATE TABLE names a table and lists its columns, each with a type; NOT NULL and PRIMARY KEY say which columns can never be empty.",
  example: "CREATE TABLE rider (\n  rider_code text,\n  name       text NOT NULL,\n  age        integer,\n  PRIMARY KEY (rider_code)\n);\n\nSELECT column_name, is_nullable\nFROM information_schema.columns\nWHERE table_name = 'rider'\nORDER BY ordinal_position;",
  trace: [
    { line: "rider_code text,", note: "a name, then a type; no NOT NULL written" },
    { line: "name text NOT NULL,", note: "every rider must have a name" },
    { line: "age integer,", note: "nothing extra, so it may be left empty" },
    { line: "PRIMARY KEY (rider_code)", note: "picks out one row, so it can never be empty" },
    { line: "is_nullable", note: "YES means it may be empty, NO means it may not" },
    { line: "= rider_code, NO; name, NO; age, YES", note: "" },
  ],
  tip: "A primary key can never be empty, even if you do not write NOT NULL: PostgreSQL adds it for you." },

"w2insert": {
  what: "INSERT INTO adds new rows; name the columns you fill, and SERIAL numbers each new row for you.",
  example: "INSERT INTO film (title, genre, minutes)\nVALUES ('Coco', 'Animation', 105);\n\nSELECT film_id, title\nFROM film\nORDER BY film_id;",
  trace: [
    { line: "1, Alien, Sci-fi, 117", note: "the one film already in the table" },
    { line: "INSERT INTO film (title, genre, minutes)", note: "film_id is left out of the list" },
    { line: "VALUES ('Coco', 'Animation', 105)", note: "values in the same order as the list" },
    { line: "film_id = 2", note: "SERIAL gives the next number after 1" },
    { line: "= 1, Alien; 2, Coco", note: "" },
  ],
  tip: "Each new row gets the next number, in the order the rows are added, even when several go in one VALUES list." },

"w2select": {
  what: "SELECT picks the columns, FROM picks the table and WHERE keeps only the rows that pass the test.",
  example: "SELECT title, copies\nFROM book\nWHERE genre = 'Fantasy' AND copies > 0;",
  trace: [
    { line: "FROM book", note: "start with all 5 books" },
    { line: "WHERE genre = 'Fantasy'", note: "The Hobbit, Piranesi, Circe" },
    { line: "AND copies > 0", note: "Circe has 0 copies, so it goes" },
    { line: "SELECT title, copies", note: "keep just these two columns" },
    { line: "= The Hobbit, 4; Piranesi, 2", note: "" },
  ],
  tip: "AND keeps a row only when both tests are true. Text goes in single quotes; numbers do not." },

"w2update": {
  what: "UPDATE changes values in rows that already exist: SET says the new value and WHERE says which rows.",
  example: "UPDATE ticket\nSET price = price + 1.50\nWHERE event = 'Comedy Club';\n\nSELECT ticket_id, price\nFROM ticket\nORDER BY ticket_id;",
  trace: [
    { line: "UPDATE ticket", note: "the table to change" },
    { line: "WHERE event = 'Comedy Club'", note: "picks tickets 3 and 4" },
    { line: "SET price = price + 1.50", note: "each one: 18.50 + 1.50 = 20.00" },
    { line: "tickets 1 and 2", note: "not picked, so they stay at 30.00" },
    { line: "= 1, 30.00; 2, 30.00; 3, 20.00; 4, 20.00", note: "" },
  ],
  tip: "On the right of SET, price means the row's old value. NUMERIC(6,2) always shows two decimal places." },

"w2delete": {
  what: "DELETE FROM removes whole rows, and WHERE decides which ones go.",
  example: "DELETE FROM item\nWHERE baked < '2026-03-01';\n\nSELECT name FROM item;",
  trace: [
    { line: "FROM item", note: "start with all 5 items" },
    { line: "WHERE baked < '2026-03-01'", note: "only Rye loaf (28 February) is earlier" },
    { line: "baked = '2026-03-01'", note: "Sourdough, Croissant: not earlier, so they stay" },
    { line: "DELETE", note: "the Rye loaf row goes; 4 rows are left" },
    { line: "= Sourdough; Bagel; Croissant; Eclair", note: "" },
  ],
  tip: "< means strictly earlier, so a row on the date itself stays. Leave out WHERE and every row goes." },

"w2updateAnomaly": {
  what: "When one fact is copied into many rows, changing only some of them makes the table disagree with itself: an update anomaly.",
  example: "UPDATE pupil\nSET lesson_fee = 35\nWHERE pupil_name = 'Dev';\n\nSELECT lesson_fee\nFROM pupil\nWHERE instrument = 'Piano';",
  trace: [
    { line: "Ava 30, Ben 30, Dev 30", note: "the piano fee is stored 3 times" },
    { line: "WHERE pupil_name = 'Dev'", note: "picks only Dev's row" },
    { line: "SET lesson_fee = 35", note: "Dev's copy becomes 35" },
    { line: "SELECT lesson_fee ... 'Piano'", note: "3 piano rows, 2 different fees" },
    { line: "= 30; 30; 35", note: "" },
  ],
  tip: "An UPDATE changes only the rows its WHERE picks; every other copy keeps its old value." },

"w2repeatingGroup": {
  what: "1NF turns numbered columns like ingredient1, ingredient2, ingredient3 into one row per ingredient, so one test finds them all.",
  example: "SELECT recipe_id\nFROM recipe\nWHERE ingredient1 = 'butter'\n   OR ingredient2 = 'butter'\n   OR ingredient3 = 'butter';",
  trace: [
    { line: "FROM recipe", note: "3 recipes, up to 3 ingredients each" },
    { line: "WHERE ingredient1 = 'butter' OR ...", note: "butter could be in any of the 3" },
    { line: "2, Toast, bread, butter, NULL", note: "only Toast has butter, in ingredient2" },
    { line: "SELECT recipe_id", note: "one result row per matching recipe" },
    { line: "= 2", note: "" },
  ],
  tip: "After the split each ingredient is its own row with its recipe_id, so one test on ingredient finds every recipe that uses it." },

"w2partialDependency": {
  what: "If a fact needs only part of the key, it is stored in many rows and only lives as long as those rows do.",
  example: "DELETE FROM order_line_flat\nWHERE order_no = 2;\n\nSELECT product_name\nFROM order_line_flat\nWHERE product_code = 'P7';",
  trace: [
    { line: "FROM order_line_flat", note: "4 rows; P7's name Kettle is in orders 1 and 2" },
    { line: "DELETE ... WHERE order_no = 2", note: "removes the row (2, P7, Kettle, 3)" },
    { line: "WHERE product_code = 'P7'", note: "order 1 still has a P7 row" },
    { line: "= Kettle", note: "" },
  ],
  tip: "A product's name survives only while at least one order row still holds it: that is the delete anomaly 2NF fixes." },

"w2transitive": {
  what: "In a flat table a fact about the team is copied into every driver's row, so a query brings it back once per driver.",
  example: "SELECT driver_name, team_name\nFROM driver_flat\nWHERE team_country = 'Italy';",
  trace: [
    { line: "FROM driver_flat", note: "3 rows, one per driver" },
    { line: "WHERE team_country = 'Italy'", note: "Kim's and Lars's rows both say Italy" },
    { line: "SELECT driver_name, team_name", note: "one result row for each matching row" },
    { line: "= Kim, Falcon; Lars, Falcon", note: "" },
  ],
  tip: "SELECT does not remove repeats: a fact copied into two rows comes back twice. In 3NF it is stored once, in its own table." },

// ---------------- Week 3 ----------------
"w3copyCsv": {
  what: "\\copy reads the lines of a CSV file into a table that already exists, one row per data line.",
  example: "\\copy runner FROM 'runners.csv' WITH (FORMAT csv, HEADER true)\n\nSELECT name, club\nFROM runner\nWHERE bib = 102;",
  trace: [
    { line: "bib,name,club", note: "line 1 holds column names: HEADER true skips it" },
    { line: "101,Ines Ward,Harriers", note: "every other line becomes one row" },
    { line: "102,Kofi Mensah,", note: "the club is empty, so it becomes NULL" },
    { line: "WHERE bib = 102", note: "keep Kofi's row" },
    { line: "= Kofi Mensah, null", note: "" },
  ],
  tip: "With HEADER true the first line of the file never becomes a row: count only the data lines." },
"w3addColumn": {
  what: "ALTER TABLE ... ADD COLUMN adds a column to a table that already has rows, and keeps those rows.",
  example: "ALTER TABLE member\nADD COLUMN points INT;\n\nUPDATE member SET points = 10 WHERE member_id = 1;\n\nSELECT member_id, points\nFROM member\nORDER BY member_id;",
  trace: [
    { line: "member: (1, Zara Ali), (2, Owen Price)", note: "2 rows before the change" },
    { line: "ADD COLUMN points INT", note: "goes at the end; both rows get NULL in it" },
    { line: "UPDATE ... WHERE member_id = 1", note: "only Zara's points are filled in" },
    { line: "= 1, 10; 2, null", note: "" },
  ],
  tip: "Old rows hold NULL in a new column until something fills it in." },
"w3foreignKey": {
  what: "A foreign key makes a column point at a key in another table; ON DELETE CASCADE also deletes the rows that point at a deleted row.",
  example: "ALTER TABLE orders\nADD CONSTRAINT fk_cust\nFOREIGN KEY (customer_id) REFERENCES customer (customer_id)\nON DELETE CASCADE;\n\nDELETE FROM customer WHERE customer_id = 2;\n\nSELECT order_id\nFROM orders\nORDER BY order_id;",
  trace: [
    { line: "orders: 10 (cust 1), 11 (cust 2), 12 (cust 1)", note: "3 orders" },
    { line: "ADD CONSTRAINT ... ON DELETE CASCADE", note: "each order must point at a real customer" },
    { line: "DELETE FROM customer WHERE customer_id = 2", note: "Tariq is deleted" },
    { line: "CASCADE deletes order 11", note: "Tariq's only order goes with him" },
    { line: "= 10; 12", note: "" },
  ],
  tip: "With CASCADE, deleting a parent row also deletes every row whose foreign key points at it." },
"w3setDefault": {
  what: "ALTER COLUMN ... SET DEFAULT gives a column a value to use when an INSERT leaves it out.",
  example: "ALTER TABLE loan\nALTER COLUMN return_by SET DEFAULT '2026-12-31';\n\nINSERT INTO loan (loan_id, book) VALUES (1, 'Emma');\nINSERT INTO loan VALUES (2, 'Dune', '2027-01-10');\n\nSELECT loan_id, return_by\nFROM loan\nORDER BY loan_id;",
  trace: [
    { line: "SET DEFAULT '2026-12-31'", note: "used when an INSERT leaves return_by out" },
    { line: "(1, 'Emma')", note: "no return_by given, so it gets 2026-12-31" },
    { line: "(2, 'Dune', '2027-01-10')", note: "a date is given, so the default is not used" },
    { line: "= 1, 2026-12-31; 2, 2027-01-10", note: "" },
  ],
  tip: "The default only fills a gap: a value written in the INSERT always wins." },
"w3countSum": {
  what: "COUNT(*) counts rows, COUNT(column) counts the values that are not NULL, and SUM adds the values up.",
  example: "SELECT COUNT(*), COUNT(minutes), SUM(minutes)\nFROM play\nWHERE song = 'Halo';",
  trace: [
    { line: "FROM play", note: "6 plays" },
    { line: "WHERE song = 'Halo'", note: "2 rows: Ivy with 4 minutes, Mo with NULL" },
    { line: "COUNT(*)", note: "counts both rows: 2" },
    { line: "COUNT(minutes)", note: "skips the NULL: 1" },
    { line: "SUM(minutes)", note: "skips the NULL too: 4" },
    { line: "= 2, 1, 4", note: "" },
  ],
  tip: "Only COUNT(*) counts every row; put a column name in the brackets and NULLs are skipped." },
"w3minMaxAvg": {
  what: "AVG gives the mean of a column, and ROUND rounds it to as many decimal places as you ask for.",
  example: "SELECT ROUND(AVG(fixed - reported), 1),\n       ROUND(AVG(fixed - reported))\nFROM repair\nWHERE device <> 'Tablet';",
  trace: [
    { line: "WHERE device <> 'Tablet'", note: "4 rows: repairs 1, 2, 4 and 5" },
    { line: "fixed - reported", note: "3, 1, NULL (the printer is not fixed), 4" },
    { line: "AVG(fixed - reported)", note: "NULL is skipped: (3 + 1 + 4) / 3 = 2.666..." },
    { line: "ROUND(..., 1)", note: "one decimal place: 2.7" },
    { line: "ROUND(...)", note: "no second number: a whole number, 3" },
    { line: "= 2.7, 3", note: "" },
  ],
  tip: "AVG divides by the number of values that are not NULL, not by the number of rows." },
"w3groupBy": {
  what: "GROUP BY puts rows with the same value together, so an aggregate gives one answer per group.",
  example: "SELECT charity, SUM(amount)\nFROM donation\nWHERE amount > 10\nGROUP BY charity\nORDER BY charity;",
  trace: [
    { line: "FROM donation", note: "6 donations" },
    { line: "WHERE amount > 10", note: "4 left: Oxfam 20, RSPCA 15, Oxfam 50, RSPCA 25" },
    { line: "GROUP BY charity", note: "Oxfam 20 + 50, RSPCA 15 + 25; Shelter has no rows left" },
    { line: "ORDER BY charity", note: "A to Z" },
    { line: "= Oxfam, 70; RSPCA, 40", note: "" },
  ],
  tip: "WHERE runs before GROUP BY, so a group whose rows were all thrown away gives no row at all." },
"w3whereHaving": {
  what: "WHERE throws away rows before grouping; HAVING throws away whole groups after counting.",
  example: "SELECT customer, SUM(price)\nFROM purchase\nWHERE category = 'Food'\nGROUP BY customer\nHAVING SUM(price) > 35;",
  trace: [
    { line: "FROM purchase", note: "start with all 8 rows" },
    { line: "WHERE category = 'Food'", note: "keep the 6 food rows" },
    { line: "GROUP BY customer", note: "Ana 12+25 = 37, Raj 8+9 = 17, Lou 18+16 = 34" },
    { line: "HAVING SUM(price) > 35", note: "only Ana's group is over 35" },
    { line: "= Ana, 37", note: "" },
  ],
  tip: "A condition on COUNT or SUM can only go in HAVING: WHERE runs before anything is counted." },
"w3join": {
  what: "JOIN ... ON pairs each row of one table with the matching rows of another; rows with no match are left out.",
  example: "SELECT p.name, t.team_name\nFROM team t\nJOIN player p ON p.team_id = t.team_id\nWHERE p.name IN ('Amy', 'Kim');",
  trace: [
    { line: "team t JOIN player p", note: "pair each player with the team of the same team_id" },
    { line: "Kim (2) + United (2)", note: "a match, so one joined row" },
    { line: "Amy (NULL)", note: "NULL matches no team, so Amy is left out" },
    { line: "Athletic (3)", note: "no player has team_id 3, so Athletic is left out too" },
    { line: "WHERE p.name IN ('Amy', 'Kim')", note: "only Kim's row is there to keep" },
    { line: "= Kim, United", note: "" },
  ],
  tip: "An inner JOIN gives one row per matching pair; a row with no partner on either side disappears." },
"w3view": {
  what: "CREATE VIEW saves a query under a name, and you read it like a table.",
  example: "CREATE VIEW in_stock AS\nSELECT name\nFROM product\nWHERE stock > 0;\n\nUPDATE product SET stock = 0 WHERE name = 'Mixer';\n\nSELECT name\nFROM in_stock\nORDER BY name;",
  trace: [
    { line: "CREATE VIEW in_stock AS SELECT ...", note: "saves the query, not its rows" },
    { line: "UPDATE ... WHERE name = 'Mixer'", note: "Mixer's stock goes from 7 to 0" },
    { line: "FROM in_stock", note: "the view's query runs now, on the current data" },
    { line: "WHERE stock > 0", note: "Kettle 12, Toaster 3, Grill 4; Blender and Mixer are 0" },
    { line: "= Grill; Kettle; Toaster", note: "" },
  ],
  tip: "A view is a saved question, not a saved answer: change the table and the view changes too." },
"w3prepare": {
  what: "PREPARE saves a query with a gap, $1, and EXECUTE runs it with a value in that gap.",
  example: "PREPARE items_over (numeric) AS\nSELECT name\nFROM item\nWHERE price > $1\nORDER BY name;\n\nEXECUTE items_over(10);",
  trace: [
    { line: "PREPARE items_over (numeric) AS ...", note: "saves the query; $1 is a gap for a number" },
    { line: "EXECUTE items_over(10)", note: "10 goes where $1 is" },
    { line: "WHERE price > 10", note: "Backpack 24.99 and Calculator 12.00 pass" },
    { line: "= Backpack; Calculator", note: "" },
  ],
  tip: "Write the EXECUTE value in place of $1, then read the query as normal." },
"w3dropTruncate": {
  what: "TRUNCATE empties a table but keeps it; DROP removes the table itself.",
  example: "TRUNCATE TABLE basket;\n\nINSERT INTO basket VALUES (3, 'Jam');\n\nSELECT basket_id, product\nFROM basket;",
  trace: [
    { line: "basket: (1, Tea), (2, Milk)", note: "2 rows" },
    { line: "TRUNCATE TABLE basket", note: "both rows go; the table and its columns stay" },
    { line: "INSERT INTO basket VALUES (3, 'Jam')", note: "works, because the table is still there" },
    { line: "= 3, Jam", note: "" },
  ],
  tip: "TRUNCATE takes away the rows only; DROP takes away the table, columns and all." },
"w3doBlock": {
  what: "A DO block runs a small program once: FOR visits each row in turn, and IF decides what to do with it.",
  example: "DO $$\nDECLARE\n  r RECORD;\nBEGIN\n  FOR r IN SELECT item_id, qty FROM stock_item LOOP\n    IF r.qty >= 10 THEN\n      UPDATE stock_item SET qty = qty * 2 WHERE item_id = r.item_id;\n    END IF;\n  END LOOP;\nEND $$;\n\nSELECT name, qty\nFROM stock_item\nWHERE qty > 20\nORDER BY item_id;",
  trace: [
    { line: "r = (1, 40)", note: "Apples: 40 >= 10, so qty becomes 80" },
    { line: "r = (2, 3)", note: "Bread: 3 is under 10, so IF skips it" },
    { line: "r = (3, 0)", note: "Eggs: skipped too" },
    { line: "r = (4, 12)", note: "Milk: 12 >= 10, so qty becomes 24" },
    { line: "WHERE qty > 20", note: "Apples 80 and Milk 24" },
    { line: "= Apples, 80; Milk, 24", note: "" },
  ],
  tip: "Take the rows one at a time: test the IF on that row, and change only the rows where it is true." },

// ---------------- Week 4 ----------------
"w4innerJoin": {
  what: "INNER JOIN puts a row of one table next to the row of another table that matches it, and drops rows with no match.",
  example: "SELECT p.pupil_name, t.tutor_name\nFROM pupil p\nINNER JOIN tutor t ON p.tutor_id = t.tutor_id\nWHERE t.subject = 'Physics';",
  trace: [
    { line: "FROM pupil p", note: "start with all 5 pupils" },
    { line: "INNER JOIN tutor t ON p.tutor_id = t.tutor_id", note: "each pupil gets the tutor with the same tutor_id" },
    { line: "Noah: tutor_id is NULL", note: "no tutor matches, so Noah drops out" },
    { line: "WHERE t.subject = 'Physics'", note: "only Leo's tutor, Mr Patel, teaches Physics" },
    { line: "= Leo, Mr Patel", note: "" },
  ],
  tip: "NATURAL JOIN writes the ON for you: it matches on every column that has the same name in both tables." },
"w4leftJoin": {
  what: "LEFT JOIN keeps every row of the table after FROM, and fills the other table's columns with NULL when nothing matches.",
  example: "SELECT COUNT(*), COUNT(m.name)\nFROM locker l\nLEFT JOIN member m ON m.member_id = l.member_id;",
  trace: [
    { line: "FROM locker l", note: "the left table: 3 lockers" },
    { line: "LEFT JOIN member m ON ...", note: "101 goes with Ava, 102 with Cara" },
    { line: "103, NULL", note: "no member: the row is kept and m.name is NULL" },
    { line: "COUNT(*), COUNT(m.name)", note: "COUNT(*) counts all 3 rows; COUNT(m.name) skips the NULL" },
    { line: "= 3, 2", note: "" },
  ],
  tip: "COUNT(*) counts rows, but COUNT(column) counts only the rows where that column is not NULL." },
"w4noMatch": {
  what: "After a LEFT JOIN, a row with no match has NULL in the other table's columns: IS NULL finds those rows, and IS NOT NULL finds the matched ones.",
  example: "SELECT DISTINCT c.name\nFROM customer c\nLEFT JOIN orders o ON o.customer_id = c.customer_id\nWHERE o.order_id IS NOT NULL\nORDER BY c.name;",
  trace: [
    { line: "FROM customer c LEFT JOIN orders o", note: "6 rows: Ali twice (orders 1 and 3)" },
    { line: "Bea, Dot: o.order_id is NULL", note: "they have no orders" },
    { line: "WHERE o.order_id IS NOT NULL", note: "keep the 4 rows that found an order" },
    { line: "SELECT DISTINCT c.name", note: "Ali's 2 rows become 1" },
    { line: "= Ali; Cy; Eve", note: "" },
  ],
  tip: "Test for NULL with IS NULL: x = NULL is never true, not even when x is NULL." },
"w4fullJoin": {
  what: "RIGHT JOIN keeps every row of the table after JOIN; FULL OUTER JOIN keeps every row of both tables.",
  example: "SELECT d.name, v.reg\nFROM van v\nRIGHT JOIN driver d ON v.driver_id = d.driver_id\nORDER BY d.name;",
  trace: [
    { line: "FROM van v", note: "the left table: 3 vans" },
    { line: "RIGHT JOIN driver d", note: "the right table: every driver is kept" },
    { line: "Ama with VN1, Cal with VN2", note: "the matching pairs" },
    { line: "Bo, NULL", note: "Bo has no van, so reg is NULL" },
    { line: "VN3 has no driver", note: "it is on the left side, so it drops out" },
    { line: "= Ama, VN1; Bo, null; Cal, VN2", note: "" },
  ],
  tip: "LEFT keeps the table before JOIN, RIGHT keeps the table after JOIN, FULL keeps both." },
"w4threeJoin": {
  what: "Each extra JOIN ... ON adds one more table to the rows you have built so far.",
  example: "SELECT r.name, h.hours\nFROM hire h\nJOIN rider r ON r.rider_id = h.rider_id\nJOIN bike b ON b.bike_id = h.bike_id\nWHERE b.model = 'Tandem';",
  trace: [
    { line: "FROM hire h", note: "5 hires" },
    { line: "JOIN rider r ON r.rider_id = h.rider_id", note: "each hire gets its rider; a hire with a NULL rider drops" },
    { line: "JOIN bike b ON b.bike_id = h.bike_id", note: "each row also gets its bike" },
    { line: "WHERE b.model = 'Tandem'", note: "hires 2 and 5 are Tandems, but hire 5 has no rider" },
    { line: "= Finn, 2", note: "" },
  ],
  tip: "Plain JOIN means INNER JOIN, so a row must find a match in every joined table to stay." },
"w4entity": {
  what: "@Entity turns a Java class into a table, @Table(name = ...) picks the table's name, and @Id marks the primary key.",
  example: "tables:",
  trace: [
    { line: "@Entity", note: "the class Song is stored in a table" },
    { line: "@Table(name = \"songs\")", note: "the table is called songs" },
    { line: "@Id @GeneratedValue(... IDENTITY)", note: "id is the primary key; the database numbers new rows" },
    { line: "without @Table: Song -> song", note: "the class name, in lower case" },
    { line: "= songs", note: "" },
  ],
  tip: "Without @Table, Spring Boot puts _ between the words of the class name: a class BookShelf gets the table book_shelf." },
"w4column": {
  what: "@Column changes one column: nullable = false adds NOT NULL, unique = true adds UNIQUE, and name = ... renames it.",
  example: "sql: SELECT column_name FROM information_schema.columns WHERE table_name = 'customer'",
  trace: [
    { line: "private Long id;", note: "column id" },
    { line: "@Column(nullable = false, unique = true)", note: "column email: NOT NULL and UNIQUE" },
    { line: "@Column(name = \"customer_name\")", note: "the field called name gets the column customer_name" },
    { line: "private Integer loyaltyPoints;", note: "no @Column: loyaltyPoints becomes loyalty_points" },
    { line: "= id; email; customer_name; loyalty_points", note: "" },
  ],
  tip: "Without @Column, Spring Boot writes a field name in lower case with _ before each capital letter." },
"w4transient": {
  what: "@Transient keeps a field in the Java object but gives it no column, so it is never saved.",
  example: "sql: SELECT column_name FROM information_schema.columns WHERE table_name = 'booking'",
  trace: [
    { line: "private Long id;", note: "column id" },
    { line: "private String guestName;", note: "column guest_name" },
    { line: "private int nights;", note: "column nights" },
    { line: "@Transient private String note;", note: "no column" },
    { line: "= id; guest_name; nights", note: "" },
  ],
  tip: "Every field becomes a column unless it is marked @Transient." },
"w4manyToOne": {
  what: "@ManyToOne goes on the side that holds the foreign key; @JoinColumn names that column, and @OneToMany(mappedBy) on the other side adds nothing to the tables.",
  example: "sql: SELECT column_name FROM information_schema.columns WHERE table_name = 'track'",
  trace: [
    { line: "@Column(name = \"track_id\") ... id", note: "the key column is track_id" },
    { line: "private String title;", note: "column title" },
    { line: "@ManyToOne @JoinColumn(name = \"album_id\")", note: "Track.album is stored in a foreign key column album_id" },
    { line: "@OneToMany(mappedBy = \"album\")", note: "in Album: reuses Track.album, so no new column" },
    { line: "= track_id; title; album_id", note: "" },
  ],
  tip: "Many tracks, one album: the foreign key goes in the table of the many side, track." },
"w4manyToMany": {
  what: "@ManyToMany with @JoinTable makes a third table that only holds pairs of keys, one from each entity.",
  example: "sql: SELECT column_name FROM information_schema.columns WHERE table_name = 'recipe_ingredient'",
  trace: [
    { line: "Ingredient, Recipe", note: "each entity gets its own table" },
    { line: "@JoinTable(name = \"recipe_ingredient\", ...)", note: "a new table for the links" },
    { line: "joinColumns = @JoinColumn(name = \"recipe_id\")", note: "the key for this entity, Recipe" },
    { line: "inverseJoinColumns = ... \"ingredient_id\"", note: "the key for the other entity, Ingredient" },
    { line: "= recipe_id; ingredient_id", note: "" },
  ],
  tip: "joinColumns is the entity you are writing in; inverseJoinColumns is the other one." },
"w4jpqlPath": {
  what: "JPQL uses class and field names, and a dot path like p.club.name follows a @ManyToOne link for you.",
  example: "SELECT p.fullName, p.club.name FROM Player p WHERE p.goals > 5 ORDER BY p.fullName",
  trace: [
    { line: "FROM Player p", note: "the class Player, not the table: 4 players" },
    { line: "WHERE p.goals > 5", note: "Ivy Moss 9 and Ella Hart 7" },
    { line: "p.club.name", note: "follow each player's club: Ella to Rovers, Ivy to United" },
    { line: "ORDER BY p.fullName", note: "the field fullName; the column is full_name" },
    { line: "= Ella Hart, Rovers; Ivy Moss, United", note: "" },
  ],
  tip: "Write the field (fullName), never the column (full_name): JPQL only knows the Java names." },
"w4jpqlGroup": {
  what: "JOIN c.venue v follows the venue field, with no ON, and then v works like any other alias.",
  example: "SELECT v.city, COUNT(c) FROM Concert c JOIN c.venue v GROUP BY v.city ORDER BY v.city",
  trace: [
    { line: "FROM Concert c", note: "5 concerts" },
    { line: "JOIN c.venue v", note: "each concert with its own venue" },
    { line: "GROUP BY v.city", note: "Hull: Arena 3 + Dome 1 concerts; Leeds: Cellar 1" },
    { line: "SELECT v.city, COUNT(c)", note: "one row per city" },
    { line: "= Hull, 4; Leeds, 1", note: "" },
  ],
  tip: "After JOIN c.venue v you can use v in WHERE, GROUP BY or SELECT, just as in SQL." },

// ---------------- Week 5 ----------------
"w5createGraph": {
  what: "CREATE makes nodes and relationships; a variable lets you point at a node you just made instead of making another.",
  example: "CREATE (owls:Band {name: 'Paper Owls'}),\n       (owls)-[:RELEASED]->(:Album {title: 'Night Bus'}),\n       (owls)-[:RELEASED]->(:Album {title: 'Low Tide'});\n\nCREATE (:Band {name: 'Paper Owls'});\n\nMATCH (b:Band {name: 'Paper Owls'})\nRETURN count(b)",
  trace: [
    { line: "(owls:Band {name: 'Paper Owls'})", note: "1 new Band node, called owls" },
    { line: "(owls)-[:RELEASED]->(:Album ...)", note: "owls is that same band; each (:Album) is new" },
    { line: "CREATE (:Band {name: 'Paper Owls'})", note: "owls is gone after the ;, so this is a new band" },
    { line: "MATCH (b:Band {name: 'Paper Owls'})", note: "finds both band nodes" },
    { line: "= 2", note: "" },
  ],
  tip: "Every (:Label {...}) written in a CREATE is a brand new node, even if one with the same name is already there." },
"w5linkNodes": {
  what: "To link nodes that already exist, find them with MATCH, then CREATE a relationship between their variables.",
  example: "MATCH (w:Walker {name: 'Wes'}), (d:Dog {name: 'Rolo'})\nCREATE (w)-[:WALKS {day: 'Monday'}]->(d);\n\nMATCH (n)\nRETURN count(n)",
  trace: [
    { line: "MATCH (w:Walker {name: 'Wes'}), ...", note: "finds the Wes node already in the graph" },
    { line: "(d:Dog {name: 'Rolo'})", note: "finds Rolo, also already there" },
    { line: "CREATE (w)-[:WALKS {day: 'Monday'}]->(d)", note: "only variables: 1 new relationship, no new node" },
    { line: "MATCH (n) RETURN count(n)", note: "still the same 5 nodes: 2 walkers, 3 dogs" },
    { line: "= 5", note: "" },
  ],
  tip: "Inside CREATE use only the variables from MATCH; writing a whole (:Walker {name: ...}) there makes a new copy." },
"w5match": {
  what: "MATCH finds a pattern in the graph, but only if its arrow points the same way as the relationships in the data.",
  example: "MATCH (s:Song)-[:WRITTEN_BY]->(w:Writer {name: 'Marco'})\nRETURN s.title AS song",
  trace: [
    { line: "(:Song)-[:WRITTEN_BY]->(:Writer)", note: "in the setup every arrow goes from Song to Writer" },
    { line: "(s:Song)-[:WRITTEN_BY]->(w:Writer)", note: "this pattern points the same way, so it can match" },
    { line: "{name: 'Marco'}", note: "only Marco's arrows: he wrote one song" },
    { line: "RETURN s.title AS song", note: "AS names the column song" },
    { line: "= Tidal", note: "" },
  ],
  tip: "If the arrow in your pattern points the opposite way to the data, the pattern matches nothing at all." },
"w5where": {
  what: "WHERE keeps only the matched nodes whose condition is true; a missing property is null, which is never true.",
  example: "MATCH (p:Product)\nWHERE p.discount < 15\nRETURN p.name",
  trace: [
    { line: "MATCH (p:Product)", note: "all 5 products" },
    { line: "Pen: 10 < 15", note: "true, kept" },
    { line: "Poster: 20 < 15", note: "false, dropped" },
    { line: "Mug, Lamp, Notebook: null < 15", note: "no discount, so null: dropped too" },
    { line: "= Pen", note: "" },
  ],
  tip: "Comparing a missing property with = or <> gives null, so the row is dropped; to find it, use IS NULL." },
"w5relProps": {
  what: "Naming a relationship, as in [r:RATED], lets you read and change the properties stored on it.",
  example: "MATCH (:Diner {name: 'Uma'})-[r:RATED]->(:Restaurant {name: 'Taco Hut'})\nSET r.stars = 3;\n\nMATCH (:Diner {name: 'Uma'})-[r:RATED]->(p:Restaurant)\nRETURN p.name, r.stars\nORDER BY r.stars DESC",
  trace: [
    { line: "(:Diner {name: 'Uma'})-[r:RATED]->", note: "r is Uma's one rating of Taco Hut" },
    { line: "SET r.stars = 3", note: "that rating goes from 2 to 3" },
    { line: "Vic -[:RATED {stars: 5}]-> Taco Hut", note: "a different relationship, so it does not change" },
    { line: "RETURN p.name, r.stars", note: "Uma's three ratings, most stars first" },
    { line: "= Pho Corner, 5; Dosa Den, 4; Taco Hut, 3", note: "" },
  ],
  tip: "Stars belong to each RATED relationship, not to a node, so read and SET them as r.stars." },
"w5orderSkip": {
  what: "ORDER BY sorts the rows, SKIP drops some from the top, and LIMIT keeps only the next few.",
  example: "MATCH (r:Runner)\nRETURN r.name, r.time\nORDER BY r.name DESC\nSKIP 1\nLIMIT 2",
  trace: [
    { line: "MATCH (r:Runner)", note: "5 runners" },
    { line: "ORDER BY r.name DESC", note: "DESC is Z to A: Fay, Eli, Dee, Cal, Abi" },
    { line: "SKIP 1", note: "drop the first row, Fay" },
    { line: "LIMIT 2", note: "keep the next two: Eli and Dee" },
    { line: "= Eli, 305; Dee, 340", note: "" },
  ],
  tip: "ORDER BY is smallest first unless you add DESC; sort before SKIP and LIMIT." },
"w5count": {
  what: "count, sum, min and max work out one value per group, and Cypher groups by the other columns in RETURN.",
  example: "MATCH (p:Player)-[:PLAYS_FOR]->(c:Club)\nRETURN c.name, max(p.goals) AS best\nORDER BY c.name",
  trace: [
    { line: "MATCH (p:Player)-[:PLAYS_FOR]->(c:Club)", note: "7 rows, one per player" },
    { line: "c.name is not an aggregate", note: "so it becomes the group: 3 clubs" },
    { line: "Athletic: max(5, 2)", note: "Finn and Gus" },
    { line: "United: max(3, 0)", note: "Dina and Ezra" },
    { line: "Rovers: max(...)", note: "the same for its 3 players" },
    { line: "= Athletic, 5; Rovers, 7; United, 3", note: "" },
  ],
  tip: "Each column in RETURN that is not an aggregate becomes the group; with none, you get one total row." },
"w5with": {
  what: "WITH passes on only the columns you list, such as a count, so the next part can sort or filter on them.",
  example: "MATCH (c:Customer)-[:BOUGHT]->(p:Product)\nWITH c, count(p) AS items\nORDER BY items DESC\nLIMIT 1\nRETURN c.name, items",
  trace: [
    { line: "MATCH (c:Customer)-[:BOUGHT]->(p:Product)", note: "6 rows; Leo bought nothing, so he has no row" },
    { line: "WITH c, count(p) AS items", note: "one row per buyer: 3 rows, Leo not among them" },
    { line: "ORDER BY items DESC", note: "most items first" },
    { line: "LIMIT 1", note: "keep only the top row" },
    { line: "= Ivy, 3", note: "" },
  ],
  tip: "After WITH you can use ORDER BY, LIMIT or WHERE on the passed-on columns, all before RETURN." },
"w5merge": {
  what: "MERGE finds a node if it is there and creates it only if it is not, so it never makes a duplicate.",
  example: "MERGE (v:Visitor {name: 'Kim'})\nON CREATE SET v.visits = 1;\nMERGE (v:Visitor {name: 'Ned'})\nON CREATE SET v.visits = 1;\n\nMATCH (v:Visitor)\nRETURN v.name, v.visits\nORDER BY v.name",
  trace: [
    { line: "MERGE (v:Visitor {name: 'Kim'})", note: "Kim is found: no new node" },
    { line: "ON CREATE SET v.visits = 1", note: "skipped for Kim, so she keeps 3" },
    { line: "MERGE (v:Visitor {name: 'Ned'})", note: "there is no Ned yet, so he is created" },
    { line: "ON CREATE SET v.visits = 1", note: "runs for Ned" },
    { line: "= Kim, 3; Lou, 1; Ned, 1", note: "" },
  ],
  tip: "ON CREATE SET runs only for a new node and ON MATCH SET only for one that was found." },
"w5optional": {
  what: "OPTIONAL MATCH keeps every row from the MATCH before it, with null where the pattern is missing.",
  example: "MATCH (g:Gardener)\nOPTIONAL MATCH (g)-[:TENDS]->(p:Plot)\nRETURN g.name, count(p) AS plots\nORDER BY g.name",
  trace: [
    { line: "MATCH (g:Gardener)", note: "4 gardeners" },
    { line: "OPTIONAL MATCH (g)-[:TENDS]->(p:Plot)", note: "Ada, Cleo: a plot. Bram, Dan: p is null" },
    { line: "count(p)", note: "counts real plots only and skips null" },
    { line: "= Ada, 1; Bram, 0; Cleo, 1; Dan, 0", note: "" },
  ],
  tip: "count skips nulls: count a variable from the OPTIONAL MATCH to get 0 for the missing ones." },
"w5setRemove": {
  what: "SET adds or changes a property or a label, and REMOVE takes one away, while the node itself stays.",
  example: "MATCH (m:Member {name: 'Kev'})\nSET m:Guest\nREMOVE m.fine\nRETURN m.name, labels(m), m.fine",
  trace: [
    { line: "MATCH (m:Member {name: 'Kev'})", note: "1 node" },
    { line: "SET m:Guest", note: "adds a second label; Member stays" },
    { line: "REMOVE m.fine", note: "the fine property is gone, so it reads as null" },
    { line: "= Kev, [Member, Guest], null", note: "" },
  ],
  tip: "After REMOVE m:Label the node is still there, but a MATCH on that label no longer finds it." },
"w5delete": {
  what: "DELETE on a relationship removes just that relationship; the nodes at its two ends stay.",
  example: "MATCH (:User {name: 'Zed'})-[f:FOLLOWS]->()\nDELETE f;\n\nMATCH (a:User)-[:FOLLOWS]->(b:User)\nRETURN a.name, b.name\nORDER BY b.name",
  trace: [
    { line: "(:User {name: 'Zed'})-[f:FOLLOWS]->()", note: "Zed follows Bo: 1 relationship" },
    { line: "DELETE f", note: "only that arrow goes; Zed and Bo stay" },
    { line: "MATCH (a:User)-[:FOLLOWS]->(b:User)", note: "2 arrows left, both from Amy" },
    { line: "= Amy, Bo; Amy, Zed", note: "" },
  ],
  tip: "Deleting a relationship never deletes a node; use DETACH DELETE to remove a node with all its links." },
"w5friendsOfFriends": {
  what: "A relationship with no arrow head matches in either direction, and chaining two of them walks two steps.",
  example: "MATCH (:Climber {name: 'Quin'})-[:CLIMBS_WITH]-(x:Climber)\nRETURN x.name\nORDER BY x.name",
  trace: [
    { line: "-[:CLIMBS_WITH]-", note: "no arrow head: either direction matches" },
    { line: "Ola->Quin, Pat->Quin, Sol->Quin", note: "3 arrows into Quin" },
    { line: "Quin->Rui", note: "1 arrow out of Quin" },
    { line: "= Ola; Pat; Rui; Sol", note: "" },
  ],
  tip: "Leave off the arrow head to follow a link both ways; add a second link to the pattern to go two steps." },
"w5union": {
  what: "UNION stacks the rows of two queries with the same columns; UNION ALL keeps every row, repeats included.",
  example: "MATCH (:Person)-[:ILLUSTRATED]->(b:Book)\nRETURN b.title AS title\nUNION ALL\nMATCH (:Person)-[:WROTE]->(b:Book)\nRETURN b.title AS title",
  trace: [
    { line: "MATCH (:Person)-[:ILLUSTRATED]->(b:Book)", note: "Kites (by Nia), Moss (by Omar)" },
    { line: "MATCH (:Person)-[:WROTE]->(b:Book)", note: "Moss and Fog (both by Nia)" },
    { line: "UNION ALL", note: "stacks all 4 rows and keeps Moss twice" },
    { line: "= Kites; Moss; Moss; Fog", note: "" },
  ],
  tip: "Plain UNION removes duplicate rows; only UNION ALL keeps them." },
};

const TWIN_LESSONS = {
// ---------------- Week 1 ----------------
"w1entityTypes": {
  what: "Each line inside an entity is a field name, then a JDL type for that kind of value.",
  example: "fields Borrower",
  trace: [
    { line: "entity Borrower {", note: "the fields go inside the braces" },
    { line: "fullName String,", note: "text" },
    { line: "joined LocalDate,", note: "a date with no time" },
    { line: "loans Integer, overdue Boolean,", note: "a whole number; true or false" },
    { line: "balance BigDecimal", note: "an exact amount of money" },
    { line: "= fullName String, joined LocalDate, loans Integer, overdue Boolean, balance BigDecimal", note: "" },
  ],
  tip: "Name first, then type: loans Integer, never Integer loans as in Java." },
"w1validations": {
  what: "Validations after the type limit what a field may hold: a number's value or a String's length.",
  example: "fields HotelRoom",
  trace: [
    { line: "number String required unique maxlength(4),", note: "a String: at most 4 characters" },
    { line: "floor Integer required min(0) max(20),", note: "a number: from 0 to 20" },
    { line: "beds Integer min(1)", note: "at least 1, and not required" },
    { line: "fields HotelRoom", note: "each field: name, type, then its rules in order" },
    { line: "= number String required unique maxlength(4), floor Integer required min(0) max(20), beds Integer min(1)", note: "" },
  ],
  tip: "A rule you do not write is not there: with no required, the field may be empty." },
"w1enum": {
  what: "An enum's name becomes a type you can give a field, just like String.",
  example: "fields Pizza",
  trace: [
    { line: "enum Size { SMALL, MEDIUM, LARGE }", note: "Size is now a type" },
    { line: "name String required,", note: "a normal text field" },
    { line: "size Size required", note: "can only be SMALL, MEDIUM or LARGE" },
    { line: "= name String required, size Size required", note: "" },
  ],
  tip: "The field list shows the enum's name as the type, never its values." },
"w1oneToOne": {
  what: "OneToOne links one to one; a {name} on both sides lets each side reach the other.",
  example: "relationships",
  trace: [
    { line: "relationship OneToOne {", note: "one patient, one record" },
    { line: "Patient{record}", note: "the from side: patient.getRecord()" },
    { line: "to MedicalRecord{patient}", note: "the to side: record.getPatient()" },
    { line: "= OneToOne Patient{record} to MedicalRecord{patient}", note: "" },
  ],
  tip: "The check prints the type, then the line as you wrote it, so the from side stays on the left." },
"w1manyToOne": {
  what: "A relationship adds a link between entities, not a field: the field list stays as you wrote it.",
  example: "fields Pet",
  trace: [
    { line: "entity Pet { name String required }", note: "one field written" },
    { line: "relationship ManyToOne {", note: "many pets, one owner" },
    { line: "Pet{owner} to Owner", note: "pet.getOwner() works" },
    { line: "fields Pet", note: "owner is a link, not a field" },
    { line: "= name String required", note: "" },
  ],
  tip: "Only the lines inside an entity's braces are its fields; neither side of a relationship gains one." },
"w1oneToMany": {
  what: "OneToMany puts the one side first; the foreign key it makes is never in the field list.",
  example: "fields Ward",
  trace: [
    { line: "Hospital{wards} to Ward{hospital}", note: "one hospital, many wards" },
    { line: "ward table: hospital_id column", note: "the foreign key, on the many side" },
    { line: "entity Ward { beds Integer required min(1) }", note: "the only field written" },
    { line: "= beds Integer required min(1)", note: "" },
  ],
  tip: "Validations stay in the field list, but the {hospital} link and its id column never appear there." },
"w1manyToMany": {
  what: "When both sides have many, use ManyToMany; the join table between them is made for you.",
  example: "entities",
  trace: [
    { line: "entity Playlist { ... }", note: "declared with entity" },
    { line: "entity Song { ... }", note: "declared with entity" },
    { line: "Playlist{songs} to Song{playlists}", note: "ManyToMany: JHipster adds a join table" },
    { line: "entities", note: "declared names only, sorted A to Z" },
    { line: "= Playlist, Song", note: "" },
  ],
  tip: "List only the names written after the word entity, sorted A to Z: the join table is never one." },
"w1noLists": {
  what: "A field cannot hold a list in JDL, so the list's items become their own entity.",
  example: "entities",
  trace: [
    { line: "tracks List<Track>", note: "not JDL: there is no List type" },
    { line: "entity Track { ... }", note: "the tracks become their own entity" },
    { line: "Album{tracks} to Track{album}", note: "OneToMany: one album, many tracks" },
    { line: "entities", note: "both names, A to Z" },
    { line: "= Album, Track", note: "" },
  ],
  tip: "When something has a list of things, the things are one extra entity." },
"w1miniModel": {
  what: "An entity can be in several relationships, and none of them adds to its field list.",
  example: "fields Painting",
  trace: [
    { line: "entity Painting { title String required }", note: "one field written" },
    { line: "Gallery{paintings} to Painting{gallery}", note: "OneToMany: a link, not a field" },
    { line: "Painting{artist} to Artist", note: "ManyToOne: another link, not a field" },
    { line: "= title String required", note: "" },
  ],
  tip: "However many relationships an entity is in, its field list holds only what is inside its braces." },

// ---------------- Week 2 ----------------
"w2createTable": {
  what: "SERIAL numbers a column for you, NOT NULL makes a value compulsory, and a column with neither is left empty (NULL) when you give no value.",
  example: "CREATE TABLE locker (\n  locker_id SERIAL PRIMARY KEY,\n  owner     VARCHAR(40) NOT NULL,\n  code      VARCHAR(10)\n);\n\nINSERT INTO locker (owner, code) VALUES ('Ana', '4421');\nINSERT INTO locker (owner) VALUES ('Ben');\n\nSELECT locker_id, owner, code\nFROM locker\nORDER BY locker_id;",
  trace: [
    { line: "locker_id SERIAL PRIMARY KEY", note: "PostgreSQL numbers the rows: 1, 2, ..." },
    { line: "owner VARCHAR(40) NOT NULL", note: "text of at most 40 characters, always needed" },
    { line: "code VARCHAR(10)", note: "no NOT NULL, so it may be empty" },
    { line: "INSERT INTO locker (owner) VALUES ('Ben')", note: "no code given for Ben" },
    { line: "= 1, Ana, 4421; 2, Ben, null", note: "" },
  ],
  tip: "A column left out of an INSERT is NULL, unless SERIAL fills it in; leaving out a NOT NULL column is an error." },

"w2insert": {
  what: "INSERT without a column list must give every column, in the order the table was created.",
  example: "INSERT INTO parcel\nVALUES (7, 'Jo Bell', 'Derby', 2.5);\n\nSELECT parcel_id, city, weight_kg\nFROM parcel\nORDER BY parcel_id;",
  trace: [
    { line: "INSERT INTO parcel", note: "no column list after the table name" },
    { line: "VALUES (7, 'Jo Bell', 'Derby', 2.5)", note: "every column, in table order" },
    { line: "parcel_id = 7, weight_kg = 2.5", note: "the first value and the last value" },
    { line: "NUMERIC(5,2)", note: "always 2 decimal places: 2.5 shows as 2.50" },
    { line: "= 1, York, 1.20; 7, Derby, 2.50", note: "" },
  ],
  tip: "With no column list you give the id yourself too; NUMERIC(5,2) always shows two decimal places." },

"w2select": {
  what: "SELECT * returns every column of the rows that pass the WHERE test.",
  example: "SELECT *\nFROM flight\nWHERE destination = 'Lisbon';",
  trace: [
    { line: "FROM flight", note: "start with all 5 flights" },
    { line: "WHERE destination = 'Lisbon'", note: "only BA415 flies to Lisbon" },
    { line: "SELECT *", note: "every column, in the table's order" },
    { line: "flight_no, origin, destination, seats_free", note: "the 4 columns" },
    { line: "= BA415, Manchester, Lisbon, 3", note: "" },
  ],
  tip: "* means all columns, in the order CREATE TABLE listed them." },

"w2update": {
  what: "UPDATE changes the rows its WHERE picks; with no WHERE it changes every row in the table.",
  example: "UPDATE phone_plan\nSET monthly_fee = monthly_fee + 1;\n\nSELECT plan_id, monthly_fee\nFROM phone_plan\nORDER BY plan_id;",
  trace: [
    { line: "UPDATE phone_plan", note: "the table to change" },
    { line: "SET monthly_fee = monthly_fee + 1", note: "the new fee is the old fee plus 1" },
    { line: "(no WHERE)", note: "so all 3 plans are picked" },
    { line: "Basic 9.00, Plus 16.00, Max 26.00", note: "every fee goes up by 1" },
    { line: "= 1, 9.00; 2, 16.00; 3, 26.00", note: "" },
  ],
  tip: "Forgetting WHERE is the classic mistake: the change hits every row." },

"w2delete": {
  what: "DELETE with OR removes a row when either test is true.",
  example: "DELETE FROM booking\nWHERE pitch = 'B' OR nights = 4;\n\nSELECT guest FROM booking;",
  trace: [
    { line: "FROM booking", note: "start with all 5 bookings" },
    { line: "WHERE pitch = 'B'", note: "matches Leo Park" },
    { line: "OR nights = 4", note: "also matches Mia Grant" },
    { line: "DELETE", note: "those 2 rows go; 3 are left" },
    { line: "= Sam Holt; Zoe Lane; Raj Iyer", note: "" },
  ],
  tip: "With AND both tests must be true; with OR one is enough, so OR usually deletes more rows." },

"w2updateAnomaly": {
  what: "When one fact is copied into many rows, changing only some of them makes the table disagree with itself: an update anomaly.",
  example: "UPDATE staff\nSET dept_phone = '0121 555'\nWHERE staff_name = 'Lena';\n\nSELECT dept_phone\nFROM staff\nWHERE dept = 'Sales';",
  trace: [
    { line: "Omar 0121 111, Lena 0121 111", note: "the Sales number is stored twice" },
    { line: "WHERE staff_name = 'Lena'", note: "picks only Lena's row" },
    { line: "SET dept_phone = '0121 555'", note: "Lena's copy gets the new number" },
    { line: "SELECT dept_phone ... 'Sales'", note: "2 Sales rows, 2 different numbers" },
    { line: "= 0121 111; 0121 555", note: "" },
  ],
  tip: "An UPDATE changes only the rows its WHERE picks; every other copy keeps its old value." },

"w2repeatingGroup": {
  what: "With numbered columns like subject1 to subject3, a test on one column only looks in that column.",
  example: "SELECT tutor_name\nFROM tutor\nWHERE subject1 = 'Spanish';",
  trace: [
    { line: "FROM tutor", note: "3 tutors, subjects spread over 3 columns" },
    { line: "WHERE subject1 = 'Spanish'", note: "looks in subject1 only" },
    { line: "Ali Maths, Bea French, Cy Art", note: "the subject1 values: none is Spanish" },
    { line: "Bea: subject3 = 'Spanish'", note: "in another column, so she is missed" },
    { line: "= (no rows)", note: "" },
  ],
  tip: "Numbered columns hide values from a simple WHERE; 1NF puts every subject in one column." },

"w2partialDependency": {
  what: "In stay_flat the key is (room_no, night), so a room can only be stored together with a night someone stays.",
  example: "SELECT room_type\nFROM stay_flat\nWHERE room_no = 20;",
  trace: [
    { line: "FROM stay_flat", note: "key is (room_no, night); neither can be empty" },
    { line: "rooms: 12, 12, 15", note: "one row per booked night" },
    { line: "WHERE room_no = 20", note: "room 20 has no stays yet, so it has no row" },
    { line: "= (no rows)", note: "" },
  ],
  tip: "Splitting out a room table keyed by room_no alone lets a room be stored before anyone stays in it." },

"w2transitive": {
  what: "In a flat table a fact about the venue is copied into every gig's row, so a query brings it back once per gig.",
  example: "SELECT venue_name, venue_capacity\nFROM gig_flat\nWHERE venue_capacity < 1000;",
  trace: [
    { line: "FROM gig_flat", note: "3 rows, one per gig" },
    { line: "WHERE venue_capacity < 1000", note: "gigs 1 and 3, both at Old Mill" },
    { line: "SELECT venue_name, venue_capacity", note: "one result row for each matching gig" },
    { line: "= Old Mill, 400; Old Mill, 400", note: "" },
  ],
  tip: "Before 3NF a venue comes back once per gig; in a venue table each venue is one row." },

// ---------------- Week 3 ----------------
"w3copyCsv": {
  what: "\\copy reads the lines of a CSV file into a table that already exists, one row per data line.",
  example: "\\copy flight FROM 'flights.csv' WITH (FORMAT csv, HEADER true)\n\nSELECT flight_no, seats\nFROM flight\nWHERE destination = 'Amsterdam';",
  trace: [
    { line: "flight_no,destination,seats,departs", note: "line 1: HEADER true skips it" },
    { line: "BA208,Lisbon,180,2026-12-01", note: "every other line becomes one row" },
    { line: "KL41,Amsterdam,,2026-12-05", note: "seats is empty, so it becomes NULL" },
    { line: "WHERE destination = 'Amsterdam'", note: "keep the KL41 row" },
    { line: "= KL41, null", note: "" },
  ],
  tip: "Once loaded, the file's data lines are ordinary rows: query them like any table." },
"w3addColumn": {
  what: "ADD COLUMN adds a column to a table that already has rows; a DEFAULT decides what those old rows get.",
  example: "ALTER TABLE album\nADD COLUMN rating INT;\n\nALTER TABLE album\nADD COLUMN genre VARCHAR(20) DEFAULT 'Rock';\n\nSELECT album_id, rating, genre\nFROM album\nORDER BY album_id;",
  trace: [
    { line: "album: (1, Blue), (2, Rumours)", note: "2 rows already there" },
    { line: "ADD COLUMN rating INT", note: "no default, so both old rows get NULL" },
    { line: "ADD COLUMN genre ... DEFAULT 'Rock'", note: "with a default, both old rows get 'Rock'" },
    { line: "= 1, null, Rock; 2, null, Rock", note: "" },
  ],
  tip: "A new column on old rows holds NULL, unless the column has a DEFAULT: then it holds that value." },
"w3foreignKey": {
  what: "A foreign key makes PostgreSQL check that every value in a column exists as a key in another table.",
  example: "ALTER TABLE song\nADD CONSTRAINT song_artist_fk\nFOREIGN KEY (artist_id) REFERENCES artist (artist_id);\n\nINSERT INTO song VALUES (3, 'Skyfall', 1);\n\nSELECT title\nFROM song\nWHERE artist_id = 1\nORDER BY title;",
  trace: [
    { line: "artist: (1, Adele), (2, Burna Boy)", note: "the artist_id values a song may use" },
    { line: "FOREIGN KEY (artist_id) REFERENCES ...", note: "a song with artist_id 9 would now be refused" },
    { line: "(3, 'Skyfall', 1)", note: "artist 1 exists, so the row is accepted" },
    { line: "WHERE artist_id = 1", note: "Hello and Skyfall" },
    { line: "= Hello; Skyfall", note: "" },
  ],
  tip: "A foreign key refuses only a value missing from the other table; NULL means no artist yet, so it is let through." },
"w3setDefault": {
  what: "SET DEFAULT gives a column a value to use when a new row leaves it out.",
  example: "ALTER TABLE task\nALTER COLUMN priority SET DEFAULT 'medium';\nINSERT INTO task (task_id, title) VALUES (1, 'Buy milk');\n\nALTER TABLE task\nALTER COLUMN priority SET DEFAULT 'high';\nINSERT INTO task (task_id, title) VALUES (2, 'Fix boiler');\n\nSELECT task_id, priority\nFROM task\nORDER BY task_id;",
  trace: [
    { line: "SET DEFAULT 'medium'", note: "used when an INSERT leaves priority out" },
    { line: "(1, 'Buy milk')", note: "no priority given, so task 1 gets 'medium'" },
    { line: "SET DEFAULT 'high'", note: "only rows added from now on get 'high'" },
    { line: "(2, 'Fix boiler')", note: "task 2 gets 'high'; task 1 keeps 'medium'" },
    { line: "= 1, medium; 2, high", note: "" },
  ],
  tip: "A default is used only at INSERT time: setting or changing it never touches rows already there." },
"w3countSum": {
  what: "SUM adds up a column over the rows that WHERE keeps, and COUNT(*) counts those rows.",
  example: "SELECT COUNT(*), SUM(amount)\nFROM fine\nWHERE member = 'Ben';",
  trace: [
    { line: "FROM fine", note: "5 fines" },
    { line: "WHERE member = 'Ben'", note: "2 rows: 1.00 and 3.25" },
    { line: "COUNT(*)", note: "2 rows" },
    { line: "SUM(amount)", note: "1.00 + 3.25 = 4.25, kept to 2 decimal places" },
    { line: "= 2, 4.25", note: "" },
  ],
  tip: "Only the WHERE decides which rows are added up: a column you do not filter on, like paid, makes no difference." },
"w3minMaxAvg": {
  what: "MIN and MAX give the smallest and largest value, and you can subtract one from the other like any numbers.",
  example: "SELECT MAX(price) - MIN(price) AS gap\nFROM room\nWHERE hotel = 'Parkside';",
  trace: [
    { line: "WHERE hotel = 'Parkside'", note: "3 rooms: 70, 88, 65" },
    { line: "MAX(price)", note: "88" },
    { line: "MIN(price)", note: "65" },
    { line: "MAX(price) - MIN(price) AS gap", note: "88 - 65 = 23, in a column named gap" },
    { line: "= 23", note: "" },
  ],
  tip: "With no WHERE, MIN and MAX look at every row in the table." },
"w3groupBy": {
  what: "GROUP BY makes one group for each different value in a column, and gives one row per group.",
  example: "SELECT genre\nFROM book\nWHERE book_id <= 4\nGROUP BY genre\nORDER BY genre;",
  trace: [
    { line: "WHERE book_id <= 4", note: "4 books: Emma, Dune, Persuasion, Neuromancer" },
    { line: "GROUP BY genre", note: "Classic: Emma, Persuasion; Sci-fi: Dune, Neuromancer" },
    { line: "SELECT genre", note: "one row per group, however many books are in it" },
    { line: "ORDER BY genre", note: "A to Z" },
    { line: "= Classic; Sci-fi", note: "" },
  ],
  tip: "Each value appears once after GROUP BY, even if many rows share it." },
"w3whereHaving": {
  what: "WHERE throws away rows before grouping; HAVING throws away whole groups after their totals are worked out.",
  example: "SELECT airline, MAX(delay_mins)\nFROM flight\nWHERE destination = 'Paris'\nGROUP BY airline\nHAVING MAX(delay_mins) > 20\nORDER BY airline;",
  trace: [
    { line: "FROM flight", note: "7 flights" },
    { line: "WHERE destination = 'Paris'", note: "5 left; the two Rome flights are gone" },
    { line: "GROUP BY airline", note: "SkyJet 30, 10; AirLoop 5, 15; Northwind 25" },
    { line: "HAVING MAX(delay_mins) > 20", note: "the biggest are 30, 15 and 25: AirLoop is out" },
    { line: "= Northwind, 25; SkyJet, 30", note: "" },
  ],
  tip: "HAVING only sees the rows WHERE kept; with no WHERE, every flight joins its airline's group." },
"w3join": {
  what: "JOIN ... ON gives one row for each matching pair, so you can group and count across two tables.",
  example: "SELECT a.country, COUNT(*)\nFROM author a\nJOIN book b ON b.author_id = a.author_id\nGROUP BY a.country\nORDER BY a.country;",
  trace: [
    { line: "author a JOIN book b", note: "one row per book, with its author's columns added" },
    { line: "5 joined rows", note: "every book has an author, so all 5 books stay" },
    { line: "GROUP BY a.country", note: "Nigeria: books 1, 3 and 4; UK: books 2 and 5" },
    { line: "= Nigeria, 3; UK, 2", note: "" },
  ],
  tip: "After a JOIN, COUNT(*) counts joined rows: here one per book, not one per author." },
"w3view": {
  what: "A view is a saved query that you can read like a table, and even run aggregates on.",
  example: "CREATE VIEW not_london AS\nSELECT name, salary\nFROM staff\nWHERE office <> 'London';\n\nSELECT COUNT(*), MAX(salary)\nFROM not_london;",
  trace: [
    { line: "CREATE VIEW not_london AS ...", note: "saves the query; <> means 'is not'" },
    { line: "FROM not_london", note: "runs it: Tom 35000, Kwame 38000" },
    { line: "COUNT(*), MAX(salary)", note: "the 3 London staff are never seen" },
    { line: "= 2, 38000", note: "" },
  ],
  tip: "An aggregate on a view only sees the rows the view's WHERE lets through." },
"w3prepare": {
  what: "PREPARE saves a query with a gap, $1, and EXECUTE runs it with a value in that gap.",
  example: "PREPARE above (int) AS\nSELECT train_id\nFROM train\nWHERE platform > $1\nORDER BY train_id;\n\nEXECUTE above(3);",
  trace: [
    { line: "PREPARE above (int) AS ...", note: "$1 is a gap for a whole number" },
    { line: "EXECUTE above(3)", note: "3 goes where $1 is" },
    { line: "WHERE platform > 3", note: "train 1 (platform 4) and train 3 (platform 7)" },
    { line: "= 1; 3", note: "" },
  ],
  tip: "The name after EXECUTE picks the saved query; the value in brackets fills $1." },
"w3dropTruncate": {
  what: "DELETE ... WHERE removes only the rows that match, unlike TRUNCATE, which removes them all.",
  example: "DELETE FROM reading\nWHERE sensor_id = 1;\n\nSELECT reading_id, value\nFROM reading\nORDER BY reading_id;",
  trace: [
    { line: "reading: 4 rows", note: "sensor 1: 19, 22; sensor 2: 25, 18" },
    { line: "DELETE ... WHERE sensor_id = 1", note: "removes readings 1 and 2 only" },
    { line: "SELECT ... FROM reading", note: "sensor 2's readings stay" },
    { line: "= 3, 25; 4, 18", note: "" },
  ],
  tip: "Check each row against the WHERE: only the rows where it is true are deleted." },
"w3doBlock": {
  what: "In a DO block, FOR visits each row in turn, and IF ... ELSE picks one of two actions for that row.",
  example: "DO $$\nDECLARE\n  m RECORD;\nBEGIN\n  FOR m IN SELECT member_id, visits FROM gym_member LOOP\n    IF m.visits >= 4 THEN\n      UPDATE gym_member SET status = 'regular' WHERE member_id = m.member_id;\n    ELSE\n      UPDATE gym_member SET status = 'new' WHERE member_id = m.member_id;\n    END IF;\n  END LOOP;\nEND $$;\n\nSELECT name, status\nFROM gym_member\nORDER BY member_id;",
  trace: [
    { line: "m = Nia, 12 visits", note: "12 >= 4 is true: THEN, so 'regular'" },
    { line: "m = Raf, 0 visits", note: "0 >= 4 is false: ELSE, so 'new'" },
    { line: "m = Elle, 4 visits", note: "4 >= 4 is true, as 4 equals 4: 'regular'" },
    { line: "m = Gus, 0 visits", note: "ELSE again: 'new'" },
    { line: "= Nia, regular; Raf, new; Elle, regular; Gus, new", note: "" },
  ],
  tip: "With ELSE every row gets one of the two updates; watch > and >= when a value sits on the boundary." },

// ---------------- Week 4 ----------------
"w4innerJoin": {
  what: "INNER JOIN puts a row of one table next to the row of another table that matches it, and drops rows with no match.",
  example: "SELECT o.owner_name, p.pet_name\nFROM owner o\nINNER JOIN pet p ON p.owner_id = o.owner_id\nWHERE o.owner_name = 'Ben'\nORDER BY p.pet_name;",
  trace: [
    { line: "FROM owner o", note: "start with the 3 owners" },
    { line: "INNER JOIN pet p ON p.owner_id = o.owner_id", note: "each owner gets every pet with the same owner_id" },
    { line: "Cleo: no pets; Rex, Ziggy: no owner", note: "no partner, so none of them appears" },
    { line: "WHERE o.owner_name = 'Ben'", note: "keep Ben's 2 pets" },
    { line: "= Ben, Biscuit; Ben, Mochi", note: "" },
  ],
  tip: "NATURAL JOIN writes the ON for you: it matches on every column that has the same name in both tables." },
"w4leftJoin": {
  what: "LEFT JOIN keeps every row of the table after FROM, and fills the other table's columns with NULL when nothing matches.",
  example: "SELECT COUNT(*), COUNT(a.code)\nFROM city c\nLEFT JOIN airport a ON a.city_id = c.city_id\nWHERE c.city_name IN ('Bath', 'Belfast');",
  trace: [
    { line: "FROM city c LEFT JOIN airport a", note: "every city is kept" },
    { line: "Belfast: BFS, BHD", note: "two airports match, so Belfast gives 2 rows" },
    { line: "Bath: NULL", note: "no airport: 1 row with a NULL code" },
    { line: "WHERE c.city_name IN ('Bath', 'Belfast')", note: "keep those 3 rows" },
    { line: "COUNT(*), COUNT(a.code)", note: "COUNT(a.code) skips Bath's NULL" },
    { line: "= 3, 2", note: "" },
  ],
  tip: "A row with two matches appears twice, and COUNT(column) skips NULLs while COUNT(*) does not." },
"w4noMatch": {
  what: "After a LEFT JOIN, a row with no match has NULL in the other table's columns: IS NULL finds those rows, and IS NOT NULL finds the matched ones.",
  example: "SELECT r.room_no, b.guest\nFROM room r\nLEFT JOIN booking b ON b.room_no = r.room_no\nWHERE r.floor = 1\nORDER BY r.room_no, b.guest;",
  trace: [
    { line: "FROM room r LEFT JOIN booking b", note: "every room is kept" },
    { line: "room 12: Hope, Jade", note: "two bookings match, so room 12 gives 2 rows" },
    { line: "room 11: NULL", note: "no booking, so every booking column is NULL" },
    { line: "WHERE r.floor = 1", note: "keep rooms 11 and 12: 3 rows" },
    { line: "= 11, null; 12, Hope; 12, Jade", note: "" },
  ],
  tip: "IS NULL keeps the rows the join found no match for; IS NOT NULL keeps the rows it did match." },
"w4fullJoin": {
  what: "RIGHT JOIN keeps every row of the table after JOIN; FULL OUTER JOIN keeps every row of both tables.",
  example: "SELECT l.subject, t.tutor_name\nFROM tutor t\nRIGHT JOIN lesson l ON l.tutor_id = t.tutor_id\nORDER BY l.subject;",
  trace: [
    { line: "FROM tutor t", note: "the left table: 3 tutors" },
    { line: "RIGHT JOIN lesson l", note: "the right table: every lesson is kept" },
    { line: "Maths and French: Mia", note: "both lessons match Mia" },
    { line: "Art: NULL", note: "no tutor, so the name is NULL" },
    { line: "Noah and Ola have no lesson", note: "they are on the left side, so they drop out" },
    { line: "= Art, null; French, Mia; Maths, Mia", note: "" },
  ],
  tip: "LEFT keeps the table before JOIN, RIGHT keeps the table after JOIN, FULL keeps both." },
"w4threeJoin": {
  what: "When two tables have no direct link, JOIN through the table in between: each JOIN ... ON adds one more table.",
  example: "SELECT i.item_name, a.aisle_no, s.town\nFROM item i\nJOIN aisle a ON a.aisle_id = i.aisle_id\nJOIN store s ON s.store_id = a.store_id\nWHERE i.item_name IN ('Rice', 'Soap');",
  trace: [
    { line: "FROM item i", note: "4 items" },
    { line: "JOIN aisle a ON a.aisle_id = i.aisle_id", note: "Rice is in aisle 7; Soap has no aisle, so it drops" },
    { line: "JOIN store s ON s.store_id = a.store_id", note: "aisle 7 is in store 2, Ripon" },
    { line: "WHERE i.item_name IN ('Rice', 'Soap')", note: "only Rice is left" },
    { line: "= Rice, 7, Ripon", note: "" },
  ],
  tip: "Plain JOIN means INNER JOIN, so a row must find a match in every joined table to stay." },
"w4entity": {
  what: "@Entity turns a Java class into a table, @Table(name = ...) picks the table's name, and @Id marks the primary key.",
  example: "tables:",
  trace: [
    { line: "@Entity", note: "the class Flight is stored in a table" },
    { line: "@Table(name = \"flights\")", note: "the table is called flights" },
    { line: "@Id @GeneratedValue(... IDENTITY)", note: "id is the primary key; the database fills it in" },
    { line: "without @Table: Flight -> flight", note: "the class name, in lower case" },
    { line: "= flights", note: "" },
  ],
  tip: "Without @Table, Spring Boot puts _ between the words of the class name: a class TicketDesk gets the table ticket_desk." },
"w4column": {
  what: "@Column changes one column: nullable = false adds NOT NULL, unique = true adds UNIQUE, and name = ... renames it.",
  example: "sql: SELECT column_name, is_nullable FROM information_schema.columns WHERE table_name = 'product' AND column_name <> 'id' ORDER BY column_name",
  trace: [
    { line: "@Column(nullable = false, unique = true)", note: "column sku: NOT NULL, so no NULLs" },
    { line: "@Column(name = \"product_name\")", note: "only renamed: NULL is still allowed" },
    { line: "private Integer stockLevel;", note: "no @Column: stock_level, NULL allowed" },
    { line: "may each column hold NULL?", note: "YES or NO for the 3 columns besides id, A to Z" },
    { line: "= product_name, YES; sku, NO; stock_level, YES", note: "" },
  ],
  tip: "A String field's column may hold NULL unless you write @Column(nullable = false)." },
"w4transient": {
  what: "@Transient keeps a field in the Java object but gives it no column, so it is never saved.",
  example: "sql: SELECT column_name FROM information_schema.columns WHERE table_name = 'parcel'",
  trace: [
    { line: "private Long id;", note: "column id" },
    { line: "private String trackingCode;", note: "column tracking_code" },
    { line: "private int weightGrams;", note: "column weight_grams" },
    { line: "@Transient private String label;", note: "no column" },
    { line: "= id; tracking_code; weight_grams", note: "" },
  ],
  tip: "Every field becomes a column unless it is marked @Transient." },
"w4manyToOne": {
  what: "@ManyToOne goes on the side that holds the foreign key; @JoinColumn names that column, and @OneToMany(mappedBy) on the other side adds nothing to the tables.",
  example: "sql: SELECT column_name FROM information_schema.columns WHERE table_name = 'player'",
  trace: [
    { line: "@Column(name = \"player_id\") ... id", note: "the key column is player_id" },
    { line: "private String name;", note: "column name" },
    { line: "@ManyToOne @JoinColumn(name = \"team_id\")", note: "Player.team is stored in a foreign key column team_id" },
    { line: "@OneToMany(mappedBy = \"team\")", note: "in Team: reuses Player.team, so no new column" },
    { line: "= player_id; name; team_id", note: "" },
  ],
  tip: "Without @JoinColumn, the column is the field name, _, then the other table's key column: a field Coach coach, whose key column is id, gives coach_id." },
"w4manyToMany": {
  what: "@ManyToMany with @JoinTable makes a third table that only holds pairs of keys, one from each entity.",
  example: "tables:",
  trace: [
    { line: "@Entity Actor", note: "table actor" },
    { line: "@Entity Film", note: "table film" },
    { line: "@JoinTable(name = \"film_actor\", ...)", note: "a third table for the links" },
    { line: "film_actor: film_id, actor_id", note: "joinColumns and inverseJoinColumns: one key for each side" },
    { line: "= actor, film, film_actor", note: "" },
  ],
  tip: "joinColumns is the entity you are writing in; inverseJoinColumns is the other one." },
"w4jpqlPath": {
  what: "JPQL uses class and field names, and a dot path like f.airline.name follows a @ManyToOne link for you.",
  example: "SELECT f.flightCode, f.airline.name FROM Flight f WHERE f.seats < 100 ORDER BY f.flightCode",
  trace: [
    { line: "FROM Flight f", note: "the class Flight, not the table: 5 flights" },
    { line: "WHERE f.seats < 100", note: "TJ40 has 90 seats and LW07 has 70" },
    { line: "f.airline.name", note: "follow the airline: TJ40 Thistle Jet, LW07 Liffey Wings" },
    { line: "ORDER BY f.flightCode", note: "the field flightCode; the column is flight_code" },
    { line: "= LW07, Liffey Wings; TJ40, Thistle Jet", note: "" },
  ],
  tip: "Write the field (flightCode), never the column (flight_code): JPQL only knows the Java names." },
"w4jpqlGroup": {
  what: "JOIN s.shop sh follows the shop field, with no ON, and then sh works like any other alias.",
  example: "SELECT sh.name, SUM(s.amount) FROM Sale s JOIN s.shop sh WHERE sh.name <> 'Market' GROUP BY sh.name ORDER BY sh.name",
  trace: [
    { line: "FROM Sale s", note: "6 sales" },
    { line: "JOIN s.shop sh", note: "each sale with its own shop" },
    { line: "WHERE sh.name <> 'Market'", note: "keep the 3 sales at Corner and Station" },
    { line: "GROUP BY sh.name", note: "Corner 12 + 4 = 16; Station 3" },
    { line: "= Corner, 16; Station, 3", note: "" },
  ],
  tip: "After JOIN s.shop sh you can use sh in WHERE, GROUP BY or SELECT, just as in SQL." },

// ---------------- Week 5 ----------------
"w5createGraph": {
  what: "CREATE makes nodes and relationships; a variable lets you point at a node you just made instead of making another.",
  example: "CREATE (mia:Instructor {name: 'Mia'}),\n       (mia)-[:TEACHES]->(:GymClass {name: 'Spin'}),\n       (mia)-[:TEACHES]->(:GymClass {name: 'Pilates'});\n\nCREATE (:Instructor {name: 'Mia'});\n\nMATCH (i:Instructor)\nRETURN count(i)",
  trace: [
    { line: "(mia:Instructor {name: 'Mia'})", note: "1 new Instructor node, called mia" },
    { line: "(mia)-[:TEACHES]->(:GymClass ...)", note: "mia is that same node; each (:GymClass) is new" },
    { line: "CREATE (:Instructor {name: 'Mia'})", note: "mia is gone after the ;, so this is a new Mia" },
    { line: "MATCH (i:Instructor)", note: "finds both Mia nodes" },
    { line: "= 2", note: "" },
  ],
  tip: "Every (:Label {...}) written in a CREATE is a brand new node, even if one with the same name is already there." },
"w5linkNodes": {
  what: "MATCH finds nodes that already exist, and CREATE then runs once for every row MATCH found.",
  example: "MATCH (p:Driver), (v:Van {reg: 'KX21'})\nCREATE (p)-[:DRIVES {shift: 'early'}]->(v);\n\nMATCH (p:Driver)-[:DRIVES]->(:Van {reg: 'KX21'})\nRETURN p.name\nORDER BY p.name",
  trace: [
    { line: "MATCH (p:Driver), (v:Van {reg: 'KX21'})", note: "p has no filter: 2 rows, Omar and Pia" },
    { line: "CREATE (p)-[:DRIVES ...]->(v)", note: "runs once per row: 2 new relationships" },
    { line: "MATCH (p:Driver)-[:DRIVES]->(:Van ...)", note: "who drives KX21 now" },
    { line: "= Omar; Pia", note: "" },
  ],
  tip: "CREATE never checks whether a relationship is already there, so it can add a second one between the same nodes." },
"w5match": {
  what: "An arrow in a pattern must point the way the data does; with no arrow head it matches either way.",
  example: "MATCH (a:Airport {code: 'MAN'})-[:DEPARTS_FROM]-(f:Flight)\nRETURN f.number AS flight",
  trace: [
    { line: "(:Flight)-[:DEPARTS_FROM]->(man)", note: "in the data the arrow goes from flight to airport" },
    { line: "(a)-[:DEPARTS_FROM]->(f)", note: "from the airport this would match nothing" },
    { line: "(a)-[:DEPARTS_FROM]-(f)", note: "no arrow head: either direction is fine" },
    { line: "{code: 'MAN'}", note: "MAN has one flight" },
    { line: "= QX90", note: "" },
  ],
  tip: "Leave out the arrow head when you do not care which way the relationship points." },
"w5where": {
  what: "WHERE keeps only the matched nodes whose condition is true; a missing property is null, which is never true.",
  example: "MATCH (h:Hiker)\nWHERE h.level <> 'expert'\nRETURN h.name\nORDER BY h.name",
  trace: [
    { line: "MATCH (h:Hiker)", note: "5 hikers" },
    { line: "Nell: 'expert' <> 'expert'", note: "false, dropped" },
    { line: "Pia, Rex: beginner, improver", note: "not 'expert', so true: kept" },
    { line: "Otto, Sue: null <> 'expert'", note: "no level, so null: dropped" },
    { line: "= Pia; Rex", note: "" },
  ],
  tip: "A comparison with null gives null, not true; test for a missing value with IS NULL or IS NOT NULL." },
"w5relProps": {
  what: "Naming a relationship, as in [r:RODE], lets you read the properties stored on it.",
  example: "MATCH (c:Cyclist {name: 'Ida'})-[r:RODE]->(t:Route)\nRETURN t.name, r.km, r.month\nORDER BY r.km",
  trace: [
    { line: "(c:Cyclist {name: 'Ida'})-[r:RODE]->(t)", note: "Ida's 2 rides; r is each ride" },
    { line: "r.km, r.month", note: "read from the relationship, not from a node" },
    { line: "ORDER BY r.km", note: "18 comes before 42" },
    { line: "= Hills, 18, June; Coast, 42, May", note: "" },
  ],
  tip: "Facts about one ride live on the RODE relationship, so read them through its variable, as r.km." },
"w5orderSkip": {
  what: "ORDER BY can sort by any expression, such as size(g.title), the number of characters in the title.",
  example: "MATCH (g:Game)\nRETURN g.title, size(g.title)\nORDER BY size(g.title)\nLIMIT 2",
  trace: [
    { line: "size(g.title)", note: "counts the characters: Go is 2, Orbit is 5" },
    { line: "ORDER BY size(g.title)", note: "shortest title first" },
    { line: "LIMIT 2", note: "keep the first 2 rows" },
    { line: "= Go, 2; Orbit, 5", note: "" },
  ],
  tip: "ORDER BY is smallest first unless you add DESC; spaces count as characters in size." },
"w5count": {
  what: "count, sum, min and max work out one value per group, and Cypher groups by the other columns in RETURN.",
  example: "MATCH (r:Recipe)-[:USES]->(i:Ingredient)\nRETURN i.name, max(r.minutes) AS longest\nORDER BY i.name",
  trace: [
    { line: "MATCH (r:Recipe)-[:USES]->(i:Ingredient)", note: "8 rows, one per USES arrow" },
    { line: "i.name is not an aggregate", note: "so it is the group: Egg, Flour, Milk" },
    { line: "Egg: max(20, 10)", note: "Pancakes and Omelette" },
    { line: "Flour: max(20, 90, 25)", note: "Pancakes, Bread and Scones" },
    { line: "= Egg, 20; Flour, 90; Milk, 25", note: "" },
  ],
  tip: "Each column in RETURN that is not an aggregate becomes the group; with none, you get one total row." },
"w5with": {
  what: "WITH works out a value per node, such as a max or a count, and passes it on, so a WHERE after it can filter on it.",
  example: "MATCH (a:Author)-[:WROTE]->(p:Post)\nWITH a, max(p.likes) AS best\nWHERE best < 50\nRETURN a.name, best\nORDER BY a.name",
  trace: [
    { line: "MATCH (a:Author)-[:WROTE]->(p:Post)", note: "5 rows, one per post" },
    { line: "WITH a, max(p.likes) AS best", note: "one row per author: Ana 30, Ben 12, Cy 70" },
    { line: "WHERE best < 50", note: "filters on the passed-on value: Cy goes" },
    { line: "= Ana, 30; Ben, 12", note: "" },
  ],
  tip: "A WHERE straight after MATCH cannot see a count or sum; put WITH first, like HAVING in SQL." },
"w5merge": {
  what: "MERGE finds the node or creates it, then runs ON CREATE SET for a new node or ON MATCH SET for a found one.",
  example: "MERGE (i:Item {sku: 'C3'})\nON CREATE SET i.qty = 1\nON MATCH SET i.qty = i.qty + 8\nRETURN i.sku, i.qty",
  trace: [
    { line: "MERGE (i:Item {sku: 'C3'})", note: "C3 is already there, with qty 0" },
    { line: "ON CREATE SET i.qty = 1", note: "skipped: nothing was created" },
    { line: "ON MATCH SET i.qty = i.qty + 8", note: "runs: 0 + 8" },
    { line: "= C3, 8", note: "" },
  ],
  tip: "Exactly one of ON CREATE SET and ON MATCH SET runs, depending on whether the node was found." },
"w5optional": {
  what: "OPTIONAL MATCH keeps every row from the MATCH before it, with null where the pattern is missing.",
  example: "MATCH (a:Author)\nOPTIONAL MATCH (a)-[:WROTE]->(b:Book)\nRETURN a.name, b.title\nORDER BY a.name, b.title",
  trace: [
    { line: "MATCH (a:Author)", note: "3 authors" },
    { line: "OPTIONAL MATCH (a)-[:WROTE]->(b:Book)", note: "one row per book an author wrote" },
    { line: "Gil", note: "wrote nothing, so he keeps one row with b = null" },
    { line: "= Eve, Ash; Eve, Salt; Gil, null; Hana, Reed", note: "" },
  ],
  tip: "A plain MATCH drops any row where the pattern is missing; OPTIONAL MATCH keeps it, like a LEFT JOIN." },
"w5setRemove": {
  what: "REMOVE takes a property or a label off a node; the node stays, and a removed property reads as null.",
  example: "MATCH (r:Room)\nWHERE r.needsRepair = false\nREMOVE r.needsRepair;\n\nMATCH (r:Room)\nRETURN r.number, r.needsRepair\nORDER BY r.number",
  trace: [
    { line: "WHERE r.needsRepair = false", note: "only room 102" },
    { line: "REMOVE r.needsRepair", note: "102 loses that property; the node stays" },
    { line: "MATCH (r:Room)", note: "still all 3 rooms" },
    { line: "r.needsRepair", note: "101 and 103: true; 102 has none, so null" },
    { line: "= 101, true; 102, null; 103, true", note: "" },
  ],
  tip: "REMOVE r.prop drops a property and REMOVE r:Label drops a label; neither deletes the node." },
"w5delete": {
  what: "DELETE on a relationship removes just that relationship; the nodes at its two ends stay.",
  example: "MATCH (:Event {name: 'Quiz'})-[h:HELD_AT]->(:Venue)\nDELETE h;\n\nMATCH (e:Event)-[:HELD_AT]->(v:Venue)\nRETURN e.name, v.name\nORDER BY e.name",
  trace: [
    { line: "(:Event {name: 'Quiz'})-[h:HELD_AT]->", note: "Quiz is held at the Park: 1 relationship" },
    { line: "DELETE h", note: "only that arrow goes; Quiz and the Park stay" },
    { line: "MATCH (e:Event)-[:HELD_AT]->(v:Venue)", note: "2 arrows left" },
    { line: "= Fair, Hall; Gig, Hall", note: "" },
  ],
  tip: "Deleting a relationship never deletes a node; use DETACH DELETE to remove a node with all its links." },
"w5friendsOfFriends": {
  what: "Two relationships in a row in one pattern walk two steps, following each arrow's direction.",
  example: "MATCH (:Station {name: 'Cole'})-[:LINE_TO]->(mid:Station)-[:LINE_TO]->(s:Station)\nRETURN mid.name, s.name",
  trace: [
    { line: "(:Station {name: 'Cole'})-[:LINE_TO]->(mid)", note: "step 1: Cole goes to Eden and to Dale" },
    { line: "mid = Eden", note: "Eden has no LINE_TO out, so that path stops" },
    { line: "(mid)-[:LINE_TO]->(s:Station)", note: "step 2: Dale goes to Fern" },
    { line: "= Dale, Fern", note: "" },
  ],
  tip: "Each row is one whole path; a station you reach by two different paths appears twice unless you use DISTINCT." },
"w5union": {
  what: "UNION stacks the rows of two queries with the same columns and removes any repeated row.",
  example: "MATCH (:Person)-[:COACHES]->(t:Team)\nRETURN t.name AS team\nUNION\nMATCH (:Person)-[:PLAYS_FOR]->(t:Team)\nRETURN t.name AS team",
  trace: [
    { line: "MATCH (:Person)-[:COACHES]->(t:Team)", note: "Blues (Ali), Reds (Bea), Blues (Bea)" },
    { line: "MATCH (:Person)-[:PLAYS_FOR]->(t:Team)", note: "Reds (Ali)" },
    { line: "UNION", note: "4 rows stacked, then every repeat removed" },
    { line: "= Blues; Reds", note: "" },
  ],
  tip: "UNION removes duplicate rows; use UNION ALL to keep them." },
};
if (typeof module !== "undefined") module.exports = { LESSONS, TWIN_LESSONS };
