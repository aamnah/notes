---
title: Signing your Android app
date: 2020-06-03
slug: android-app-signing
---

In order to upload an app bundle `.aab` instead of an `.apk`, you need to enroll in Google Play App Signing

Go to [Google Play Console](https://play.google.com/apps/publish/)

- Enable _App Signing by Google Play_ for the app, Select the _App Signing_ option on the sidebar, and then select _Continue_ to allow Google Play to handle your app signing key
- Download the _App signing certificate_, IT'll be a file called `deployment_cert.dir`

### Keystore

tl;dr: keystore contains keys.

A keystore is just a file that stores encrypted keys/certs for builds of your app. In other words, a `keystore` is a container of certificate and private keys etc. By default it's a `.jks` (Java KeyStore) file. For example: `foo.jks`

FYI: `.pfx` is another keystore format. It contains both the private key and the cert. You use this format when providing SSLs for Azure app services..

The keystore file itself can be password protected, just like an SSH key..

A keystore can contain multiple _keys_. That's why you have an `alias`, to specify which key inside the keystore you need. That key inside the keystore can have it's own password..

These details for a keystore for an Expo based React Native app should now make sense:

```bash
expo fetch:android:keystore
```

```
Keystore credentials
  Keystore password: xx299bxxxxxxxx98a9a42e1cxxxxxxxx
  Key alias:         xxxxxxxlc3BlbxxxxxxxxnBwcmVhY3Ruxxxxxxxx
  Key password:      3d1xxxxxxxx744xxxxxxxx9bcxxxxxxx

  Path to Keystore:  /media/aamnah/Files/Sites/appreactnative/appreactnative.jks
```

### Upload key vs. Signing key

The _App signing certificate_ is the public part of the _App signing key_. You use the cert to register your app signing key

> The app signing key itself is inaccessible and kept on a secure Google server.

The _Upload certificate_ is the public part of the _Upload key_, which is different from your _App signing key_.

The main difference between signing key and upload key is that upload key can be requested again and can be re-issued in case of loss of compromise. The app signing key can not be re-issued.

Keep in mind that you need to sign all future releases of the app with the same key. If you sign your app with an app signing key that isn't managed by Google Play (i.e. you aren't opted in to App Signing by Google Play, in scenarios where you want to use the key for signing app on marketplaces other than Google Play..) and you lose it, you're fudged.

## Links

- https://docs.expo.io/distribution/app-signing/
- https://developer.android.com/studio/publish/app-signing
- https://support.google.com/googleplay/android-developer/answer/7384423
- [Enroll in Google Play App Signing to Secure Your App Keys](https://www.youtube.com/watch?v=PuaYhnGmeEk)
- [How To Publish An Android App | Keystore, Generate Signed APK or App Bundle, Proguard, R8](https://www.youtube.com/watch?v=akDXw9n3gFY)
