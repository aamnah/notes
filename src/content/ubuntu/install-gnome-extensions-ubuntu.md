---
title: How to install Gnome Extensions
date: 2020-08-09
slug: install-gnome-extensions-ubuntu
---

- Install GNOME Shell integration for [Chromium and Chrome](https://chrome.google.com/webstore/detail/gnome-shell-integration/gphhapmejobijbbhgpjhcjognlahblep?hl=en) or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/gnome-shell-integration/)
- then go to the extension page. For example: [Screenshot Locations](https://extensions.gnome.org/extension/1179/screenshot-locations/)
- click the ON/OFF toggle on the right
- It'll show you a confirmation popup, click Accept.

Now re-login. Open Tweaks, go to Extensions, and configure your extenison.

In case you don't have Gnome Tweaks installed:

```bash
sudo apt install -y gnome-Tweaks
```

There are also a bunch of extension available in official repos which are in-house extensions from Ubuntu developers that you might find useful. You can install them with this command:

```bash
sudo apt install -y gnome-shell-extensions
```
