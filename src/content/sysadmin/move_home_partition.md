---
title: Move Ubuntu `/home` partition to another one
slug: move_home_partition
date: 2020-08-02
---

1. Create a new partition in `ext4` format
2. Trasnfer files from old partition to new partition
3. Switch over to new partition by editing `/etc/fstab`

If you're trying to unmount the partition and it keeps saying it is busy, use the following command to see what's keeping the partition busy

```bash
lsof | grep/media/aamnah/Files
```

in my case it was a bunch of `node` processes..

Before starting file transfer, close all applications (e.g. Chrome) This will avoid any temporary files changing during the transfer.

I don't usually care about the temp files, but it'll tell you the transferred files are different from the original ones when you check if all files were successfully copied when you use `diff`

Clear `~/.cache/` and delete `node_modules` before starting the sync, it'll save you hours.

Start the transfer with

```bash
sudo rsync -aXS --progress --exclude='/*/.gvfs' /home/. /media/aamnah/Files/.
```

- `a` archive mode (equals `-rlptgoD`)
- `X` preserve extended attributes
- `S` turn sequences of nulls into sparse blocks

Confirm that all files were copied

```bash
sudo diff -r /home /media/aamnah/Files -x ".gvfs/*"
```

After editing `/etc/fstab` you can mount new partitions with

```bash
sudo mount -a
```

- [Ubuntu Docs: Partitioning/Home/Moving](https://help.ubuntu.com/community/Partitioning/Home/Moving)
