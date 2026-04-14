---

title: How to take options for your Bash Script
slug: how_to_take_options_arguments_for_your_bash_script
date: 2015-02-22
lastmod: 2026-04-14
---

Overview:

- The distinction between _options_ (flags) and _positional args_
- `getopts` for short options, with `:` meaning "takes a value" and `$OPTARG` holding it
- Manual while/case loop for long options (GNU `getopt` mentioned but not walked through)

---

Options are the flags you pass to a script, like `-v` or `--verbose`. Different from positional arguments (`$1`, `$2`, etc.) — options can come in any order, can be optional, and usually toggle behavior or carry a value.

## Using `getopts`


Bash has a builtin called `getopts` that handles short options (single-letter flags like `-h`, `-v`, `-f filename`).

```bash
#!/bin/bash

while getopts "hvf:" opt; do
  case $opt in
    h) echo "Usage: $0 [-h] [-v] [-f filename]"; exit 0 ;;
    v) VERBOSE=true ;;
    f) FILENAME="$OPTARG" ;;
    \?) echo "Invalid option: -$OPTARG" >&2; exit 1 ;;
  esac
done
```

The string `"hvf:"` tells `getopts` which flags to accept. A `:` after a letter means that flag takes a value, which lands in `$OPTARG`.

Run it like this:

```bash
./script.sh -v -f data.txt
```

## Long options (`--verbose`)

`getopts` only handles short options. For GNU-style long options (`--verbose`, `--file=data.txt`) you need the external `getopt` command (note: no `s`) or you parse manually with a `while` + `case` loop over `$1`.

Manual parsing looks like:

```bash
while [[ $# -gt 0 ]]; do
  case "$1" in
    -v|--verbose) VERBOSE=true; shift ;;
    -f|--file) FILENAME="$2"; shift 2 ;;
    -h|--help) show_help; exit 0 ;;
    *) echo "Unknown option: $1" >&2; exit 1 ;;
  esac
done
```

`shift` drops `$1` and shifts everything down, so `$2` becomes `$1`. `shift 2` drops two args — useful when the flag took a value.

See also
---

- [Arguments](/bash-scripting/arguments) — for positional args (`$1`, `$2`)
- [Showing Help and Usage](/bash-scripting/show-help-usage)
- [Taking input](/bash-scripting/bash-scripting-take-input)
