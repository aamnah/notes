---
title: Write a program in different programming languages
date: 2022-11-03T09:47:12+05:00
uuid: 20221103094712
slug: write-a-fahrenheit-celsius-convertor-in-different-languages
description: write a program that converts Fahrenheit and Celsius values in a variety of languages
draft: true
---

The ℉/℃ converter is a good example which is simple to understand and includes fundamental programming concepts. Every program will have 

- **input**: how to take input from user
- **output**: how to show messages to the user
- how to do arithmetic calculations
- **conditionals**: how to do different things based on user's input
- **variables**: storing different values that can be anything and using them
- **functions**: creating reusable chunks of code that take input, do something with it, and return an output
- **comments**: messages that are meant for humans reading the code and the compiler/interpreter will ignore them
- how to include chunks of code written by others, or by yourself but in different files

## C
C is the godfather language, it was there before many of the modern languages and has influenced their _syntax_ as well. C++, Objective-C, and C# are all based on C. It's fair to say that these languages were created as a _response_ to C, or _improve_ C. Knowing C helps you understand the _raison d'être_ for a lot of programming languages and programming concepts.

You would probably not understand what the fuss is all about with _garbage collection_, _statically typed_, _object oriented_, _compiled_, and so on unless you have encountered C. Or why do people call their files `main.js` and `main.css` even. 

As a programmer who started with web development and JavaScript as her first languages, a lot of these concepts were confusing for me because i had a hard time understanding what the fuss was all about.

```c
// need the Standard Library for input and output (i.e. the printf() and scanf() functions)
#include <stdio.h> 

void main() {
  int inputFormat;
  float inputValue, convertedValue;
  
  printf("What format would you like to convert? \n");
  printf("  1. Fahrenheit \n");
  printf("  2. Celsius \n\n");
  printf("Enter 1 or 2: ");

  scanf("%d", &inputFormat);

  // Check if the user did not read the message 
  // and was dumb enough to enter something other than 1 or 2
  if (inputFormat != 1 || inputFormat != 2) {
    printf("\nYou have provided an incorrect value. Please select 1 or 2: ");
    
    scanf("%d", &inputFormat);
  }

  printf("\nEnter the value you want to convert: ");
  scanf("%f", &inputValue);
  
  // the conversion formula is: °C = (°F − 32) × 5/9 
  // or:  °F = (°C + 32) x 9/5 

  if (inputFormat == 1) {
    convertedValue = (inputValue - 32) * 5.0/9.0;
    printf("\n%.2f°F is equal to: %.2f°C \n", inputValue, convertedValue);
  } else {
    convertedValue = inputValue * (9.0/5.0) + 32;
    printf("\n%.2f°C is equal to: %.2f°F \n", inputValue, convertedValue);
  } 

/*
NOTES: 
- `printf()` prints to console
- `scanf()` reads from console
- `%d` is format specifier for decimal integer
- `%f` is format specifier for float
- `%.2f` means float with two decimal points

!! integer division yields an integer result !!
e.g. 7/4 will equal 1 and 19/4 will equal 4
that's why you have to keep the values in floats, for the maths to work
*/
}
```

```bash
# install compiler (linux)
sudo apt update && sudo apt install build-essential

# compile
cc fahrenheit_celsius_converter.c -o fahrenheit_celsius_converter

# run
./fahrenheit_celsius_converter
```

## JavaScript
JavaScript's syntax is heavily inspired by C++ and Java. You don't need to _type_ things, it'll _infer_ if it's a string or an integer. You don't need to _compile_ your code beforehand. You don't need to end every statement with a semicolon `;`. If you do, good for you. If you don't, it'll figure it out with _ASI_ (ASI stands for Automatic Semicolon Insertion). Whitespace doesn't matter.

```js
```

```bash
# install JS runtime (linux)
# i prefer Deno over Node
curl -fsSL https://deno.land/install.sh | sh

# run
deno run fahrenheit_celsius_converter.js
```

## Python
Python code look like a breath of fresh air. No semicolons, no curly braces. Whitespace matters and it'll determine code blocks based on indentation. Like JS, you don't have to _type_ your variables.

```py
```

```bash
# Python3 comes preinstalled on Ubuntu

# run
python3 fahrenheit_celsius_converter.py
```

### Dart
Dart supports _dynamic_ and _static_ typing both. Meaning it's cool if you type your variables, but if you don't it'll infer them. It also has _null safety_, which means that a variable's value can not be `null` unless you explicitly tell it so.

- `main()` is mandatory

<details>
<summary>How do i install Dart?</summary>

```dart
sudo apt-get update && sudo apt install apt-transport-https
wget -qO- https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo gpg --dearmor -o /usr/share/keyrings/dart.gpg
echo 'deb [signed-by=/usr/share/keyrings/dart.gpg arch=amd64] https://storage.googleapis.com/download.dartlang.org/linux/debian stable main' | sudo tee /etc/apt/sources.list.d/dart_stable.list

sudo apt-get update && apt-get install dart
echo 'export PATH="$PATH:/usr/lib/dart/bin"' >> ~/.profile
```
</details>

