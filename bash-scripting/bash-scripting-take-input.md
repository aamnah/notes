---

title: Bash Scripting - Taking input
slug: bash-scripting-take-input
date: 2014-06-05
---


There are multiple ways of taking input via the Shell.

Using the 'read' command to prompt for input
-----

```bash
#!/bin/bash

echo "Enter your name:"
read user_name

echo "Hello $user_name!"
```

Here's what the script will look like when we run it.

```
$ sh nameexample
Enter your name: Sarah
Hello Sarah!
```

Using Command-Line Arguments for Input
-----
Command line arguments given to a script become variables whose names are numbers. `$1` is the first command-line argument, `$2` is the second, and so on. `$0` is the name by which the script was invoked. 

Defining Variables
-----
