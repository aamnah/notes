---
title: MacBook Pro - Apple Silicon M1 experience
date: 2021-02-28
slug: experience-macbook-pro-m1-apple-silicon
tags:
  - personal
---

It FINALLY got delivered. I had ordered it back in December, it got delivered to Dubai in January, and then someone brought it from Dubai to Pakistan in February. The lengths you go to get a custom MacBook. `¯\_(ツ)_/¯` In Pakistan, only the base models are officially available. What i got is considered a _custom order_ and you have to pay 100% in advance and wait a few weeks at least. Mine comes with 16GB RAM and 1TB storage, with an extended AppleCare+ plan.

I had been planning on getting a new Mac for almost a year now. At first it was the cost, i couldn't find a buyer for my kidney.. Then it was about getting the best configuration i could possibly get, so i pondered over getting a 16" Mac, which i ultimately decided not to get because it was so heavy. Then it was waiting for the new speculated chip that Apple was going to announce, which i definitely wanted to get. So i postponed the purchase and waited for the chip announcement. And then i ordered in December and waited two months..

Anyhow, now that it's here, the first thing i did was install all the software and do customizations (terminals, configurations, shortcuts..). The second thing i did was: put stickers on it. Yes, you're not a cool dev if you don't have dev stickers on your machine, deal with it. this machine has been in planning for a year.

From a web dev perspective, some things work, some do not.

On React Native i have been getting errors trying to run the app in Xcode and iOS emulator. Was able to run the app on Android, not on iOS, got bored with the troubleshooting after a day and had better things to do so i haven't gotten to the success point yet.

On Android, you have to download the [Preview build](https://github.com/google/android-emulator-m1-preview) of Android Emulator that they have for Apple Silicon based laptops. It works for my use case, was able to run and test a react native based android app.

For Docker, there is also a [Preview build for Apple Silicon](https://docs.docker.com/docker-for-mac/apple-m1/) based laptops that they released in February.

For CocoaPods you have to run the Terminal with Rosetta and prepend the commands with `arch -x86_64`. For example `arch -x86_64 sudo gem install cocoapods`

Links

---

- [Android Emulator for M1](https://github.com/google/android-emulator-m1-preview)
- [Apple M1 Tech Preview](https://docs.docker.com/docker-for-mac/apple-m1/) is available. [download build 60984](https://desktop.docker.com/mac/stable/arm64/60984/Docker.dmg)
