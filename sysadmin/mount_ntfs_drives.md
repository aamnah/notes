---
title: Mount NTFS drives in Linux
date: 2018-12-10
---

```bash
# install ntfs-3g
# on Ubuntu 18.04 ntfs-3g is already installed
sudo apt update && sudo apt install -y ntfs-3g

# create a mount point for the drive ( /home/username/media/EXTRA )
mkdir -p ${HOME}/media/EXTRA

# identify the NTFS drive
# sudo fdisk -l | grep NTFS
# lsblk -f
blkid

# mount the drive ( /dev/sdb1 )
sudo mount -t ntfs-3g /dev/sdb1 ${HOME}/media/EXTRA
```

Make it permanent by editing `/etc/fstab`. Keeping the mount point inside `$HOME` simplifies permissions


```bash
# identify the UUID of the drive ( 269E88799E8842F3 )
ls -l /dev/disk/by-uuid/

# edit /etc/fstab
sudo nano /etc/fstab
```

```
UUID=269E88799E8842F3 /home/aamnah/media/EXTRA ntfs-3g defaults 0 0
```

Run `mount -av` afterwards to remount your drives.

### get a drive's UUID


```bash
ls -l /dev/disk/by-uuid/
```

```
total 0
lrwxrwxrwx 1 root root 10 Dec 10 12:17 269E88799E8842F3 -> ../../sdb1
lrwxrwxrwx 1 root root 10 Dec 10 12:17 8E8015EA8015D993 -> ../../sda4
lrwxrwxrwx 1 root root 10 Dec 10 12:17 a93aa8af-ff03-417f-8682-44bf488469b5 -> ../../sda5
lrwxrwxrwx 1 root root 10 Dec 10 12:17 c26182a4-a9fa-4534-899b-95f369b0e556 -> ../../sda1
lrwxrwxrwx 1 root root 10 Dec 10 12:17 C8C0E236C0E22B00 -> ../../sda3
lrwxrwxrwx 1 root root 10 Dec 10 12:17 d6d1e3b5-23a7-4126-b352-ea85c593b13a -> ../../sda6
```


### Where to mount?

- I prefer cerating the mount point inside `$HOME` to avoid all the permission issues
- `/media` is where the system auto-mounts removable media, for example: CD ROM, USB flash drives etc. 
- `/mnt` is for manually (and temporarily) mounting filesystems
- Nautilus shows media mounted in `/media` in the left sidebar but nothing that has been mounted in `/mnt`
- Since both `/media` and `/mnt` are owned by root, any mount points (folders created inside it) will also be owned by root. You can either change the folder ownership or you can move the mount point inside your `$HOME` folder.
- `chown -R $USER:$USER /your/mount/location`

### Permission issues
I have had scenarios where i was unable to create any files inside the mounted drives. The `defaults` option includes `nouser` option, which means only root user can mount the filesystem. This becomes an issue because you will not be able to create any folders inside the mounted filesystem as a non-root user. Any folder created inside `/media` or `/mnt` will also be owned by `root` by default.

Note that `defaults` and `user` **do NOT change ownership**—they only set general mount behavior.

Only FAT/exFAT/NTFS drives support `uid`, `gid`, `umask` etc. options

```bash
# mount an NTFS drive as a specific user
UUID=122345678912345678 /home/aamnah/media/NAS ntfs-3g defaults,uid=1000,gid=1000 0 2
```

- `uid=1000,gid=1000` assigns the mount to your user (use `id -u`/`echo $UID` and `id -g` to get your values).
- `dmask=027` sets directory permissions (`755` equivalent).
- `fmask=137` sets file permissions (`640` equivalent).

If your mount location is inside `$HOME` and you're still getting permission issues, it is likely that your mount location is owned by root. While `defaults` and `user` options changes mount behavior, they do not change the ownership of the mount location. 

```bash
# check ownership of the mount location
ls -ld /home/aamnah/media/mountpoint

# make current user owner of the mount location
sudo chown -R $USER:$USER /home/aamnah/media/mountpoint
```

Unlike NTFS or FAT32, **EXT4 retains file ownership and permissions across mounts**. If one partition was formatted or previously used with a different user, it may retain root ownership. I had this happen on a freshly formatted ext4 drive, where the mount point was inside `$HOME` and i expected it to mount drives as a normal user. Changing ownership of the mount location fixed permissions.

Links
---

- [Fstab](https://help.ubuntu.com/community/Fstab)
- [mount](https://manpages.ubuntu.com/manpages/oracular/en/man8/mount.8.html)

