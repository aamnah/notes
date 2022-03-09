---
title: Enable logs (general, error, slow query) for Amazon RDS databases (MySQL, MariaDB)
date: 2021-03-19
---

Log locations are:

- Error: `/rdsdbdata/log/error/mysql-error.log`
- General: `/rdsdbdata/log/general/mysql-general.log`
- Slow Query: `/rdsdbdata/log/slowquery/mysql-slowquery.log`

MariaDB logs are also named `mysql-slowquery.log` and `mysql-general.log`. These file locations (or names) can not be changed.

### MySQL Parameters

- `slow_query_log` = `1` (default value is 0 or no logging)
- `slow_query_log_file` = `/rdsdbdata/log/slowquery/mysql-slowquery.log` (default location)
- `long_query_time` = `5` (to log queries that run longer than five seconds)
- `general_log` = `1` (default value is 0 or no logging)
- `general_log_file` = `/rdsdbdata/log/general/mysql-general.log` (default location)
- `log_output` = `FILE`

> To work with the logs from the Amazon RDS console, Amazon RDS API, Amazon RDS CLI, or AWS SDKs, set the log_output parameter to FILE.

### MariaDB Parameters

- `slow_query_log` = `1`
- `slow_query_log_file` = `/rdsdbdata/log/slowquery/mysql-slowquery.log`
- `long_query_time` = `5`
- `general_log` = `1`
- `general_log_file` = `/rdsdbdata/log/general/mysql-general.log`
- `log_output` = `FILE`

## Notes

- The changes require a **reboot** to take effect. You have to _manually_ reboot it, `pending_reboot` will NOT result in an automatic reboot during the next maintenance window.
- `log_output` was set to file because setting it to table can _effect the database performance for high throughput workload_. Setting it to `FILE` means you can view the logs from the RDS console, but you can not query them.

> To work with the logs from the Amazon RDS console, Amazon RDS API, Amazon RDS CLI, or AWS SDKs, set the log_output parameter to FILE.

- If the option is set to `TABLE` then the amount of data written to the table can increase, which can also effect performance due to resources used to write to this table.
- For the dev db where performance is not that big of a concern, i have set it to `TABLE`, and for the prod db i have set it to `FILE`.

## Links

- [How do I enable and monitor logs for an Amazon RDS MySQL DB instance?](https://aws.amazon.com/premiumsupport/knowledge-center/rds-mysql-logs/)
- [MySQL database log files](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_LogAccess.Concepts.MySQL.html)
- [MariaDB database log files](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_LogAccess.Concepts.MariaDB.html)
- [How do I manage slow query logs and general logs for an RDS MySQL DB Instance?](https://www.youtube.com/watch?v=aXn4pyPgPgw&t=80s&ab_channel=AmazonWebServices)
- [Rebooting a DB instance](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_RebootInstance.html)
