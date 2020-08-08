---
title: The Ultimate Guide to creating a Gnome Terminal theme
date: 2020-08-08
slug: create-theme-gnome-terminal-ultimate-guide
tags:
  - Ubuntu
  - Gnome
  - Terminal
  - Theme
---

```bash
sudo apt-get install dconf-cli uuid-runtime
bash -c "$(curl -fsSL https://raw.githubusercontent.com/denysdovhan/gnome-terminal-one/master/one-dark.sh)"
```

### GConf, dconf and GSettings

Gnome Terminal color palette details originally used to be stored in `~/.gconf/apps/gnome-terminal/profiles/` and `%gconf.xml` had all palette related data. But on recent Ubuntu (20.04) you'll find `~/.gconf` to be completely empty even if you have multiple Terminal profiles saved.

That's because of the transition from `GConf` (for storing user preferences) to the combination of the `GSettings` high-level configuration system and the `dconf` back end.

Since `dconf` is a database saved in binary format, you can't just read the files as is. What you can do is dump it

```bash
dconf dump /org/gnome/terminal/ > gnome_terminal_settings_backup.txt
```

Now you have the backup for all Terminal profiles in human-readable format. The entire dconf database is stored in `~/.config/dconf/user`, which you can backup with

```bash
dconf dump /org/gnome/terminal/ > gnome_terminal_settings_backup.txt
```

### Loading settings form backup

backup:

```bash
dconf dump /org/gnome/terminal/ > gnome_terminal_settings_backup.txt
```

reset the settings before restore (optional):

```bash
dconf reset -f /org/gnome/terminal/
```

restore:

```bash
dconf load /org/gnome/terminal/ < gnome_terminal_settings_backup.txt
```

### dconf GUI

You can use a GUI to edit the dconf configuration database

```bash
sudo apt install dconf-editor
dconf-editor
```

### Gnome Terminal related settings

Gnome terminal related settings are in

```
/org/gnome/terminal
```

Profiles are in

```
/org/gnome/terminal/legacy/profiles
```

You can actually go in and edit all your theme settings directly there..

### See all profiles installed

```bash
dconf list /org/gnome/terminal/legacy/profiles:/
```

### Find profile ID

You can get the ID for the default profile with

```bash
gsettings get org.gnome.Terminal.ProfilesList default
```

You can also see the Profile ID mentioned in bottom right of the window under **Preferences > THEME_NAME > Text**

### Switching themes

Once you have your theme installed, click on the down arrow in top right to see the dropdown for themes..

### Some good themes

