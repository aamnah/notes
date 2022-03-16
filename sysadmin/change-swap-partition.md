---
title: Change Swap partition in Ubuntu
slug: change-update-swap-partition-ubuntu
date: 2020-04-08
lastmod: 2022-01-01
---

- Create swap and turn it on
- add swap entry to fstab
- update grub `sudo gedit /etc/default/grub`
- update `sudo gedit /etc/initramfs-tools/conf.d/resume`
- you can get UUID with `sudo blkid`
- if you just update the `fstab` and not the `RESUME` values, it'll not boot on the next restart, will give an error about resume device.

```bash
# prepare your partitions
swapoff /dev/sda2
mkswap /dev/sda3
swapon /dev/sda3

# find swap uuid
sudo blkid | grep swap
# OR
sudo echo ls -l /dev/disk/by-uuid | grep sda3 |  cut -d' '  -f8 >> /etc/fstab

# edit swap entry in /etc/fstab
gksu gedit /etc/fstab

# edit the uuid line in /etc/initramfs-tools/conf.d/resume
gksu gedit /etc/initramfs-tools/conf.d/resume

# In terminal, execute this command
sudo update-initramfs -u
```

you can test your hibernation here, if it doesn't work:

```bash
# check your /etc/default/grub file
gksu gedit /etc/default/grub

# Depending on your version : if a line looks like
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash resume=UUID=<old_swap_partition_uuid>"
# then modify it accordingly; otherwise that's all, you're done

# execute in terminal
sudo update-grub
```

## Links

- [How do I change swap partition in Linux?](https://serverfault.com/a/837670)
- [How to set swap in /etc/initramfs-tools/conf.d/resume if I have two swap partitons?](https://askubuntu.com/questions/292878/how-to-set-swap-in-etc-initramfs-tools-conf-d-resume-if-i-have-two-swap-partito)
