---
title: Passwords, secrets and environment variables inside Docker
date: 2021-07-27
---

You can define environment variables inside `docker-compose.yml` file to be used in `wp-config.php`. You define them under the `environment` block and use them with `getenv("")`

```yaml
wordpress:
  image: wp-img
  restart: always
  environment:
    WORDPRESS_DB_HOST: mysql
    WORDPRESS_DB_NAME: myawesomedb
    WORDPRESS_DB_USER: myawesomeuser
    WORDPRESS_DB_PASSWORD: oBw^^(&&ASJHGasb
    DOMAIN_CURRENT_SITE: my.cooldomain.com
  volumes:
    - /home/blah/wordpress:/var/www/html
  depends_on:
    - mysql
```

```php
// wp-config.php

/** The name of the database for WordPress */
define('DB_NAME', getenv("WORDPRESS_DB_NAME"));

/** MySQL database username */
define('DB_USER', getenv("WORDPRESS_DB_USER"));

/** MySQL database password */
define('DB_PASSWORD', getenv("WORDPRESS_DB_PASSWORD"));

/** MySQL hostname */
define('DB_HOST', getenv("WORDPRESS_DB_HOST"));

```

You can also use a `.env` file and reference values from that inside your `docker-compose.yml`

```yaml
wordpress:
  image: wordpress:5-fpm-alpine
  depends_on:
    - db
  container_name: wordpress
  restart: unless-stopped
  # make sure to add path to env file
  env_file: .env
  # we refence .env variables like `$MYSQL_USER`
  environment:
    - WORDPRESS_DB_HOST=db:3306
    - WORDPRESS_DB_USER=$MYSQL_USER
    - WORDPRESS_DB_PASSWORD=$MYSQL_PASSWORD
    - WORDPRESS_DB_NAME=wordpress
```

## Links

- [Environment variables in Compose](https://docs.docker.com/compose/environment-variables/)
