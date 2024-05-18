---
title: Copy one partition to another in Ubuntu Linux
date: 2024-02-23T17:31:43:z
uuid: 20240223173143
slug: copy-one-partition-to-another-ubuntu-linux
description: Copy one partition to another using rsync, dd, or GParted
tags: 
- rsync
- dd
- gparted
---

NOTE: Following are just for copying one partition from another, they don't discuss generating new _UUID_ and editing `fstab` that you will have to do if you want to change the mount points

### With rsync

```bash
sudo rsync /home/. /media/home/.
```

If you want to exclude some files, you can add them with the `--exclude=` flag, for example: `--exclude='/*/.gvfs'`

```
--exclude=PATTERN        exclude files matching PATTERN
--exclude-from=FILE      read exclude patterns from FILE
```

Check that the copying worked:

```bash
sudo diff -r /home /media/home -x ".gvfs/*"
```

### With dd

```bash
sudo dd if=/dev/sdx1 of=/dev/sdy1 bs=64K conv=noerror,sync
```

`/dev/sdx1` is the source partition (input) and `/dev/sdy1` is the destination (output)

- `if` provides **i**nput **f**ile (instead of the standard input)
- `of` provides **o**utput **f**ile
- `bs` means **b**lock **s**ize
- `noerror` means do not stop processing on an input error

### With gparted
In the GParted GUI, right click on the drive and select _Copy_, then right click on the drive where you want to copy to and select _Paste_