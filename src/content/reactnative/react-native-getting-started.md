---
title: React Native - Getting Started
date: 2020-06-24
slug: react-native-getting-started
---

### Running the app

You need to run

```bash
npx react-native start
```

to start the app. And then

```bash
npx react-native run-android
```

to start the app in an Android emulator or on device.

The docs are a bit misleading here, as they only mention the `rnu-android` command. but if you run that directly, you'll get a red error saying script not found. So `npx react-native start` first and then in another Terminal, do `npx react-native run-android`

### Seeing changes and debugging

- Double tap `R` on keyboard to reload the app
- Press `Cmd` or `Ctrl + M` or shake your device to open the debug menu

### Linking libraries

From React Native 0.60 and higher, [linking is automatic](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md). So you **don't need to run** `react-native link`.

You'd still need to install `pods` and such to complete the link, e.g.

```bash
npx pod-install ios
```

### First steps

- Styles - `styled-components`
- Moving between screens - `react-navigation`
- Fetching data (hooks) - `swr`

#### Navigation

```bash
# install react-navigation
npm install @react-navigation/native

# install dependencies
npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view

# macOS
# npx pod-install ios
```

Now import `react-native-gesture-handler` as the first thing (otherwise the app may crash) and then wrap your entire app in `<NavigationContainer>`, like so:

```jsx
import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  return <NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
}
```

At this point your installation of react-navigation is done. Now come the _navigators_. There are different kinds: stack, drawer, tab.. Each navigator is it's own library, so you'll have to install them separately

- [react-navigation: Getting started](https://reactnavigation.org/docs/getting-started)
- [react-navigation: Hello React Navigation](https://reactnavigation.org/docs/hello-react-navigation)
