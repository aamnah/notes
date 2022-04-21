---
title: Fastlane (Getting started)
date: 2021-03-28
lastmod: 2022-03-17
draft: true
slug: fastlane-getting-started
tags:
  - fastlane
---

tl;dr

- All your config goes in a file called `Fastfile`
- Fastlane works on Windows and Linux, but only for Android builds. You need a Mac for iOS builds. (That's an iOS limitation and not a fastlane one)

```bash
# macOS/Linux
brew install fastlane

# System Ruby + RubyGems (macOS/Linux/Windows)
sudo gem install fastlane

fastlane init
```

### Installing with Ruby and Bundler

- Inside your project, create a `Gemfile` and add the following to it

```ruby
source "https://rubygems.org"

gem "fastlane"
```

- Run `bundle install` to install Fastlane for your project
- Run `bundle exec fastlane init` to initialize Fastlane for your project

Now you shall run every Fastlane command with `bundle exec fastlane`. That is apparently faster.

You have to initiate `fastlane` in both `android/` and `ios/` directories

### BUmping version numbers

Manual: change `versionName` and `versionCode` in `android/app/build.gradle`

### Updating Release Notes

For android, the release notes go in `fastlane/metadata/android/en-GB/changelogs/{VERSION_CODE}.txt`

### Posting to Slack

## Links

- https://docs.fastlane.tools
- [Getting started with fastlane for React Native](https://docs.fastlane.tools/getting-started/cross-platform/react-native/)
