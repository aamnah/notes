---
title: Expo keystore invalid format error
date: 2020-06-29
slug: expo-keystore-invalid-format
---

### ISSUE

Build fails giving the following erros

```
Failed to read key xxxxxxxlc3BlbxxxxxxxxnBwcmVhY3Ruxxxxxxxx from store "/tmp/turtle/keystore-dfb2d7a0-91d0-44c0-b085-2486ec2039b8.jks": Invalid keystore format
```

### Get keystore details

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

### Use the keystore details to get details about the keystore format

```bash
keytool -list -keystore appreactnative.jks -alias "xxxxxxxlc3BlbxxxxxxxxnBwcmVhY3Ruxxxxxxxx"
```

```
Enter keystore password:
xxxxxxxlc3BlbxxxxxxxxnBwcmVhY3Ruxxxxxxxx, Jan 15, 2020, PrivateKeyEntry,
Certificate fingerprint (SHA-256): AA:BB:CC:1D:BB:C8:00:7B:35:12:12:21:21:12:12:12:12:12:34:56:78:90:E5:E5:A3:EB:1A:56:E3:2C:73:63

Warning:
The JKS keystore uses a proprietary format. It is recommended to migrate to PKCS12 which is an industry standard format using "keytool -importkeystore -srckeystore appreactnative.jks -destkeystore appreactnative.jks -deststoretype pkcs12".
```

If for some reason your keystore is not the right format, expect the following errors instead of seeing the details above

```
keytool error: java.io.IOException: Invalid keystore format
```

```
keytool error: java.io.IOException: DER input, Integer tag error
```

### SOLUTION

In my case, i had corrupted the keystore file. I think i used the upload certificate (`.der`) from Google Play as the keystore for the Expo app (which should be `.jks`). Luckily, i had the correct keystore still saved. So i cleared the faulty keystore from the Expo servers and added the correct one

Keep in mind that `--clear-credentials` will permanently delete your existing keystore from Expo servers and this is something that can not be reversed. Make absolutely sure that you have the correct keystore that you're using with Play Store.

Proceed at your own risk.

```bash
expo build:android --clear-credentials
```

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
