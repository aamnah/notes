---
title: Styling the StatusBar in React Native, Expo and React Navigation
date: 2020-08-26
slug: status-bar-customization-style-react-navigation-expo-react-native
---

- `StatusBar.currentHeight` is Android only (e.g. 49.14285659790039 on Pixel 3 XL with a notch), return `null` on iOS
- `Constants.statusBarHeight` from `expo-constants` works on both iOS and Android. (e.g. 20 on iPhone 5, 49 on Pixel 3 XL with a notch )
- `backgroundColor` is also Android only
- `StatusBar` needs to be outside of the `SafeArea` for it to render properly
- `SafeArea` excludes the `StatusBar`. If you don't use a `SafeArea`, the view will get inside the `StatusBar`
- Set `translucent` on the status bar to make it behave consistently on iOS and Android. Doing so will make your life easier. Not doing so will means you'll always add Platform specific code.

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

Notice that you had to keep the padding and height Platform specific. Because on iOS the status bar draws under the status bar, we are only adding extra padding on iOS. On Android, we can pass `backgroundColor` to the `<StatusBar>`, and the default behaviour for the app is to draw over the status bar. This can be avoided if we set `translucent={true}` on `StatusBar`, and then it'd behave consistently on both iOS and Android. By default `translucent` is `false` on Android

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

### `translucent` with `headerTransparent: true`

```jsx
<StatusBar translucent barStyle="light-content" />
```

But this will give you issues with React Navigation if you use `headerTransparent` `true` for the default navigation header. You'll have to manually add a margin top to avoid content flowing under the status bar

It appears that React Navigation default header doesn't expect Android's Status Bar to be translucent when you set `headerTransparent` to be `true`. When you do set `headerTransparent: true`, you also have to set `headerForceInset: { vertical: 'never' }` for it to not show any extra empty space, specially for _nested_ headers.

```js
<StatusBar translucent={false} />
```

```js
// Translucent header, StatusBar should have translucent={false}
headerTransparent: true,
headerShown: true,
headerForceInset: { vertical: 'never' }, // get rid of extra empty space at top
headerStyle: { marginTop: Platform.OS === 'ios' ? Dimension.statusBarHeight : 0 },
```

```js
if (Platform.OS === 'android') {
  // removes extra space at top of header on android
  // SafeAreaView.setStatusBarHeight(0)
}
```

## Links

- [How to find height of status bar in Android through React Native?](https://stackoverflow.com/questions/35436643/how-to-find-height-of-status-bar-in-android-through-react-native)
- [headerTransparent](https://reactnavigation.org/docs/stack-navigator/#headertransparent)
