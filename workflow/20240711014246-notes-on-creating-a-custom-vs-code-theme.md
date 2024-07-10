---
title: Notes on creating a custom VS Code theme
date: 2024-07-11T01:42:46+03:00
uuid: 20240711014246
slug: notes-on-creating-a-custom-vs-code-theme
draft: true
description: 
tags: 
---

- Get a list of all the colors from [here](https://code.visualstudio.com/api/references/theme-color)


- After creating your theme, switch to it and test your changes live by editing the `settings.json` file

```json
"workbench.colorCustomizations": {
  "[ThemeName]": {
    "panel.background": "#01030a",
  }
}
```

`name` values are automatically removed when you generate a theme based on your customizations. For example

```json
{
  "name": "[MARKDOWN] - + * Punctuation List",
  "scope": "punctuation.definition.list.begin.markdown",
  "settings": {
    "foreground": "#6796E6"
  }
},
```

will become 

```json
{
  "scope": "punctuation.definition.list.begin.markdown",
  "settings": {
    "foreground": "#6796E6"
  }
},
```

this was a bummer for me as i was using the `name` key to add comments to JSON.


### Publishing

```bash
npm install -g @vscode/vsce

# Create a .vsix file
vsce package

# auto-increment semVer version Major.Minor.Patch
vsce publish minor

vsce publish patch -m 'Panel colors updated (Terminal, Output etc.)'
```


Extensions are managed at https://marketplace.visualstudio.com/manage/



Links
---
- https://code.visualstudio.com/api/extension-guides/color-theme#create-a-new-color-theme
- [Theme Color](https://code.visualstudio.com/api/references/theme-color)