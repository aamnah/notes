---
title: Change default screenshot save location on Ubuntu
date: 2020-08-09
slug: change-default-screenshot-save-location
---

**tl;dr**

System settings are saved in the `dconf` configuration system, and you can edit them in a GUI with `dconf-editor`. But it doesn't work. It's a known bug considered as `RESOLVED WONTFIX` [ref](https://bugzilla.gnome.org/show_bug.cgi?id=699642), so you'll never be able to change the save location just by editing `dconf` values for `gnome-screenshot`. Either create a custom keyboard shortcut that uses `gnome-screenshot` after setting the path in `dconf-editor`, or use `gnome-tweaks` with an extension called [Screenshot Locations](https://extensions.gnome.org/extension/1179/screenshot-locations/).

---

### the short fix

- Install Gnome Tweaks if you don't have it alread `sudo apt install gnome-tweaks`
- Install GNOME Shell integration for [Chromium and Chrome](https://chrome.google.com/webstore/detail/gnome-shell-integration/gphhapmejobijbbhgpjhcjognlahblep?hl=en) or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/gnome-shell-integration/)
- then go to the [Screenshot Locations extension page](https://extensions.gnome.org/extension/1179/screenshot-locations/)
- click the ON/OFF toggle on the right
- It'll show you a confirmation popup, click Accept.

Now re-login. Open Tweaks, go to Extensions, and set your location.

### the long fix

```bash
# install dconf Editor
sudo apt install dconf-editor
```

Start dconf Editor. Go to **org / gnome / gnome-screenshot** and edit **auto-save-directory**.

The location needs to be in `file:///home/YOUR_USERNAME/Desktop` format, i.e. an absolute path that starts with `file://`

For example, mine is a `screenshots` folder inside my `~/Pictures` folder.

```
file:///home/aamnah/Pictures/screenshots
```

You can also set the config in the Terminal with `gsettings set` or `dconf write`

```bash
gsettings set org.gnome.gnome-screenshot auto-save-directory "file:///home/${USER}/Downloads/"
```

After all of this, it still won't work when you take a screenshot with `Prtscr`.. ¯\_(ツ)\_/¯

> You can use gnome-screenshot to save wherever you want, just create a custom keyboard shortcut for it in the keyboard settings panel.
> There won't be a configuration option to do this in gnome-settings-daemon, as it's already trivially possible to work-around this lack of configuration.
> [Bastien Nocera](https://bugzilla.gnome.org/show_bug.cgi?id=699642#c17)

meh.. So, create a custom keyboard shortcut, shall we?

## Links

- [CHAPTER 3. GSETTINGS AND DCONF](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/desktop_migration_and_administration_guide/gsettings-dconf)
- [CHAPTER 9. CONFIGURING DESKTOP WITH GSETTINGS AND DCONF](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/desktop_migration_and_administration_guide/configuration-overview-gsettings-dconf)
- [How can I specify the default save directory for gnome-screenshot?](https://askubuntu.com/questions/114429/how-can-i-specify-the-default-save-directory-for-gnome-screenshot)
- [Bug 699642 - Change Autosave Location](https://bugzilla.gnome.org/show_bug.cgi?id=699642)
- [How to install Gnome Shell Extensions on Ubuntu 20.04 Focal Fossa Linux Desktop](https://linuxconfig.org/how-to-install-gnome-shell-extensions-on-ubuntu-20-04-focal-fossa-linux-desktop)
