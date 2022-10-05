---
title: Keyboard shortcut for screenshot of area selection in Ubuntu 22.04
date: 2022-10-05
draft: true
slug: ubuntu-screenshot-area-selection-keyboard-shortcut
description: Adding a keyboard shortcut for taking screenshot of an area selection in Ubuntu 22.04
---

The new interactive screenshot utility in 22.04 lets you capture an area selection, but it makes me do extra unnecessary clicks. The <kbd>Shift</kbd> + <kbd>PrtSc</kbd> shortcut that i am used to is much simpler and straight forward.

Here's what you do

- install `gnome-screenshot`
- add a custom shortcut for <kbd>Shift</kbd> + <kbd>PrtSc</kbd>
- (optional) change the directory where `gnome-screenshot` saves screenshots 

#### Add keyboard shortcut for screenshot of area selection

Install `gnome-screenshot`

```bash
sudo apt install gnome-screenshot
```

Go to _Settings > Keyboard > View and Customize Shortcuts > Screenshots_ and add a custom shortcut.

![screenshot]()
![screenshot]()

The command to use is `gnome-screenshot -a` (the `-a` or `--area` option lets you grab an area of the screen instead of the entire screen).

For the shortcut keys i use `Shift + PrtSc`, but you can use a different combo if you want.

For name i entered _Take screenshot of area selection_, but you can call it whatever, doesn't matter much

Adding the custom shortcut will disable any existing key bindings for the same keys so you don't need to worry about conflicts.

NOTE: Ubuntu 22.04 introduced a screenshot utility that allows you to take a screenshot interactively, i.e. it shows you a prompt screen where you click click to get the job done. It comes with it's own set of shortcuts which you can update under _Settings > Keyboard > View and Customize Shortcuts > Screenshots_. I have the _interactivity_ altogether because i prefer keyboard shortcuts with less clicking involved

![screenshot]()

#### Change the location `gnome-screenshot` saves screenshots

By default, all screenshots are saved in `~/Pictures`, which creates a whole lot of mess. I like to keep the screenshots in their own folder at `~/Pictures/Screenshots` (which is also the default location for the interactive screenshot utility). 

Here's the command to set the `dconf` setting

```bash
gsettings set org.gnome.gnome-screenshot auto-save-directory "/home/aamnah/Pictures/Screenshots"
```

Replace `/home/aamnah/Pictures/Screenshots` with your preferred directory path. Make sure it's an absolute path and you don't include environment variables like `$HOME` or `$USER`, variable expansion doesn't work.

Logout and login again for the change to take effect.

Alternatively, you could use the GUI `dconf-editor`

```bash
sudo apt install dconf-editor
```

Open the GUI and change the values in _org > gnome > gnome-screenshot > auto-save-directory_

![screenshot of dconf-editor GUI settings for auto-save-directory]()

I came across advice recommending changing the value for `XDG_PICTURES_DIR` in the `~/.config/user-dirs.dirs` file. I do not recommend this. It'd work for screenshot shortcuts, but keep in mind that `XDG_PICTURES_DIR` will change the path for your `Pictures` folder and the screenshot location is a side effect of that. (Imagine changing the path for your `Desktop` folder). It's a dirty workaround.

Changing this value to `$HOME/Pictures/Screenshots` will also mean that any screenshots taken with the interactive screenshot utility will be saved in `$HOME/Pictures/Screenshots/Screenshots` by default.

#### Changing the default filename format?

The `gnome-screenshot` CLI tool lets you specify filename with `-f` or `--filename` option

```
  -f, --file=filename            Save screenshot directly to this file
```

Some examples:

```bash
# Using the CLI tool lets you specify filename with -f or --filename option
gnome-screenshot -f "$HOME/Pictures/Screenshots/$(date +%F_%H-%M-%S).png" $@
gnome-screenshot -p -f "$(date +%F_%H-%M-%S)_D.png"
gnome-screenshot [--flags] --file=file:///home/User/Pictures/Screenshots/$(date +%F_%H-%M-%S).jpg
```

But this will not work as part of shortcut command because variable expansion and environment variables do not work in keyboard shortcuts. 

The reason i wanted to edit the filename format was to remove the _Screenshot from_ text from the beginning of filename, because it is redundant, `Screenshots` is already part of the file path. Another reason to edit was to remove spaces from filenames.

You could go around writing bash scripts for this but i got bored and found it more effort than worth it.

Links
---

- [Screenshot not saved](https://askubuntu.com/a/1413183)
- [How can i change the default name for the screenshots made by gnome-screenshot?](https://askubuntu.com/questions/55204/how-can-i-change-the-default-name-for-the-screenshots-made-by-gnome-screenshot)
- [XDG user directories](https://wiki.archlinux.org/title/XDG_user_directories)
- [How to change Gnome-Screenhot’s default save directory](https://www.faqforge.com/linux/distributions/ubuntu/change-gnome-screenhots-default-save-directory/)