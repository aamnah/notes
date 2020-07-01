---
title: Setup a publish, build and distribute pipeline for Expo based React Native project
date: 2020-06-29
lastmod: 2020-07-01
slug: expo-bitbucket-pipeline-build-publish-distribute-standalone-app
description: Automatically build your app and send it to the app store using Bitbucket Pipelines or Github Actions
tags:
  - CD
  - DevOps
  - Expo
---

Steps

- Build your app and let Expo manage your key

- Generate a keystore
- Sign the app and set it up in the Play Console
- Setup Netlify to serve the app
- Export the app to Netlify's public URL
- Build the app and mention that URL (will be used for OTA)
- Send the builds (`.aab` and `.ipa`)to a distribution service (Firebase App Distribution or Microsoft AppCenter)

The reason i'm building with `turtle` and not with `expo` is because Expo builds are put in a build queue, which can take up to 45 minutes to build your app.. I can not waste this many minutes in a CI/CD pipeline. For reference, the Bitbucket free plan gives you only 50 build minutes for an entire month. I actually ran out of build minutes while putting the pipeline together..

Github gives your 2000 action minutes though. Go Github!

Needed

- An app that is ready to be published
- Login details for Expo account

### Sign your app

You need to build and upload your first `apk` in order to enrol into App Signing by Google Play

Note that you'll have to enable/create a release track in order to enable app signing.

How it works

1. You digitally sign each release using your upload key before publishing it to a track in the Play Console.
2. Google Play uses the upload certificate to verify your identity and then re-signs your release using the app signing key for distribution.

- Upload key/certificate > You use it to sign your app for upload to Play Store. Can be reset if lost.
- App signing key > Managed by Google, which you can't access or download. You can not retrieve a copy of it, and you can't delete it form Google servers without deleting the app

> The key with which you sign your app becomes your app’s upload key

> If you want to use the same signing key across multiple stores, make sure to provide your own signing key when you opt in to app signing by Google Play, instead of having Google generate one for you.

So, if you want to use your own app signing key and are sure you can keep it secure and will never lose it, you need to provide Google with your own key. You do that when you're opting in to App Signing by Google Play

Think of the _app signing key_ as the master key and the _upload key_ as an additional key on top of it. If Google generates the app signing key, they own it.

### Setup Netlify to serve the app

- Add a site from your repo
- Set the **Publish directory** to `dist`
- Note the domain URL for your Netlify app. This is the URL we'll pass to the Expo and Turtle build commands, and it'll be called for OTA updates. You can add a custom domain if you want, but i will not go through that step in this article.

My app's URL is now: `https://expo-devops-pipeline.netlify.app/`

### Setting up the app in the Play Console

### Build the app for the first time

You need to build the app at least once for it to generate a _keystore_. If you have already done this then skip this step.

Before building, make sure your config file contains the required Android and iOS config. This includes version numbers and package names to identify your app builds.

```json
{
  "expo": {
    "name": "Your App Name",
    "icon": "./path/to/your/app-icon.png",
    "version": "1.0.0",
    "slug": "your-app-slug",
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourappname",
      "buildNumber": "1.0.0"
    },
    "android": {
      "package": "com.yourcompany.yourappname",
      "versionCode": 1
    }
  }
}
```

then login to your Expo account with `expo login` and run

```bash
expo build:android
```

and when prompted select the first option to **Generate new keystore** (previously it used to be _Let Expo handle the process!_)

```
✔ Choose the build type you would like: › app-bundle
Checking if there is a build in progress...

Configuring credentials for forcespenpals in project expo-devops-pipeline
✔ Would you like to upload a Keystore or have us generate one for you?
If you don't know what this means, let us generate it! :) › Generate new keystore
Keystore updated successfully
Unable to find an existing Expo CLI instance for this directory; starting a new one...
Starting Metro Bundler on port 19001.
Publishing to channel 'default'...
Building iOS bundle
Building Android bundle
Finished building JavaScript bundle in 25430ms.
Analyzing assets
Finished building JavaScript bundle in 21802ms.
Finished building JavaScript bundle in 969ms.
Finished building JavaScript bundle in 943ms.
Uploading assets
No assets changed, skipped.
Processing asset bundle patterns:
- /media/aamnah/Files/Projects/expo-devops-pipeline/**/*
Uploading JavaScript bundles
Publish complete

The manifest URL is: https://exp.host/@aamnah/expo-devops-pipeline. Learn more.
The project page is: https://expo.io/@aamnah/expo-devops-pipeline. Learn more.
› Closing Expo server
› Stopping Metro bundler
Checking if this build already exists...

Build started, it may take a few minutes to complete.
You can check the queue length at https://expo.io/turtle-status

You can make this faster. 🐢
Get priority builds at: https://expo.io/settings/billing

You can monitor the build at

 https://expo.io/dashboard/aamnah/builds/47defda7-9a59-47fa-be54-b9f2c5d4ce31

Waiting for build to complete.
You can press Ctrl+C to exit. It won't cancel the build, you'll be able to monitor it at the printed URL.
⠏ Build queued...

...
```

