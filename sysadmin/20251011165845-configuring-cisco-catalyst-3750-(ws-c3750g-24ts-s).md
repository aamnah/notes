---
title: Configuring Cisco Catalyst 3750 (WS-C3750G-24TS-S)
date: 2025-10-11T16:58:45+03:00
uuid: 20251011165845
slug: configuring-cisco-catalyst-3750-(ws-c3750g-24ts-s)
draft: true
description: 
tags: 
---

Connecting from Ubuntu

Connect the PC to the switch using a USB-to-RJ45 console cable. RJ45 goes to the back of the switch, USB goes to PC.

Check which serial device it appears as

```bash
sudo dmesg | grep tty
```

You should see something like

```
[ 1234.567890] usb 1-2: FTDI USB Serial Device converter now attached to ttyUSB0
```

Open a Terminal session

```bash
sudo apt install -y screen
sudo screen /dev/ttyUSB0 9600
```

If at this point you only see a blinking cursor, press ENTER a couple of times.

```
Switch>
```
