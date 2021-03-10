---
title: Setting up an Orange Pi+ 2 for web development
date: 2021-02-05
---

- As of September 2020 (version 1.50) [VS Code is available for ARMv7 and ARM64](https://code.visualstudio.com/updates/v1_50#_linux-arm-builds). Orange Pi+ 2 is ARMV7
- On the latest Armbian (Focal) for OrangePi Plus2, `snap` is already installed since it is based on Ubuntu 20.04.
- You can NOT use `snap` to install VS Code, it's available for `amd64`, but not `armhf` which OrangePi Plus2 is..
- Node ``

# VS Code
[Download](https://code.visualstudio.com/#alt-downloads) `.deb` file for ARM

Install with `dpkg`

```bash
sudo dpkg -i ~/Downloads/code_1.53.0-1612367698_armhf.deb
```

It is very slow though. 2GB RAM on Armbian is obviously way too low to be running VS Code. I installed it just because i could. You'll defintely notic the lag though. Geany is much faster, but Geany is not VS Code.

# Setup OrangePi for VS Code Remote Development
You need to have configured:

- a static IP for OrangePi
- SSH on OrangePi
- an SSH key (optional) for password-less connections. If no key, VS Code will just prompt you for password when you start a connection

I updated my `.ssh/config` file and added my OrangePi as a host.

```bash
# NAS - OrangePi Plus2
Host nas
  HostName 192.168.111.100
  User aamnah
  Port 22
  IdentityFile ~/.ssh/panda
```