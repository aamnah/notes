---
title: Setup a publish, build and distribute pipeline for Expo based React Native project
date: 2020-06-29
slug: expo-bitbucket-pipeline-build-publish-distribute-standalone-app
description: Automatically build your app and send it to the app store using Bitbucket Pipelines or Github Actions
tags:
  - CD
  - DevOps
---

Steps

- Generate a keystore
- Sign the app and set it up in the Play Console
- Setup Netlify to serve the app
- Export the app to Netlify's public URL
- Build the app and mention that URL (will be used for OTA)
- Send the builds (`.aab` and `.ipa`)to a distribution service (Firebase App Distribution or Microsoft AppCenter)

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

### Enable Bitbucket Pipelines and setup repository variables

- Go to _Repository settings > Pipelnines > Settings_ and turn the toggle ON for **Enable Pipleines**
- Click the **Configure bitbucket-pipelines.yml** button.
- It will take you to a page with a pre-filled template file. Click the **Commit file** button
- You'll be redirected to a confirmation page and then it'll run the pipeline for the first time.

Now we have a file called `bitbucket-pipelines.yml` in our repo that will contain all the steps to run for building and deploying the app. We'll come back to these settings later to setup repository variables once we have all the Expo and keystore values we need.

Now, setup repository variables. This will include all of the necessary information needed to sign your app, including the keystore location, keystore password, key name, and key password.

- `EXPO_ANDROID_KEYSTORE_BASE64` - base64-encoded Android keystore
- `EXPO_ANDROID_KEYSTORE_ALIAS` - Android keystore alias
- `EXPO_ANDROID_KEYSTORE_PASSWORD` - Android keystore password
- `EXPO_ANDROID_KEY_PASSWORD` - Android key password
- `EXPO_PUBLIC_URL` - URL where the app is published

Needed

- An app that is ready to be published
- Login details for Expo account

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

You can safely git ignore `.turtle`

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

## Links

- [Android Developers: Sign your app](https://developer.android.com/studio/publish/app-signing)
