---
title: notes on SafeAreaView in React Native
date: 2020-07-27
---

- the default `SafeAreaView` that comes with `react-native` only works on iOS devices, and only on iOS version 11 or later. Plus it can cause _jumpy behaviour_ when a screen is animating (according to React Navigation docs)
- the recommened alternative is [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context), which gives you `SafeAreaProvider`, `SafeAreaView` and `useSafeAreaInsets` etc, It works on Android as well as iOS.
- you can't set `padding` to a `SafeAreaView` because implementing it's own padding is part of its behaviour. If you apply padding rules in styles, they'll be ignored.
- you can however set padding on a `View` inside a `SafeAreaView`

## Links

- [react-native SafeAreaView](https://reactnative.dev/docs/safeareaview)
- [React Navigation v5 - Supporting safe areas](https://reactnavigation.org/docs/handling-safe-area/)
