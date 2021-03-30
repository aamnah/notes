---
title: Getting started with Tmux
description: Windows, Panes and Sessions. Keyboard shortcuts, and how to configure custom key bindings
slug: tmux-basics
date: 2017-03-28
lastmod: 2021-03-20
tags:
  - tmux
---

```bash
# Debian
sudo apt install -y tmux

# macOS
brew install tmux
```

- `tmux` open tmux
- `exit` or `Ctrl`+`D` to close a pane, exit tmux

tmux is controlled by a key combination of a **prefix key**, 'C-b’ `Ctrl-b` by default, followed by a command key.

- `ctrl`+`b`, then `?` to open a list of all key bindings
- `ctrl`+`b`, then `%` to open a new pane (horizontal)
- `ctrl`+`b`, then `"` (double-quote) to open a pane (vertical)
- `ctrl`+`b`, then **arrow key** (left/right/up/down) to move between panes (horizontal)
- `ctrl`+`b`, then `:kill-server` to kill tmux entirely

### Sessions

| Actions                         | Key bindings                                  |
| ------------------------------- | --------------------------------------------- |
| Create a named session          | `tmux new -s SESSION_NAME`                    |
| name/rename current session     | `<prefix> $`                                  |
| detach from session             | `<prefix> d` or `tmux detach`                 |
| list all tmux sessions          | `tmux ls`                                     |
| connect to the detached session | `tmux a` or `tmux attach` or `tmux attach -d` |

### Windows

| Actions                      | Key bindings   |
| ---------------------------- | -------------- |
| create a new window          | `<prefix> c`   |
| close window                 | `exit`         |
| kill all windows             | `<prefix> &`   |
| switch to next window        | `<prefix> n`   |
| switch to prev window        | `<prefix> p`   |
| switch to window using index | `<prefix> 0-9` |

### Panes

| Actions                    | Key bindings           |
| -------------------------- | ---------------------- |
| kill current pane          | `<prefix> x`           |
| close pane                 | `<prefix> D` or `exit` |
| split horizontally         | `<prefix> "`           |
| split vertically           | `<prefix> %`           |
| move to pane               | `<prefix> arrow-key`   |
| zoom in/out on active pane | `<prefix> z`           |

## Links

- [Egghead.io: Wrangle your terminal with tmux](https://egghead.io/courses/wrangle-your-terminal-with-tmux)
- [tmux](https://tmux.github.io/)
- [tmux manual](http://man.openbsd.org/OpenBSD-current/man1/tmux.1)
- [tmux cheatsheet](https://tmuxcheatsheet.com/)
- [a tmux crash course](http://robots.thoughtbot.com/a-tmux-crash-course)
- [Getting started with Tmux](https://linuxize.com/post/getting-started-with-tmux/)
