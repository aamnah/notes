---
title: Expo builds vs. Turtle builds
date: 2020-07-01
lastmod: 2020-07-02
slug: expo-build-vs-turtle-build
---

| Expo                                                                            | Turtle                                                                                 |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| App hosted on Expo servers                                                      | Self-hosted                                                                            |
| Calls Expo URL for future OTAs `exp://i3-kvb.ccheever.an-example.exp.direct:80` | Calls our server's URL for furture OTAs `http://build.myserver.com/android-index.json` |
| OTAs will fetch JS bundles and assets from Expo’s CDN                           | OTAs will fetch JS bundles and assets from your servers                                |
| Build is put in a build queue, you wait for your turn                           | No build queue                                                                         |
| ~ 32 minutes in pipeline                                                        | ~ 8 minutes in pipeline                                                                |

The entire pipeline including installing JDK, setting up Android SDK, the actual build of the app bundle, and uploading of the artifacts took less than 8 minutes.

```bash
# Expo build
expo build:android --release-channel production
```

```bash
# Turtle build
EXPO_ANDROID_KEYSTORE_PASSWORD=${EXPO_ANDROID_KEYSTORE_PASSWORD}
EXPO_ANDROID_KEY_PASSWORD=${EXPO_ANDROID_KEY_PASSWORD}
turtle build:android \
  --keystore-path ${EXPO_ANDROID_KEYSTORE_PATH} \
  --keystore-alias ${EXPO_ANDROID_KEYSTORE_ALIAS} \
  --public-url "${PUBLIC_URL}/android-index.json" \
  --release-channel "production"
```

### Over The Air (OTA) updates

The Over The Air (OTA) updates work by calling the URL where your app's JS bundle and assets are hosted. With apps built with `expo build`, it is hosted and handled on Expo servers. For `turtle` builds, you usually pass a `--public-url` option specifying the URL the app is supposed to call for updates.

If the `--public-url` you specified is offline or unreachable, the app could result in a blank white screen. This was the case for my app where i had set `updates.checkAutomatically` to `ON_LOAD` which basically means that it would check for updates every time the app was loaded. This combined with no error-handling for this scenario resulted in a blank white screen on app load and 500 errors in Sentry because the URL couldn't be reached

### Self-hosting and Publishing

It is possible to publish your app on Expo servers and then build it with Turtle CLI. This saves you from self-publishing the app and maintaining servers.

Instead of providing `--public-url`, you'd save `EXPO_USERNAME` and `EXPO_PASSWORD` as environment variables.

But this flow only works if you have an [Expo developer account](https://expo.io/developer-services) which is \$29/m

I'm using Netlify to self-host the app. It's an additional step in the build pipeline, but it's free to use once setup (and gives you 800 build minutes per month for automated deploys). I love Netlify!
