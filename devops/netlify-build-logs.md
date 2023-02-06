---
title: improving Netlify build logs
date: 2023-02-06
tags:
- netlify
---


- Terminal colors work in Netlify build/deploy logs
- Line breaks `\n` inside `echo` statements do not work


```bash
log() {
  COLOR_MAGENTA="\u1b[35m"
  COLOR_OFF="\033[m"

  echo -e "${COLOR_MAGENTA}==== ${1} ...${COLOR_OFF}"
}

log "this is a colored message"
```

- Use build scripts
- Add colors
- Log deployment URLs


```
0	black
1	red
2	green
3	yellow
4	blue
5	magenta
6	cyan
7	white
```

Links
---

- [Deploy URLs and metadata](https://docs.netlify.com/configure-builds/environment-variables/#deploy-urls-and-metadata)
- [Terminal Colors](https://chrisyeh96.github.io/2020/03/28/terminal-colors.html)
