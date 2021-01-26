---
title: Reset password on Ubuntu
date: 2021-01-25
slug: reset_ubuntu_password
---

1. Boot into recovery mode
2. Root – Drop to root shell prompt
3. Press Enter to get the prompt back
4. Run `mount -rw -o remount /` to remount the root partition with write access
5. Change password with `passwd USERNAME`

By default the `root` user on Ubuntu has no password, hence you being able to drop to root and changing the other user's password. The `root` user is also supposed to be disabled by default, not sure why dropping down to it was so simple.

After you have done this, you'll be able to login. But then the authentication prompts (e.g. when you run software update) will not accept the new password, it still recognizes the old password.

## Links

- [How to Reset Ubuntu Password in 2 Minutes](https://itsfoss.com/how-to-hack-ubuntu-password/)
