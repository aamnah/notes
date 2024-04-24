---
title: Troubleshooting Bluetooth 5.4 dongle on Ubuntu Linux
date: 2024-02-27T17:59:56+02:00
uuid: 20240227175956
slug: troubleshooting-bluetooth-5.4-dongle-on-ubuntu-linux
draft: true
description: 
tags: 
---

Check if the device is detected

```bash
lsusb
# detaileed output
lsusb -v 

hcitool dev

```

- `lsusb` is a command to list USB devices
- `hcitool` is a command to configure bluetooth devices. `hcitool dev` will display local Bluetooth devices

- `dmesg` - print or control the kernel ring buffer
- `hciconfig` - Configure Bluetooth devices
- `rfkill` - tool for enabling and disabling wireless devices
- `lsmod` - Show the status of modules in the Linux Kernel

```bash
dmesg | egrep -i 'blue|firm'

hciconfig -a

sudo cat /sys/kernel/debug/usb/devices
sudo cat /sys/kernel/debug/usb/devices | grep Vendor=33fa
```


Bluetooth: hci0: Opcode 0x1005 failed: -110

-110 means timed out or firmware loading problem


Links
---

- https://simpleit.rocks/linux/shell/connect-to-bluetooth-from-cli/