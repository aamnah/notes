---
title: Orange Pi NAS
date: 2021-02-05
---

Connect hard drives over USB
- Set up drives to auto-mount on system boot
- Share the drives over the WiFi network

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

edit `fstab` to auto-mount drives

```bash
sudo nano /etc/fstab
```

```
LABEL="NAS"   UUID="94638681-0f6b-46c1-9207-c02a702c72cd"   /media/aamnah/NAS        ext4  defaults 0 0
LABEL="STUFF" UUID="7C011EE7317A299E"                       /media/aamnah/STUFF   ntfs-3g  defaults 0 0
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



Links
---
- [AliExpress: SATA line for Orange Pi](https://www.aliexpress.com/i/32248261533.html)
- [AliExpress: Raspberry Pi Enhance Version Cubieboard SATA Power Cable](https://www.aliexpress.com/item/2028995952.html?spm=2114.32010308.4.20.oXhpii)
- [AliExpress: Hard Disk Cable for Banana Pi M1/M3/Orange Pi SATA Cable with Power Supply terminals for Orange pi plus 2](https://www.aliexpress.com/i/32731210737.html)