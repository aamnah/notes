---
title: Setting up Vim and Tmux
date: 2018-08-16
---



```bash
#!/bin/bash

install_tmux () {
	# install Tmux
	sudo apt update 
	sudo apt install -y tmux

	# create a custom Tmux conf file (~/.tmux.conf)
	touch $HOME/.tmux.conf
	# macOS: ~/.tmux-osx.conf
	
# add config for 256 colors
	echo -e "
# 256 Colors
set -g default-terminal \"screen-256color\"
" >> $HOME/.tmux.conf
	
	# make an alias to `tmux -2` to force 256 color terminal
	echo -e "alias tmux='tmux -2'" > $HOME/.bashrc
}

configure_vim() {
# cerate custom Vim config file
touch $HOME/.vimrc

# create custom dirs
mkdir -p $HOME/.vim/colors

# fetch and save Sublime Monokai colorscheme
curl https://raw.githubusercontent.com/ErichDonGubler/vim-sublime-monokai/master/colors/sublimemonokai.vim > $HOME/.vim/colors/sublimemonokai.vim

# fetch and save Tommorow Night colorscheme
curl https://raw.githubusercontent.com/chriskempson/tomorrow-theme/master/vim/colors/Tomorrow-Night.vim > $HOME/.vim/colors/tomorrownight.vim

# Set basic config in order for Sublime Monokai theme to work
echo 't_Co=256 \nsyntax on \ncolorscheme sublimemonokai' >> $HOME/.vimrc
}

install_tmux
configure_vim

# TODO
# fetch conf files from here: https://github.com/aamnah/dotfiles

# REFERENCES
# https://github.com/tmux/tmux/wiki/FAQ

```

### Colorscheme not showing up as expected

This has to do with 256 colors. Older terminals only supported 8 or 16 colors. Even now, some Terminals (and terminal emulators) may have to be told explicitly to use 256 colors even if they support it. (xterm does). If you use an emulator like tmux, you'll have to tell tmux as well to use 256 colors.

This has happened to me on an Armbian system. The same Vim colorscheme that looked classy on macOS refused to work on Debian. Turns out Vim needs to be told to use 256 colors. Then it worked in xterm, but the ugliness continued when i'd open Vim inside tmux, so i had to set 256 color settings to tmux as well. 

```bash
# ~/.vimrc
t_Co=256

# ~/.tmux.conf
set -g defalt-terminal "screen-256color"
```

You can also open tmux with 256 colors using the `-2` flag: 

```bash
# -2            Force tmux to assume the terminal supports 256 colours.
tmux -2
```

- make `tmux` an alias to `tmux -2`
- `echo $TERM` to see what Terminal you have 
- `t_Co=256` let's Vim use 256 colors in Terminals that support it. Without it Vim will only show 8 or 16 different colors. I needed to add this on an Armbian setup in order for the Monokai theme to work.

Links
---

- [SuperUser: Color scheme(s) in Vim not properly working](https://superuser.com/questions/917835/color-schemes-in-vim-not-properly-working)

