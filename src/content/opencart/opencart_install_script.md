---
title: Bash script to install AMP and Opencart on a fresh Ubuntu server
date: 2020-05-16
status: draft
---

Work in Progress script. Basically combining [this one](https://github.com/aamnah/bash-scripts/blob/master/install/amp_debian.sh), [this one](https://github.com/aamnah/bash-scripts/blob/master/setup/virtualhost.sh) and [this one](https://github.com/aamnah/bash-scripts/blob/master/install/opencart.sh) so that i don't have to do them one by one.

Will get around to it eventually, OpenCart doesn't get much love from me, and i don't have to do this a whole lot..

```bash
sudo bash install_opencart.sh mydomain.com
```

```bash
#!/bin/bash

# https://github.com/aamnah/bash-scripts/blob/master/install/amp_debian.sh
# https://github.com/aamnah/bash-scripts/blob/master/setup/virtualhost.sh
# https://github.com/aamnah/bash-scripts/blob/master/install/opencart.sh

installAMP() {
# php-gd php-zip
}

setApachePerms() {
  echo -e "${Cyan}Setting Permissions .. ${Color_Off}"
  # sets the user running the script as owner
  # sudo chown -R $USER:$USER /var/www/${DOMAIN}

  # set www-data as the owner of the domain
  sudo chown -R www-data:www-data /var/www/${DOMAIN}

  # set directory permissions
  chmod -R 755 /var/www/${DOMAIN}
}

setupVirtualHost() {

}

setupSSL() {

}

# Set permissions
secureInstallation() {
  # delete install folder
  if [ -d "install/" ]; then
    echo -e "${Cyan} Deleting install/ folder.. ${Color_Off}"
    rm -rf install
  fi

  # To change all the directories to 755 (-rwxr-xr-x)
  echo -e "${Cyan} Setting permissions for all directories to 755.. ${Color_Off}"
  find . -type d -exec chmod 755 {} \;

  # To change all the files to 644 (-rw-r--r--):
  echo -e "${Cyan} Setting permissions for all files to 644.. ${Color_Off}"
  find . -type f -exec chmod 644 {} \;

  # set 444 for admin files
  echo -e "${Cyan} Setting secure 444 permissions for admin files.. ${Color_Off}"
  chmod 444 config.php
  chmod 444 admin/config.php
  chmod 444 index.php
  chmod 444 admin/index.php
  chmod 444 system/startup.php

  # set 777 for cache
  echo -e "${Cyan} Setting 777 permissions for cache folders.. ${Color_Off}"
  chmod 777 image/cache/
  chmod 777 system/storage/cache/
}
```
