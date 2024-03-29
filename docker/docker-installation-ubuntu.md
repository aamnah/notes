---
title: Docker installation - Ubuntu 20.04 LTS
slug: docker-installation-ubuntu
date: 2020-05-13
---

## Install on Ubuntu (easy way)

```bash
# install
# sudo apt install -y docker.io docker-compose

curl -sSL https://get.docker.com/ | sh


# sudo apt-get update
# sudo apt-get install docker-ce docker-ce-cli containerd.io

# use Docker as a non-root user
# get rid of having to sudo or be root
sudo usermod -aG docker $(whoami)

# logout and login again for the group change to work
```

You don't need to install the long manual way, `docker.io` is already provided as a package in the Ubuntu repos and the version is fairly up to date (`19.03.8-0ubuntu1` as of this writing, which is the latest [version](https://docs.docker.com/engine/release-notes/)). You can check which version comes with the command`apt info docker.io`

![docker-apt-info-version](./images/docker-apt-info-version.png)

note that in Ubuntu `docker` is a tray plugin, while `docker.io` is the Docker containerization software. the name `docker` wasn't available so they went with `docker.io`

## Install on Ubuntu (hard way)

Since i had already written this, i'm keeping the content. But the one-liner command above is good enough

```bash
# uninstall any existing docker
sudo apt-get remove docker docker-engine docker.io containerd runc

# enable https repos
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common

# Add Docker’s official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# add repo
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"

# install Docker
sudo apt-get update && sudo apt-get install -y docker-ce docker-ce-cli containerd.io
```

Since the release for 20.04 LTS is not available as of this writing, i'm adding the bionic repo instead [ref](https://askubuntu.com/a/1230190). `bionic` instead of `$(lsb_release -cs)`

## User permissions

If you keep getting `permission denied` errors like these

```
docker: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Post http://%2Fvar%2Frun%2Fdocker.sock/v1.40/containers/create: dial unix /var/run/docker.sock: connect: permission denied.
See 'docker run --help'.
```

This means you need to run the command with `sudo`. You can get rid of having to `sudo` by adding yourself to the `docker` user group

```bash
sudo usermod -aG docker $(whoami)
```

Make sure you logout and log back in after this in order for the change to work

## Upgrade Compose

the docker compose installed with Ubuntu was `1.25.0` while the latest was `1.29.2`. i wanted the latest because of `.env` file changes introduced in `+v1.28`..

```bash
# remove any existing installs
sudo apt-get remove docker-compose
sudo rm /usr/local/bin/docker-compose

# curl + grep
VERSION=$(curl --silent https://api.github.com/repos/docker/compose/releases/latest | grep -Po '"tag_name": "\K.*\d')
DESTINATION=/usr/local/bin/docker-compose
# download the current stable release of Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/${VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o ${DESTINATION}

# Apply executable permissions to the binary
sudo chmod +x ${DESTINATION}

# create a symbolic link to /usr/bin or any other directory in your path
sudo ln -s ${DESTINATION} /usr/bin/docker-compose

docker-compose --version # docker-compose version 1.29.2, build 5becea4c
```

## Links

- [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
- [How to install docker community on Ubuntu 20.04 LTS?](https://askubuntu.com/questions/1230189/how-to-install-docker-community-on-ubuntu-20-04-lts)
- [Docker Engine release notes](https://docs.docker.com/engine/release-notes/)
- [StackOverflow: What is the difference between docker and docker-compose](https://stackoverflow.com/a/37966689)
