---
title: RTL8188GU - Realtek Bluetooth 5 + Wifi AC600 WiFi dongle linux drivers
date: 2024-03-24T13:47:20+02:00
lastmod: 2024-04-24
uuid: 20240324134720
slug: rtl8188gu-realtek-bluetooth-wifi-dongle-linux-drivers
draft: true
description: 
tags: 
---

I bought a cheap wifi+bluetooth dongle from AliExpress that works plug and play on Windows but has no linux drivers and wouldn't work on Ubuntu. 

The issue was resolved by installing the drivers from the unofficial [kablosuz][kablosuz] PPA for realtek drivers

Get details about the USB dongle with `lsusb`. We can see that the Realtek WLAN Adapter is detected

```bash
lsusb
```

```
Bus 001 Device 002: ID 0bda:1a2b Realtek Semiconductor Corp. RTL8188GU 802.11n WLAN Adapter (Driver CDROM Mode)
```

Note the following: 
Vendor ID is: `0bda`
Product ID is: `1a2b`
Version of the chip is: `RTL8188GU`


Add the repo and install the relevant driver

```bash
sudo add-apt-repository ppa:kelebek333/
sudo aapt update
sudo apt install rtl8188gu-dkms
```

We'll use the unofficial PPA for Realtek WiFi drivers [kablosuz][kablosuz]. If you installed your system in UEFI mode, you must disable secureboot for modules installed by dkms after installation.

You can check installation mode with following command.

```bash
[ -d /sys/firmware/efi ] && echo "EFI" || echo "BIOS"
```

You can check status of secureboot with following command.

```bash
mokutil --sb-state
```

### Troubleshooting

After installing the driver and rebooting, i had two issues:
- the dongle was still connected in CDROM mode
- after some time when the dongle automatically switched mode, it could not connect to any of my wifi network, error: _Activation of network connection failed_


#### Fixing USB device mode

Changing the mode was relatively easy, you can use `usb_modeswitch` for that. `usb_modeswitch` controls the mode of 'multi-state' USB devices.

```bash
sudo usb_modeswitch -KW -v 0bda -p 1a2b
```

- `-v` is for Vendor ID
- `-p` is for Product ID
- `-K` is for eject
- `-W` is for verbose

Use `lsusb` to check if the mode has changed. You may have to remove the dongle and insert it again for it to change mode.

For the WiFI, i could not figure out a solution and was not motivated enough to waste hours when there were easy alternatives available to me (ethernet cable, another wifi adapter)

```bash
# Driver CDROM Mode
Bus 001 Device 002: ID 0bda:1a2b Realtek Semiconductor Corp. RTL8188GU 802.11n WLAN Adapter (Driver CDROM Mode)
```

```bash
# WiFi AC 
Bus 001 Device 004: ID 0bda:c820 Realtek Semiconductor Corp. 802.11ac NIC
```

To automate this, so that it is also run on startup, you can create a `systemd` service to run the command on startup

```bash
sudo nano /etc/systemd/system/modeswitch_bluetooth_dongle.service
```

```conf
[Unit]
Description=Script to make sure usb mode is switched automatically every time we restart
After=network.target
[Service]
ExecStart=/sr/bin/sh -c 'usb_modeswitch -KW -v 0bda -p 1a2b'
[Install]
WantedBy=default.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable modeswitch_bluetooth_dongle.service
sudo systemctl start modeswitch_bluetooth_dongle.service
```


ALTERNATIVELY, you can edit `usb_modeswitch.rules`. Did not work for me when i inserted the dongle again.


```bash
sudo nano /lib/udev/rules.d/40-usb_modeswitch.rules
```

Add the follolwing at the end of the file, before the line `LABEL="modeswitch_rules_end"`

```bash
# /lib/udev/rules.d/40-usb_modeswitch.rules
# Realtek Wifi AC + Bluetooth USB adapter
ATTR{idVendor}=="0bda", ATTR{idProduct}=="1a2b", RUN+="/usr/sbin/usb_modeswitch -K -v 0bda -p 1a2b"
```


sudo nano /etc/usb_modeswitch.d/0bda:1a2b

```bash
# /etc/usb_modeswitch.d/
# Realtek Wifi AC + Bluetooth USB adapter 
# Prevent it from being loaded in CD ROM mode 
TargetVendor=0x0bda
TargetProductList="1a2b"
StandardEject=1
```

At this point, I have limited functionality. The Bluetooth works but WiFi is not working.

Solution 2: Use [a different driver](https://github.com/search?q=rtl8188gu&type=repositories), i'm considering the one from [lwfinger](https://github.com/lwfinger/rtl8188gu)


usb_modeswitch - control the mode of 'multi-state' USB devices

systemctl --all | grep usb_modeswitch


Solution 1: re-install linux headers (didn't work)

sudo apt install --reinstall linux-headers-$(uname -r)
sudo reboot

> Linux headers are declarations of a programming interface needed to interface with Linux kernel. In short, if you have a program that talks with the kernel, to build that program, you need those files.1

Links
---

- [kablosuz-wireless][kablosuz]
- [Help installing driver of RTL8188GU USB wifi adapter](https://www.reddit.com/r/linuxmint/comments/14h2jqo/help_installing_driver_of_rtl8188gu_usb_wifi/)

[kablosuz]: https://launchpad.net/~kelebek333/+archive/ubuntu/kablosuz

- [](https://play.datalude.com/blog/2022/08/rtl8188-adapter-upgrade-hell/)