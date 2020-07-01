---
title: Expo builds vs. Turtle builds
date: 2020-07-01
slug: expo-build-vs-turtle-build
---

| Expo                                                                            | Turtle                                                                                 |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| App hosted on Expo servers                                                      | Self-hosted                                                                            |
| Calls Expo URL for future OTAs `exp://i3-kvb.ccheever.an-example.exp.direct:80` | Calls our server's URL for furture OTAs `http://build.myserver.com/android-index.json` |
| OTAs will fetch JS bundles and assets from Expo’s CDN                           | OTAs will fetch JS bundles and assets from your servers                                |
| Build is put in a build queue, you wait for your turn                           | No build queue                                                                         |
| ~ 32 minutes in pipeline                                                        | ~ minutes in pipeline                                                                  |

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
