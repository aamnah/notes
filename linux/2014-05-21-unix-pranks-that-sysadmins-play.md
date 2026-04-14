---
title: 'Unix: Pranks that sysadmins play'
date: 2014-05-21T15:32:18+05:00
lastmod: 2026-04-14
uuid: 20140521153218
type: link
---

[Unix: Pranks that sysadmins play](https://www.networkworld.com/article/930678/unix-pranks-that-sysadmins-play.html)

> Unix systems administrators tend to be very serious about their responsibilities -- except when they're not. And, when they're not, the pranks that they play on each other and some of their more annoying users might surprise you.

TL;DR
-----

A catalogue of classic sysadmin pranks that exploit command-line knowledge the victim doesn't have.

### Alias tricks

Redefine a common command to do something weird or break loudly:

```bash
alias ls='echo "Segmentation fault"'      # ls now "crashes"
alias cd='echo "Segmentation fault"'      # paired with PROMPT_COMMAND="cd"
                                           # so every prompt prints it
alias vi='ed'                              # forces the victim into `ed`
alias sl='ls | rev'                        # filenames printed backwards
                                           # (targets people who typo `ls`)
alias pwd='cd'
alias who='logout'
```

### Prompt swap

Make a Unix shell look like DOS:

```bash
export PS1='C:${PWD////}> '
```

### Terminal freeze

`Ctrl+S` freezes the terminal until `Ctrl+Q` unfreezes it (XON/XOFF flow control). Leaves people thinking the machine hung.

### Sending messages to another user's terminal

```bash
echo "boo" > /dev/pts/3   # appears on whoever is on pty 3
```

### System-level mischief

- Edit `/etc/hosts` to redirect a domain (e.g. map `google.com` to `127.0.0.1`)
- Remote-trigger the CD tray (`eject`) in a server room for spooky effect
- Physically swap mice / keyboards between adjacent workstations

### Bonus

The `sl` command is a real package — it prints an ASCII steam locomotive when you typo `ls`. Half prank, half punishment for sloppy typing.
