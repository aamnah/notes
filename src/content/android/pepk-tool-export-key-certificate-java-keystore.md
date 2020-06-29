---
title: Export and upload a key and certificate from a Java keystore
date: 2020-06-29
slug: pepk-tool-export-key-certificate-java-keystore
---

### Play Encrypt Private Key (PEPK) tool

Use this tool to export private keys from a Java Keystore and encrypt them for transfer to Google Play. When providing the app signing key for Google to use, select the option to **Export and upload a key from a Java keystore** and follow the instructions to download and use the tool.

1. Download the PEPK tool

2. Run the given command to generate app signing key and certificate zip PEPK tool. Replace values for your keystore (`foo.keystore`, `foo`, and `output.zip`)

- `--keystore=`
- `--alias=`
- `--output=`
- `--encryptionkey=` will already be pre-filled for you

```bash
java -jar pepk.jar --keystore=foo.keystore --alias=foo --output=output.zip --encryptionkey=XXXXXXXXXX7c9df715022017bXXXXXXXXXXXXXXXXXa11e6c09ffe3056a10XXXXXXXXXXa955f4ba4fe93fc8ceXXXXXXXXXX9d2a529aXXXXXXXXXX33b656XXXXXXXXXX --include-cert
```

3. Upload the generated zip file

Note that PEPK needs Java Development Kit (JDK) version 8 or above installed on your system.

```bash
# install JDK on Ubuntu
sudo apt install -y openjdk-14-jdk-headless
```

## Links

- [Android Developers: Sign your app](https://developer.android.com/studio/publish/app-signing)
