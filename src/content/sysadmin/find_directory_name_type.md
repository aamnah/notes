---
title: Find a directory by name
description: For example, find all directories named 'cache'
date: 2020-05-16
---

```bash
find -type d -name cache
```

- `find` is the simplest command you can use to find files and folders
- `-type` flag means search only of this type, `d` is for **d**irectories
- `-name` flag means search for this name, `cache` is what i searched for

You can take it a step further by using `-exec` to run some action on the directories you found. For example, i can use the command below to find all directories named `cache` and set their permissions to `777`

```bash
find . -type d -name cache -exec chmod 777 {} \;
```
