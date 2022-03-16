---
title: Creating my first Docker image
date: 2021-05-18
draft: true
---

### Creating your first Docker image

1. Decide on your base image. (Alpine for a tiny size, Ubuntu for reliability and familiarity)

### Alpine vs. Ubuntu

- Alpine is only 5mb in size. Ubuntu is ~ 27mb
- Both use `apt` as package manager

[reactnativecommunity/react-native-android](https://hub.docker.com/r/reactnativecommunity/react-native-android/tags?page=1&ordering=last_updated) has a compressed image size of `2.33GB`!

## Links

- [](https://semaphoreci.com/blog/2016/12/13/lightweight-docker-images-in-5-steps.html)
- [](https://github.com/react-native-community/docker-android/blob/master/Dockerfile)
