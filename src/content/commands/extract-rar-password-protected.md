---
title: '[unrar] Extract a password protected RAR file'
date: 2020-08-11
slug: extract-rar-password-protected
---

You can extract a RAR file that is password protected on Linux with a utility called `unrar`

```bash
sudo apt install unrar
```

```bash
# provide a password with -p
unrar e -pPASSWORD FILE.rar
```

To just extract a file that has no password, only pass the `e` flag

```bash
unrar e FILE.rar
```
