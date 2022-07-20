---
title: Setup dev environment for React Native CLI (macOS / Ubuntu)
date: 2022-07-20
slug: install-react-native-dev-environment
---

Requirements
- Node 14+
- JDK 8+ 
- Android 12 (S)
- [Android Studio](https://developer.android.com/studio)
- [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12)

# Pre-requisite dependencies

```bash
# Homebrew - to make our lives easier
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew --version

# Node (with NVM) - to run JavaScript from terminal
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

echo 'export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm' >> ~/.zprofile

nvm install --lts
nvm alias default node
node --version

# Watchman - for watching for changes to files in the project
brew install watchman
watchman --version
```

# macOS 

```bash
# CocoaPods - to bring in 3rd party packages written in Objective-C or Swift
brew install cocoapods
echo "export LANG=en_US.UTF-8" >> ~/.zprofile
pod --version

# JDK - to compile Android apps
brew install openjdk # installs openjdk@18
```

## Xcode
[Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12) is Apple's IDE (integrated development environment) for building Mac, iOS, watchOS, and tvOS apps. It supports the Objective-C and Swift languages. We need it for React Native in order to use its build tools, which allows us to compile the native code necessary to build React Native apps.

```bash
# Install Command Line Tools
xcode-select --install
```

- (Xcode Menu Items) Xcode ▶ Preferences ▶ Location ▶ Command Line Tools ▶ Select appropriate command line tool
- (Xcode Menu Items) Xcode ▶ Preferences ▶ Components ▶ Install your preferred iOS Simulator

# Linux / Ubuntu
## JDK 

```bash
sudo apt install -y openjdk-18-jdk
```

If you previously had a JDK installed or have multiple versions, you'll have to set the appropriate version and also update the `PATH` to reflect the correct version

```bash
# get versions installed and their paths
update-java-alternatives --list

# set java version
sudo update-java-alternatives --set /usr/lib/jvm/java-1.18.0-openjdk-amd64
```

Update the `$JAVA_HOME` env var

```bash
echo "
export JAVA_HOME='/usr/lib/jvm/java-1.18.0-openjdk-amd64'
" >> ~/.zprofile
```

# ANDROID_HOME

When you run `npx react-native run-android`, React Native needs to know where all of the Android dependencies live. This environment variable (`ANDROID_HOME`) is where it'll look.



```bash
echo "export ANDROID_HOME=\$HOME/Library/Android/sdk
export PATH=\$PATH:\$ANDROID_HOME/emulator
export PATH=\$PATH:\$ANDROID_HOME/tools
export PATH=\$PATH:\$ANDROID_HOME/tools/bin
export PATH=\$PATH:\$ANDROID_HOME/platform-tools" >> ~/.zshrc
```


Getting started with a new project

```bash
npx react-native init myAwesomeProject
cd myAwesomeProject

# for iOS:
npx react-native run-ios
# for Android:
npx react-native run-android
```

# Expo 
Expo has some major advantages over "vanilla" (unmodified) React Native:

- No need for Xcode or Android Studio to get started
- Develop iOS and Android apps on a Windows or Linux machine, if you don't have a Mac
- Just JavaScript (or TypeScript) -- no Java or Objective-C
- Experimental support for publishing to web as well

It also has some limitations:

- Not all iOS and Android APIs are available yet
- The SDK doesn't support all types of background code execution
- If you need to keep your app size extremely lean, the managed workflow may not be the best choice
- Native libraries to integrate with proprietary services are usually not included in the SDK
- The only supported push notification service is the Expo notification service
- The minimum supported OS versions are Android 5+ and iOS 10+

If you run into one of the limitations and need to go beyond Expo, they do provide a way to eject from the managed service and continue on with ExpoKit.

```bash
npm install -g expo-cli
expo init MyApp
```

Links
---

- [Docs: Setting up the development environment](https://reactnative.dev/docs/environment-setup)