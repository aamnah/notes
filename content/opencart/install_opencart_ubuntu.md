---
title: Installing OpenCart 3.0.3.2 on Ubuntu 18.04 LTS
date: 2020-04-04
slug: install_opencart_ubuntu
---

This assumes that

- you just created the server and nothing has been installed except the OS
- you're logged in as `root`
- you have a domain or subdomain you're installing opencart at

### Update server

First things first, update the package repos and upgrade stuff

```bash
sudo apt update
sudo apt upgrade -y
```

### Install systems requirements

Install server requirements (Apache, PHP and dependencies)

```bash
sudo apt install -y apache2 php php-curl php-gd php-zip certbot unzip
```

`certbot` is for SSL, and `unzip` is to extract opencart files, both we'll use later

Restart Apache after installing dependencies (otherwise they don't show up on the Opencart install page)

#### MySQL

```bash
sudo apt install mysql-server mysql-client
```

Now secure the MySQL installation by setting a `root` user password and other stuff

```bash
mysql_secure_installation # interactive
```

#### PhpMyAdmin (optional)

```bash
sudo apt install phpmyadmin # interactive
```

PHPmyAdmin no longer let's you login with the root MySQL user. So you'll have to create a database and a user to use with Opencart from the command line. Once it's created you can use that to login to PHPmyAdmin.

Replace DBNAME, USERNAME, PASSWORD in the commands below

```sql
mysql --user=root
mysql> CREATE DATABASE DBNAME ;
mysql> CREATE USER 'USERNAME'@'localhost' IDENTIFIED BY 'PASSWORD' ;
mysql> GRANT ALL PRIVILEGES ON *.* TO 'USERNAME'@'localhost' ; -- grant access to ALL MySQL databases
mysql> GRANT ALL PRIVILEGES ON DBNAME.* TO 'USERNAME'@'localhost' ; -- grant access to Opencart database
```

### Setup virtualhost file and domain

- create virtualhost

```bash
curl -s https://raw.githubusercontent.com/aamnah/bash-scripts/master/setup/virtualhost.sh | bash -s mydomain.com
```

```bash
# add `root` to `www-data`
adduser root www-data

# Change group ownership for `/var/www` to `www-data`
sudo chgrp -R www-data /var/www/*

# Give write permission to the group
sudo chmod -R g+w /var/www/*

# chmod g+s forces new files and dirs to pick up the group owner (www-data),
# making sure that permissions change propagates
# (`-s` means set user or group ID on execution)
find /var/www -type d -print0 | sudo xargs -0 chmod g+s
```

### Install OpenCart

```bash
# move to project directory
cd /var/www/domain.com/public_html

# delete default index.html created by virtualhost script
rm index.html

# download OpenCart release
# https://github.com/opencart/opencart/releases
wget https://github.com/opencart/opencart/releases/download/3.0.3.2/opencart-3.0.3.2.zip

# unzip the files
unzip opencart-3.0.3.2.zip

# move stuff from the `upload/` folder to project root
mv upload/* .
mv upload/.htaccess.txt

# Rename config files
cp config-dist.php config.php
cp admin/config-dist.php admin/config.php

# Make sure the file permissions are right
chmod 755 config.php admin/config.php
chown -R www-data:www-data /var/www/

# Rename .htaccess file
mv .htaccess.txt .htaccess

# Enable Rewrite module (needed for clean URLs, will give errors otherwise)
a2enmod rewrite

# Restart Apache
service apache2 restart
```

Now go to your domain or IP in the browser and complete the installation. Afterwards, cleanup

```bash
# delete install/ and empty upload/ dir
rm -rf install/ upload/
```

- secure

```bash
# set permissions for files

# To change all the directories to 755 (-rwxr-xr-x)
echo -e "Setting permissions for all directories to 755.."
find . -type d -exec chmod 755 {} \;

# To change all the files to 644 (-rw-r--r--):
echo -e "Setting permissions for all files to 644.."
find . -type f -exec chmod 644 {} \;

# set 444 for admin files
echo -e "Setting secure 444 permissions for admin files.."
chmod 444 config.php
chmod 444 admin/config.php
chmod 444 index.php
chmod 444 admin/index.php
chmod 444 system/startup.php

# set 777 for cache
echo -e "Setting 777 permissions for cache folders.."
chmod 777 image/cache/
chmod 777 system/storage/cache/
```

### SSL

## Links

- http://docs.opencart.com/en-gb/requirements/
- https://github.com/opencart/opencart/releases
- https://github.com/aamnah/bash-scripts/blob/master/install/opencart.sh
- https://github.com/aamnah/bash-scripts/blob/master/setup/virtualhost.sh
- https://tldrdevnotes.com/opencart/opencart-enable-ssl/
