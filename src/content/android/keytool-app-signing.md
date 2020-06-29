---
title: Using keytool for keystore management and app signing
date: 2020-06-29
description: Generate a new keystore, or extract the certficate for an upload key
slug: keytool-app-signing-keystore-management
tags:
  - keytool
  - Java
  - Android
---

### Generate a keystore

```bash
keytool -genkeypair -v -keyalg RSA -keysize 4096 -validity 10000 -keystore KEYSTORE_OUTPUT_FILE.keystore -alias KEY_ALIAS
```

You'll get a prompt for setting the keystore password and then asked for some additional info about yur organization. Next it'll ask you for a password for your key _Alias_

- `-genkeypair` generates a key pair (a public key and associated private key). It used to be named `-genkey` in earlier version and is still supported, but the new name `-genkeypair` is preferred going forward.
- `-keystore` is the output file for your keystore, in this case `KEYSTORE_NAME.keystore`
- `-keysize` is the size of the key, in this case `4096`. Default is 2048 (when using `-genkeypair` and `-keyalg` is "RSA")
- `-keyalg` is the key algorithm, in this case `RSA`
- `-validity` is in days. 9125 days is 25 years (default when you create a keystore with Android Studio). 10000 days is a little above 27 years.
- `-storetype` is the format the keystore should be saved in. Default was `JKS` up till JDK 8. Newer versions use `PKCS12`.

#### Script it

You can pass keystore password, alias key password, and organizatiion details for a no-prompt key generation

```bash
# pass keystore password and organizatiion details for no-prompt
keytool -genkeypair -v -keyalg RSA -validity 10000 \
  -dname "cn=FIRSTNAME LASTNAME, ou=ORGANIZATION_UNIT, o=ORGANIZATION, c=COUNTRY_CODE" \
  -keystore "KEYSTORE_OUTPUT_FILE.keystore" -storepass "KEYSTORE_PASSWORD" -storetype "JKS" \
  -alias "KEY_ALIAS" -keypass "KEY_ALIAS_PASSWORD"
```

- `-dname` specifies details about your organization
- `-keypass` will only be used if `-storetype` is provided and it's not `PKCS12` (default for JDK 9+). Since different store and key passwords not supported for PKCS12 KeyStores, your keystore password and your alias password will be the same and `-keypass` value will not be used.

```bash
# pass keystore password and organizatiion details for no-prompt
keytool -genkeypair -v -keyalg RSA -validity 10000 \
  -dname "cn=FIRSTNAME LASTNAME, ou=ORGANIZATION_UNIT, o=ORGANIZATION, c=COUNTRY_CODE" \
  -keystore "KEYSTORE_OUTPUT_FILE.keystore" -storepass "KEYSTORE_PASSWORD" \
  -alias "KEY_ALIAS"
```

### Check keystore details

```bash
keytool -list -keystore KEYSTORE_OUTPUT_FILE.keystore
```

It'll prompt you for the password of your keystore and then output keystore details like what format it is, what's the certificate fingerprint, and how many keys it contains

```
Enter keystore password:
Keystore type: PKCS12
Keystore provider: SUN

Your keystore contains 1 entry

key_alias, Jun 29, 2020, PrivateKeyEntry,
Certificate fingerprint (SHA-256): AA:BB:CC:1D:BB:C8:00:7B:35:12:12:21:21:12:12:12:12:12:34:56:78:90:E5:E5:A3:EB:1A:56:E3:2C:73:63
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

`-keypasswd` changes the password under which the private/secret key identified by alias is protected.

```bash
# set new password for a private key
keytool -keypasswd -alias KEY_ALIAS
```

```bash
# set new password for a private key
keytool -keypasswd -alias KEY_ALIAS -keypass OLD_KEY_PASSWORD -new NEW_KEY_PASSWORD
```

- will change the password for the Alias `KEY_ALIAS` from `OLD_KEY_PASSWORD` to `NEW_KEY_PASSWORD`. You should leave these out though so that it prompts you to enter the password values instead of saving it in the command history.
- password must be at least 6 characters

```bash
keytool -keypasswd -keystore KEYSTORE_NAME.keystore -alias KEY_ALIAS -storepass KEYSTORE_PASSWORD -keypass OLD_KEY_PASSWORD -new NEW_KEY_PASSWORD
```

```bash
keytool -keypasswd -keystore KEYSTORE_NAME.keystore -alias KEY_ALIAS -storepass KEYSTORE_PASSWORD
```

- If the `-keypass` option is not provided at the command line, and the key password is different from the keystore password, then the user is prompted for it.
- If the `-new` option is not provided at the command line, then the user is prompted for it

### Change the password for the keystore

Similar to `-keypasswd`, you can use `-storepasswd` to change the keystore password

```bash
keytool -storepasswd -keystore KEYSTORE_NAME.keystore
```

```bash
keytool -storepasswd -keystore KEYSTORE_NAME.keystore -storepass OLD_STORE_PASSWORD -new OLD_STORE_PASSWORD
```

```

-keypasswd
{-alias alias}: Alias name of the entry to process
[-keypass old_keypass]: Key password
[-new new_keypass]: New password
{-keystore keystore}: Keystore name
{-storepass arg}: Keystore password

```

### Convert JKS to PKCS12

You can convert a keystore in JKS format to PKCS12 with `-importkeystore`

```bash
# import entries from a typical JKS type keystore key.jks into a PKCS12 keystore
keytool -importkeystore -srckeystore appreactnative.jks -destkeystore appreactnative.keystore -deststoretype pkcs12
```

```
Importing keystore appreactnative.jks to appreactnative.keystore...
Enter destination keystore password:
Re-enter new password:
Enter source keystore password:
Enter key password for <xxxxxxxlc3BlbxxxxxxxxnBwcmVhY3Ruxxxxxxxx>
Entry for alias xxxxxxxlc3BlbxxxxxxxxnBwcmVhY3Ruxxxxxxxx successfully imported.
Import command completed:  1 entries successfully imported, 0 entries failed or cancelled
```

## Links

- [Android Signing](http://docs.phonegap.com/phonegap-build/signing/android/)
- [keytool manual (JDK 8)](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/keytool.html)
- [The keytool Command (JDK 13)](https://docs.oracle.com/en/java/javase/13/docs/specs/man/keytool.html)
- [Keystore type: which one to use?](https://stackoverflow.com/a/11540061)
- [StackOverflow: How can I create a keystore?](https://stackoverflow.com/questions/3997748/how-can-i-create-a-keystore)
- [The Most Common Java Keytool Keystore Commands](https://www.sslshopper.com/article-most-common-java-keytool-keystore-commands.html)
