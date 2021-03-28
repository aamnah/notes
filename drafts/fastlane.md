---
title: Fastlane (Getting started)
date: 2021-03-28
status: draft
slug: fastlane-getting-started
---

- Inside your project, create a `Gemfile`
- Add the following to it

```ruby
source "https://rubygems.org"

gem "fastlane"
```

- Run `bundle install` to install Fastlane for your project
- Run `bundle exec fastlane init` to initialize Fastlane for your project

Now you shall run every Fastlane command with `bundle exec fastlane`. That is apparently faster.

You have to initiate `fastlane` in both `android/` and `ios/` directories

## Links

- https://docs.fastlane.tools
