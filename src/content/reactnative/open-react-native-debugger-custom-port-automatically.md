---
title: Opening React Native Debugger automatically on the correct port
date: 2020-08-11
slug: open-react-native-debugger-custom-port-automatically
description: How to open React Native Debugger on the right port depending on the project
---

the issues:

1. I work on both Expo and React Native projects. The ports for both are different, one works on port `19001` and the other on `8080`. React Native debugger always opens on the one default port in it's config, and i have to manually open a new window with the correct port every time i switch from working on Expo or React Native.
2. React Native opens a Chrome tab every time i start debugging, which i have to close in order to work with React Native Debugger

the solutions:

### Using a custom debugger for React Native

This one was an easy fix. React Native [allows you](https://reactnative.dev/docs/debugging#debugging-using-a-custom-javascript-debugger) to use a custom debugger instead of the default Chrome tab. You do that by setting a `REACT_DEBUGGER` environment variable. The value for `REACT_DEBUGGER` is whatever command you want to run. For example

```bash
REACT_DEBUGGER="node /path/to/launchDebugger.js --port 2345 --type ReactNative"
```

### Opening React Native Debugger on the right port depending on the project

And React Native Debugger allows automatically opening it on a custom `port` on macOS very easily, you pass the following for `REACT_DEBUGGER`

```bash
# React Native projects (with RN Debugger on custom port)
REACT_DEBUGGER="open -g 'rndebugger://set-debugger-loc?port=8001' ||" react-native start

# Expo projects (with RN Debugger on custom port)
REACT_DEBUGGER="unset ELECTRON_RUN_AS_NODE && open -g 'rndebugger://set-debugger-loc?port=19001' ||" npm start
```

But for Linux and Windows you'd use [react-native-debugger-open](https://github.com/jhen0409/react-native-debugger/tree/master/npm-package) for specifying the port to open with and the value for `REACT_DEBUGGER` . You also need to _manually open_ the debugger afterwards.

```bash
npm i --save-dev react-native-debugger-open
```

```bash
# Linux
REACT_DEBUGGER="rndebugger-open --open --port 8081" npm start

# Windows
set REACT_DEBUGGER="rndebugger-open --open --port 8081" && npm start
```

For Expo projects, you can pass `--expo` instead of `--port 1234`

```bash
# Linux
REACT_DEBUGGER="rndebugger-open --open --expo" npm start

# Windows
set REACT_DEBUGGER="rndebugger-open --open --expo" && npm start
```

After that, open React Native Debugger and it should automatically connect to the right port.

## Links

- [Debugging using a custom JavaScript debugger](https://reactnative.dev/docs/debugging#debugging-using-a-custom-javascript-debugger)
- [react-native-debugger](https://github.com/jhen0409/react-native-debugger)
- [react-native-debugger-open](https://github.com/jhen0409/react-native-debugger/tree/master/npm-package)