After it has been successfully built, get the details for the keystore with

```bash
expo fetch:android:keystore
```

```
Configuring credentials for aamnah in project expo-devops-pipelinezu
Saving Keystore to /media/aamnah/Files/Projects/expo-devops-pipeline/expo-devops-pipeline.jks
Keystore credentials
  Keystore password: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  Key alias:         xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  Key password:      xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  Path to Keystore:  /media/aamnah/Files/Projects/expo-devops-pipeline/expo-devops-pipeline.jks
```

You'll need to provide these to `turtle` when we build the standalone apps with it

### Enable Bitbucket Pipelines and setup repository variables

- Go to _Repository settings > Pipelnines > Settings_ and turn the toggle ON for **Enable Pipleines**
- Click the **Configure bitbucket-pipelines.yml** button.
- It will take you to a page with a pre-filled template file. Click the **Commit file** button
- You'll be redirected to a confirmation page and then it'll run the pipeline for the first time.

Now we have a file called `bitbucket-pipelines.yml` in our repo that will contain all the steps to run for building and deploying the app. We'll come back to these settings later to setup repository variables once we have all the Expo and keystore values we need.

Now, setup repository variables. This will include all of the necessary information needed to sign your app, including the keystore location, keystore password, key name, and key password.

- `EXPO_ANDROID_KEYSTORE_BASE64` - base64-encoded Android keystore
- `EXPO_ANDROID_KEYSTORE_PASSWORD` - Android keystore password
- `EXPO_ANDROID_KEYSTORE_ALIAS` - Android keystore alias
- `EXPO_ANDROID_KEY_PASSWORD` - Android key password
- `EXPO_PUBLIC_URL` - URL where the app is published

Also, `git pull` in your project to start editing the file locally

### Encoding and decoding the keystore

I am not going to commit the keystore file to git, but i need to use it in the pipeline..

The solution is to **base64** encode the key, save it as a repository variable, and then decode and save the key in a file as part of the build step. Then i'll save that key as an _artifcat_ so that i am able to use it in further steps.

To encode the key

```bash
openssl base64 -A -in keystore.jks
```

On macOS, you can base64-encode the contents of a file and copy the string to the clipboard by running `base64 some-file | pbcopy` in a terminal.

To decode the key (saved as a variable) and save it in a file

```bash
echo $DEBUG_KEYSTORE_BASE64 | base64 --decode > keystore.jks
```

In the pipeline i have defined it as a step of it's own

```yaml
- step: &decode-keystore
    name: Decode the keystore
    script:
      - echo ${EXPO_ANDROID_KEYSTORE_BASE64} | base64 --decode > keystore.jks
    artifacts:
      - keystore.jks
```

### Setting up the pipeline

