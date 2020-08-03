---
title: Installing Google Play Store on AVD emulator devices
date: 2020-08-02
slug: play_store_emulator_install_missing
---

Why?
Not all AVD profiles come with Play Store installed. I needed a phone with a notch, and decided on Google Pixel XL, but turns out it didn't have Play Store installed

I found the answer on StackOverflow, and it's pretty straight forward. Compare the `config.ini` file with another AVD device that does has Play Store installed and then update the one for Google Pixel XL after figuring out the change

```bash
~/.android/avd/DEVICE_ID/config.ini
```

This is from the config that had Play Store installed (Pixel 3a)

```ini
PlayStore.enabled = true
image.sysdir.1 = system-images/android-29/google_apis_playstore/x86/
tag.display = Google Play
tag.id = google_apis_playstore
```

And this is how it was in Pixel 3 XL

```ini
PlayStore.enabled = false
image.sysdir.1 = system-images/android-30/google_apis/x86/
tag.display = Google APIs
tag.id = google_apis
```

![Screenshot: AVD Device config.ini differeneces](./avd_device_config_diff.png)

All i had to do was update the config, re-download the system image and then restart the device

```ini
PlayStore.enabled = true
image.sysdir.1 = system-images/android-30/google_apis_playstore/x86/
tag.display = Google Play
tag.id = google_apis_playstore
```

_Android Studio > Tools > AVD Manager_. Click Download for your device so that it installs the system image with Google Play

![Screenshot: Installing system image in AVD Manager](./avd_install_system_image_1.png)
![Screenshot: Installing system image in AVD Manager](./avd_install_system_image_2.png)
![Screenshot: Installing system image in AVD Manager](./avd_install_system_image_3.png)

IF you don't re-download the system image, you'll likely get the following when trying to run the emulator

```
PANIC: Cannot find AVD system path. Please define ANDROID_SDK_ROOT
```

~~Keep in mind that even though your device will now have Play Store, the Play Store icon will not appear next to your device in Device Manager~~ If you change `PlayStore.enabled` in `config.ini` to true, it'll start showing the Play Store icon next to the device in AVD Manager.

![Screenshot: AVD Manager before Play Store install on Google Pixel 3 XL](avd_manager_before_play_store.png)
![Screenshot: AVD Manager after Play Store install on Google Pixel 3 XL](avd_manager_after_play_store.png)

![Screenshot: Google Pixel 3 XL with Play Store](google_pixel_3_xl_play_store.png)

## Links

- [How to install Google Play app in Android Studio emulator?](https://stackoverflow.com/a/62436883/890814)
