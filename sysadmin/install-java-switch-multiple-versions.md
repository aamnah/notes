---
title: Install multiple Java versions and switch between them
date: 2022-03-17
slug: install-java-switch-multiple-versions
---

# macOS

Download the tarball from here: https://jdk.java.net/16/

```bash
sudo mv openjdk-16.0.1_osx-x64_bin.tar.gz /Library/Java/JavaVirtualMachines/
cd /Library/Java/JavaVirtualMachines/
sudo tar -xzf openjdk-16.0.1_osx-x64_bin.tar.gz
sudo rm openjdk-16.0.1_osx-x64_bin.tar.gz
```

```bash
echo -n "\nexport JAVA_HOME=`/usr/libexec/java_home -v16`" >> ~/.zprofile

source ~/.zprofile
```

```bash
java -version
```

`/usr/libexec/java_home -v16` gives you the version specific path. If you wanted to use a different JDK version, say 17, then you'd update `JAVA_HOME` and set it to `/usr/libexec/java_home -v17`

# Ubuntu Linux

```bash
# java -version

openjdk version "1.8.0_312"
OpenJDK Runtime Environment (build 1.8.0_312-8u312-b07-0ubuntu1~20.04-b07)
OpenJDK 64-Bit Server VM (build 25.312-b07, mixed mode)
```

```bash
sudo apt install -y openjdk-17-jdk

update-java-alternatives --list
```

```
java-1.11.0-openjdk-amd64      1111       /usr/lib/jvm/java-1.11.0-openjdk-amd64
java-1.17.0-openjdk-amd64      1711       /usr/lib/jvm/java-1.17.0-openjdk-amd64
java-1.8.0-openjdk-amd64       1081       /usr/lib/jvm/java-1.8.0-openjdk-amd64
```

```bash
# sudo update-java-alternatives --set /path/to/java/version
sudo update-java-alternatives --set /usr/lib/jvm/java-1.17.0-openjdk-amd64
```

Check version with `java -version` and you'll see the new one

```
openjdk version "17.0.2" 2022-01-18
OpenJDK Runtime Environment (build 17.0.2+8-Ubuntu-120.04)
OpenJDK 64-Bit Server VM (build 17.0.2+8-Ubuntu-120.04, mixed mode, sharing)
```

Update the `$JAVA_HOME` env var

```bash
export JAVA_HOME="$(jrunscript -e 'java.lang.System.out.println(java.lang.System.getProperty("java.home"));')"
```
