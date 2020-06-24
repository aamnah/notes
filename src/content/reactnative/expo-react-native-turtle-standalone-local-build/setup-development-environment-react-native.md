---
title: Setting up React Native development environment on Linux Ubuntu 20.04
date: 2020-06-24
slug: setup-development-environment-react-native
---

Checklist

- [ ] Install Node
- [ ] Install JDK
- [ ] Install Watchman (optional)
- [ ] Install Android Studio
- [ ] Install Android SDK
- [ ] Configure Android environment variables
- [ ] Setup physical Android device

### Node

```bash
# install nvm (Node Version Manager)
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

restart the Terminal now so that the `nvm` command is available

```bash
# install latest Node LTS with nvm
nvm install --lts
```

### Java Development Kit (JDK)

```bash
# install JDK version 8
sudo apt install -y openjdk-8-jdk-headless openjdk-8-jre
```

### Watchman

**Homebrew** now works on Linux!

```bash
# install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

will take some time installing core taps, around ~322mb in downloads..

Now, install Watchman with Homebrew

```bash
# install latest build from Github
brew install --HEAD watchman
```

## Links

- [Setting up the development environment](https://reactnative.dev/docs/environment-setup)
- [Running On Device](https://reactnative.dev/docs/running-on-device)
