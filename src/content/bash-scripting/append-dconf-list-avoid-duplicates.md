---
title: Append to a dconf list and avoiding duplicates with existing entries
date: 2020-08-09
slug: dconf-append-list-avoid-duplicates
category: Bash Scripting
tags: Ubuntu
---

I need to do this for a script i'm writing to add custom keyboard shortcuts. I get the existing list with

```bash
gsettings get org.gnome.settings-daemon.plugins.media-keys custom-keybindings
```

```
['/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/custom0/', '/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/custom1/', '/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/custom2/']
```

and now i need to add new entries to it and avoid duplicates with any previous `custom$` shortcuts.

```bash
gsettings set org.gnome.settings-daemon.plugins.media-keys custom-keybindings "[<altered_list>]"
```

### Adding values to an existing array

```bash
arr=( "${arr[@]}" "new_element1" "new_element2" "..." "new_elementN")
#Or
arr+=( "new_element1" "new_element2" "..." "new_elementN" )
```

#### using command substituion

```bash
CUSTOM_SHORTCUTS_LIST=$(gsettings get org.gnome.settings-daemon.plugins.media-keys custom-keybindings)
# ['/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/custom0/', '/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/custom1/', '/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/custom2/']
echo -e "\nCUSTOM_SHORTCUTS_LIST: \n${CUSTOM_SHORTCUTS_LIST}"

NEW_SHORTCUTS_LIST="${CUSTOM_SHORTCUTS_LIST%]*}, 'blah']" # substituion

echo -e "\nNEW_SHORTCUTS_LIST: \n${NEW_SHORTCUTS_LIST}\n"
# ['/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/custom0/', '/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/custom1/', '/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/custom2/', 'blah']
```

Here are some way people have done this when creating Gnome Terminal themes

```bash
# One Dark
# https://github.com/denysdovhan/one-gnome-terminal/blob/master/one-dark.sh
dlist_append() {
    local key="$1"; shift
    local val="$1"; shift

    local entries="$(
        {
            "$DCONF" read "$key" | tr -d '[]' | tr , "\n" | fgrep -v "$val"
            echo "'$val'"
        } | head -c-1 | tr "\n" ,
    )"

    "$DCONF" write "$key" "[$entries]"
}
```

```bash
# Nord
# https://github.com/arcticicestudio/nord-gnome-terminal/blob/develop/src/nord.sh
append_profile_uuid_to_list() {
  local uuid list
  uuid="$1"
  list=$(gsettings get "$GSETTINGS_PROFILELIST_PATH" list)
  gsettings set "$GSETTINGS_PROFILELIST_PATH" list "${list%]*}, '$uuid']"
}
```

## Links

- [How to set custom keyboard shortcuts from terminal?](https://askubuntu.com/a/597414/897311)
