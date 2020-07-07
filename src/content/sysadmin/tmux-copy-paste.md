---
title: Copying and pasting text in tmux
slug: tmux-copy-paste
date: 2020-06-28
lastmod: 2020-06-30
status: DRAFT
---

- Hold down `Shift` (or `Option` on macOS) key and select text with mouse to **copy**
- Hold down `Shift` (or `Option` on macOS) key and press Mouse middle-button to **paste**

The above works. But if you have multiple panes, it'll select text from all panes instead of staying inside the bounderies of one pane. To fix that, we need to edit our `~/.tmux.conf` file

#### macOS

```conf
# Copying text in Mouse mode
# https://unix.stackexchange.com/a/318285
set -g mouse on
bind -n WheelUpPane if-shell -F -t = "#{mouse_any_flag}" "send-keys -M" "if -Ft= '#{pane_in_mode}' 'send-keys -M' 'select-pane -t=; copy-mode -e; send-keys -M'"
bind -n WheelDownPane select-pane -t= \; send-keys -M
bind -n C-WheelUpPane select-pane -t= \; copy-mode -e \; send-keys -M
bind -T copy-mode-vi    C-WheelUpPane   send-keys -X halfpage-up
bind -T copy-mode-vi    C-WheelDownPane send-keys -X halfpage-down
bind -T copy-mode-emacs C-WheelUpPane   send-keys -X halfpage-up
bind -T copy-mode-emacs C-WheelDownPane send-keys -X halfpage-down
# Use vim keybindings in copy mode
setw -g mode-keys vi
# Update default binding of `Enter` to also use copy-pipe
unbind -T copy-mode-vi Enter
bind-key -T copy-mode-vi Enter send-keys -X copy-pipe-and-cancel "pbcopy"
bind-key -T copy-mode-vi MouseDragEnd1Pane send-keys -X copy-pipe-and-cancel "pbcopy"

# Highlight some text with mouse, but don't let go the mouse. Now while the text is still highlighted (in yellow) and mouse pressed, press return key. The highlighted text will disappear and will be copied to your clipboard. Now release the mouse.
```

#### Linux

```bash
sudo apt install xclip
```

```conf
# Copying text in Mouse mode
# https://unix.stackexchange.com/a/318285
# Needs `xclip` on Linux. sudo apt install -y xclip
set -g mouse on
bind -n WheelUpPane if-shell -F -t = "#{mouse_any_flag}" "send-keys -M" "if -Ft= '#{pane_in_mode}' 'send-keys -M' 'select-pane -t=; copy-mode -e; send-keys -M'"
bind -n WheelDownPane select-pane -t= \; send-keys -M
bind -n C-WheelUpPane select-pane -t= \; copy-mode -e \; send-keys -M
bind -T copy-mode-vi    C-WheelUpPane   send-keys -X halfpage-up
bind -T copy-mode-vi    C-WheelDownPane send-keys -X halfpage-down
bind -T copy-mode-emacs C-WheelUpPane   send-keys -X halfpage-up
bind -T copy-mode-emacs C-WheelDownPane send-keys -X halfpage-down
# Use vim keybindings in copy mode
setw -g mode-keys vi
# Update default binding of `Enter` to also use copy-pipe
unbind -T copy-mode-vi Enter
bind-key -T copy-mode-vi Enter send-keys -X copy-pipe-and-cancel "xclip -selection c"
bind-key -T copy-mode-vi MouseDragEnd1Pane send-keys -X copy-pipe-and-cancel "xclip -in -selection clipboard"

# Highlight some text with mouse, but don't let go the mouse. Now while the text is still highlighted (in yellow) and mouse pressed, press return key. The highlighted text will disappear and will be copied to your clipboard. Now release the mouse.
```

- The macOS version uses `pbcopy` while the Linux version uses `xclip`. You will need to install `xclip` on Ubuntu
- To copy, left click and drag to highlight text in yellow, press Enter and then release mouse.
- `Ctrl + Shift + V` to paste

### DRAFT Writing one config for both Linux and macOS

Get the system you're on with `uname -s`. Ubuntu gives `Linux` while macOS gives `Darwin`

NOTE: Bash variables and conditionals don't work inside a tmux conf file. Update these with `if-shell` or `run-shell` to get `uname` result, and then `%if ... %else ... %endif` to write the confitional

```bash
MACHINE=$(uname -s | tr '[:upper:]' '[:lower:]')
```

Once you have the system name, you can use an `if/esle` or `case` statement

```bash
[[ $MACHINE = linux ]] && "xclip -selection c" || "pbcopy"
[[ $MACHINE = linux ]] && "xclip -in -selection clipboard" || "pbcopy"
```

```bash
sudo apt install -y xclip
```

```bash
echo -e "
# Detect the platform we're running on (`Linux` for Ubuntu, `Darwin` for macOS)
MACHINE=$(uname -s | tr '[:upper:]' '[:lower:]')

# Copying text in Mouse mode
# https://unix.stackexchange.com/a/318285
# Needs `xclip` on Linux. sudo apt install -y xclip
set -g mouse on
bind -n WheelUpPane if-shell -F -t = "#{mouse_any_flag}" "send-keys -M" "if -Ft= '#{pane_in_mode}' 'send-keys -M' 'select-pane -t=; copy-mode -e; send-keys -M'"
bind -n WheelDownPane select-pane -t= \; send-keys -M
bind -n C-WheelUpPane select-pane -t= \; copy-mode -e \; send-keys -M
bind -T copy-mode-vi    C-WheelUpPane   send-keys -X halfpage-up
bind -T copy-mode-vi    C-WheelDownPane send-keys -X halfpage-down
bind -T copy-mode-emacs C-WheelUpPane   send-keys -X halfpage-up
bind -T copy-mode-emacs C-WheelDownPane send-keys -X halfpage-down
# Use vim keybindings in copy mode
setw -g mode-keys vi
# Update default binding of `Enter` to also use copy-pipe
unbind -T copy-mode-vi Enter
bind-key -T copy-mode-vi Enter send-keys -X copy-pipe-and-cancel [[ $MACHINE = darwin ]] && "pbcopy" || "xclip -selection c"
bind-key -T copy-mode-vi MouseDragEnd1Pane send-keys -X copy-pipe-and-cancel [[ $MACHINE = darwin ]] && "pbcopy" || "xclip -in -selection clipboard"

# Highlight some text with mouse, but don't let go the mouse. Now while the text is still highlighted (in yellow) and mouse pressed, press return key. The highlighted text will disappear and will be copied to your clipboard. Now release the mouse.
" >> ${HOME}/.tmux.conf
```

```conf
%if #{==:#{host},myhost} "pbcopy" %else "xclip -selection c" %endif
%if #{==:#{host},myhost} "pbcopy" %else "xclip -in -selection clipboard" %endif
```

## Links

- [tmux manual](https://man7.org/linux/man-pages/man1/tmux.1.html)
- [Copying Text With Mouse In TMUX](https://blog.jasonmeridth.com/posts/copying-text-with-mouse-in-tmux/#:~:text=TL%3BDR%20Hold%20down%20shift,Voila!)
- [How to copy and paste with a mouse with tmux](https://unix.stackexchange.com/a/318285)
