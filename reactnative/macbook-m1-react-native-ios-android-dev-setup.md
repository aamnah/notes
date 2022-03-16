---
title: Setting up an M1 MacBook Pro for React Native (iOS and Android)
date: 2021-02-24
slug: macbook-m1-react-native-ios-android-dev-setup
---

## Setting up the environment

Setup for iOS needs:

- Node (with NVM)
- Watchman `brew install watchman`
- Xcode (install from the App Store)
- Xcode Command Line Tools `xcode-select --install`
- Accept the Software License for Xcode `sudo xcodebuild -license`. It'll prompt you anyway when you run Xcode for the first time.
- CocoaPods `sudo gem install cocoapods`

```bash
# node will be installed with NVM
brew install watchman

# install CocoaPods
#sudo gem install cocoapods
brew install cocoapods
```

```
clone the project
`npm ci`
```

### Ruby

Install Ruby `3.x`. The one that comes pre-installed with macOS is outdated

```bash
brew install ruby
```

### Cocoapods

```bash
# sudo gem uninstall cocoapods

# if you get error: You don't have write permissions for the /usr/bin directory.
# sudo gem install cocoapods -n /usr/local/bin

arch -arm64 brew install cocoapods

# if you get error: rbenv: pod: command not found
brew link --overwrite cocoapods
```

### Homebrew

