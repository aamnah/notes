---

title: Showing Help and Usage
slug: show-help-usage
date: 2015-12-07
lastmod: 2017-03-13
---

A basic way is saving usage as a function

```bash
showUsage() {
    echo -e "Usage: please provide an argument"
}
```

and later in your script, you can run a conditional statement that checks for something, say no arguments are provided, you can show the usage and exit

```bash
if [ condition ]
then
  showUsage
  exit 1
else
  # run the code
fi
```
