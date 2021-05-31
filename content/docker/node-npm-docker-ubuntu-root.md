---
title: Installing Node inside Docker Ubuntu and installing npm packages globally as root
date: 2021-05-30
slug: node-npm-docker-ubuntu-root
tags:
  - Expo
---

```dockerfile
FROM ubuntu:21.04

LABEL description="Install Node with nvm"

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

# Install npm packages and tooling
# RUN npm i -g --unsafe-perm expo-cli turtle-cli
# RUN npm i -g netlify-cli appcenter-cli firebase-tools

CMD bash
```

### Installing packages globally

If you are installing packages _globally_ as the _root_ user, you get the `EACCES: permission denied` error. Which is why [it is recommended](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) that you install node with a version manager, like `nvm`. (Or manually change the default directory for `npm`)

### Running Node as `root` user

While installing with `nvm` is commonly accepted as the solution to `sudo` and `root` problems, it still didn't work for me when installing certain packages globally (e.g. `expo-cli`, `turtle-cli`). For packages like these, it is usually a [postinstall script that check/fix permission](https://github.com/nvm-sh/nvm/issues/1407#issuecomment-284203762) since `npm` runs postinstall scripts as user `nobody` for safety (and not `root`).

(`nobody` is the default user for `npm` while the default user for a docker container is `root`). In situations like these, where you want to install packages as `root`, you can install a particular package with the `--unsafe-perm` flag.

When installing packages globally as `root`, you'll get a bunch of `sh: 1: node: Permission denied` errors and will have to use flags like `--unsafe-perm=true` and `--allow-root` to get rid of them

```
npm config set user 0
npm config set unsafe-perm true
```

- `unsafe-perm` - Set to true to suppress the UID/GID switching when running package scripts. If set explicitly to false, then installing as a non-root user will fail. Default is `false` if running as `root`, and `true` otherwise
- `--unsafe-perm` is always `true` unless using `root`
- `user` - The UID to set to when running package scripts as root. default is `nobody`
- `0` is always the UID of `root` user

You can pass these config values as flag by adding a `--` to the beginning. If you don't pass it a value, it becomes `true`. `--unsafe-perm` is the same as `--unsafe-perm true` is the same as `--unsafe-perm=true`

You can do it on a per install command basis

```bash
npm i -g --unsafe-perm --allow-root expo-cli
```

Or you can set it for the entire script/container (which is not recommended)

```bash
npm config set user 0
npm config set unsafe-perm true
npm i -g expo-cli
```

While most online answers will include the `--allow-root` flag (or `npm config set user 0`), i went the `ENV NPM_CONFIG_USER=root` route where i set the npm user for the entire Dockerfile

```dockerfile
ENV NPM_CONFIG_USER=root
```

In the end, i don't quite see the benefit of installing via nvm since i ended up using these flags anyway and installing packages globally was a troubling experience.

### Adding Node to $PATH

If after installing node with nvm you got `/bin/sh: 1: node: not found` on the next step, you need to add node to `$PATH` so that it knows where to run node from

```bash
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
```

### Issues with sourcing ~/.bashrc

`source ~/.bashrc` did not work as expected inside the docker container. Something to do with Docker using `/bin/sh` instead of `/bin/bash`. You can change the shell inside the Dockerfile with `SHELL ["/bin/bash", "-c"]` or run a particular command in a different shell with `RUN ["/bin/bash", "-c", "echo hello all in one string"]`, but neither worked for me when sourcing `~/.bashrc` after having installed `nvm`. In the end i looked at the [manual installation steps](https://github.com/nvm-sh/nvm#manual-install) to see what nvm was adding to bashrc (setting `NVM_DIR` and then calling a script inside `NVM_DIR` called `nvm.sh`) and referenced that particular bit directly inside the command (instead of adding it to bashrc). I'm cool with it since i don't expect to be using `nvm` lots of time inside the container. It's pretty much a one-time thing to install a particular node version. The only reason i installed with nvm was to get rid of `root` user woes.

## Links

- [sh: 1: node: Permission denied](https://stackoverflow.com/a/53270214/890814)
- [Resolving EACCES permissions errors when installing packages globally](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)
- [npm config: unsafe-perm](https://docs.npmjs.com/cli/v6/using-npm/config#unsafe-perm)
- [npm config: user](https://docs.npmjs.com/cli/v6/using-npm/config#user)
- [What does unsafe-perm in npm actually do?](https://geedew.com/What-does-unsafe-perm-in-npm-actually-do/)
- [What is the drawback of install with --unsafe-perm](https://github.com/strongloop/strong-pm/issues/334#issuecomment-203638235)
- [Dockerfile Reference: SHELL](https://docs.docker.com/engine/reference/builder/#shell)
- [How to make builder RUN use /bin/bash instead of /bin/sh](https://github.com/moby/moby/issues/7281#issuecomment-389440503)
