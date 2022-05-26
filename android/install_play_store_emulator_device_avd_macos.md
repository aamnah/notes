---
date: 2022-05-26
title: Adding Google Play Store to an Android Emulator device on macOS
---

This is something that turned out to be fairly simple to do and took less than five minutes.

1. Turn off the emulator device

2. The Emulator device settings are in `~/.android/avd/EMULATOR_DEVICE_NAME.avd/config.ini`. (You can also find the emulator device's config folder by clicking options dropdown and selecting _Show on Disk_)

Set `PlayStore.enabled` to `true` and change `google_apis` in `image.sysdir.1` to `google_apis_playstore`

```bash
PlayStore.enabled=false
image.sysdir.1=system-images/android-32/google_apis/arm64-v8a/
```

will become:

```bash
PlayStore.enabled=true
image.sysdir.1=system-images/android-32/google_apis_playstore/arm64-v8a/
```

3. Wipe Data and Cold Boot the the emulator device. You should now see Play Store in apps.