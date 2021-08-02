---
title: Change forgotten Ubuntu password inside WSL 
date: 2021-07-26
slug: change-forgotten-password-wsl
---


- Open `cmd.exe` and run `ubuntu2004 config --default-user root`
- Now run Ubuntu 20.04 inside WSL and it'll run it as the `root` user
- Use `passwd USERNAME` to change the forgotten password while running Ubuntu as root

[source](https://winaero.com/reset-password-wsl-linux-distro-windows-10/)
