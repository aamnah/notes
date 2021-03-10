---
title: notes on SafeAreaView in React Native
date: 2020-07-27
---

- the default `SafeAreaView` that comes with `react-native` only works on iOS devices, and only on iOS version 11 or later. Plus it can cause _jumpy behaviour_ when a screen is animating (according to React Navigation docs)
- the recommened alternative is [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context), which gives you `SafeAreaProvider`, `SafeAreaView` and `useSafeAreaInsets` etc, It works on Android as well as iOS.
- you can't set `padding` to a `SafeAreaView` because implementing it's own padding is part of its behaviour. If you apply padding rules in styles, they'll be ignored.
- you can however set padding on a `View` inside a `SafeAreaView`

### React Navbigation and Safe area

- React Navigation handles safe area inside it's default header. If you use the default header as well as a `SafeArea` then expect weird behaviour
- If you're using a custom header, make sure your UI is within safe area
- `SafeArea` is no longer exported by `react-navigation` v5. Previously you could `import { SafeAreaView } from "react-navigation"`
- React Navigation recommends using [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context)
- When using _nested headers_, you get extra empty space at the top on Android but not on iOS

If using default header, don't use `SafeArea`, default header handles both Android and iOS.

If you use default header and `SafeArea` both, you get extra empty space at the top in _nested_ headers.

On Android, React Navigation default header shows extra empty space at top when it's a _nested_ header

```
headerForceInset: { top: 'never', bottom: 'never' },
```

```
headerForceInset: { vertical: 'never' }, // get rid of extra empty space at top
```

### iOS

- On iOS if you don't add the `SafeArea`, the screen gets inside the status bar

## Links

- [react-native SafeAreaView](https://reactnative.dev/docs/safeareaview)
- [React Navigation v5 - Supporting safe areas](https://reactnavigation.org/docs/handling-safe-area/)
