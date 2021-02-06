---
title: Playing around with an Orange Pi+ 2
date: 2021-02-05
---

NOTES
---

- The SATA interface is pretty useless without a special SATA split cable that i'll have to order off of AliExpress
- The SATA interface is also not a _real_ SATA interface, more like a slow USB-to-SATA interface (SATA 2.0 - via GL830 USB-to-SATA bridge [ref](http://linux-sunxi.org/Xunlong_Orange_Pi_Plus_2)) like Banana Pi (which uses A20 SoC).
- Needs an adaptor with enough juice to be able to power the HDD (specially if they are USB powered). I'm using a 5V 3A adaptor.
- I'm using a 3.5" old school HDD (2TB) in a SATA casing and it comes with it's own power adaptor and on/off switch.


TODO
---

- [ ] Setup Git so i can write some code. Setup SSH keys for Github and Bitbucket
- [x] Setup NAS and share the files on Armbian over the network so that i can access easily files from other systems
- [x] Setup for running in _headless mode_ (Enable SSH and remote connections, setup file sharing, automate torrent downloads etc.)
- [x] Catalogue the Orange Pi Plus 2 hardware details. (So that i don't have to keep checking and so that i still have these details if/when the board gets forgotten online)
- [x] set up static IP


### Installing and Upgrading Armbian
Installation had already been done the last time i set it up. This time i booted straight into the Armbian desktop. I can't remember excatly why i chose Armbian over Debian/Ubuntu. Possibly because a reliable Ubuntu/Debian image for Orange Pi Plus 2 wasn't available at that time, or maybe because Armbian is supposed to have better support for ARM based devices.

I had also gone a step further and moved the OS from SD Card to built in eMMC storage (~16GB)

```bash
# python -mplatform
Linux-3.13.0-68-generic-x86_64-with-Ubuntu-14.04-trusty
```

I updated the system with

```bash
sudo apt update
sudo apt upgrade
```

As of this writing the latest [Ubuntu LTS version](https://wiki.ubuntu.com/Releases) is 20.04 (Focal Fossa) and Armbian Focal for Orange Pi+ 2 was released on 21-02-1.

The usual `sudo apt dist-upgrade` didn't work. What works is running `sudo armbian-config` and then going to _System > Other (Switch to other kernels)_ and then selecting the latest.



### Fake SATA?
Don't expect 6GB/sec. Expect a max ~30 MB/sec. The _SATA_ is actually achieved with a USB2.0-to-SATA bridge, so you'd get USB 2.0 speeds. Apparently you get more speed if you connect it to one of the USB ports as compared to connecting it over the SATA port. On the USB port i got around 5-11 MB/s ..

- [source 1 - Xunlong Orange Pi Plus 2](http://linux-sunxi.org/Xunlong_Orange_Pi_Plus_2)
- [source 2 - orange pi plus sata hdd copy speed is too slow](http://www.orangepi.org/orangepibbsen/forum.php?mod=viewthread&tid=286&highlight=orange%2Bpi%2Bplus%2Bsata)

### Setting up a NAS

Run the following commands before and after connecting your hard drive to figure out which one you need to mount.

```bash
# get device UUIDs
sudo blkid

# find out partition names
cat /proc/partitions
```

### setting up for NTFS and EXT4 drives

```bash
# install tools
sudo apt-get install fuse ntfs-3g

# create mount points
sudo mkdir /media/aamnah/NAS /media/aamnah/STUFF

# mount drive
sudo mount -t ext4 /dev/sda1 /media/aamnah/NAS
sudo mount -t ntfs-3g /dev/sdc1 /media/aamnah/STUFF
```

### share the drive over network

```bash
sudo apt install samba

sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.bak
sudo nano /etc/samba/smb.conf
```

#### Edit `smb.conf` file


i tried to make the extrenal drive called NAS publicly accessible without having to provide a password, but it didn't work. some articles mentioned changing user to `nobody` and changing pemissions to `777` (actually change owner and perms for the drive itself), but that did nothing. kept getting the _you do not have permission_ error..

```
[nas-test]
path = /media/aamnah/NAS
public = yes
writable = yes
browsable = yes
read only = no
;guest ok = yes
;guest only = yes
;guest account = nobody
create mask = 0777
directory mask = 0777
```

what did work was providing `force user = aamnah`. (my username is `aamnah` on both devices) i am able to access from Windows and browse as well as create files inside this shared drive. it did not ask me for a password

```
[NAS]
path = /media/aamnah/NAS
writable = yes
public = yes
force user = aamnah
```


#### Access the drive from Windows

Open _File Explorer_. Right click on _This PC_ in the sidebar and select _Add a network location_.

```
\\192.168.111.100/NAS
```

#### Access the drive from macOS

_Files > Go > _

`Cmd` + `K` is the shortcut.


### Set up static IP
i configured one from the router but that didn't seem to work. Pi+ 2 rebooted with a different IP address than the one it was assigned. In the `/etc/network/interfaces` file `eth0` was set to DHCP. I'm not sure if that is supposed to cause the router settings not take effect?

```bash
sudo cp /etc/network/interfaces /etc/network/interfaces.bak
sudo nano /etc/network/interfaces
```

```
# Ethernet adapter 0 - static
auto eth0
allow-hotplug eth0
#no-auto-down eth0
iface eth0 inet static
address 192.168.111.100
netmask 255.255.255.0
gateway 192.168.111.1
dns-nameservers 8.8.8.8 8.8.4.4
#dns-nameservers 192.168.111.1
```

Links
---

- [Orange Pi Plus2](http://www.orangepi.org/orangepiplus2/)
- [Armbian for Orange Pi+ 2](https://www.armbian.com/orange-pi-plus-2/)
- [How to set a Static IP on Armbian](https://www.albertogonzalez.net/how-to-set-a-static-ip-on-armbian/)
- [](https://amazingrando.wordpress.com/2007/06/03/share-folders-via-samba-without-a-password-easy/)
- [How to connect to Linux Samba shares from Windows 10](https://www.techrepublic.com/article/how-to-connect-to-linux-samba-shares-from-windows-10/)