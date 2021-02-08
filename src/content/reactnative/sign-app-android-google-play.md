---
title: Signing your React Native app for Android with Google Play App Signing
date: 2021-02-08
---

There are two keys you needs. One is the App signing key, the master key used to sign your app. And the Upload key, which is an added layer of security on top of the original app signing key.

The app signing key can only be _upgraded_ (i.e. generate a new one if old one is lost/compromised) once in an app's lifetime. If you lose it twice, you'll never be able to release updates for your app to the Play Store.

The upload key is an additional key that goes on top of the app signing key. Instead of using the master key every time, you start using the upload key to sign your app. If the upload key is lost/compromised, you can request a new one from Google as many times as you want.

You can either let Google handle the entire key generation process (generate both the app signing and the upload key), let Google handle part of the key generation process (Google does the upload key, you do the signing key), or you can generate both keys yourself and give them to Google in the formats it accepts.

The difference between letting Google generate the signing key and you doing it yourself is this:

- if Google generates the key, you will not be able to see or download it. But you will be able to use the same key for all apps inside the Google Play store
- you will also not be able to use the same signing key for app marketplaces other than Google Play Store (e.g. Amazon Appstore, Samsung Galaxy Apps, F-droid) because you wouldn't be able to see or download it

- Same app signing key means you can run multiple apps in the same process
- Same signing key also means that you'll be able to share data between multiple apps
  > Each app can only have its app signing key upgraded once in its lifetime. In the unlikely event that you have multiple apps using the same signing key specifically to run in the same process, you won’t be able to use key upgrade for those apps.

I am going to create my own signing key because i like having that control =) I am also going to generate the upload key myself and provide both to Google Play Store

## What needs doing

- generate 2 keys (signing key, upload key) with `keytool`
- convert both keys to the format accepted for upload by Google (ZIP for signing key, PEM for upload key)
- upload the files and save

At the end of this all you would have generated 4 files

```bash
MYPROJECT_android_signing.keystore # You super secret app signing key
MYPROJECT_android_signing_key.zip # Upload to Google Play
MYPROJECT_android_upload_certificate.pem # Upload to Google Play
MYPROJECT_android_upload.keystore # The upload key we'll always use, which if lost can be reset by Google on request
```

### 1. Generate keys

Generate two keys, one for app signing (master key), one for uploads to Play Store

```bash
# Signing key
keytool -genkeypair -v -keyalg RSA -keysize 4096 -validity 10000 \
  -dname "cn=Jane Doe, ou=IT, o=Awesome Co., l=Lahore, st=Punjab, c=PK" \
  -keystore "MYPROJECT_android_signing.keystore" \
  -storepass "XXXXXXXXXXXXXXXXXXXXXXXXXX" \
  -alias "MYPROJECT_android_signing_key"
```

```bash
# Upload key
keytool -genkeypair -v -keyalg RSA -keysize 4096 -validity 10000 \
  -dname "cn=Jane Doe, ou=IT, o=Awesome Co., l=Lahore, st=Punjab, c=PK" \
  -keystore "MYPROJECT_android_upload.keystore" \
  -storepass "XXXXXXXXXXXXXXXXXXXXXXXXXX" \
  -alias "MYPROJECT_android_upload_key"
```

Note down the keystore passwords and the key aliases, you'll need these later.

I'm providing everything inside one command so it's easier to script this key generation process. Otherwise it'll prompt you for this information (password, organization details). If you don't want to provide these details inside the command, you'll run it like this

```bash
keytool -genkeypair -v -keyalg RSA -keysize 4096 -validity 10000 -keystore KEYSTORE_OUTPUT_FILE.keystore -alias KEY_ALIAS
```

```
Enter keystore password:
Re-enter new password:
What is your first and last name?
  [Unknown]:  Jane Doe
What is the name of your organizational unit?
  [Unknown]:  IT
What is the name of your organization?
  [Unknown]:  Awesome Co.
What is the name of your City or Locality?
  [Unknown]:  Lahore
What is the name of your State or Province?
  [Unknown]:  Punjab
What is the two-letter country code for this unit?
  [Unknown]:  PK
Is CN=Jane Doe, OU=IT, O=Awesome Co., L=Lahore, ST=Punjab, C=PK correct?
  [no]:  yes

Generating 4,096 bit RSA key pair and self-signed certificate (SHA384withRSA) with a validity of 10,000 days
  for: CN=Jane Doe, OU=IT, O=Awesome Co., L=Lahore, ST=Punjab, C=PK
[Storing KEYSTORE_OUTPUT_FILE.keystore]
```

### 2. Convert signing key to ZIP

Follow the instructions provided on screen during the App signing opt-in process

- Download PEPK tool (will give you a `pepk.jar` file)
- Run the tool using the command below to export and encrypt your signing key. Replace the arguments, and enter your keystore and key passwords when prompted.

```bash
java -jar pepk.jar \
  --keystore=MYPROJECT_android_signing.keystore \
  --alias=MYPROJECT_android_signing_key \
  --output=MYPROJECT_android_signing_key.zip \
  --include-cert \
  --encryptionkey=eb10fe8f7c7c9df715022017b00c6471f8ba8170b6471f8ba8170b13049a11e6c09ffe3056a104a34ba4fe93fc8cef27558a3eb9d2a529a2092761fb833b656cd48b9de6a
```

It'll ask you for your keystore password and the key password. If you did not provide a password for your key during the generation of keystore then the key password is the same as the keystore password.

```bash
Enter password for store 'MYPROJECT_android_signing.keystore':
Enter password for key 'MYPROJECT_android_signing_key':
```

### 3. Convert upload key to PEM

Follow the instructions provided on screen during the App signing opt-in process to convert your upload key to a PEM format

```bash
keytool -export -rfc \
  -keystore MYPROJECT_android_upload.keystore \
  -alias MYPROJECT_android_upload_key \
  -file MYPROJECT_android_upload_certificate.pem
```

Now upload both the `.zip` and the `.pem` to Google Play during the opt-in process

- Setup > App signing > Create new release
- Under Play app signing, click on _Manage preferences_
- Select _Export and upload a key from Java keystore_
- Download PEPK tool, run the provided command after substituting your own values, upload the generated ZIP file
- Click on _Show instructions_ to see the instructions for adding _upload key_
- Run the provided command after substituting your own values, upload the generated PEM file
- Click _Update_ and then click _Continue_
- The next time you go to the _App Signing_ page, you'll see details of your certificates (fingerprints).

## Links

- [Android Developers: Sign your app](https://developer.android.com/studio/publish/app-signing)
