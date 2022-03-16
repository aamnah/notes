---
title: Install Z-shell and Oh My Zsh on Ubuntu 20.04 LTS
slug: zshell-oh-my-zsh-ubuntu-lts-2004
date: 2020-06-23
---

```bash
# install ZSH
sudo apt update && sudo apt install -y zsh

# Set ZSH as default shell
chsh -s $(which zsh)

# logout and log back in for the shell change to take effect..

# confirm shell has been changed
echo $SHELL # /usr/bin/zsh

# instll oh-my-zsh
sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

As part of the installation, it'll ask you if you want to change your default shell to zsh. Say yes.

The `~/.bashrc` is replaced with `~/.zshrc`. And the default installation location is `~/.oh-my-zsh`, this is where you install themes and plugins.

### Aliases

- You can get a list of all active aliases by running `alias`
- New aliases can be defined at the end of `~/.zshrc`, although it's recommended that you add them inside your ZSH_CUSTOM folder.
- You can creates an `aliases.zsh` file in the ZSH_CUSTOM folder
- Files in the ZSH_CUSTOM folder are loaded by the init script, in alphabetical order

Since i already had a `.bash_aliases` file, i just copied the contents over

```bash
touch ~/.oh-my-zsh/aliases.zsh
cat ~/.bash_aliases >> ~/.oh-my-zsh/custom/aliases.zsh

source ~/.zshrc
```

You can then confirm your aliases are loaded with `alias`.

NOTE: You may have to go over your aliases file and change the double quotes to single quotes.. something about execution at run time or some such

### Installing plugins

```bash
plugins=(git cp colored-man-pages colorize)
```

### Installing themes

I have [my own theme](https://github.com/aamnah/tmux-flat-theme) that i install on every system..

```bash

export ZSH_THEME="amnastic"
```

ZSH_CUSTOM

## Links

- [Aamnah's oh-my-zsh](https://github.com/aamnah/oh-my-zsh-custom)
- [5 Types Of ZSH Aliases You Should Know](https://thorsten-hans.com/5-types-of-zsh-aliases)
- [Aliasing](http://zsh.sourceforge.net/Intro/intro_8.html)
