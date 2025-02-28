---
title: Install VNC server on Armbian
date: 2025-02-28T15:47:51+02:00
uuid: 20250228154751
slug: install-vnc-server-on-armbian
draft: false
description:
tags:
---

[x11vnc](https://github.com/LibVNC/x11vnc) is a VNC server for **real** X displays (i.e. a display corresponding to a physical monitor, keyboard, and mouse).

I needed this to remotely make changes to an Orange Pi which was connected to a physical monitor. The monitor serves as my dashboard and has a bunch of widgets showing like a binary clock, todo items and so on..

```bash
# install
sudo apt install x11vnc

# Set a password
x11vnc -setpasswd

# run
x11vnc

# this will run x11vnc on port 5900
# you can now view and control the server from a vnc client
# e.g. Remmina is pre-installed on Ubuntu
# 192.168.0.X:5900
```

```bash
# keep running
x11vnc -forever
```

If you set x11vnc to start at boot, it'll start working before you have even logged in.

```bash
# start at boot
sudo nano /lib/systemd/system/x11vnc.service
```

```conf
[Unit]
Description="x11vnc"
Requires=display-manager.service
After=display-manager.service

[Service]
ExecStart=/usr/bin/x11vnc -auth guess -loop -forever -shared -o /var/log/x11vnc.log
ExecStop=/usr/bin/killall x11vnc

[Install]
WantedBy=multi-user.target
```

## Links

- https://github.com/LibVNC/x11vnc
- https://www.youtube.com/watch?v=d6X4Z-DjO1E
