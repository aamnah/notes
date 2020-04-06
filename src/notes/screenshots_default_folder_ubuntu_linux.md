---
path: screenshots_default_folder_ubuntu_linux
title: Changing default location for screenshots on Ubuntu
date: 2020-04-04
status: draft
---

```bash
gsettings set "org.gnome.gnome-screenshot" "auto-save-directory" "file:///home/$USER/screenshot"
```

https://askubuntu.com/questions/114429/default-save-directory-for-gnome-screenshot
