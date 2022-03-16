---
title: Environment variables in Expo using Release Channels
slug: environment-variables-release-channels-expo
date: 2020-07-13
---

- You can reference the release channel with `Constants.manifest.releaseChannel`. It's part of `expo-constants`
- Default values for `releaseChannel` are:
  - `undefined` in dev mode
  - `default` in production
- `Constants.manifest.releaseChannel` does NOT exist in dev mode, it'll return `undefined`. It does exist, however when you explicitly publish / build with it.
- If you don't specify a release channel, it'll publish to a channel called `default`

Here's what i use, it uses `indexOf` to accomodate for different variations in channel names and `__DEV__` to set default environment when `releaseChannel` is `undefined`

```ts
import Constants from 'expo-constants'

const ENV = {
  develop: {
    API_URL: 'https://api-dev.myapp.net/v1',
  },
  staging: {
    API_URL: 'https://api-stg.myapp.net/v1',
  },
  production: {
    API_URL: 'https://api.myapp.net/v1',
  },
}

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // Default values for `releaseChannel` are `undefined` in dev mode and `default` in production
  if (__DEV__) {
    return ENV.develop
  }

  // using `indexOf` will let you pick up dev, develop, development, dev-v1, dev-v2, dev-v3, and so on..
  // Returns `-1` if the value is not found.
  if (env.indexOf('dev') !== -1) return ENV.develop
  if (env.indexOf('staging') !== -1) return ENV.staging
  if (env.indexOf('prod') !== -1) return ENV.production
  return ENV.develop // If you do not specify a channel, you will publish to the `default` channel.
}

export default getEnvVars()
```

here's how you'd use it in another file

```js
import ENV from '../../environment'

const activityUrl = `${ENV.API_URL}/activity`
```

here's how `indexOf` works: if the `env` string contains the string `dev`, it'll return the index of where it occurs. if `env` starts with `dev`, it'll return `0`. if it returned `-1`, then the substring wasn't found inside the `env` string

```js
let env1 = 'development'
console.info(env1.indexOf('dev')) // 0

let env2 = 'dev'
console.info(env2.indexOf('dev')) // 0

let env3 = 'develop'
console.info(env3.indexOf('dev')) // 0

let env4 = 'dev-v1'
console.info(env4.indexOf('dev')) // 0

let env5 = 'develop-v3'
console.info(env5.indexOf('dev')) // 0

let env6 = 'prod-v3'
console.info(env6.indexOf('dev')) // -1

let env7 = 'development'
console.info(env7.indexOf('ment')) // 7
```

Here's Peter Piekarczyk's snippet:

```ts
import { Constants } from 'expo'

const ENV = {
  dev: {
    apiUrl: 'http://localhost:1337/api',
  },
  staging: {
    apiUrl: 'https://staging.orchard.ai/api',
  },
  prod: {
    apiUrl: 'https://orchard.ai/api',
  },
}

function getEnvVars(env = '') {
  if (env === null || env === undefined || env === '') return ENV.dev
  if (env.indexOf('dev') !== -1) return ENV.dev
  if (env.indexOf('staging') !== -1) return ENV.staging
  if (env.indexOf('prod') !== -1) return ENV.prod
}

export default getEnvVars(Constants.manifest.releaseChannel)
```

and here's Alex's snippet:

```ts
import Constants from 'expo-constants'

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.dev
  } else if (env === 'staging') {
    return ENV.staging
  } else if (env === 'prod') {
    return ENV.prod
  }
}

export default getEnvVars
```

```js
// Import getEnvVars() from environment.js
import getEnvVars from '../environment'
const { apiUrl } = getEnvVars()
```

## Links

- [Expo: Release Channels](https://docs.expo.io/distribution/release-channels/)
- [Environment Variables in Expo using Release Channels](https://medium.com/@peterpme/environment-variables-in-expo-using-release-channels-4934594c5307)
- [Environment Management in Expo](https://alxmrtnz.com/thoughts/2019/03/12/environment-variables-and-workflow-in-expo.html)
- [String.prototype.indexOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf)
