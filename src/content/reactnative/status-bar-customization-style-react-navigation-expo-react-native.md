---
title: Styling the StatusBar in React Native, Expo and React Navigation
date: 2020-08-26
slug: status-bar-customization-style-react-navigation-expo-react-native
---

- `StatusBar.currentHeight` is Android only (e.g. 49.14285659790039 on Pixel 3 XL with a notch), return `null` on iOS
- `Constants.statusBarHeight` from `expo-constants` works on both iOS and Android. (e.g. 20 on iPhone 5, 49 on Pixel 3 XL with a notch )
- `backgroundColor` is also Android only
- `SafeArea` excludes the `StatusBar`. If you don't use a `SafeArea`, the view will get inside the `StatusBar`

### StatusBar height in iOS

The height is pretty much always `20`, unless it's hidden or an app is active during an incoming call, in which case it is `40` points. Except iPhone X and iPhone 11 are different because they have notches..

### Drawing over and under

On iOS, your app will draw under the status bar. On Android, the app draws on top of the status bar. You can achieve similar behaviour for Android by setting `translucent` (Android only)

```jsx
<StatusBar translucent={true} backgroundColor={'transparent'} {...props} />
```

If we set `translucent={true}` on `StatusBar` then it'd behave consistently on both iOS and Adnroid, and you wouldn't have to set different values for things like `padding` and `height` in a custom header using Platform checks

### Coloring the StatusBar on iOS

Since `backgroundColor` is also Android only, you can not use it to set the background color for StatusBar in iOS.

What you can do instead is use the status bar inside a View that has padding at the top (equivalent to the height of status bar) and has a background color.

```tsx
<StatusBarBackground>
  <StatusBar barStyle="light-content" />
  <SafeAreaView>{/* Code goes here */}</SafeAreaView>
</StatusBarBackground>
```

```tsx
import Constants from 'expo-constants'

const headerHeight = 48

const StatusBarBackground = styled.View`
  background: salmon;
  padding-top: ${Platform.OS === 'ios' ? Constants.statusBarHeight : 0}px;
  height: ${Platform.OS === 'ios' ? Constants.statusBarHeight + headerHeight : headerHeight}px;
`
```

Notice that you had to keep the padding and height Platform specific. Because we are doing a workaround for background (color) on iOS, we are only adding extra padding to iOS. On Android, we can pass `backgroundColor` to the `<StatusBar>`. This can be avoided if we set `translucent={true}` on `StatusBar`, and then it'd behave consistently on both iOS and Android. By default `translucent` is `false` on Android

```tsx
<StatusBarBackground>
  <StatusBar translucent barStyle="light-content" />
  <SafeAreaView>{/* Code goes here */}</SafeAreaView>
</StatusBarBackground>
```

```tsx
import Constants from 'expo-constants'

const headerHeight = 48

const StatusBarBackground = styled.View`
  background: salmon;
  padding-top: ${Constants.statusBarHeight}px;
  height: ${Constants.statusBarHeight + headerHeight}px;
`
```

## Links

-[How to find height of status bar in Android through React Native?](https://stackoverflow.com/questions/35436643/how-to-find-height-of-status-bar-in-android-through-react-native)
