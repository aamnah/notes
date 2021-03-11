---
title: React Native iOS on MacBook M1
date: 2021-03-11
slug: react-native-macbook-m1-troubleshooting
---

```bash

```

```
Run instructions for iOS:
  • cd "/Users/aamnah/tmp/ForcesPenpals" && npx react-native run-ios
  - or -
  • Open ForcesPenpals/ios/ForcesPenpals.xcworkspace in Xcode or run "xed -b ios"
  • Hit the Run button
```

# Xcode

- Open the `ios/PROJECT.scworkspace` file in Xcode. Just double-click it.
- Product > Clean Build Folder (shortcut is `Cmd+Shift+K`)

# Troubleshooting

Always run the iOS project in Xcode to get better errors. Figuring out what went wrong from the console output is a nightmare.

## Deployment target / IPHONEOS_DEPLOYMENT_TARGET

```
warning: The iOS Simulator deployment target 'IPHONEOS_DEPLOYMENT_TARGET' is set to 8.4, but the range of supported deployment target versions is 9.0 to 14.4.99. (in target 'Flipper-PeerTalk' from project 'Pods')

warning: The iOS Simulator deployment target 'IPHONEOS_DEPLOYMENT_TARGET' is set to 6.0, but the range of supported deployment target versions is 9.0 to 14.4.99. (in target 'OpenSSL-Universal' from project 'Pods')
```

You can set the Deployment target for all your Pods references (in your `Podfile`). Add this to your `Podfile` and run `pod install` afterwards

```ruby
post_install do |installer|
 installer.pods_project.targets.each do |target|
  target.build_configurations.each do |config|
   config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '9.0'
  end
 end
end
```

## no rule to process file (`.md` and `.txt`)

```
warning: no rule to process file '/Users/aamnah/AwesomeProject/ios/Pods/Flipper-RSocket/rsocket/benchmarks/CMakeLists.txt' of type 'text' for architecture 'x86_64' (in target 'Flipper-RSocket' from project 'Pods')

warning: no rule to process file '/Users/aamnah/AwesomeProject/ios/Pods/Flipper-RSocket/rsocket/benchmarks/README.md' of type 'net.daringfireball.markdown' for architecture 'x86_64' (in target 'Flipper-RSocket' from project 'Pods')

warning: no rule to process file '/Users/aamnah/AwesomeProject/ios/Pods/Flipper-RSocket/rsocket/README.md' of type 'net.daringfireball.markdown' for architecture 'x86_64' (in target 'Flipper-RSocket' from project 'Pods')
```

Open the `PROJECT.xcworkspace` file in Xcode. Click the Pods project in the Project Navigator, from Targets, select `Flipper-RSocket`, go to _Build Phases_ tab, under the **Compile Sources** heading, select the troublesome `.md` and `.txt` files and remove them by clicking the - icon at the bottom of the list

## Flipper related errors

```
react native ios/Pods/Headers/Public/libevent/event.h:44:10: 'event2/event-config.h' file not found
```

The default React Native template ships with an outdated Flipper (`0.54.0` when the latest is `0.79.1`). [Upgrade the version](https://fbflipper.com/docs/getting-started/react-native/) for Android and iOS. After updating version and running pod install again

```
Analyzing dependencies
Fetching podspec for `DoubleConversion` from `../node_modules/react-native/third-party-podspecs/DoubleConversion.podspec`
Fetching podspec for `Folly` from `../node_modules/react-native/third-party-podspecs/Folly.podspec`
Fetching podspec for `glog` from `../node_modules/react-native/third-party-podspecs/glog.podspec`
[!] CocoaPods could not find compatible versions for pod "FlipperKit/FKPortForwarding":
  In Podfile:
    FlipperKit/FKPortForwarding (= 0.79.1)

None of your spec sources contain a spec satisfying the dependency: `FlipperKit/FKPortForwarding (= 0.79.1)`.

You have either:
 * out-of-date source repos which you can update with `pod repo update` or with `pod install --repo-update`.
 * mistyped the name or version.
 * not added the source repo that hosts the Podspec to your Podfile.
```

if you get the error above, run `pod repo update` and then `pod install` again

```
Analyzing dependencies
Fetching podspec for `DoubleConversion` from `../node_modules/react-native/third-party-podspecs/DoubleConversion.podspec`
Fetching podspec for `Folly` from `../node_modules/react-native/third-party-podspecs/Folly.podspec`
Fetching podspec for `glog` from `../node_modules/react-native/third-party-podspecs/glog.podspec`
Downloading dependencies
Installing Flipper 0.79.1 (was 0.54.0)
Installing FlipperKit 0.79.1 (was 0.54.0)
Generating Pods project
Integrating client project
Pod installation complete! There are 47 dependencies from the Podfile and 38 total pods installed.
```

## Undefined symbol

```
Undefined symbol: protocol descriptor for Swift.ExpressibleByFloatLiteral
```

Run Xcode with Rosetta 2 to get rid of this one.

## main.jsbundle missing

```
ios/main.jsbundle: No such file or directory
```

run

```bash
npm run build-ios
```

it'll run this command

```bash
react-native bundle --dev false --entry-file index.js --bundle-output ios/main.jsbundle --platform ios
```

## Links

- [Is Apple silicon ready for Developers?](https://isapplesiliconready.com/for/developer)
- [Using the latest Flipper SDK](https://fbflipper.com/docs/getting-started/react-native/#using-the-latest-flipper-sdk)
- https://developer.apple.com/forums/thread/656616
