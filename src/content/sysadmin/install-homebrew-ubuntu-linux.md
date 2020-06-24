---
title: Install Homebrew on Ubuntu 20.04
date: 2020-06-24
---

### install

**Homebrew** now works on Linux!

```bash
# install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

will take some time installing core taps, around ~322mb in downloads..

### post install

```bash
# Install the Homebrew dependencies if you have sudo access
sudo apt-get install build-essential

# Configure Homebrew in your ~/.profile
echo 'eval $(/home/linuxbrew/.linuxbrew/bin/brew shellenv)' >> ${HOME}/.profile

# Add Homebrew to your PATH
eval $(/home/linuxbrew/.linuxbrew/bin/brew shellenv)

# install GCC (recommended)
brew install gcc
```
