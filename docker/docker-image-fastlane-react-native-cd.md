---
title: Docker image for React Native, Android and Fastlane
description: Creating a Docker image to build Android apps based on React Native and built with Fastlane
date: 2021-03-03
slug: docker-image-fastlane-react-native-android-cd
draft: true
category: Docker
---

`docker build` needs at least one parameter which is the folder to run from
`docker run --name test 91827912679`. `docker run` will take an image and turn it into a container

list all images

- git
- node 12 LTS
- nvm
- npm
- JDK 8
- turtle-cli
- expo-cli
- curl
- wget
- ssh
- gcc

JRE or JDK 8/11
Node.js 12 LTS (Erbium)
npm 6
yarn
curl

Android SDK

turtle setup:android
turtle setup:ios

xvfb
git: 2.7.4
mercurial: 3.7.3
java: Open-JDK 1.8u151
maven: 3.3.9
node: 8.9.4
npm: 5.6.0
nvm: 0.33.8
python: 2.7.12
gcc: 5.4.0
ant: 1.9.6

The packages i install wil keep getting out of date though if the docker image isn't updated every time. For example: `expo-cli` releases a new version like very week

https://docs.docker.com/docker-hub/#step-4-build-and-push-a-container-image-to-docker-hub-from-your-computer

```yaml
- step: &turtle-build-android
    name: Build app bundle (.aab)
    image: ubuntu:focal
    caches:
      - npm
    script:
      - apt-get update -qq
      - DEBIAN_FRONTEND=noninteractive apt-get install -qq tzdata
      - apt-get install -qq curl build-essential openjdk-8-jdk-headless openjdk-8-jre
      - curl -sL https://deb.nodesource.com/setup_12.x | bash -
      - apt-get install -qq nodejs
      - npm ci
      - npm install -g --unsafe-perm turtle-cli
      - echo ${EXPO_ANDROID_KEYSTORE_BASE64} | base64 --decode > keystore.jks
      - export EXPO_ANDROID_KEYSTORE_PASSWORD=${EXPO_ANDROID_KEYSTORE_PASSWORD}
      - export EXPO_ANDROID_KEYSTORE_ALIAS=${EXPO_ANDROID_KEYSTORE_ALIAS}
      - export EXPO_ANDROID_KEY_PASSWORD=${EXPO_ANDROID_KEY_PASSWORD}
      - export EXPO_USERNAME=${EXPO_USERNAME}
      - export EXPO_PASSWORD=${EXPO_PASSWORD}
      - >-
        turtle build:android 
        --keystore-path keystore.jks 
        --keystore-alias ${EXPO_ANDROID_KEYSTORE_ALIAS} 
        --public-url "${NETLIFY_SITE_URL}/android-index.json" 
        --type "app-bundle" 
        --build-dir "expo-apps" 
        --mode "release" 
        --release-channel "production"
    artifacts:
      - expo-apps/**
```

https://www.pluralsight.com/guides/create-docker-images-docker-hub
