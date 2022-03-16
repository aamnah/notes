---
title: Git ignore ALL caches
date: 2021-07-28
slug: git-ignore-all-cache-folders
---

Needed to do this for a WordPress site for which the source has been committed. The issue with WordPress is that there are too many caches! The plugins will add their own, the theme will add their own and so on..

Find all folders with cache in their name to get an idea of what you're ignoring..

```bash
find . -type d -name *cache
```

```
./wp-content/et-cache
./wp-content/cache
./wp-content/plugins/wp-rocket/views/cache
./wp-content/themes/Divi/core/components/cache
./wp-content/wphb-cache
```

Add the following to your `.gitignore` file

```
# .gitignore

# any folders named cache or .cache (case insensitive)
[Cc]ache
**/[Cc]ache
**/.[Cc]ache

# any folders named *-cache or *-Cache (e.g. wphb-cache, et-cache)
*-[Cc]ache
**/*-[Cc]ache
**/.*-[Cc]ache
```

- `[Cc]` match both lower and uppercase (i.e. `Cache` and `cache` folders)
- `**` matches 0 or more levels of subdirectory. `**` is supported as of [1.8.2](https://github.com/git/git/blob/master/Documentation/RelNotes/1.8.2.txt)

Make sure git removes the folder if it was already added and stops tracking it.

```bash
git rm -r --cached .
git add .
git commit -m "Update .gitignore"
```
