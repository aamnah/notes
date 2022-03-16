---
title: Docker basics
date: 2021-03-28
lastmod: 2021-08-04
draft: true
slug: docker-basics
---

## Docker

- in the Dockerfile, do i run commands as `sudo` or am i the root user? This depends on the image/container. Some images have default user as `root`. Some have other users (for example zerossl/client runs as `ssl` user and not `root`)
- what are the commands i can add to the `Dockerfile`?
- Docker cheat sheet?

```
docker run -d -p 80:80 docker/getting-started
```

- the first `80` is the port on you local machine and the second `80` is the port inside the container
- it download the image from Docker Hub if it is unable to find it locally (originally you had to clone a git repo, change to the folder and build the image)
- by default it assigns the container a random name (e.g. `stupefied_tesla`..). you can pass a custom name with the `--name` flag

```bash
docker ps -a
docker stop 123
docker rm 123
```

## Dockerfile

Here's a basic Dockerfile with required minimum

```dockerfile
FROM node:alpine
LABEL author="Aamnah"
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /var/www
COPY . .
RUN npm install

# we're gonna use the PORT we defined earlier as an env var
EXPOSE ${PORT}
ENTRYPOINT [ "node", "server.js" ]
```

- `FROM` is the base image to build on
- `LABEL author="Aamnah"`. You can have as many labels as you want, this is basically metadata
- `ENV` sets environment variables. if you want to set multiple, just add multiple `ENV` lines
- `WORKDIR` the base directory to start from
- `COPY` copy in setting files, code etc.
- `RUN` runs a command
- `EXPOSE` is for the ports you want to listen on

## Ignore certain files/folders when copying

That's what the `.dockerignore` file is for

```dockerfile
# .dockerignore
node_modules
```

## Build an image

```bash
# use the default Dockerfile
docker build -t nodeapp .

# pass a custom docker config file
docker build -t nodeapp:1.0 -f node-dockerfile .

docker build -t <registry>/<name>:<tag> .
```

- `docker images` to list images
- `docker rmi <imageId>` to remove an image
- images are immutable. you can not update an existing one, but you can create a new one and bump the version. Images are differentiated by their `tag`s

## Deploy to/from Docker Hub

```bash
docker login
# if you have enabled 2FA, you'll need a token

# Deploy an image to Docker Hub
docker push <username>/<image name>:<tag>
docker pull <username>/<image name>:<tag>
```

## Layers

Every `RUN` command is a layer, it adds to the size of the image. For example:

```dockerfile
FROM ubuntu:14.04

RUN apt-get update -y && \
    apt-get install -y curl postgresql postgresql-client && \
    rm -rf /var/lib/apt/lists/*

CMD bash
```

will be smaller than

```dockerfile
FROM ubuntu:14.04

RUN apt-get update -y

# Install packages
RUN apt-get install -y curl
RUN apt-get install -y postgresql
RUN apt-get install -y postgresql-client

# Remove apt cache to make the image smaller
RUN rm -rf /var/lib/apt/lists/*

CMD bash
```

You can check the breakdown of how long a command took and how much it added to the size with `docker history my-image`

## Troubleshooting

```
docker: Error response from daemon: Ports are not available: listen tcp 0.0.0.0:80: bind: An attempt was made to access a socket in a way forbidden by its access permissions.
```

You get this error when the port you are trying to run on is unavailable. In my case, `80` was taken by IIS. You can check what's running on the port by viewing it in the browser by going to `localhost` (for `80`) or `localhost:1234` (for custom ports)

## Links

- [Lightweight Docker Images in 5 Steps](https://semaphoreci.com/blog/2016/12/13/lightweight-docker-images-in-5-steps.html)
