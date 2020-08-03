---
title: Custom fonts in React Native
slug: custom-fonts
date: 2020-08-03
---

tl;dr

1. Create an `assets` folder and copy your fonts to it
2. Add config to `react-native.config.js`
3. Run `react-native link` to install fonts for both Android and iOS

```js
// react-native.config.js
module.exports = {
  assets: ['./assets/fonts/Graphik'],
}
```

```
android/app/src/main/assets/
```

The value for `fotFamily` (or just `font-family` if you're usig styled-components) will be the font filename minus the extension.

### Notes of font formats

Use `.otf` or `.ttf`.

`.woff` won't work. (`.woff` is a compressed version of OpenType `.otf` or TrueType `.ttf`)

## Troubleshooting

```
error Linking assets failed. Run CLI with --verbose flag for more details.
SyntaxError: Expected [\n\r] but end of input found.
```

Add a new line at the end of `ios/[Project].xcodeproj/project.pbxproj` and run `react-native link` again

## Links

- [Ultimate guide to use custom fonts in react native](https://medium.com/@mehrankhandev/ultimate-guide-to-use-custom-fonts-in-react-native-77fcdf859cf4)
- [Error: Expected [\n\r] but end of input found. ](https://github.com/react-native-community/react-native-linear-gradient/issues/141#issuecomment-331794558)
- [How to use fonts in your hybrid mobile app](https://www.theguild.nl/how-to-use-fonts-in-your-hybrid-mobile-app/)
