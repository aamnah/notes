---
title: Backing up and Restoring Databases
slug: backup-restore-databases
date: 2015-02-20
lastmod: 2019-03-06
tags:
  - mysql
---

### Export

```bash
HOST=""
USER=""
BACKUP_FILENAME="mysqlbackup"
```

export a single database

```bash
# export a single database
# mysqldump -u [username] -p [database] > FILENAME.sql
mysqldump --host="host" --user="USERNAME" --password --port=3306 "db_name" > FILENAME.sql
```

export multiple databases

```bash
# export multiple databases
mysqldump -u USERNAME -p -–databases db1 db2 db3 | gzip > FILENAME.sql.gz
```

export all databases

```bash
# export all databases
# mysqldump -u [username] -p --all-databases > FILENAME.sql
mysqldump -u USERNAME -p --all-databases > FILENAME.sql

# compressed export
# mysqldump -u [username] -p --all-databases > FILENAME.sql
mysqldump -u USERNAME -p -–all-databases | gzip > FILENAME.sql.gz
```

Compressed database exports (` | gzip`)

```bash
mysqldump -u USERNAME -p -–all-databases | gzip > FILENAME.sql.gz
```

```bash
# export to a remote server
mysqldump --host servername dbname > FILENAME.sql
```

```bash
# import database at remote server
mysqldump --host 192.168.1.15 -P 3306 -u USERNAME -p DB_NAME > FILENAME.sql
```

backup without locking the tables

```bash
# backup without locking the tables
mysqldump -u USERNAME -p --single-transaction --quick --lock-tables=false -h HOST_IP DB_NAME > backup.sql
```

### Copy backup file from one server to another

```
scp FILENAME USER@HOST:PATH_TO_SAVE_AT
```

### Restore

```bash
# restore a single database
mysql -u USERNAME -p DB_NAME < FILENAME.sql

# restore all databases
mysql -u USERNAME -p < FILENAME.sql

# restore a gzip compressed backup
gzip < [FILENAME.sql.gz] | mysql -u [USERNAME] -p [DB_NAME]
```

Sample Command for creating a backup and restoring at remote server in one command:

```bash
mysqldump --user=USERNAME --password=password --host=HOST DB_NAME | mysql --host=REMOTE_HOST --user=REMOTE_USERNAME --password=password REMOTE_DB_NAME
```

### Rename

You can use the exported backup file to rename that database. What is the database called and what database to use is defined in the first two lines.

```sql
CREATE DATABASE IF NOT EXISTS `database_wp`;
USE `database_wp`;
```

### Import

```bash
mysql --host="host" --user="username" --password --port=3306 --database=db_name < "path/to/backup/file.sql"
```

## Links

- [How to Back Up and Restore a MySQL Database](http://webcheatsheet.com/sql/mysql_backup_restore.php)
  tzdata