Now we start editing the `bitbucket-pipelines.yml` file. You can validate the file [here](https://bitbucket-pipelines.prod.public.atl-paas.net/validator)

#### npm ci

- removes existing `node_modules/` before installation
- only works if a lockfile (`package-lock.json`) exists

#### npx

- `npx expo publish --clear` (as mentioned in [Expo docs](https://docs.expo.io/guides/setting-up-continuous-integration/)) doesn't work. You have to install it inside the pipeline

#### --unsafe-perm

The `--unsafe-perm` flag avoids the following error when installing npm packages

```
ERR! sharp EACCES: permission denied, mkdir '/root/.npm'
```

#### YAML Anchors

You can define and re-use steps with YAML anchors.

- anchor `&` to define a chunk of configuration
- alias `*` to refer to that chunk elsewhere

```yaml
image: node:latest

definitions:
  caches:
    npm: '${HOME}/.npm'
    jest: .jest
  steps:
    - step: &expo-publish
        name: Publish to Expo
        caches:
          - npm
          - node
        script:
          - npm ci
          - npm i -g expo-cli
          - expo login -u ${EXPO_USERNAME} -p ${EXPO_PASSWORD}
          - expo publish --clear

pipelines:
  default:
    - step: *expo-publish
```

- the `>-` symbol is for non white space multiple lines.

#### Changing --release-channel based on branch or deployment

The cleaner way of doing this is with **Deployment variables** defined in Settings. Based on the deployment, the variable `RELEASE_CHANNEL` will have different values. Make sure you also specify `deployment` in your `step` for `RELEASE_CHANNEL` to change accordingly.

```yaml
- expo publish --non-interactive --clear --release-channel ${RELEASE_CHANNEL} # make sure your have Deployment variables set
```

The hacky way of doing this is to run `if` statements to check the branch and setting the `--release-channel` values accordingly

```yaml
# Publish to Expo server (change release channels based on branches)
- if [[ ${BITBUCKET_BRANCH} = develop ]]; then expo publish --clear --release-channel develop; fi
- if [[ ${BITBUCKET_BRANCH} = staging ]]; then expo publish --clear --release-channel staging; fi
- if [[ ${BITBUCKET_BRANCH} = master ]]; then expo publish --clear --release-channel production; fi
```

```yaml
# Build standalone app
- expo export --public-url ${EXPO_PUBLIC_URL} # will publish the app to dist/ folder, which is being served by Netlify
- expo build:ios --public-url ${EXPO_PUBLIC_URL}/index.json # build iOS app
- expo build:android --public-url ${EXPO_PUBLIC_URL}/android-index.json # build Andorid app
```

```bash
EXPO_ANDROID_KEYSTORE_PASSWORD="${EXPO_ANDROID_KEYSTORE_PASSWORD}" \
EXPO_ANDROID_KEY_PASSWORD="${EXPO_ANDROID_KEY_PASSWORD}"

turtle build:android \
  --type "app-bundle" \
  --build-dir "~/expo-apps" \
  --mode "release" \
  --release-channel "production"
  --keystore-path /media/aamnah/Files/Sites/fppreactnative/fppreactnative.jks \
  --keystore-alias ${EXPO_ANDROID_KEYSTORE_ALIAS} \
  --public-url "${EXPO_PUBLIC_URL}/android-index.json" \
```

```bash
turtle build:android --help
```

```
Usage: build:android|ba [options] [project-dir]

Build a standalone APK or App Bundle for your project, either signed and ready for submission to the Google Play Store or in debug mode.

Options:
  -u --username <username>          username (you can also set EXPO_USERNAME env variable)
  -p --password <password>          password (you can also set EXPO_PASSWORD env variable)
  -d --build-dir <build-dir>        directory for build artifact (default: `~/expo-apps`)
  -o --output <output-file-path>    output file path
  --public-url <url>                the URL of an externally hosted manifest (for self-hosted apps), only HTTPS URLs are supported!
  --release-channel <channel-name>  pull from specified release channel (default: default)
  -c --config <config-file>         specify a path to app.json
  --keystore-path <app.jks>         path to your Keystore (please provide Keystore password and Key password as EXPO_ANDROID_KEYSTORE_PASSWORD and EXPO_ANDROID_KEY_PASSWORD env variables)
  --keystore-alias <alias>          keystore Alias
  -t --type <build>                 type of build: app-bundle|apk (default: "app-bundle")
  -m --mode <build>                 type of build: debug|release (default: "release")
  -h, --help                        output usage information
```

You can safely git ignore `.turtle`

### Troubleshooting

```
ERROR: Failed to build standalone app
  err: Error: Couldn't find app.json.
```

Turtle only works with `app.json` and not `app.config.js` or `app.config.ts`. Changed back to `app.json` and it worked.

## Links

- [Android Developers: Sign your app](https://developer.android.com/studio/publish/app-signing)
- [YAML anchors](https://support.atlassian.com/bitbucket-cloud/docs/yaml-anchors/)
- [Where to Store Android KeyStore File in CI/CD Cycle?](https://android.jlelse.eu/where-to-store-android-keystore-file-in-ci-cd-cycle-2365f4e02e57)
- [Bitbucket Pipeline Hack: Wrapping multiline script command](https://community.atlassian.com/t5/Bitbucket-articles/Bitbucket-Pipeline-Hack-Wrapping-multiline-script-command/ba-p/1289800?lightbox-message-images-1289800=81455iF5C825E5ED5537CA)
- [Automating Standalone Expo App Builds and Deployments with Fastlane and Expo CLI](https://blog.expo.io/automating-standalone-expo-app-builds-and-deployments-with-fastlane-exp-and-exptool-9b2f5ad0a2cd)
- [Deploy build artifacts to Bitbucket Downloads](https://support.atlassian.com/bitbucket-cloud/docs/deploy-build-artifacts-to-bitbucket-downloads/)
- [Bitbucket Pipelines share SOME steps between branches](https://stackoverflow.com/a/50173421/890814)
- [How to access deployment environment variables in more than one step?](https://community.atlassian.com/t5/Bitbucket-questions/How-to-access-deployment-environment-variables-in-more-than-one/qaq-p/1073876)
- [Get started with Netlify CLI](https://docs.netlify.com/cli/get-started/)
