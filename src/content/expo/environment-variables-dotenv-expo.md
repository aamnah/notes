---
title: Environment variables in Expo projects
date: 2020-07-03
status: draft
---

`.env` is for _environment specific_ variables (DEBUG=true), it's not for storing secrets (API keys..)

The `process.env` property returns an object containing the user environment. Check out all the environment variables that are set

```
console.log(process.env);
```

You can't `process.env` use values in `app.json`, but you can use them in `app.config.js`. So, for example, `hooks.postPublish.config.authToken` for Sentry was in `app.json` before (as recommended in the docs), but if you use `app.config.js` you can load that auth token in via a secured environment variable.

On Windows, we use `set` to define environment variables while on Linux we use `export`

In React Native, `__DEV__` is a global variable with a boolean value that indicates whether you're running in development mode or not. iOS or Android simulators will have his value `true`

`__DEV__` can not be sed inside `babel.config.js`

Expo options:

- `babel-plugin-transform-inline-environment-variables` will replace environment variables values inside your code with `process.env.BLAH`, but you need to pass an `include` array while configuring it in Babel in order for any variable to work. [ref](https://github.com/babel/website/blob/master/docs/plugin-transform-inline-environment-variables.md). Will **NOT work with a `.env` file**

* How to load variable values from a file `.env`
* How to reference those values in config file `app.json`, `babel.config.js` etc.

For `production` to be available in code, you need to pass it when starting expo. Start the app/server in `production` mode

```bash
# setting env vars
NODE_ENV=production expo start
```

```bash
# require dotenv when running the script
node -r dotenv/config dotenv-example.js
```

`NODE_ENV` and `BABEL_ENV` are both undefined by default\

### Expo - Release channels

You can use release channels `--release-channel` to set _environment_ specific variable configuration. To set a release channel, you pass it when you run the command.

```bash
expo publish --release-channel prod-v1
```

And you can reference it with `Constants.manifest.releaseChannel`

```js
import { Constants } from 'expo'

console.log(Constants.manifest.releaseChannel)
```

## dotenv

- loads values from `.env` file
- config can be passed with `-r` when running the script
- [does not override existing env vars](https://github.com/motdotla/dotenv#what-happens-to-environment-variables-that-were-already-set). for example, you can't set `NODE_ENV` inside your `.env`

## dotenv vs. release channels

Release channels use `Constants.manifest.releaseChannel` to change things inside the code, while dotenv uses `process.env`. Both need some value to be passed while running the command. Neither can be used for secrets..

```ts
const getEnvVars = (env = '') => {
  if (env === null || env === undefined || env === '') return ENV.dev // since env is undefined, return dev as default.
  if (env.indexOf('dev') !== -1) return ENV.dev // this would pick up dev-v1, dev-v2, dev-v3
  if (env.indexOf('staging') !== -1) return ENV.staging
  if (env.indexOf('prod') !== -1) return ENV.prod
  return ENV.dev
}

export default getEnvVars(Constants.manifest.releaseChannel)
```

## react-native-dotenv

[react-native-dotenv](https://www.npmjs.com/package/react-native-dotenv) if you don't wanna deal with any native code integration. It can be used with Expo as well

- Create a `.env` file
- `npm i react-native-dotenv`
- Update `babel.config.js` to include the preset `"module:react-native-dotenv"`
- may need `'module:metro-react-native-babel-preset'` as well if an RN projet. Not sure about Expo as expo has `'babel-preset-expo'`

```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset', 'module:react-native-dotenv'],
}
```

- Now you can use it in JS files

```js
import { API_KEY, ANOTHER_CONFIG } from 'react-native-dotenv'

ApiClient.init(API_KEY, ANOTHER_CONFIG)
```

- Caveeat: ONLY supports _development_ `.env` and _production_ `.env.production` environment configs. Which kind of makes sense when you take into account that Xcode only has _Release_ and _Debug_ modes, and Android requires you to unistall the debug version in order to install the release version. [ref](https://www.youtube.com/watch?v=T9-d8ZSXdto)

- tl;dr: can't use sine i have `staging` as well

## Secrets!

[Not in the code](https://reactnative.dev/docs/security#storing-sensitive-info), never. Don't commit to git. Nope.

> Anything included in your code could be accessed in plain text by anyone inspecting the app bundle

The best place i could think of is as environment variables inside [Github Actions](https://docs.github.com/en/actions/configuring-and-managing-workflows/using-variables-and-secrets-in-a-workflow) or [Bitbucket Pipelines](https://support.atlassian.com/bitbucket-cloud/docs/variables-in-pipelines/). That way you can set them securely, manage who has access, and pass them to your build process.

Bitbucket has 3 different levels of environment variables

- Team and individual account variables
- Repository variables
- Deployment variables

and they can be _secured_, meaning you don't actually see the value after the variable has been set. Not in the settings, and not in the logs for the pipeline.

## Links

- [Environment variables in Expo](https://docs.expo.io/guides/environment-variables/)
- https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html
- [Node: process.env](https://nodejs.org/dist/latest/docs/api/process.html#process_process_env)
- [Working with Environment Variables in Node.js](https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html)
- [Dotenv tutorial](http://zetcode.com/javascript/dotenv/)
- [React Native: Security](https://reactnative.dev/docs/security)
- [dotenv](https://github.com/motdotla/dotenv)
- [per-env](https://github.com/ericclemmons/per-env)
- [Using Release Channels for Environment Variable Configuration](https://docs.expo.io/distribution/release-channels/?redirected#using-release-channels-for-environment-variable-configuration)
- [How to gracefully use Environment Variables in a React Native app](https://www.freecodecamp.org/news/how-to-gracefully-use-environment-variables-in-a-react-native-app/)
- [react-native-dotenv](https://www.npmjs.com/package/react-native-dotenv)
- [How to Run App in Production Mode | How to Debug React Native Apps in Development and Production](https://www.youtube.com/watch?v=T9-d8ZSXdto)
- [StackOverflow: Encrypting sensivite data in React Native and Expo](https://stackoverflow.com/a/44652157)
- [Node.js Everywhere with Environment Variables!](https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786)
