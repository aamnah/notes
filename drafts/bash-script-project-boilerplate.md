---
title: script to create a new project
slug: bash-script-project-boilerplate
category: Bash Scripting
date: 2020-07-10
draft: true
---

## Web dev with Parcel

```bash
cd PROJECTS_DIR
mkdir NEW_PROJECT
cd NEW_PROJECT

npm init -y
npm i parcel-bundler
```

```json
  "scripts": {
    "dev": "parcel src/index.html",
    "build": "parcel build src/index.html --out-dir prod"
  },
```
