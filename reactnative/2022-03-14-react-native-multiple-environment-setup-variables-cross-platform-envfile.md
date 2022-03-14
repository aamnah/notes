---
date: 2022-03-14
slug: react-native-multiple-environment-setup-variables-cross-platform-envfile
title: Setting up multiple environments in React Native in a cross-platform way and use variables in JS, Android and iOS projects
description: Setting up multiple environments in React Native in a cross-platform way so that it works on Windows, macOS and Linux. Then make the environment variable available for use in JavaScript, iOS and Android code
---

# Environment variables

```bash
npm install --save-dev cross-env
npm install react-native-config
```

The following is involved

1. Setting environment variables with `cross-env`
2. Loading env files (`.env.staging`) by setting `ENVFILE`
3. Using these env vars inside JS/Android/iOS

```bash
cross-env ENVFILE=.env.staging && react-native run-ios
```

```bash
# .env.staging
API_URL=https://myapi.com
GOOGLE_MAPS_API_KEY=abcdefgh
```

```js
import Config from 'react-native-config'

Config.API_URL // 'https://myapi.com'
Config.GOOGLE_MAPS_API_KEY // 'abcdefgh'
```

Additionally, you should also set `NODE_ENV`to be able to use it in places like `babel.config.js` to be able to configure plugins (e.g. remove all `console.log` statements from production environment) Setting `process.env.NODE_ENV` inside the code is not recommended

The final command that sets `NODE_ENV`, `ENVFILE` and runs the project would become

```bash
cross-env NODE_ENV=staging ENVFILE=.env.staging && react-native run-ios
```

## react-native-config

Environment variables are configured using [react-native-config](https://www.npmjs.com/package/react-native-config)

For multiple environments, you have to create different `.env` files and load them by configuring `ENVFILE` when running commands

By default `react-native-config` will read from `.env`, but you can change it when building or releasing your app.

```bash
ENVFILE=.env.staging && react-native run-ios
```

The files that store the variables are `.env`, `.env.staging` and `.env.production`. If you don't specify a file, `.env` will be used by default for development

## cross-env

The syntax for setting environment variables is different fro Bash, Windows and PowerShell, which makes it hard to save as an `npm` script for everyone's use

```bash
ENVFILE=.env.staging react-native run-ios           # bash
SET ENVFILE=.env.staging && react-native run-ios    # windows
env:ENVFILE=".env.staging"; react-native run-ios    # powershell
```

That's where `cross-env` comes in. A cross-platform command with `cross-env` would be

```bash
cross-env NODE_ENV=production ENVFILE=.env.production react-native run-ios  # bash, windows, powershell
```

Similarly, the following different commands

```bash
export NODE_ENV=production     # bash
SET NODE_ENV=production        # windows
$env:NODE_ENV="production";    # powershell
```

can be set in a cross-platform way using `cross-env` like so

```bash
cross-env NODE_ENV=production     # bash, windows, powershell
```

## Links

- [cross-env](https://www.npmjs.com/package/cross-env)
- [react-native-config](https://www.npmjs.com/package/react-native-config)
- [Node.js, the difference between development and production](https://nodejs.dev/learn/nodejs-the-difference-between-development-and-production)
