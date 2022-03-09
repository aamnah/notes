---
title: Creating a Docker image for standalone builds of Expo based React Native apps
date: 2021-05-31
draft: true
slug: docker-expo-turtle-android
---

The final image is pushed to [Docker Hub]()

Every `RUN` command [starts a new subcontainer](https://gist.github.com/thaJeztah/e6f00c7ef51897358103e1496f572ae1)
But if i do it in Layers, it caches them and re-uses layers when building new images

```bash
DEBIAN_FRONTEND=noninteractive apt-get install -y tzdata
```

installs the `tzdata` package in a non-interactive way with the default timezone as `UTC`

# Node

We need to install Node 14 (with npm 6) instead of the latest Node 16 (with npm 7), because installing `turtle-cli` with `npm 7` fails to install with error `ERESOLVE unable to resolve dependency tree`.

```
npm ERR! ERESOLVE unable to resolve dependency tree
```

You can either use `npm 7` with the `--legacy-peer-deps` flag, which tells NPM to ignore peer deps and proceed with the installation anyway.

```bash
npm install --save --legacy-peer-deps
```

OR you can downgrade to `npm 6` which is a sure way for it to work.

Installing with a node version manager like NVM is [officially recommended](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) because it avoids `EACCES` errors. But we're still going to get permission errors when installing `expo-cli` and `turtle-cli` as you'll see in a bit.

```dockerfile
# Install Node with nvm
ARG NODE_VERSION=14.17.0
ENV NPM_CONFIG_USER=root
ENV NVM_DIR=/root/.nvm
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash  \
    && . ${NVM_DIR}/nvm.sh \
    && . ${NVM_DIR}/bash_completion \
    && echo "\n npm version is: $(npm -v)" \
    && echo "\n Node version is: $(node -v)"
```

- `NODE_VERSION` is automatically picked by the nvm install script, you don't have to explicitly pass that value, you just need to define it.
- `NVM_DIR` again is picked automatically by the nvm install script. You can specify a custom install directory by setting this value. Must not have a trailing slash. Default is `${HOME}/.nvm`
- `NPM_CONFIG_USER` needs to be set because `expo-cli` and `turtle-cli` would complain about permissions without it.
- `PATH` needs to be updated, otherwise you'll get `node: not found`

when installing `nvm`, `source ~/.bashrc` doesn't work saying `/bin/sh: 1: source: not found` so you have to do the following instead

```bash
RUN ["/bin/bash", "-c", "source ~/.bashrc"]
```

which is running the command with Bash shell `/bin/bash` instead of the default shell on Docker `/bin/sh`. Doing so didn't work in my case.

Lastly, make sure Node is added to the `$PATH`, otherwise you'll get `/bin/sh: 1: node: not found`

```bash
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
```

# Turtle and Expo

Turtle needs `JDK 8`, `Python` (needed by `node-gyp` during the install, `python3` works), `npm 6`, and more than 1GB in RAM to install. How much RAM needed exactly? I'm not sure, i just know it maxes out 1GB.

### Permissions

without `--unsafe-perm` when installing `turtle-cli`, get ready for a barrage of `EACCES: permission denied` errors

Installing Node with nvm takes care of the `Eaccess` error headache and you no longer have to use `--unsafe-perm=true` and `--allow-root` flags when install npm packages

```
sh: 1: node: Permission denied
sh: 1: node-gyp: Permission denied
```

```bash
# the error you get when installing global packages as root user
EACCES: permission denied
```

### Python

For starters, i didn't expect that a node package would require Python. Then i assumed that it would be there already since it is usually pre-installed on Ubuntu..

I was greeted with this:

```
gyp ERR! find Python
gyp ERR! find Python Python is not set from command line or npm configuration
gyp ERR! find Python Python is not set from environment variable PYTHON
```

`turtle-cli` / `node-gyp` expects Python to be installed and in `$PATH`. Ubuntu Docker doesn't come with Python pre-installed, so we have to add the install to the Dockerfile.

```bash
apt install python3
```

I know `python3` will work because `node-gyp` actually tries and looks for _any_ python, be it `python`, `python2` or `python3`. You don't have to manually update the $PATH, install takes care of it.

### Memory usage and code 137

```
The command '/bin/sh -c npm i -g --unsafe-perm expo-cli turtle-cli' returned a non-zero code: 137
```

Code `137` means it ran out of memory while building. I was doing this on a 1GB droplet on DigitalOcean, and it kept maxing out on memory (and CPU!) when it came to install `turtle-cli`. Same for when i was installing `turtle-cli` inside a pipeline in Bitbucket. As a matter of fact, running out of memory in the pipeline was the reason i wanted to create my own base image in the first place.

So, instead of a VM, i ran the build on my local machine (M1 MacBook Pro, 16GB) and it built successfully.

It is a bummer though, that i must have a bigger VM just so i could build the image.

Installing `expo-cli` and `turtle-cli` has been a disappointing experience so far. You get so many _deprecated warnings_ during the install that the screen goes red with it. Then you get all sorts of _permission errors_ for postinstall scripts and such, and then after running for close to half an hour (because `npm install` is very slow in Docker, not sure why yet) it fails with a `137`. Oh, and you need `npm 6` to do it, fails install with `npm 7`

Installing an `npm` package seemed the simplest thing in the entire dockerfile, but i guess it depends on the _package_ you are installing.

## Links

- [nvm](https://github.com/nvm-sh/nvm)
- [Unable to resolve dependency tree error when installing npm packages](https://stackoverflow.com/a/65348395/890814)
- [Permission problems when trying to install package globally](https://github.com/nodejs/docker-node/issues/603)
