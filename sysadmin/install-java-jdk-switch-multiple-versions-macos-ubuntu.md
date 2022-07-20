---
title: Install multiple Java versions and switch between them on macOS and Ubuntu
date: 2022-03-17
lastmod: 2022-07-20
slug: install-java-jdk-switch-multiple-versions-macos-ubuntu
---

# macOS

Simplest would be to installed with Homebrew:

```bash
# /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
📋
brew install openjdk # installs openjdk@18
```

Alternatively, you can download the tarball from here: [https://jdk.java.net/16/](https://jdk.java.net/16/) and extract it to `/Library/Java/JavaVirtualMachines/`

```bash
sudo mv openjdk-16.0.1_osx-x64_bin.tar.gz /Library/Java/JavaVirtualMachines/
cd /Library/Java/JavaVirtualMachines/
sudo tar -xzf openjdk-16.0.1_osx-x64_bin.tar.gz
sudo rm openjdk-16.0.1_osx-x64_bin.tar.gz
```

Update $PATH

```bash
echo -n "\nexport JAVA_HOME=`/usr/libexec/java_home -v16`" >> ~/.zprofile

source ~/.zprofile
```

Confirm install 

```bash
java -version
```

```
openjdk version "16.0.1" 2021-04-20
OpenJDK Runtime Environment (build 16.0.1+9-24)
OpenJDK 64-Bit Server VM (build 16.0.1+9-24, mixed mode, sharing)
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
java-1.18.0-openjdk-amd64      1811       /usr/lib/jvm/java-1.18.0-openjdk-amd64
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
# export JAVA_HOME="$(jrunscript -e 'java.lang.System.out.println(java.lang.System.getProperty("java.home"));')"
export JAVA_HOME='/usr/lib/jvm/java-1.17.0-openjdk-amd64'
```
