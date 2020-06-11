---
title: Beta testing your React Native app
discription: Making your app available for beta testers and distributing it to play stores
date: 2020-06-03
slug: beta-test-distribute-react-native-app
---

- [Fastlane](https://fastlane.tools/) (Android, iOS)
- [Firebase App Distribution](https://firebase.google.com/products/app-distribution) (Android, iOS)
- [Google Play Console](https://developer.android.com/distribute/console) (Android)
- [TestFlight](https://developer.apple.com/testflight/) (iOS)
- [App Center](https://appcenter.ms/) (iOS, Android, Windows)

### Fastlane

Fastlane takes screenshots as well. [Works well with react native](https://docs.fastlane.tools/getting-started/cross-platform/react-native/)

```bash
# install fastlane on Ubuntu
sudo apt install -y ruby ruby-dev
sudo gem install fastlane -NV
```

- [YouTube: Philippe Trepanier - Automate your React Native world with fastlane](https://www.youtube.com/watch?v=1K5OLv3moFg)
- [YouTube: MCE^3 - Felix Krause - Continuous Delivery for Mobile Apps Using Fastlane](https://www.youtube.com/watch?time_continue=1&v=wOtANfkh2bI)
- [Distribute Android apps to testers using fastlane](https://firebase.google.com/docs/app-distribution/android/distribute-fastlane?authuser=0)
