---
title: Getting started with PostgreSQL on Ubuntu
date: 2023-02-18
---

```bash
# PostgreSQL comes pre-installed on Ubuntu
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL
sudo systemctl start postgresql.service

# create a user and give it super privileges
sudo -u postgres createuser --interactive

# create a db with the same username that postgres access by default
# this DID NOT work for me..
sudo -u postgres createdb sammy
```


### PostgreSQL commands

- Make sure you **end all commands with a semicolon `;`**
- Users are actually called _roles_

```
\l - list all databases
 - list all users
\q - exit out of the prompt
```

```sql
-- create a database
CREATE DATABASE [IF NOT EXISTS] db_name;

-- connect to a database
\c database_name;

-- drop a database permanently
DROP DATABASE [IF EXISTS] db_name;

-- create a role
CREATE ROLE role_name;

-- create a role with username and password
CREATE ROLE username NOINHERIT LOGIN PASSWORD password;

-- set a password for an existing user
ALTER USER postgres PASSWORD 'myPassword';
```

- You need a linux user with the same name as the postgresql user and database
- TablePlus will refuse to connect without a password
- PostgreSQL is fussy about using single commas `'` instead of doubles
- For escape characters to work, you need to prepend the text with `E`. For example: `E'Ocean\'s Eleven'`
### Sample commands

- `CREATE TABLE` creates a new table.
- `INSERT INTO` adds a new row to a table.
- `SELECT` queries data from a table.
- `ALTER TABLE` changes an existing table.
- `UPDATE` edits a row in a table.
- `DELETE FROM` deletes rows from a table.


```sql
-- create a database
CREATE TABLE celebs (
   id INTEGER,
   name TEXT,
   age INTEGER
 );
```

Auto-increment values with `SEQUEL` constraint. `SEQUEL` represents an auto-incrementing unique value. For example: `id SERIAL PRIMARY KEY`.

```sql
-- insert data into table
INSERT INTO celebs (id, name, age) 
VALUES (1, 'Justin Bieber', 22);
```

```sql
-- insert multiple rows
INSERT INTO table_name (column_list)
VALUES
    (value_list_1),
    (value_list_2),
    ...
    (value_list_n);
```

```sql
-- add a new column
ALTER TABLE celebs 
ADD COLUMN twitter_handle TEXT;
```

```sql
-- update data
UPDATE celebs 
SET twitter_handle = '@taylorswift13' 
WHERE id = 4; 
```

```sql
-- delete records
DELETE FROM celebs 
WHERE twitter_handle IS NULL;
```

```sql
-- escaping characters
-- the text needed to be preceded with 'E'
INSERT INTO films (name, release_year)
VALUES(E'Ocean\'s Eleven',  2001);
```

Links
---

- [How To Install and Use PostgreSQL on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-20-04)
- [PostgreSQL Cheat Sheet](https://www.postgresqltutorial.com/postgresql-cheat-sheet/)
- [SQL Commands](https://www.codecademy.com/article/sql-commands)