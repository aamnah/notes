---
title: Changing from Expo generated Android keystore to your own
date: 2020-02-07
lastmod: 2020-06-03
slug: change_update_expo_keystore
---

This assumes that you have a new app and have not published it to Google Play Store before.

### 1. Opt in to Google Play App Signing

You can either do that directly through the Play Console, or you can run this Expo command

```bash
expo opt-in-google-play-signing
```

which will basically walk you through it

### 2. Backup the Expo generated keystore and save the outputted details

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

### 3. Generate a keystore

```bash
keytool -genkeypair -v -keyalg RSA -keysize 4096 -validity 10000 -keystore KEYSTORE_OUTPUT_FILE.keystore -alias KEY_ALIAS
```

### 4. Clear the keystore that Expo generated and attach your own keystore

Keep in mind that `--clear-credentials` will permanently delete your existing keystore from Expo servers and this is something that can not be reversed. Make absolutely sure that you have the correct keystore that you're using with Play Store.

Proceed at your own risk.

```bash
expo build:android --clear-credentials
```

It'll ask you if you want Expo to generate a keystore or if you'd like to upload one. Select the second option.

It'll then ask you for the path of the keystore, as well as keystore password, alias key, and alias key password. Copy paste the ones you provided in the previous step when you generated the keystore.

```
✔ Choose the build type you would like: › app-bundle
Checking if there is a build in progress...

Configuring credentials for myamazingaccount in project appreactnative

⚠️  Clearing your Android build credentials from our build servers is a PERMANENT and IRREVERSIBLE action.
Android Keystore must be identical to the one previously used to submit your app to the Google Play Store.
Please read https://docs.expo.io/distribution/building-standalone-apps/#if-you-choose-to-build-for-android for more info before proceeding.

Your Keystore will be backed up to your current directory if you continue.

? Permanently delete the Android build credentials from our servers? Yes
Backing up your Android Keystore now...
Saving Keystore to @myamazingaccount__.bak.jks
Keystore credentials
  Keystore password: xx299bxxxxxxxx98a9a42e1cxxxxxxxx
  Key alias:         xxxxxxxlc3BlbxxxxxxxxnBwcmVhY3Ruxxxxxxxx
  Key password:      3d1xxxxxxxx744xxxxxxxx9bcxxxxxxx

  Path to Keystore:  @myamazingaccount__appreactnative.bak.jks

Keystore removed successfully
✔ Would you like to upload a Keystore or have us generate one for you?
If you don't know what this means, let us generate it! :) › I want to upload my own file

WARNING! In this mode, we won't be able to make sure that your credentials are valid.
Please double check that you're uploading valid files for your app otherwise you may encounter strange errors!

When building for IOS make sure you've created your App ID on the Apple Developer Portal, that your App ID
is in app.json as `bundleIdentifier`, and that the provisioning profile you
upload matches that Team ID and App ID.

✔ Path to the Keystore file. … /media/aamnah/Files/Sites/appreactnative/appreactnative.jks
✔ Keystore password … ********************************
✔ Key alias … xxxxxxxlc3BlbxxxxxxxxnBwcmVhY3Ruxxxxxxxx
✔ Key password … ********************************
Keystore updated successfully


###
```

If your build is then successful then it means that they keystore has been successfully updated and there were no _invalid keystore format_ errors.
