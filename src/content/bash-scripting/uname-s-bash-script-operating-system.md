---
title: Checking operating system in a bash script and installing different programs
slug: uname-s-bash-script-operating-system
date: 2020-06-28
---

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

I got this from Google's [install script from Firebase CLI](https://firebase.tools/)

- `uname -s` prints the operating system name

Once you have the , you can use an `if/esle` or `case` statement

```bash
[[ $UNAME = darwin ]] && echo 'macOS' || echo 'Linux'
```
