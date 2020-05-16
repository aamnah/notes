---
title: Bash script to install AMP and Opencart on a fresh Ubuntu server
date: 2020-05-16
status: draft
---

Work in Progress script. Basically combining [this one](https://github.com/aamnah/bash-scripts/blob/master/install/amp_debian.sh), [this one](https://github.com/aamnah/bash-scripts/blob/master/setup/virtualhost.sh) and [this one](https://github.com/aamnah/bash-scripts/blob/master/install/opencart.sh) so that i don't have to do them one by one.

Also, setup SFTP so that we someone can FTP theme files if need be.

Will get around to it eventually, OpenCart doesn't get much love from me, and i don't have to do this a whole lot..

```bash
sudo bash install_opencart.sh mydomain.com
```

```bash
#!/bin/bash

###################################################################
#         Author: Aamnah Akram
#           Link: http://github.com/aamnah/bash-scripts
#    Description: installs AMP and Opencart on a fresh Ubuntu server
#            Run: sudo bash install_opencart.sh mydomain.com
###################################################################

# https://github.com/aamnah/bash-scripts/blob/master/install/amp_debian.sh
# https://github.com/aamnah/bash-scripts/blob/master/setup/virtualhost.sh
# https://github.com/aamnah/bash-scripts/blob/master/install/opencart.sh
# https://notes.aamnah.com/sysadmin/sftp-www/

# Color Reset
Color_Off='\033[0m'       # Reset

# Regular Colors
Red='\033[0;31m'          # Red
Green='\033[0;32m'        # Green
Yellow='\033[0;33m'       # Yellow
Blue='\033[0;34m'         # Blue
Purple='\033[0;35m'       # Purple
Cyan='\033[0;36m'         # Cyan

GROUP='sftpgrp'
USER='sftpuser'
USER_PASS='sftppass'
CHROOT='/var/www'

showUsage() {
  echo -e "\nUsage: please provide a domain name (FQDN)"
}

disableDefault() {
  # Disable the default Apache virtual host
  echo -e "${Cyan}Disabling default virtual host .. ${Color_Off}"
  sudo a2dissite 000-default > /dev/null
}

enableSite() {
  # Enable site
  echo -e "${Cyan}Enabling ${DOMAIN} .. ${Color_Off}"
  sudo a2ensite ${DOMAIN}.conf > /dev/null
}

restartApache() {
  # Restart Apache
  echo -e "\n${Cyan}Restarting Apache .. ${Color_Off}"
  sudo service apache2 restart
}


installAMP() {
# php-gd php-zip
}

setApachePermissions() {
  echo -e "${Cyan}Setting Permissions .. ${Color_Off}"
  # sets the user running the script as owner
  # sudo chown -R $USER:$USER /var/www/${DOMAIN}

  # set www-data as the owner of the domain
  sudo chown -R www-data:www-data /var/www/${DOMAIN}

  # set directory permissions
  chmod -R 755 /var/www/${DOMAIN}
}

configureSFTP() {
  # install OpenSSH if not installed
  sudo apt install openssh-server

  # create a group for SFTP access
  sudo groupadd ${GROUP}

  # Comment out Subsytem line from /etc/ssh/sshd_config
  #Subsystem sftp /usr/lib/openssh/sftp-server
  sed -i 's/Subsystem sftp \/usr\/lib\/openssh\/sftp-server/#Subsystem sftp \/usr\/lib\/openssh\/sftp-server/' /etc/ssh/sshd_config

  # add SFTP config for the group to SSH configuration file
  echo -e "

  # SFTP
  Subsystem sftp internal-sftp

  Match Group ${GROUP}
    ChrootDirectory ${CHROOT} # limit access to this dir and it's subdirs (jailed access)
    ForceCommand internal-sftp # force run SFTP upon login
    PasswordAuthentication yes # allow logging in with passowrd
    PermitTunnel no # disable tun device (tunnel software network interface) forwarding
    X11Forwarding no # disable GUI over VNC
    AllowTcpForwarding no # disable tunnelling
    AllowAgentForwarding no # disable port (ssh-agent) forwarding
  " >> /etc/ssh/sshd_config

  # create and add user to the SFTP Group
  sudo useradd ${USER} -p ${USER_PASS} -g ${GROUP}
  # add the user to www-data so it can rwx /var/www
  sudo usermod -aG www-data ${USER}

  # PERMISSIONS
  # chroot dir has to be owned by root
  sudo chown root:root ${CHROOT}
  # chroot directory also needs 755 in order to avoid: Server unexpectedly closed network connection
  sudo chmod 755 ${CHROOT}
  # web directories have to be owned by www-data (assuming you're creating sftp users for websites)
  sudo chown -R www-data:www-data /var/www/*
  # Give write permission to the group
  sudo chmod -R g+w /var/www/*

  # Restart SSH
  service ssh restart
}

setUserPermissions() {

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



# EXECUTE
#########################################

  if [ $# -eq 0 ]; then # if no. of args provided is 0
    showUsage
    exit 1
  elif [ $# -gt 1 ]; then # if no. of args (domains) provided is more than 1
    for arg in "$@" # for every argument in all arguments provided `$@`
    do
      DOMAIN=${arg}
      SETUP # run the setup script
    done
    restartApache
    exit 0
  else
    DOMAIN=$1
    SETUP # run the setup script
    restartApache
    exit 0
  fi
```
