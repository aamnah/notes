---
title: Setting up React Native development environment on Linux Ubuntu 20.04
date: 2020-06-24
slug: setup-development-environment-react-native
---

Checklist

- [x] Install Node
- [x] Install JDK
- [x] Install Watchman (optional)
- [x] Install Android Studio
- [ ] Install Android SDK
- [x] Configure Android environment variables
- [x] Setup physical Android device

The entire process above gets fairly simple once you have done it at least twice.. Most of it can be done via the Terminal and can be scripted. Installing the SDK is the one step that you have got to do from inside Android Studio..

### Node

```bash
# install nvm (Node Version Manager)
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

restart the Terminal now so that the `nvm` command is available

```bash
# install latest Node LTS with nvm
nvm install --lts
```

### Java Development Kit (JDK)

```bash
# install JDK version 8
sudo apt install -y openjdk-8-jdk-headless openjdk-8-jre
```

### Watchman

**Homebrew** now works on Linux!

```bash
# install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

will take some time installing core taps, around ~322mb in downloads..

Now, install Watchman with Homebrew

```bash
# install latest build from Github
brew install --HEAD watchman
```

### Setup physical android device

If your phone is not being detected, try using a different USB cable. Some cables only support charging and not data transfer

```bash
# lsusb
Bus 002 Device 004: ID 0e8d:201d MediaTek Inc. Infinix HOT 9
```

```
0e8d:201d
```

```
echo 'SUBSYSTEM=="usb", ATTR{idVendor}=="0e8d", MODE="0666", GROUP="plugdev"' | sudo tee /etc/udev/rules.d/51-android-usb.rules
```

At this point, if you run `adb devices`, you'll get

```
List of devices attached
054783604A010925	unauthorized
```

To fix that _unauthorized_, disconnect and reconnect your phone at this point. The next time you connect, it'll show you a **Allow USB debugging** popup. Tap **ALLOW**. Also check that box that says **Always allow from this computer** if you don't wanna do this every time..

Now if you run `adb devices`, you should see `device` instead of `unauthorized`

```
List of devices attached
054783604A010925	device
```

We're set at this point

### Setup physical device for live reloads

USB:

```bash
adb -s 054783604A010925 reverse tcp:8081 tcp:8081
```

### Android Studio

```bash
sudo snap install android-studio --classic
```

Update paths. The default install location for Android when installed using `snap` is `?`. I installed it in a custom location, so i provided that. Update this location.

You can find out the SDK location from _Android Studio > Tools > SDK Manager > Android SDK Location_

```bash
echo "

# Android PATHs
export ANDROID_HOME="/media/aamnah/Files/Dev/Android"
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
" >> ${HOME}/.bashrc
```

You can now confirm this with `which android`

## Links

- [Setting up the development environment](https://reactnative.dev/docs/environment-setup)
- [Running On Device](https://reactnative.dev/docs/running-on-device)
