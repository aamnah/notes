---
title: Change login shell
description: Change between bash and zshell
slug: change-login-shell-bash-zsh-ubuntu
date: 2020-08-08
tags:
  - bash
  - ubuntu
  - zshell
---

### See all the shells installed on the system

```bash
# check all shells installed
# List of valid login shells
cat /etc/shells
```

```
# /etc/shells: valid login shells
/bin/sh
/bin/bash
/bin/rbash
/bin/dash
/usr/bin/tmux
/bin/zsh
/usr/bin/zsh
```

### check which shell you're using at the moment

```bash
echo $SHELL
```

```
/bin/bash
```

### change login shell

You can directly provide name with the `-s` or `--shell` flag

```bash
#chsh -s /bin/zsh
chsh -s $(which zsh)
```

or you can change login shell interactively (skip the `-s`)

```bash
chsh
```

```
Password:
Changing the login shell for aamnah
Enter the new value, or press ENTER for the default
	Login Shell [/bin/bash]:
```

RE-LOGIN afterwards for the change to take effect
