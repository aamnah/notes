---
title: Signing your Android app
date: 2020-06-03
lastmod: 2020-06-29
slug: android-app-signing
---

In order to upload an app bundle `.aab` instead of an `.apk`, you need to enroll in Google Play App Signing

Go to [Google Play Console](https://play.google.com/apps/publish/)

- Enable _App Signing by Google Play_ for the app, Select the _App Signing_ option on the sidebar, and then select _Continue_ to allow Google Play to handle your app signing key
- Download the _App signing certificate_, IT'll be a file called `deployment_cert.dir`

How it works

1. You digitally sign each release using your upload key before publishing it to a track in the Play Console.
2. Google Play uses the upload certificate to verify your identity and then re-signs your release using the app signing key for distribution.

- Upload key/certificate > You use it to sign your app for upload to Play Store. Can be reset if lost.
- App signing key > Managed by Google, which you can't access or download. You can not retrieve a copy of it, and you can't delete it form Google servers without deleting the app

> The key with which you sign your app becomes your app’s upload key

> If you want to use the same signing key across multiple stores, make sure to provide your own signing key when you opt in to app signing by Google Play, instead of having Google generate one for you.

So, if you want to use your own app signing key and are sure you can keep it secure and will never lose it, you need to provide Google with your own key. You do that when you're opting in to App Signing by Google Play

Think of the _app signing key_ as the master key and the _upload key_ as an additional key on top of it. If Google generates the app signing key, they own it.

### Steps

1. Generate an app signing key
2. Sign your app with that app signing key
3. Generate an upload key
4. Sign your app with that upload key

### Certificate vs. Key

Think of an SSH key pair. It consists of a public key and a private key, and both of them are needed in order to verify your identity. You give the public key to places like Github and Bitbucket, and it corresponds to a private key on your system.

A certificate (`.der` aor `.pem`) is the public part of a key, and the corresponding private part of the key is called the **app signing key** (`.jks` or `.keystore`).

| Certificate                                    | Key                                           |
| ---------------------------------------------- | --------------------------------------------- |
| Public key                                     | Private key                                   |
| `der` or `.pem`                                | `.jks` or `.keystore`                         |
| Can be shared with anyone (e.g. API providers) | Protect it at all costs, it's like a password | 00 |

You need the certificate in order to register your key with API providers. Like when you have to provide the `.pub` of your SSH key at services like Bitbucket or Github.

> Every app must use the same certificate throughout its lifespan in order for users to be able to install new versions as updates to the app.

### Keystore

tl;dr: keystore contains keys and certificates. It's a binary file that serves as a repository of certificates and private keys.

A keystore is just a file that stores encrypted keys/certs for builds of your app. In other words, a `keystore` is a container of certificate and private keys etc. By default the keystore format is `PKCS12` (used to be `JKS` in JDK 8 and older)

FYI: `.pfx` is another keystore format. It contains both the private key and the cert. You use this format when providing SSLs for Azure app services..

- The keystore is password protected, just like an SSH key.
- One keystore can contain multiple _keys_, hence the key `alias`, to specify which key inside the keystore you need. That key inside the keystore can have it's own password.. That's why you usually have to provide the `keystore_password` as well as the `key_password`.

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

### Generating a keystore manually

You can use `keytool`. `keytool` is part of JDK so it should be available in you PATH

```bash
keytool -keypasswd -keystore <keystore path> -alias <key alias> -storepass <keystore password> -keypass <key password> -new <key password>
```

```bash
keytool -genkeypair -v -keystore <keystore path> -alias <key alias> -keyalg RSA -keysize 4096 -validity 9125
```

9125 days is 25 years (default when you create a keystore with Android Studio..)

```bash
keytool -list -keystore keystore.jks
keytool -list -keystore MY_KEYSTORE.keystore
```

### .jks vs .keystore

JKS (`.jks`) was the default keystore format till JDK 8. Newer versions use PKCS12 (`.p12` or sometimes `.pfx`).

> The biggest difference between JKS and PKCS12 is that JKS is a format specific to Java, while PKCS12 is a standardized and language-neutral way of storing encrypted private keys and certificates.

You can specify the store type by passing the `-storetype` arg when using `keytool`. `JKS` and `PKCS12` are the most commonly used formats

### Upload key vs. App Signing key

The _App signing certificate_ is the public part of the _App signing key_. You use the cert to register your app signing key

> The app signing key itself is inaccessible and kept on a secure Google server.

The _Upload certificate_ is the public part of the _Upload key_, which is different from your _App signing key_.

The main difference between signing key and upload key is that upload key can be requested again and can be re-issued in case of loss of compromise. The app signing key can not be re-issued.

Keep in mind that you need to sign all future releases of the app with the same key. If you sign your app with an app signing key that isn't managed by Google Play (i.e. you aren't opted in to App Signing by Google Play, in scenarios where you want to use the key for signing app on marketplaces other than Google Play..) and you lose it, you're fudged.

> If you also distribute your app outside of Google Play or plan to later, you can generate the app signing key you want to use for every app store, and then upload it to Google when you opt in to app signing by Google Play.

> The certificate used to sign the first APK uploaded to the store will be your upload certificate and each new release needs to be signed with it. [ref](https://docs.expo.io/distribution/app-signing/)

| App signing key                                             | Upload key                                                         |
| ----------------------------------------------------------- | ------------------------------------------------------------------ |
| Never changes during the lifetime of your app               | Can be reset on request                                            |
| If lost, your app is done. You can no longer update the app | If lost, request Google to generate a new one and use that instead |
| Used to sign apps when they're installed on a user's device | Used to sign apps when they are uploaded to the Play Store         |
| Mandatory                                                   | Optional                                                           |
| The definitive key for your app                             | a key on top of the app signing key                                |

Uplaod key is recommended but optional. If you don't provide one, your app signing key will be used as your upload key.

### You generating the app signing key vs. Google generating it

| Google generates app signing key                                            | You generate app signing key                                                                                                                                   |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Google owns it                                                              | You own it                                                                                                                                                     |
| Google keeps it safe                                                        | You protect the key                                                                                                                                            |
| You can not download or retrieve the key                                    | You own the key and can use the same key at another Android app marketplace (this is a non-issue if you'll only ever release your Android app via Google Play) |
| App signing key can only be deleted from Google servers by deleting the app | You can delete the key (not sure why you'd wanna delete it though)                                                                                             |
| Only people with access to Play Console will be able to update your app     | Anyone with access to your app signing key will be able to update your app??                                                                                   |

You can still sign in to App Signing by Google Play even if you generate your own key, you just have to provide it to Google during the opt-in process.

When providing the app signing key for Google to use, select the option to _Export and upload a key from a Java keystore_ and follow the instructions to download and use the tool.

## Links

- [Expo: App signing](https://docs.expo.io/distribution/app-signing/)
- [Sign your app](https://developer.android.com/studio/publish/app-signing)
- [Use app signing by Google Play](https://support.google.com/googleplay/android-developer/answer/7384423)
- [Enroll in Google Play App Signing to Secure Your App Keys](https://www.youtube.com/watch?v=PuaYhnGmeEk)
- [How To Publish An Android App | Keystore, Generate Signed APK or App Bundle, Proguard, R8](https://www.youtube.com/watch?v=akDXw9n3gFY)
- [Build Standalone Expo .apk and .ipa with Turtle CLI](https://www.robincussol.com/build-standalone-expo-apk-ipa-with-turtle-cli/)
