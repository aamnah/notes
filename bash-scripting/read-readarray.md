---
title: Reading multiple lines of input from Bash terminal
date: 2022-07-29
---

This came up when i was doing HackerRank challenges for Bash. The challenge called [Compute the Average](https://www.hackerrank.com/challenges/bash-tutorials---compute-the-average/problem?isFullScreen=true) had the following problem statement:

> Given N integers, compute their average, rounded to three decimal places.
> The first line contains an integer, N.
> Each of the following N lines contains a single integer.

My first attempt was to use `read` with the `-r` flag in a `while` loop to read all lines one by one and ignore the `\` character used to break up lines.

```bash
read TOTAL_INTEGERS
SUM=0

# loops through all args, add them
while read -r line
do
    INT="$line"
    $(( SUM += INT ))
done

# calculate the average and pipe it to `bc` to get a floating point value
AVERAGE=$(echo "$SUM/$TOTAL_INTEGERS" | bc -l)

# print average rounded off to three decimal places
printf "%.3f" $AVERAGE
```

This failed one of the tests where it turns out it wasn't adding the last argument. Turns out that the `read` command fails when the input is not terminated with a newline.

> If there are some characters after the last line in the file (or to put it differently, if the last line is not terminated by a newline character), then read will read it but return false, leaving the broken partial line in the read variable(s). You can add a logical OR to the while test [ref]()

So instead of `while read -r line`, do `while read -r line || [[ -n $line ]]`

```bash
read TOTAL_INTEGERS
SUM=0

# loops through all args, add them
# while loops will run till we have complete lines of input
# OR 
# when `-n` delimiter is reached (in this case the last value for $line) 
while read -r line || [[ -n $line ]]
do
    INT="$line"
    $(( SUM += INT ))
done

# calculate the average and pipe it to `bc` to get a floating point value
AVERAGE=$(echo "$SUM/$TOTAL_INTEGERS" | bc -l)

# print average rounded off to three decimal places
printf "%.3f" $AVERAGE
```

```
-r
  If this option is given, backslash does not act as an escape character. The backslash is considered to be part of the line. In particular, a backslash-newline pair may not then be used as a line continuation.
-n nchars
  read returns after reading nchars characters rather than waiting for a complete line of input, but honors a delimiter if fewer than nchars characters are read before the delimiter.
```

This worked as expected, but exceeded time limit (1s) by HackerRank. On to the next attempt using `readarray` .. 

> readarray
> Read lines from the standard input into the indexed array variable array, or from file descriptor fd if the -u option is supplied.


```bash
read TOTAL_INTEGERS
SUM=0

readarray ARGS

# loops through all args, add them
for (( i = 0; i < TOTAL_INTEGERS; i++ ))
do 
    $(( SUM += ARGS[i] ))
done

# calculate the average and pipe it to `bc` to get a floating point value
AVERAGE=$(echo "$SUM/$TOTAL_INTEGERS" | bc -l)

# print average rounded off to threbe decimal places
printf "%.3f" $AVERAGE
```

This resulted in much simpler code and worked faster then the `read` example. (This also makes sense why the first line of the input contains the total number of integers to be added)

Links
---

- [Bash Reference Manual](https://www.gnu.org/software/bash/manual/bash.html)
- [Why does unix while read not read last line?](https://stackoverflow.com/a/20010785/890814)
- [How can I read a file (data stream, variable) line-by-line (and/or field-by-field)?](http://mywiki.wooledge.org/BashFAQ/001)