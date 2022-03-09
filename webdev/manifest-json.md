---
title: Notes on PWAs and app manifests
date: 2021-08-09
slug: manifest-json
---



- `gcm_sender_id` is [no longer needed](https://github.com/Appboy/appboy-web-sdk/issues/57) in [Chrome 52+](https://developers.google.com/web/updates/2016/07/web-push-interop-wins#reality_of_these_changes)

- `apple-touch-icon-precompose` is [no longer needed](https://webhint.io/docs/user-guide/hints/hint-apple-touch-icons/) since iOS 7

- `rel="shortcut icon"` As per MDN _The `shortcut` link type is often seen before `icon`, but this link type is non-conforming, ignored and web authors must not use it anymore._

Links
---

- [Add a web app manifest](https://web.dev/add-manifest/)
- [Get things done quickly with app shortcuts](https://web.dev/app-shortcuts/)
- [Adaptive icon support in PWAs with maskable icons](https://web.dev/maskable-icon/)
- [pwa-asset-generator](https://github.com/onderceylan/pwa-asset-generator)
- [](https://web.dev/codelab-apple-touch-icon/)
- [Safari - Configuring Web Applications](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)
- [Changing The iOS Status Bar Of Your Progressive Web App](https://medium.com/appscope/changing-the-ios-status-bar-of-your-progressive-web-app-9fc8fbe8e6ab)
- [Progressive Web Apps: Customize Status Bar](https://codeburst.io/progressive-web-apps-customize-status-bar-23c4b2de590f)