---
title: Remove all console logs from a Staging/Production build of React Native
date: 2021-03-08
slug: remove-console-log-react-native-babel
---

```js
{
  "env": {
    "production": {
      "plugins": ["transform-remove-console"]
    }
  }
}
```

```js
{
  "plugins": [ ["transform-remove-console", { "exclude": [ "error", "warn"] }] ]
}
```

## Usage with `.env` files

I need to be able to determine which environment i am in to properly configure the plugin config in `.babel .config.js`. We only want to remove consoles from Production and keep them in Local Development.

The `` docs will tell you to set `process.env.NODE_ENV`. For example `process.env.NODE_ENV==='production'`. But i'm not setting that, i have `.env` files instead for my environment variables. Now how do i know which environment inside i am in in the babel config? That's where `babel-plugin-inline-dotenv` comes in.

```js
{
  "plugins": ["inline-dotenv"]
}
```

```js
{
  "plugins": [["inline-dotenv",{
    path: 'path/to/.env' // See motdotla/dotenv for more options
  }]]
}
```

Final `.babel.config.js`

```bash
npm i babel-plugin-transform-remove-console --save-dev
```

```js
const presets = ['module:metro-react-native-babel-preset']
const plugins = [
  [
    'module-resolver',
    {
      root: ['./src'],
      extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
      alias: {
        assets: './assets',
        src: './src',
        store: './src/store',
        sagas: './src/sagas',
        services: './src/services',
        components: './src/components',
        hooks: './src/hooks',
        helpers: './src/helpers',
        types: './src/types',
        utils: './src/utils',
      },
    },
  ],
]

module.exports = function (api) {
  api.cache(true)

  return {
    presets,
    plugins,
    env: {
      development: {
        plugins: [['inline-dotenv', { path: '.env' }]],
      },
      staging: {
        plugins: [['inline-dotenv', { path: '.env.staging' }], 'transform-remove-console'],
      },
      production: {
        plugins: [['inline-dotenv', { path: '.env.production' }], 'transform-remove-console'],
      },
    },
  }
}
```

Links
---

- [Common sources of performance problems](https://reactnative.dev/docs/performance#using-consolelog-statements)
- [babel-plugin-transform-remove-console](https://babeljs.io/docs/en/babel-plugin-transform-remove-console/)
- [](https://stackoverflow.com/a/57494657)
- [babel-plugin-inline-dotenv](https://github.com/brysgo/babel-plugin-inline-dotenv)