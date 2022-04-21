---
title: Fastlane - Check if a release notes file exists (for Android)
description: Check if a release notes file for the current version exists and use it when releasing to Firebase. If one for the version code doesn't exist then check for the `default.txt` file and use that. If that also doesn't exist then use the default release text message.
date: 2021-03-10
slug: fastlane-check-release-file-android
tags:
  - fastlane
---

- You can use `File.exist()` to check if a file exists. `File.exists()` (with an S at the end) is deprecated
- You can get the version code for Android using the [fastlane-plugin-versioning_android](https://github.com/beplus/fastlane-plugin-versioning_android) plugin's `android_get_version_code()`
- You can get the Android app's metadata from the Play Console using Fastlane [supply](https://docs.fastlane.tools/actions/supply/)
- The changelogs for Android are saved in `metadata/android/en-GB/changelogs/`. Every language gets its own folder
- Get the file path for the changelog for the _versionCode_ i.e. build version that you're releasing. For example: `'metadata/android/en-GB/changelogs/' + ANDROID_BUILD + '.txt'`
- Use if/else to set which file to use depending on whether it exists or not.

Check if a file exists

```
# Does this file already exist?
File.exist?("log.txt")
```

Get the path for the version specific release notes file

```
release_notes_file_path = 'metadata/android/en-GB/changelogs/' + ANDROID_BUILD + '.txt' # metadata/android/en-GB/changelogs/18.txt
```

```
if File.exist?(release_notes_file_path)
  puts "file exists"
else
  puts "file #{release_notes_file_path} does not exist"
end
```

```ruby
android_version_code = android_get_version_code(
  gradle_file: "android/app/build.gradle"
)

# get the path for the relevat release notes file
release_notes_version_file_path = 'metadata/android/en-GB/changelogs/' + ANDROID_BUILD + '.txt' # metadata/android/en-GB/changelogs/18.txt
release_notes_default_file_path = 'metadata/android/en-GB/changelogs/default.txt'
release_notes_default_text = "Bug fixes and performance improvements"

if File.exist?(release_notes_version_file_path)
  puts "version file exists #{release_notes_version_file_path}"
elsif File.exist?(release_notes_default_file_path)
  puts "default file exists #{release_notes_default_file_path}"
else
  puts "neither #{release_notes_version_file_path}, nor #{release_notes_default_file_path} exist"
end
```

```ruby
android_version_code = android_get_version_code(
  gradle_file: "android/app/build.gradle"
)

# get the path for the relevat release notes file
release_notes_version_file_path = 'metadata/android/en-GB/changelogs/' + ANDROID_BUILD + '.txt' # metadata/android/en-GB/changelogs/18.txt
release_notes_default_file_path = 'metadata/android/en-GB/changelogs/default.txt'
release_notes_default_text = "Bug fixes and performance improvements"

if File.exist?(release_notes_version_file_path)
  puts "version file exists #{release_notes_version_file_path}"
elsif File.exist?(release_notes_default_file_path)
  puts "default file exists #{release_notes_default_file_path}"
else
  puts "neither #{release_notes_version_file_path}, nor #{release_notes_default_file_path} exist"
end

firebase_app_distribution(
  app: ENV["FIREBASE_APP_ID"],
  # testers: ENV["FIREBASE_TESTERS"],
  testers: "aamnah@aamnah.com",
  # groups: ENV['FIREBASE_GROUPS'],
  apk_path: "android/app/build/outputs/apk/release/app-release.apk"

  # release_notes: ENV['DEFAULT_RELEASE_NOTE'],
  if File.exist?(release_notes_version_file_path)
    release_notes_file: "#{release_notes_version_file_path}"
  elsif File.exist?(release_notes_default_file_path)
    release_notes_file: "#{release_notes_default_file_path}"
  else
    release_notes: "#{release_notes_default_text}"
  end
)
```

## Links

- [Ruby docs: File](https://ruby-doc.org/core-2.5.0/File.html)
- [How To Read & Write Files in Ruby (With Examples)](https://www.rubyguides.com/2015/05/working-with-files-ruby/)
- [fastlane-plugin-versioning_android](https://github.com/beplus/fastlane-plugin-versioning_android)
- [Fastlane supply](https://docs.fastlane.tools/actions/supply/)
- [Ruby - if...else, case, unless](https://www.tutorialspoint.com/ruby/ruby_if_else.htm)
