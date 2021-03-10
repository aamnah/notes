---
title: Change Swap partition in Ubuntu
path: change-update-swap-partition-ubuntu
status: draft
date: 2020-04-08
---

- Create swap and turn it on
- add swap entry to fstab
- update grub `sudo gedit /etc/default/grub`
- update `sudo gedit /etc/initramfs-tools/conf.d/resume`
- you can get UUID with `sudo blkid`
- if you just update the `fstab` and not the `RESUME` values, it'll not boot on the next restart, will give an error about resume device.

https://docs.alfresco.com/3.4/tasks/swap-space-lin.html

https://askubuntu.com/questions/292878/how-to-set-swap-in-etc-initramfs-tools-conf-d-resume-if-i-have-two-swap-partito
