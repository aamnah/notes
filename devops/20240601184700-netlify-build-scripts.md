---
title: Using build scripts for sites hosted on Netlify
date: 2024-06-01T18:47:00+03:00
uuid: 20240601184700
lastmod: 2024-06-05
slug: netlify-build-scripts
draft: true
description: 
tags: 
- netlify
- bash
- script
---


Create your script, it can be a simple bash script. You can not use `apt` or `snap` inside to install packages.

```bash
touch netlify_build.sh
```

Tell Netlify to use that script to build the site. You will do that inside `netlify.toml` by updating the value for `command` under `build` settings

```toml
[build]
  command = "./netlify_build.sh"
```
