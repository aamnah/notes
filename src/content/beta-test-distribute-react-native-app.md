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
- [App Center](https://appcenter.ms/) (iOS, Android, Windows, Xamarin, React Native)

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

### Automated UI Testing

App Center, Play Connsole, Firebase Test Lab

### App Center

- Continuous integratiion
- Testing
- Analytics
- Push Notifications
- Live updates (Code Push)

App Center uses fastlane under the hood

- [The NEW Visual Studio App Center!](https://www.youtube.com/watch?v=po5bL7vLbQU)
- [React Native EU 2019: Nick de Jesus - Continuous Integration With Microsoft App Center](https://www.youtube.com/watch?v=zLY2a5enUhE)

### CodePush vs. RemoteConfig vs. Expo OTA
