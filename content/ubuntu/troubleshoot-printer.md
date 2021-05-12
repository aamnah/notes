---
title: Troubleshooting HP Printer on Ubuntu 2104
date: 2021-05-12
---

A fresh install of latest Ubuntu usually gives me some sort of printer issues. This time it would spend some time _Processing_ the _job_ and then _Stop_. This is what i did this time:

1. Install drivers

```bash
# install drivers
sudo apt install hplip
sudo apt install printer-driver-gutenprint
```

The `hplip` package (**HP**'s **L**inux **I**maging and **P**rinting software) is usually already installed on Ubuntu. I tried updating it by downloading and installing the latest from [HP Support](https://developers.hp.com/hp-linux-imaging-and-printing/gethplip) but it wouldn't [install](https://developers.hp.com/hp-linux-imaging-and-printing/install/install/index) as Ubuntu 21.04 wasn't supported and the dependencies won't install.

The other one `printer-driver-gutenprint` was mentioned [here](https://www.linuxbabe.com/ubuntu/set-up-cups-print-server-ubuntu-bonjour-ipp-samba-airprint) and it provides CUPS drivers for Canon, Epson, HP and compatible printers.

I think installing this `printer-driver-gutenprint` package did the trick.

2. Remove the Printer, and Add it again. Printing works now!
