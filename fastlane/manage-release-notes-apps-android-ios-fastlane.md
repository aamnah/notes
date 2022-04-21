---
title: Managing release notes for Android and iOS apps using Fastlane
date: 2021-02-10
slug: manage-release-notes-apps-android-ios-fastlane
tags:
  - fastlane
  - android
  - ios
---

There are two types of logs that i have been maintaining for my projects

- The _human generated, user friendly_ release notes that we publish with the app to the marketplaces
- The _human generated, technically detailed_ `CHANGELOG.md` file that we commit with the code. This file contains internal references to Jira/Bitbucket/Sentry issues. (I am currently working on making it auto-generated as well based on conventional commits..)

## Android

I use [Fastlane]() for release and deployments. It's a pretty cool tool that originally used to be macOS only but has been made available for Linux and Windows for some time now. For Android and publishing to the Play Console, Fastlane has this plugin called [supply]() which can fetch and update your app's metadata. This metadata includes your app's release notes as well as things such as screenshots and short/long description.

Since [supply]() already has a folder structure for release notes, i am going to use that and reference version specific release notes files from here in other areas instead of setting up my own structure.

### Fastlane - Supply

- Default release notes go into `default.txt`
- The file(name) for each release should exactly match the `versionCode` for that release
- Changelogs are saved in `metadata/android/LANG-CODE/changelogs`

```
└── fastlane
    └── metadata
        └── android
            ├── en-US
            │   └── changelogs
            │       ├── default.txt
            │       ├── 100000.txt
            │       └── 100100.txt
            └── fr-FR
                └── changelogs
                    ├── default.txt
                    └── 100100.txt
```

### Fastlane - Firebase

You can either specify a note with `release_notes` or a file with `release_notes_file`.

```
release_notes: "Text of release notes"
```

```
release_notes_file: "/path/to/release-notes.txt"
```

```ruby
    firebase_app_distribution(
      app: ENV["FIREBASE_APP_ID"],
      testers: ENV["FIREBASE_TESTERS"],
      groups: ENV['FIREBASE_GROUPS'],
      # release_notes: ENV['DEFAULT_RELEASE_NOTE'],
      # release_notes: "Lots of amazing new features to test out!"
      release_notes_file: "metadata/android/en-GB/changelogs/default.txt"
    )
```

```ruby
android_version_code = android_get_version_code(
  gradle_file: "android/app/build.gradle"
)

# get the path for the relevat release notes file
release_notes_file_path = File.join('metadata/android/en-GB/changelogs/', android_version_code) # metadata/android/en-GB/changelogs/18
```

```ruby
if File.exist?(release_notes_file_path)
  puts "file exists"
else
  puts "file #{release_notes_file_path} does not exist"
end
```

You should really check for the `versionCode` in your Fastfile and load the relevant file for the release

## Links

- https://docs.fastlane.tools/actions/supply/#changelogs-whats-new
- https://firebase.google.com/docs/app-distribution/android/distribute-fastlane
