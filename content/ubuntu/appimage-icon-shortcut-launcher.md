---
date: 2022-01-26
title: How to add an application launcher shortcut in Ubuntu Linux
slug: appimage-icon-shortcut-launcher-unity-ubuntu-linux
tags:
  - desktop entries
  - Unity
  - AppImage
---

You do that by creating a `.desktop` file and saving it in `~/.local/share/applications/`

Here's a basic `.desktop` file

```bash
# ~/.local/share/applications/obsidian.desktop
[Desktop Entry]
Type=Application
Name=Obsidian
Exec=/home/aamnah/Mounts/Files/Applications/Obsidian-0.13.19.AppImage
Icon=/home/aamnah/Mounts/Files/Applications/obsidian.png
```

- Each desktop entry must have a `Type` and a `Name` key and can optionally define its appearance in the application menu. In other words only `Type` and `Name` are required, rest are all optional
- Apart from `Type` and `Name`, you will most likely add
  - `Exec` to specify where the executable is (or a specific command to execute with arguments)
  - `Icon` to specify which icon to show with the executable (this icon will show in the Launcher and in the Dock)
- Keep _paths_ in `.desktop` _absolute_ to avoid troubleshooting headaches

### Location for `.desktop` files

```bash
# for applications installed system-wide
/usr/share/applications/
/usr/local/share/applications/

# for user-specific applications
~/.local/share/applications/
```

If you're specifying an AppImage (or any other script) as value for `Exec`, make sure it is executable

```
sudo chmod u+x /home/aamnah/Mounts/Files/Applications/Obsidian.AppImage
```

After you have added a `.desktop` file, run the following command to update cache database of MIME types handled by desktop files. (Although Unity picked up my entry without me having to refresh anything)

```bash
update-desktop-database ~/.local/share/applications
```

## Links

- [Desktop entries](https://wiki.archlinux.org/title/desktop_entries)
- [Recognized desktop entry keys](https://specifications.freedesktop.org/desktop-entry-spec/desktop-entry-spec-latest.html#recognized-keys)
- [GNOME Desktop Installer](https://forum.obsidian.md/t/gnome-desktop-installer/499)
- [Application Icon missing in Gnome on Linux](https://forum.obsidian.md/t/application-icon-missing-in-gnome-on-linux/1026/10)
