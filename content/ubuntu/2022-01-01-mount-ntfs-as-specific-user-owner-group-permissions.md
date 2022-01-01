---
date: 2022-01-01
title: Mount an NTFS partition on Ubuntu with specific owner, group and permissions
---

Mount an NTFS partition on Ubuntu with a specific `owner` and `group`. (Otherwise it'll mount it as `root`, which makes sharing the fs on samba a bit difficult, you get permission errors when trying to connect from a mac)

> NTFS doesn't support Unix-style 'owners', so the Linux kernel is forced to assign an owner for the entire volume - normally, root. As an alternative to moving your entire home directory to EXT4, you could also give ownership of the entire partition to a specific user or group using the 'uid' or 'gid' options for `mount` (or in `fstab`).

Find `uid` and `gid`

```bash
# get details for the current user
id
# get UID only
id -u username
# get GID only
id -g username
```

```
uid=1000(aamnah) gid=1000(aamnah) groups=1000(aamnah),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),116(lpadmin),126(sambashare),128(kvm),130(libvirt),138(docker)
```

The `uid` and `gid` in this case is `1000`

Edit your `/etc/fstab` entry to add _options_ to the mount command

```bash
sudo nano /etc/fstab
```

```
UUID=009AD0155091CC5F /media/aamnah/Files ntfs-3g defaults 0 0
```

would become

```
UUID=009AD0155091CC5F /media/aamnah/Files ntfs-3g
defaults,uid=1000,gid=1000,umask=022 0 0
```

- `uid=1000` is the user id.
- `gid=1000` is the group id.
- `umask=022` this will set permissions so that the owner has read, write, execute. Group and Others will have read and execute.

And then unmount and remount the file system for the changes to take effect (For some reason, this didn't work when i did it via gparted GUI, but the text commands worked)

```bash
umount /media/Files
mount  /media/Files
```

## Links

- [Automatically mount a drive using /etc/fstab, and limiting access to all users of a specific group](https://unix.stackexchange.com/questions/204641/automatically-mount-a-drive-using-etc-fstab-and-limiting-access-to-all-users-o)
- [Root Owns Home Directory, chown does not work](https://askubuntu.com/questions/350580/root-owns-home-directory-chown-does-not-work)]
