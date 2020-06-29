---
title: Docker - Getting started
path: docker-getting-started
date: 2020-05-13
status: draft
---

```bash
docker --version
docker info
docker run hello-world # run a new conatiner, in this case `hello-world`
docker ps
docker ps -a # see running (and stopped) containers
docker images # see info about images
```

```bash
# 1. Clone
git clone https://github.com/docker/getting-started.git

# 2. Build
cd getting-started
docker build -t docker101tutorial .

# 3. Run
docker run -d -p 80:80 --name docker-tutoial docker101tutorial
```

## What's the difference between Docker and Docker Compose?

The gist is that `docker` manages individual containers while `docker-compose` manages multiple containers..

`docker.io` and `docker-compose` are separate packages.

Docker is the CLI managing individual containers while Docker Compose is a tool built on top of docker cli that can be used to manage multi-container applications.

With Docker Compose, you can define _stacks_ in _swarm mode_. And you do lots of shell scripting as well.

## Start docker automatically on boot

See if docker is added to start on system boot

```bash
systemctl list-units --type service | grep -i docker
```

If you don't get anything, enable it

```bash
sudo systemctl enable docker
```

https://docs.docker.com/engine/install/linux-postinstall/#configure-docker-to-start-on-boot
https://askubuntu.com/questions/912216/16-04-command-to-list-all-services-started-on-boot

## Restart docker containers with system restart

You need to specify a restart policy using the `--restart` flag.

```bash
docker run -d --restart unless-stopped foo
```

There are four policies

- `no` is default. doesn't restart any containers
- `on-failure` only restart container if the exit code indicates error instead of success.
- `always` will always restart all containers, even if you had manually stopped them
- `unless-stopped` will restart all containers, but not the ones you had manually stopped before

With Docker Compose, `restart` has been supported since version 2, and in version 3 you also get `restart_policy` but it only applies to swarms

```yml
version: '2'
services:
  web:
    image: apache
    restart: always
```

## Links

- [Overview of Docker Compose](https://docs.docker.com/compose/)
- [StackOverflow: What is the difference between docker and docker-compose](https://stackoverflow.com/a/37966689)
- [Start containers automatically](https://docs.docker.com/config/containers/start-containers-automatically/)
- [Ensuring Containers Are Always Running with Docker's Restart Policy](https://rollout.io/blog/ensuring-containers-are-always-running-with-dockers-restart-policy/)
- [StackOverflow: Docker-Compose Restart Policy](https://stackoverflow.com/a/42216597)
- [Compose file reference: restart](https://docs.docker.com/compose/compose-file/#restart)
- [Compose file reference: RESTART_POLICY](https://docs.docker.com/compose/compose-file/#restart_policy)
- [Configure Docker to start on boot](https://docs.docker.com/engine/install/linux-postinstall/#configure-docker-to-start-on-boot)
