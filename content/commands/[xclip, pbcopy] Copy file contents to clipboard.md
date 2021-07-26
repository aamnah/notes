---
title: Copy contents to clipboard form command line (Ubuntu, macOS)
date: 2021-07-26
---

- macOS comes with `pbcopy`

```bash
pbcopy < ~/.ssh/id_rsa.pub
```

- On Ubuntu you can use `xclip`

```bash
sudo apt install xclip
xclip -selection clipboard -i < inputFile

# xclip -sel c < inputFile
```

- `clipboard` is a parameter for `-selection`
- `-i` means inoput (standard input or file). Since _file_ is default, you can omit the `-i` in most cases


```
-i, -in
      read text into X selection from standard input or files (default)

-o, -out
      print the selection to standard out (generally for piping to a file or program)

-selection
      specify which X selection to use, options are "primary" to use XA_PRIMARY (default), "secondary" for XA_SECONDARY or "clipboard" for XA_CLIPBOARD
```


**NOTE**: `xclip` and `xsel` are X11 utilities, they manipulate the X11 selections, so can only be used in a X11 environment where `$DISPLAY` is set. Running in a terminal only context (e.g. WSL or headless) will give you this error: 

```bash
Error: Can't open display: (null)
```