---
title: Changing from Expo generated Android keystore to Google App Signing Certificate
date: 2020-02-07
lastmod: 2020-06-03
slug: change_expo_keystore_google_app_signing_cert
---

1. Opt in to Google Play App Signing

You can either do that directly through the Play Console, or you can run this Expo command

```bash
expo opt-in-google-play-signing
```

which will basically walk you through it

2. Extract the Expo generated keystore and save the outputted details

```bash
expo fetch:android:keystore
```

```
Keystore credentials
Keystore credentials
  Keystore password: xx299bxxxxxxxx98a9a42e1cxxxxxxxx
  Key alias:         xxxxxxxlc3BlbxxxxxxxxnBwcmVhY3Ruxxxxxxxx
  Key password:      3d1xxxxxxxx744xxxxxxxx9bcxxxxxxx

  Path to Keystore:  /media/aamnah/Files/Sites/appreactnative/appreactnative.jks
```

You'll need the alias and passwords in the next step when you change the keystore file

3. Clear the keystore that Expo generated and attach the upload certificate `deployment_cert.der` you downloaded from Google Play Console

```bash
expo build:android --clear-credentials
```

It'll ask you if you want Expo to generate a keystore or if you'd like to upload one. Select the second option.

It'll then ask you for the path of the keystore. Since i had downloaded and moved the `deployment_cert.der` to my root directory, i only had to provide `./deployment_cert.der`, meaning the file is in the same directory i'm running the command from.

It'll then ask for alias and passwords, copy paste the ones you got from the previous step.

4. Start a build

```bash
expo build:android -t app-bundle --release-channel production
```
