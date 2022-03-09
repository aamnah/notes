---
title: App signing and Expo
draft: true
date: 2021-11-23
---

# App Signing

https://developer.android.com/studio/publish/app-signing

Opt-in to App signing by Google Play applies for life. You can't retrieve a copy of the key, and you can't delete it without deleting the app from the store.

> If you want to use the same signing key across multiple stores, make sure to provide your own signing key when you opt in to app signing by Google Play, instead of having Google generate one for you.

> helps Android ensure that any future updates to your app are authentic and come from the original author. The key used to create this certificate is called the app signing key.

A certificate fingerprint is requested by API providers alongside the package name to register an app to use their service. e.g. MD5, SHA-1 and SHA-256 fingerprints

# App signing key

- the signing key never changes during the lifetime of your app.
- app signing key is private and must be kept secret.

in order to upload and distribute apps to the Play Store, you need to build the app with a _signing key_

backup existing Android keystore (that Expo generated)

```bash
expo fetch:android:keystore
```

```
Keystore credentials
  Keystore password: eb2XXXXXXXXXXXXX99b8d54XXXXXb4f
  Key alias:         QGZXXXXXXXXXXXXXXXXXXXXXXY3RuYXRpdmU=
  Key password:      3d12f6XXXXXXX75cc1744f6XXXXXXXXXXXX8c7ca

  Path to Keystore:  /media/aamnah/Files/Sites/myProject/seecretKey.jks
```

clear the keystore that Expo generated and attach the upload certificate `deployment_cert.der` you downloaded from Google Play Console

```bash
expo build:android --clear-credentials
```

provide the path to the Google file

```bash
expo opt-in-google-play-signing
```
