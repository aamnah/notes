---
date: 2021-06-20
title: Install Ruby with rbenv and CocoaPods on M1 MacBook (Apple Silicon)
---

1. install [Homebrew](https://brew.sh/)
2. Install Ruby with [rbenv](https://github.com/rbenv/rbenv)
3. Install [CocoaPods](https://guides.cocoapods.org/using/getting-started.html#getting-started)

Doing your own Ruby installation instead of using the system one is preferred, either with Homebrew or `rbenv`. Apple is [deprectaing the default system installation of Ruby](https://github.com/ffi/ffi/issues/870#issuecomment-756989318) anyway.

## Homebrew, rbenv and Ruby

```bash
# install homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# install ruby with rbenv
brew install rbenv # ruby-build is included
rbenv install 3.0.1
rbenv global 3.0.1 # set system default ruby version

ruby -v
# ruby 3.0.1p64 (2021-04-05 revision 0fb782ee38) [arm64-darwin20]
```

```bash
rbenv install -l # list versions that can be installed
rbenv versions # list installed ruby versions
rbenv global 3.0.1 # set system default ruby version
```

## Cocoapods

```bash
gem install ffi cocoapods
rbenv rehash # run a rehash after installing gems (or a new Ruby version) to make sure everything new is on your PATH:
```

- `sudo` is not needed for Ruby versions installed with `rbenv`
- `ffi` is needed here to get rid of some ffi related LoadError
- `rbenv rehash` is important, otherwise the Podfile will keep using the old system installed Ruby

Now you can go to your iOS project and do `pod repo update && pod install`

## Troubleshooting

- if you're getting errors about versions not found or mismatched versions..

```bash
rm -rf ./Podfile.lock
```

- if you have a real old project and the an old install of CocoaPods, you can delete the CocoaPods repo cache and update it again

```bash
sudo rm -rf ~/.cocoapods/repos
pod repo update
```

- i was getting the following error when doing a `pod install` inside an iOS project with Ruby installed with Homebrew and an old CocoaPods installation. The issue is [not with FFI library](https://betterprogramming.pub/ruby-on-apple-silicon-m1-macs-fb159849b2f5) and the error went away with this fresh install of Ruby and CocoaPods

```
LoadError - dlopen(/Library/Ruby/Gems/2.6.0/gems/ffi-1.14.2/lib/ffi_c.bundle, 0x0009): missing compatible arch in /Library/Ruby/Gems/2.6.0/gems/ffi-1.14.2/lib/ffi_c.bundle - /Library/Ruby/Gems/2.6.0/gems/ffi-1.14.2/lib/ffi_c.bundle
```

## Links

- [Using rbenv to install Cocoapods post El Capitan](https://telliott.io/2015/10/14/using-rbenv-for-cocoapods-post-el-capitan.html)