[Nord](https://github.com/arcticicestudio/nord-gnome-terminal)

```bash
bash -c "$(curl -fsSL https://github.com/arcticicestudio/nord-gnome-terminal/blob/develop/src/nord.sh)"
```

[One Dark](https://github.com/denysdovhan/one-gnome-terminal)

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/denysdovhan/gnome-terminal-one/master/one-dark.sh)"
```

[Gogh](https://github.com/Mayccoll/Gogh) has [almost 200 versions](https://mayccoll.github.io/Gogh/) of the theme

```bash
bash -c  "$(wget -qO- https://git.io/vQgMr)"
```

### Creating a theme

See all possible keys you can set for a Profile

```bash
UUID=$(gsettings get org.gnome.Terminal.ProfilesList default | tr -d \')
gsettings list-keys org.gnome.Terminal.Legacy.Profile:/$UUID/
```

```
foreground-color
highlight-foreground-color
word-char-exceptions
audible-bell
palette
encoding
bold-color-same-as-fg
login-shell
default-size-rows
cursor-blink-mode
cursor-colors-set
cursor-background-color
enable-bidi
use-transparent-background
scrollbar-policy
use-system-font
bold-color
cursor-foreground-color
visible-name
custom-command
scrollback-unlimited
font
use-theme-transparency
cjk-utf8-ambiguous-width
cursor-shape
use-custom-command
exit-action
bold-is-bright
scroll-on-output
highlight-colors-set
delete-binding
preserve-working-directory
backspace-binding
background-transparency-percent
cell-height-scale
use-theme-colors
background-color
highlight-background-color
enable-shaping
default-size-columns
cell-width-scale
scroll-on-keystroke
rewrap-on-resize
scrollback-lines
text-blink-mode
```

If you do `list-recursively`, you can see the keys as well as their current values

```bash
gsettings list-recursively org.gnome.Terminal.Legacy.Profile:/$UUID/
```

```bash
org.gnome.Terminal.Legacy.Profile foreground-color '#D3D7CF'
org.gnome.Terminal.Legacy.Profile highlight-foreground-color '#ffffff'
org.gnome.Terminal.Legacy.Profile word-char-exceptions @ms nothing
org.gnome.Terminal.Legacy.Profile audible-bell true
org.gnome.Terminal.Legacy.Profile palette ['#2E3436', '#CC0000', '#4E9A06', '#C4A000', '#3465A4', '#75507B', '#06989A', '#D3D7CF', '#555753', '#EF2929', '#8AE234', '#FCE94F', '#729FCF', '#AD7FA8', '#34E2E2', '#EEEEEC']
org.gnome.Terminal.Legacy.Profile encoding 'UTF-8'
org.gnome.Terminal.Legacy.Profile bold-color-same-as-fg true
org.gnome.Terminal.Legacy.Profile login-shell false
org.gnome.Terminal.Legacy.Profile default-size-rows 24
org.gnome.Terminal.Legacy.Profile cursor-blink-mode 'system'
org.gnome.Terminal.Legacy.Profile cursor-colors-set false
org.gnome.Terminal.Legacy.Profile cursor-background-color '#000000'
org.gnome.Terminal.Legacy.Profile enable-bidi true
org.gnome.Terminal.Legacy.Profile use-transparent-background false
org.gnome.Terminal.Legacy.Profile scrollbar-policy 'always'
org.gnome.Terminal.Legacy.Profile use-system-font true
org.gnome.Terminal.Legacy.Profile bold-color '#000000'
org.gnome.Terminal.Legacy.Profile cursor-foreground-color '#ffffff'
org.gnome.Terminal.Legacy.Profile visible-name 'Unnamed'
org.gnome.Terminal.Legacy.Profile custom-command ''
org.gnome.Terminal.Legacy.Profile scrollback-unlimited false
org.gnome.Terminal.Legacy.Profile font 'Monospace 12'
org.gnome.Terminal.Legacy.Profile use-theme-transparency true
org.gnome.Terminal.Legacy.Profile cjk-utf8-ambiguous-width 'narrow'
org.gnome.Terminal.Legacy.Profile cursor-shape 'block'
org.gnome.Terminal.Legacy.Profile use-custom-command false
org.gnome.Terminal.Legacy.Profile exit-action 'close'
org.gnome.Terminal.Legacy.Profile bold-is-bright false
org.gnome.Terminal.Legacy.Profile scroll-on-output false
org.gnome.Terminal.Legacy.Profile highlight-colors-set false
org.gnome.Terminal.Legacy.Profile delete-binding 'delete-sequence'
org.gnome.Terminal.Legacy.Profile preserve-working-directory 'safe'
org.gnome.Terminal.Legacy.Profile backspace-binding 'ascii-delete'
org.gnome.Terminal.Legacy.Profile background-transparency-percent 50
org.gnome.Terminal.Legacy.Profile cell-height-scale 1.0
org.gnome.Terminal.Legacy.Profile use-theme-colors true
org.gnome.Terminal.Legacy.Profile background-color '#2E3436'
org.gnome.Terminal.Legacy.Profile highlight-background-color '#000000'
org.gnome.Terminal.Legacy.Profile enable-shaping true
org.gnome.Terminal.Legacy.Profile default-size-columns 80
org.gnome.Terminal.Legacy.Profile cell-width-scale 1.0
org.gnome.Terminal.Legacy.Profile scroll-on-keystroke true
org.gnome.Terminal.Legacy.Profile rewrap-on-resize true
org.gnome.Terminal.Legacy.Profile scrollback-lines 10000
org.gnome.Terminal.Legacy.Profile text-blink-mode 'always'
```

#### changing theme values

You can either use `dconf write` or `gsettings set` to change these values

```bash
# dconf
dconf write /org/gnome/terminal/legacy/profiles:/:b1dcc9dd-5262-4d8d-a863-c897e6d979b9/use-theme-colors "false"
dconf write /org/gnome/terminal/legacy/profiles:/:b1dcc9dd-5262-4d8d-a863-c897e6d979b9/background-color "'rgb(0,43,54)'"
dconf write /org/gnome/terminal/legacy/profiles:/:b1dcc9dd-5262-4d8d-a863-c897e6d979b9/foreground-color "'rgb(131,148,150)'"
```

```bash
# gsettings
gsettings set org.gnome.Terminal.Legacy.Profile:/org/gnome/terminal/legacy/profiles:/:b1dcc9dd-5262-4d8d-a863-c897e6d979b9/ use-theme-colors false
gsettings set org.gnome.Terminal.Legacy.Profile:/org/gnome/terminal/legacy/profiles:/:b1dcc9dd-5262-4d8d-a863-c897e6d979b9/ background-color 'rgb(0,43,54)'
gsettings set org.gnome.Terminal.Legacy.Profile:/org/gnome/terminal/legacy/profiles:/:b1dcc9dd-5262-4d8d-a863-c897e6d979b9/ foreground-color 'rgb(131,148,150)'
```

### Color palettes

A palette is the bare minimum you need.

```bash
dconf write /org/gnome/terminal/legacy/profiles:/PROFILE_UUIS/palette "['rgb(0,0,0)', 'rgb(204,0,0)', 'rgb(78,154,6)', 'rgb(196,160,0)', 'rgb(52,101,164)', 'rgb(117,80,123)', 'rgb(6,152,154)', 'rgb(211,215,207)', 'rgb(85,87,83)', 'rgb(239,41,41)', 'rgb(138,226,52)', 'rgb(252,233,79)', 'rgb(114,159,207)', 'rgb(173,127,168)', 'rgb(52,226,226)', 'rgb(238,238,236)']"
```

I need 16 colors roughly to create a profile. Colors can be both HEX `#88C0D0` and RGB `rgb(136,192,208)`

```
['#2E3436', '#CC0000', '#4E9A06', '#C4A000', '#3465A4', '#75507B', '#06989A', '#D3D7CF', '#555753', '#EF2929', '#8AE234', '#FCE94F', '#729FCF', '#AD7FA8', '#34E2E2', '#EEEEEC']
```

```
['rgb(179,177,173)', 'rgb(10,14,20)', 'rgb(0,1,10)', 'rgb(196,160,0)', 'rgb(52,101,164)', 'rgb(117,80,123)', 'rgb(6,152,154)', 'rgb(211,215,207)', 'rgb(85,87,83)', 'rgb(239,41,41)', 'rgb(138,226,52)', 'rgb(252,233,79)', 'rgb(114,159,207)', 'rgb(173,127,168)', 'rgb(52,226,226)', 'rgb(238,238,236)']
```

```bash
# Ayu Dark
['#00010a',
'#ea6c73',
'#91b362',
'#f9af4f',
'#53bdfa',
'#fae994',
'#90e1c6',
'#c7c7c7',
'#686868',
'#f07178',
'#c2d94c',
'#ffb454',
'#59c2ff',
'#ffee99',
'#95e6cb',
'#ffffff']
```

There are two ways of creating a theme. One is to do it manually by hand via the GUIs (`dconf-editor` and **Terminal > Prefernces > Profile**). The other is writing a script (using `dconf-cli`) so that anyone can use a one-liner to
install the theme.

## Links

- [nord-gnome-terminal](https://github.com/arcticicestudio/nord-gnome-terminal)
- [Gogh](https://github.com/Mayccoll/Gogh)
- [one-gnome-terminal](https://github.com/denysdovhan/one-gnome-terminal)
- [Dracula](https://draculatheme.com/gnome-terminal/)
- [How to store my gnome terminal color palette](https://askubuntu.com/a/198979)
- [Backup GNOME-Terminal](https://askubuntu.com/a/967535)
- [CHAPTER 3. GSETTINGS AND DCONF](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/desktop_migration_and_administration_guide/gsettings-dconf)
- [How to set the gnome-terminal color scheme to “Solarized Dark” via commandline?](https://askubuntu.com/questions/957257/how-to-set-the-gnome-terminal-color-scheme-to-solarized-dark-via-commandline)
- [Change your Linux terminal color theme](https://opensource.com/article/19/8/add-color-linux-terminal)
- [How to set built-in color scheme for gnome-terminal via CLI in Ubuntu 16?](https://askubuntu.com/a/803246)
- [ayu-colors](https://github.com/ayu-theme/ayu-colors)

### Scripts

- https://github.com/aruhier/gnome-terminal-colors-solarized/blob/master/src/profiles.sh
- https://github.com/arcticicestudio/nord-gnome-terminal/blob/develop/src/nord.sh
- https://github.com/denysdovhan/one-gnome-terminal/blob/master/one-dark.sh
- https://github.com/Mayccoll/Gogh/blob/master/gogh.sh
- https://github.com/chriskempson/tomorrow-theme/blob/9aee367f0d9719ae8930f831adb6a897c76dbd0c/Gnome-Terminal/setup-theme.sh
- https://gist.github.com/anmoljagetia/263d14f30db7b703ad3e
