---
title: Notes on beta testing with Firebase App Distribution
date: 2020-06-03
---

tl;dr

- It's not user friendly, at all. It's technical and _scary_
- It took me, a developer, around 8 minutes and around 18 clicks to get the app installed on my phone.
- It involved at least 5 security warnings
  - _can harm your device_ warning
  - _not allowed unknown apps_ warning (Firebase App Distribution - App Tester)
  - _allow unknown apps_ AGAIN! (My app)
  - _blocked by Play Protect_ warning
  - _send app for scanning_
- You can't discount the fact that other apps installed on the phone can mess with your install process (for example: Phone Master)
- For every release you'll have to download the app (around 52mb for my fairly basic React Native chat app)

I just got the phone less than 24 hours ago and the only thing i have changed so far is enable Developer Mode. so this is all on a fairly default factory setting.

### Phone Master

My cheap Android phone (Infinix Hot 9) comes with this app called Phone Master pre-installed. I can't get rid of it. Phone Master starts scanning apps when i install them

### Google Play Protect

Google Play Protect is enabled by default. And it'll block the installation with a warning saying **Blocked by Play Protect**. You have to tap the less prominent _Install Anyway_ button

### Send app for scanning

It'll also ask you to **send app for scanning**

### Install unknown apps

This is also disabled by default. You have to enable _Allow from this source_ for the _App Tester_ app that comes with Firebase App Distribution..

To allow app installs from Forces Penpals, follow this steps:

- Navigate to Setting > Security.
- Check the option “Unknown sources“.
- Tap OK on the prompt message.
- Select “Trust“.
