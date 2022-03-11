---
date: 2022-03-09
draft: true
title: Hugo basics
tags:
  - Hugo
---

```bash
brew install hugo

hugo new site mysite
cd mysite

# hugo new theme <THEMENAME>

# hugo new <SECTIONNAME>/<FILENAME>.<FORMAT>

hugo serve

# build static pages
hugo -D
```

Download a theme into the same-named folder.
Choose a theme from https://themes.gohugo.io/ or
create your own with the "hugo new theme <THEMENAME>" command. 2. Perhaps you want to add some content. You can add single files
with "hugo new <SECTIONNAME>/<FILENAME>.<FORMAT>". 3. Start the built-in live server via "hugo server".

### Creating and setting a theme

```bash
hugo new theme myTheme
echo theme = \"myTheme\" >> config.toml
```

### Create a theme
