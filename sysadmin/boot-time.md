---
title: Find out Linux boot time
date: 2019-07-27
---

```bash
systemd-analyze
```

```
Startup finished in 2.507s (kernel) + 3min 448ms (userspace) = 3min 2.955s
graphical.target reached after 1min 43.791s in userspace
```

Boot time after fixing the path to `swap` partition in `/etc/fstab`

```bash
systemd-analyze
```

```
Startup finished in 2.446s (kernel) + 15.925s (userspace) = 18.372s
graphical.target reached after 15.901s in userspace
```