Install [Homebrew](https://docs.brew.sh/Installation) if you don't have it installed already

```bash
mkdir homebrew && curl -L https://github.com/Homebrew/brew/tarball/master | tar xz --strip 1 -C homebrew
```

### Node LTS with NVM

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

nvm install --lts
```

## iOS

- Open Terminal / iTerm with Rosetta (Get Info > Open using Rosetta)
- Prefix the CocoaPods related commands with `arch -x86_64`

```bash
sudo gem update --system

arch -x86_64 sudo gem install cocoapods
arch -x86_64 sudo gem install ffi
```

```bash
cd ios/
arch -x86_64 pod install
```

## Android

- Install JDK 8 `brew install --cask adoptopenjdk/openjdk/adoptopenjdk8`
- Install [Android Studio]()
- Install [Android Emulator for M1](https://github.com/google/android-emulator-m1-preview)

The Android Emulator doesn't work out of the box yet. Luckily, there is a Preview build by Google that supports Apple Silicon M1 chip based MacBooks. You'll have to download and install it separately. _Most_ things work.

### Troubleshooting

- `command not found` for `brew` or `nvm`. Make sure you have a `~/.zshrc` file. On a fresh new M1 MacBook, there is no `~/.zshrc` or `~/.zprofile` created and the `$PATH` doesn't get updated because of it. Create a `~/.zshrc` file and run the commands to install Homebrew and NVM again.

```bash
touch ~/.zshrc
```

```
### Error

LoadError - dlopen(/Library/Ruby/Gems/2.6.0/gems/ffi-1.14.2/lib/ffi_c.bundle, 0x0009): missing compatible arch in /Library/Ruby/Gems/2.6.0/gems/ffi-1.14.2/lib/ffi_c.bundle - /Library/Ruby/Gems/2.6.0/gems/ffi-1.14.2/lib/ffi_c.bundle
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require'
/Library/Ruby/Gems/2.6.0/gems/ffi-1.14.2/lib/ffi.rb:6:in `rescue in <top (required)>'
/Library/Ruby/Gems/2.6.0/gems/ffi-1.14.2/lib/ffi.rb:3:in `<top (required)>'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require'
/Library/Ruby/Gems/2.6.0/gems/ethon-0.12.0/lib/ethon.rb:2:in `<top (required)>'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require'
/Library/Ruby/Gems/2.6.0/gems/typhoeus-1.4.0/lib/typhoeus.rb:2:in `<top (required)>'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require'
/Library/Ruby/Gems/2.6.0/gems/cocoapods-1.10.1/lib/cocoapods/sources_manager.rb:74:in `cdn_url?'
/Library/Ruby/Gems/2.6.0/gems/cocoapods-1.10.1/lib/cocoapods/sources_manager.rb:36:in `create_source_with_url'
/Library/Ruby/Gems/2.6.0/gems/cocoapods-1.10.1/lib/cocoapods/sources_manager.rb:21:in `find_or_create_source_with_url'
/Library/Ruby/Gems/2.6.0/gems/cocoapods-1.10.1/lib/cocoapods/installer/analyzer.rb:178:in `block in sources'
/Library/Ruby/Gems/2.6.0/gems/cocoapods-1.10.1/lib/cocoapods/installer/analyzer.rb:177:in `map'
/Library/Ruby/Gems/2.6.0/gems/cocoapods-1.10.1/lib/cocoapods/installer/analyzer.rb:177:in `sources'
/Library/Ruby/Gems/2.6.0/gems/cocoapods-1.10.1/lib/cocoapods/installer/analyzer.rb:1073:in `block in resolve_dependencies'
/Library/Ruby/Gems/2.6.0/gems/cocoapods-1.10.1/lib/cocoapods/user_interface.rb:64:in `section'
/Library/Ruby/Gems/2.6.0/gems/cocoapods-1.10.1/lib/cocoapods/installer/analyzer.rb:1072:in `resolve_dependencies'
/Library/Ruby/Gems/2.6.0/gems/cocoapods-1.10.1/lib/cocoapods/installer/analyzer.rb:124:in `analyze'
/Library/Ruby/Gems/2.6.0/gems/cocoapods-1.10.1/lib/cocoapods/installer.rb:414:in `analyze'
/Library/Ruby/Gems/2.6.0/gems/cocoapods-1.10.1/lib/cocoapods/installer.rb:239:in `block in resolve_dependencies'
/Library/Ruby/Gems/2.6.0/gems/cocoapods-1.10.1/lib/cocoapods/user_interface.rb:64:in `section'
/Library/Ruby/Gems/2.6.0/gems/cocoapods-1.10.1/lib/cocoapods/installer.rb:238:in `resolve_dependencies'
/Library/Ruby/Gems/2.6.0/gems/cocoapods-1.10.1/lib/cocoapods/installer.rb:160:in `install!'
/Library/Ruby/Gems/2.6.0/gems/cocoapods-1.10.1/lib/cocoapods/command/install.rb:52:in `run'
/Library/Ruby/Gems/2.6.0/gems/claide-1.0.3/lib/claide/command.rb:334:in `run'
/Library/Ruby/Gems/2.6.0/gems/cocoapods-1.10.1/lib/cocoapods/command.rb:52:in `run'
/Library/Ruby/Gems/2.6.0/gems/cocoapods-1.10.1/bin/pod:55:in `<top (required)>'
/usr/local/bin/pod:23:in `load'
/usr/local/bin/pod:23:in `<main>'

――― TEMPLATE END ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――

[!] Oh no, an error occurred.
```

```
warning: The iOS Simulator deployment target 'IPHONEOS_DEPLOYMENT_TARGET' is set to 8.0, but the range of supported deployment target versions is 9.0 to 14.4.99. (in target 'boost-for-react-native' from project 'Pods')
```

Add this to you `Podfile`

```ruby
post_install do |installer|
  # set the Deployment target for all your Pods references
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      # adjusting it only if it's not greater than 8.0
      if Gem::Version.new('9.0') > Gem::Version.new(config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'])
        config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '9.0'
      end
    end
  end
end
```

```
error listen EADDRINUSE: address already in use :::8081. Run CLI with --verbose flag for more details.
```

Two options:

- Run on a different port `react-native start --port=8088`
- OR find out what program is using 8081 `sudo lsof -i :8081` and kill it `kill -9 1234`

### incorrect architecture 'x86_64' errors

```
warning: no rule to process file '/Users/aamnah/Sites/mobile-app/ios/Pods/Flipper-RSocket/rsocket/README.md' of type 'net.daringfireball.markdown' for architecture 'x86_64' (in target 'Flipper-RSocket' from project 'Pods')
```

add this to the `Podfile`

```
post_install do |installer|
  installer.pods_project.build_configurations.each do |config|
    config.build_settings["EXCLUDED_ARCHS[sdk=iphonesimulator*]"] = "arm64"
  end
end
```

run `pod install` afterwards

## Links

- [Android Emulator for M1](https://github.com/google/android-emulator-m1-preview)
- [CocoaPods compatibility with Apple DTK (Apple Silicon)](https://github.com/CocoaPods/CocoaPods/issues/9907)
