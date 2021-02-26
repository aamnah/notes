---
title: Checking operating system in a bash script and installing different programs
slug: uname-s-bash-script-operating-system
date: 2020-06-28
lastmod: 2021-02-26
---

Because i have multiple machines and use both Ubuntu and macOS, I often need to alter my commands to account for differences in commands. For example, to get colorized output for the `ls` command, Ubuntu would use the `--color` flag while macOS will use the `-G` flag. `-G` in Ubuntu is for `--no-group`, i.e. don't print group names in long listing format. And i don't want to write two different files for Ubuntu and macOS, i want to be able to use the same .dotfiles on both systems.

`uname -s` prints the operating system name. Once you have the `$UNAME`, you can use an `if/esle` or `case` statement

```bash
UNAME=$(uname -s | tr '[:upper:]' '[:lower:]')
case "$UNAME" in
    linux*)     MACHINE=linux;;
    darwin*)    MACHINE=macos;;
esac

# example if/esle statement 1
if [[ $UNAME = darwin ]]; then
  echo "You are on macOS"
elif [[ $UNAME = linux ]]; then 
  echo "You are on Linux"
fi

# example if/esle statement 2
[[ $UNAME = darwin ]] && echo "You are on macOS" || echo "You are on macOS"

# example if/esle statement 3
if [[ $UNAME = darwin ]]; then echo "You are on macOS"; else echo "You are on macOS"; fi
```

```bash
# use -G (masOS) or --color (Ubuntu) to get colorized output for ls command
if [[ $UNAME = darwin ]]; then ls -G ~; else ls --color ~; fi
```

I got this from Google's [install script from Firebase CLI](https://firebase.tools/), which adjusts the binary file you need to download based on whatever system you're on


```bash
echo "-- Checking your machine type..."

# Now we need to detect the platform we're running on (Linux / Mac / Other)
# so we can fetch the correct binary and place it in the correct location
# on the machine.

# We use "tr" to translate the uppercase "uname" output into lowercase
UNAME=$(uname -s | tr '[:upper:]' '[:lower:]')

# Then we map the output to the names used on the Github releases page
case "$UNAME" in
    linux*)     MACHINE=linux;;
    darwin*)    MACHINE=macos;;
esac

# If we never define the $MACHINE variable (because our platform is neither Mac
# or Linux), then we can't finish our job, so just log out a helpful message
# and close.
if [ -z "$MACHINE" ]
then
    echo "Your operating system is not supported, if you think it should be please file a bug."
    echo "https://github.com/firebase/firebase-tools/"
    echo "-- All done!"

    send_analytics_event "missing_platform_$UNAME"
    exit 0
fi
```
