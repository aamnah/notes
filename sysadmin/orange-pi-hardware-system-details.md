---
title: Orange Pi Plus 2 - System details
date: 2021-02-05
---

### Processor / CPU info

```bash
cat /proc/cpuinfo
```

```
Processor       : ARMv7 Processor rev 5 (v7l)
processor       : 0
BogoMIPS        : 1942.85

processor       : 1
BogoMIPS        : 1942.85

processor       : 2
BogoMIPS        : 1942.85

processor       : 3
BogoMIPS        : 1942.85

Features        : swp half thumb fastmult vfp edsp thumbee neon vfpv3 tls vfpv4 idiva idivt
CPU implementer : 0x41
CPU architecture: 7
CPU variant     : 0x0
CPU part        : 0xc07
CPU revision    : 5

Hardware        : sun8i
Revision        : 0000
Serial          : 94005035c618582a028e
```

```bash
cat /proc/meminfo
```

```
MemTotal:        2062812 kB
MemFree:          650876 kB
Buffers:          103796 kB
Cached:           547892 kB
SwapCached:        42604 kB
Active:           517744 kB
Inactive:         651896 kB
Active(anon):     279676 kB
Inactive(anon):   353320 kB
Active(file):     238068 kB
Inactive(file):   298576 kB
Unevictable:          32 kB
Mlocked:              32 kB
HighTotal:       1318912 kB
HighFree:         201676 kB
LowTotal:         743900 kB
LowFree:          449200 kB
SwapTotal:        257848 kB
SwapFree:          41224 kB
Dirty:                 0 kB
Writeback:             0 kB
AnonPages:        475652 kB
Mapped:            77996 kB
Shmem:            115044 kB
Slab:              79480 kB
SReclaimable:      61952 kB
SUnreclaim:        17528 kB
KernelStack:        2760 kB
PageTables:         8776 kB
NFS_Unstable:          0 kB
Bounce:                0 kB
WritebackTmp:          0 kB
CommitLimit:     1289252 kB
Committed_AS:    3174836 kB
VmallocTotal:     245760 kB
VmallocUsed:       41056 kB
VmallocChunk:     196660 kB
```


```bash
cat /proc/version
```

```
Linux version 3.4.113-sun8i (root@nightly) (gcc version 5.5.0 (Linaro GCC 5.5-2017.10) ) #68 SMP PREEMPT Wed Sep 19 10:23:30 CEST 2018
```

```bash
uname # Operating System
uname -a # Kernel version and System Architecture
uname -m # Machine hardware name, tells whether system is 32-bit or 64-bit
uname -p # Processor type (usually unknown on modern Unix)
```

```bash
uname -a
```

```
Linux orangepiplus 3.4.113-sun8i #68 SMP PREEMPT Wed Sep 19 10:23:30 CEST 2018 armv7l armv7l armv7l GNU/Linux
```

- `i686` or `i386` is 32-bit
- `x86_64` is 64-bit


### OS
I'm running Armbian

```bash
# cat /etc/os-release
NAME="Ubuntu"
VERSION="16.04.7 LTS (Xenial Xerus)"
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME="Ubuntu 16.04.7 LTS"
VERSION_ID="16.04"
HOME_URL="http://www.ubuntu.com/"
SUPPORT_URL="http://help.ubuntu.com/"
BUG_REPORT_URL="http://bugs.launchpad.net/ubuntu/"
VERSION_CODENAME=xenial
UBUNTU_CODENAME=xenial
```

```bash
# cat /etc/lsb-release
DISTRIB_ID=Ubuntu
DISTRIB_RELEASE=16.04
DISTRIB_CODENAME=xenial
DISTRIB_DESCRIPTION="Ubuntu 16.04.7 LTS"
```

```bash
# echo $OSTYPE
linux-gnueabihf
```