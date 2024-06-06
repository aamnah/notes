---
title: "[cut] cut, print selected parts of a file"
slug: cut-print-selected-parts-of-file
date: 2017-03-13
lastmod: 2024-06-06
---

## Example
grab all the usernames in `/etc/passwd`

```bash
cut -f1 -d: /etc/passwd
```

where field `f1` is the first occurrence before delimiter `:`. Since the first occurrence is the username, the command above will grab all the usernames.

fyi, one entry in `/etc/passwd` looks like this:

```
jane:x:1000:1000:Jane,,,:/home/jane:/bin/bash
```

```bash
cut -f7 -d: /etc/passwd
```

Field 7 is the last part in `/etc/passwd`, i.e, the shell associated with each account. 


```
-d, delimiter
-f, field
```