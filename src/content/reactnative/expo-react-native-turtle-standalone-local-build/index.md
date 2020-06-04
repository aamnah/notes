---
title: Building Expo React Native apps locally
description: Use turtle to build standalone apps on local machine and for CI
date: 2020-06-04
slug: expo-react-native-turtle-standalone-local-build
---

Right now when you run the expo build command, it puts you into a queue, and stores the build on Expo servers. I obviously don't want that because a queue slows me down (the build keeps failing..) and once the build is done i have to manually download it in order to be able to upload it somewhere else..

The answer to this is [turtle](https://github.com/expo/turtle), the standalone app builder service by Expo

```bash
npm install -g turtle-cli

turtle setup:android --sdk-version 37.0.0
```

## Java 8

You need to install Java 8 SDK as `turtle-cli` [only works with JDK 8](https://github.com/expo/turtle/issues/45#issuecomment-484444687). I had 11.0.7 (openjdk) installed on my Ubuntu machine.. The easy way is to install `openjdk` and change your Java version

```bash
sudo apt install -y openjdk-8-jdk-headless openjdk-8-jre
sudo update-alternatives --config java
```

![screenshot - terminal change java sdk version](./change-jdk-version-ubuntu.png)

The more complicated way is to download it from the Oracle website. See [this gist] for instructions on how to download without having to create and login to an Oracle account. Basically, you go to the downloads page, click the download you want, accept the checkbox for license, and instead of clicking the green download button you copy link location, and then you change the `otn` part to `otn-pub` and open that link in order to download.. (blekh)

```
https://download.oracle.com/otn-pub/java/jdk/8u251-b08/3d5a2bb8f8d4428bbe94aed7ec7ae784/jdk-8u251-linux-x64.tar.gz
https://download.oracle.com/otn-pub/java/jdk/8u251-b08/3d5a2bb8f8d4428bbe94aed7ec7ae784/jdk-8u251-windows-x64.exe
```

## Links

- [Building Standalone Apps on Your CI](https://docs.expo.io/distribution/turtle-cli/)
- [Turtle CLI](https://github.com/expo/turtle)
