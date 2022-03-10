---
title: Notes on responsive screen dimensions in React Native
date: 2020-07-29
slug: responsive-screen-dimensions-react-native
---

### getting dimensions

- `Dimensions` for static values
- `useWindowDimensions` hook for responsive values, but it can only be used inside a React component (as opposed to something like a `Theme.ts` file)
- [react-native-responsive-dimensions](https://github.com/DaniAkash/react-native-responsive-dimensions) that offers both responsive values and hooks

### static vs. responsive values

`static` values won't constantly update when the window/screen size changes. On Android, the width and height can change for a variety of reasons: the screen orientation was changed, split screen view, freeform views where window size is smaller than screen size (e.g. floating Google maps) and so on. There are also foldable phones now!

`responsive` values keep updating themselves when the size changes

### window vs. screen

**tl;dr**: on Android

- `window`: reports width/height without the soft menu bar
- `screen`: reports entire screen's width/height

`window` height < `screen` height.

> Window Dimensions ﹣ which is the size of the window / view port on which your app is being displayed
> Screen Dimensions ﹣ this is the total screen dimensions of your device (your app may occupy the entire screen or only a portion of the screen)

## Links

- [Docs: Dimensions](https://reactnative.dev/docs/dimensions)
- [Docs: usewindowdimensions](https://reactnative.dev/docs/usewindowdimensions)
- [react-native-responsive-dimensions](https://github.com/DaniAkash/react-native-responsive-dimensions)
- [StackOverflow: What's the difference between 'window' and 'screen' in the Dimensions API](https://stackoverflow.com/a/44979327)
