---
title: Troubleshooting and Debugging React Native
date: 2020-08-08
slug: troubleshooting-debugging-react-native
---

![Screenshot for 500 error](./error_500.png)

```
The development server returned response error code: 500
```

```
error: ReferenceError: SHA-1 for file node/v12.18.0/lib/node_modules/react-native/node_modules/metro/src/lib/polyfills/require.js (node/v12.18.0/lib/node_modules/react-native/node_modules/metro/src/lib/polyfills/require.js) is not computed
```

Turns out i had `react-native` insatlled globally instead of `react-native-cli`. If you have both `react-native` and `react-native-cli` installed, it'll be messed up..

Solution is simple

```bash
npm uninstall -g react-native
npm i -g react-native-cli

# OR

yarn global remove react-native
yarn global add react-native-cli
```

Or just use `npx`.
