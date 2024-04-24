#!/bin/bash
# run with sudo


DOWNLOAD_LOCATION="/home/$USER/Downloads"

create_folders() {
  mkdir $HOME/.icons $HOME/.themes $HOME/.config/conky
}

install_dependencies() {
  sudo apt install -y git lua5.4

  # lua is needed by conky-manager scripts
}

install_conky() {
  # install conky with all features enabled
  sudo apt install -y conky-all
}

install_conky_manager() {
  # install Conky Manager
  sudo add-apt-repository ppa:teejee2008/foss
  sudo apt update
  sudo apt install -y conky-manager2
}

install_chrome() {
  wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb
# fix errors if any
sudo apt-get install -f

}



install_gnome_tweaks() {
  # Confirm that the universe repository is enabled on your system. 
  sudo add-apt-repository universe

  sudo apt install gnome-tweak-tool

}

install_mutter() {
  # Mutter rounded
  # A window manager for GNOME, with rounded corners patch
  # Adds blur effect with rounded corners for windows

  cd ${DOWNLOAD_LOCATION}

  git clone https://github.com/yilozt/mutter-rounded
  cd ${DOWNLOAD_LOCATION}/mutter-rounded/ubuntu
  ./package.sh

  sudo dpkg -i libmutter-10-0*.deb mutter-common*.deb
}

cleanup() {
  # cleanup

  rm -rf ${DOWNLOAD_LOCATION}/mutter-rounded
  sudo apt autoremove
}