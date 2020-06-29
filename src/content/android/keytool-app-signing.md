---
title: Using keytool for keystore managemennt and app signing
date: 2020-06-29
description: Generate a new keystore, or extract the certficate for an upload key
slug: keytool-app-signing-keystore-management
---

### Generate a keystore

```bash
# keytool -genkey -v -keystore KEYSTORE_OUTPUT_FILE.keystore -alias KEY_ALIAS -keyalg RSA -keysize 2048 -validity 10000

keytool -genkeypair -v -keystore KEYSTORE_OUTPUT_FILE.keystore -alias KEY_ALIAS -keyalg RSA -validity 10000
```

You'll get a prompt for setting the keystore password and then asked for some additional info about yur organization. Next it'll ask you for a password for your key _Alias_

- `-genkeypair` generates a key pair (a public key and associated private key). It used to be named `-genkey` in earlier version and is still supported, but the new name `-genkeypair` is preferred going forward.
- `-keystore` is the output file for your keystore, in this case `KEYSTORE_NAME.keystore`
- `-keysize` is the size of the key, in this case `2048`. Default is 2048 (when using `-genkeypair` and `-keyalg` is "RSA")
- `-keyalg` is the signature algorithm, in this case `RSA`
- `-validity` is in days. 9125 days is 25 years (default when you create a keystore with Android Studio). 10000 days is a little above 27 years.

```bash
keytool -list -keystore keystore.jks
```

### Export the certificate for the upload key to PEM format.

`keytool` command is a key and certificate management utility, it is part of JDK. You can use it to export the public certificate of your upload key.

```bash
# extract the uplaod certificate
keytool -export -rfc -keystore YOUR_UPLOAD_KEYSTORE.jks -alias UPLOAD_KEY_ALIAS -file OUTPUT_UPLOAD_CERTIFICATE.pem
```

Replace the following

- `YOUR_UPLOAD_KEYSTORE.jks` - your keystore fiile
- `UPLOAD_KEY_ALIAS` - your key alias
- `OUTPUT_UPLOAD_CERTIFICATE.pem` - the output file name for the certificate

```
-exportcert
{-rfc}: Output in RFC style
{-alias alias}: Alias name of the entry to process
{-file file}: Output file name
{-keystore keystore}: Keystore name
```

### Change the password for an Alias key

`-keypasswd` changes the password under which the private/secret key identified by alias is protected, from old_keypass to new_keypass, which must be at least 6 characters.

```bash
keytool -keypasswd -alias KEY_ALIAS -keypass OLD_KEY_PASSWORD -new NEW_KEY_PASSWORD
```

will change the password for the Alias `KEY_ALIAS` from `OLD_KEY_PASSWORD` to `NEW_KEY_PASSWORD`.

```bash
keytool -keypasswd -keystore KEYSTORE_OUTPUT_FILE.keystore -alias KEY_ALIAS -storepass KEYSTORE_PASSWORD -keypass OLD_KEY_PASSWORD -new NEW_KEY_PASSWORD
```

- If the `-keypass` option is not provided at the command line, and the key password is different from the keystore password, then the user is prompted for it.
- If the `-new` option is not provided at the command line, then the user is prompted for it

## Links

- [Android Signing](http://docs.phonegap.com/phonegap-build/signing/android/)
- [keytool manual](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/keytool.html)
