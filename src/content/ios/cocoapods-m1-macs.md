---
title: CocoaPods on M1 MacBooks (Apple Silicon based chip)
date: 2020-02-24
slug: cocoapods-m1-macs
tags:
  - M1
  - CocoaPods
---

CocoaPods doesn't work out of the box on M1 Macs. Something about `ffi` and _arch_ stuff. There are workarounds though.

- Open Terminal / iTerm with Rosetta (Get Info > Open using Rosetta)
- Install CocoaPods related commands with `arch -x86_64`

```bash
# install CocoaPods
arch -x86_64 sudo gem install cocoapods

# install ffi
arch -x86_64 sudo gem install ffi

# install dependencies
arch -x86_64 pod install
```

## Links

- [CocoaPods compatibility with Apple DTK (Apple Silicon)](https://github.com/CocoaPods/CocoaPods/issues/9907)
