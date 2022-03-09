---
title: Setting up WordPress, MySQL, Nginx proxy and SSL certificates in Docker
date: 2021-08-03
slug: docker-compose-wordpress-mysql-nginx-proxy-ssl
---

- [ ] building and running the docker setup

  - [ ] mysql
  - [ ] wordpress
  - [ ] nginx proxy
  - [ ] auto-renewing SSLs

- we'll have a `data` folder where we'll keep the files/data we need to mount inside docker containers as `volumes`
- `wordpress` and `database` will be our directories for the WordPress site and the MySQL database files. These will be in the user's home directory (and not in the `data` folder)
- we'll have a `.env` file for the secrets. `.env` in the project's root is picked up by Docker automatically. You can reference environment variables inside `docker-compose.yml` like you reference bash variables: `${MYSQL_PASSWORD}`

> You can use environment variables in configuration values with a Bash-like ${VARIABLE} syntax - see [variable substitution](https://docs.docker.com/compose/compose-file/compose-file-v3/#variable-substitution) for full details.

```
.
├── data
│   ├── certbot
│   │   ├── conf
│   │   └── www
│   └── nginx
│       └── nginx.conf
└── docker-compose.yml

```

```conf
# .env

# MySQL Credentials
MYSQL_DATABASE=blah
MYSQL_USER=blah
MYSQL_PASSWORD=blah
MYSQL_ROOT_PASSWORD=blah

# WordPress Credentials
WORDPRESS_DB_HOST=mysql # this is the name of our MySQL service container
WORDPRESS_DB_NAME=blah
WORDPRESS_DB_USER=blah
WORDPRESS_DB_PASSWORD=blah
```

```yaml
# WordPress
wordpress:
  container_name: wordpress
  image: wordpress:php7.4-apache
  restart: always
  stdin_open: true
  tty: true
  environment:
    WORDPRESS_DB_HOST: ${WORDPRESS_DB_HOST}
    WORDPRESS_DB_USER: ${WORDPRESS_DB_USER}
    WORDPRESS_DB_PASSWORD: ${WORDPRESS_DB_PASSWORD}
    WORDPRESS_DB_NAME: ${WORDPRESS_DB_NAME}
  volumes:
    - /home/${USER}/wordpress:/var/www/html
```

```yaml
# MySQL
mysql:
  container_name: mysql # this will be the name used in logs when starting/stopping instead of ` wp-devops_mysql_1`
  image: mysql:5.7
  restart: unless-stopped
  # if you use mysql version 8 you need PHP to handle passwords correctly
  # command: '--default-authentication-plugin=mysql_native_password'
  environment:
    # getting these values from `.env`
    MYSQL_DATABASE: ${MYSQL_DATABASE}
    MYSQL_USER: ${MYSQL_USER}
    MYSQL_PASSWORD: ${MYSQL_PASSWORD}
    MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
  ports:
    - 3306:3306
  volumes:
    - /home/${USER}/database:/var/lib/mysql
```

```yaml
# Nginx Proxy
nginx:
  container_name: nginx
  image: nginx:latest
  restart: unless-stopped
  ports:
    - 80:80
    - 443:443
  volumes:
    - ./nginx/conf:/etc/nginx/conf.d
    - ./certbot/conf:/etc/nginx/ssl
    - ./certbot/data:/var/www/html
```

```yaml
# SSL - Certbot or ZeroSSL
certbot:
  container_name: certbot
  image: certbot/certbot:latest
  command: certonly --webroot --webroot-path=/var/www/html --email youremail@domain.com --agree-tos --no-eff-email -d domain.com -d www.domain.com
  volumes:
    - ./certbot/conf:/etc/letsencrypt
    - ./certbot/logs:/var/log/letsencrypt
    - ./certbot/data:/var/www/html
```

### Nginx

The following three lines specify which SSL cert file to use.

```
ssl                  on;
ssl_certificate      /etc/ssl/certificate.crt;
ssl_certificate_key  /etc/ssl/private.key;
```

```bash
docker-compose up

docker ps -a
```
