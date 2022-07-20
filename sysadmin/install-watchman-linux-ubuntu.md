---
title: Installing Watchman on Ubuntu Linux
date: 2022-07-20
slug: install-watchman-linux-ubuntu
---

Install with Homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

brew install watchman

watchman --version
```

Install from official binary

```bash
VERSION='v2022.07.18.00'
# Check what the latest version is from: https://github.com/facebook/watchman/releases/latest

wget https://github.com/facebook/watchman/archive/refs/tags/${VERSION}.zip

unzip watchman-${VERSION}-linux.zip
cd watchman-${VERSION}-linux

sudo mkdir -p /usr/local/{bin,lib} /usr/local/var/run/watchman
sudo cp bin/* /usr/local/bin
sudo cp lib/* /usr/local/lib
sudo chmod 755 /usr/local/bin/watchman
sudo chmod 2777 /usr/local/var/run/watchman

watchman --version
```


Links
---

- [Docs: Installation](https://facebook.github.io/watchman/docs/install.html)