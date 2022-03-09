---
slug: csharp-for-javascript-developers-part-2
title: C# for JavaScript developers - part 2
description: Introduction to the syntax and debugging
date: 2020-05-16
lastmod: 2020-05-18
---

- Comments are same as usual, `//` for inline and `/* */` for multiline.
  - Visual Studio shortcut to comment is `ctrl` + `K` `C`, to uncomment `ctrl` + `K` `U`
  - Visual Studio Code shortcut to comment/uncomment is `Ctrl` + `/`
- `if () {} else {}` is the same
- semicolons `;` are _not_ optional
- it's strongly typed, which you should be comfortable with if you have used Typescript
- `using` statement in C# is the JavaScript `import` equivalent
- the braces `{}` on their own lines is a C# style thing
- `void` means we are not _returning_ any values
- arrays are 0-based index, no surprise there
- `cw` is the snippet shortcut for `Console.WriteLine`
- `ctrl` + `.` is the shortcut to add using statements

```c#
if (args.Length > 0)
{
  Console.WriteLine($"Hello, {args[0]}!");
}
else
{
  Console.WriteLine("Hello stranger!");
}
```

### Debugging

In VS Code

- `F5` will start debugging
- `Ctrl` + `F5` will start without debugging
- `Shift` + `F5` will stop without debugging

### Logging stuff to the console

Instead of `console.log()`, you get `Console.WriteLine()`. This `Console` class is much better though, because you can also take user input, i.e. `Console.ReadLine()`.

It's better if you use the debugger though, that can show you whatever values you're getting in any point in time via intellisense

### The using statements

`using` is like the ES6 `import` statement. It just means you're referencing stuff from other classes and _namespaces_.

`using System;` let's you do `Console.WriteLine("Hello stranger!");` since Console is actually `System.Console`

```js
// Javascript
import 'module-name'
```

or like Python

```py
#!/usr/bin/python

import sys
print sys.version
```

### String concatenation and interpolation

Concatenation is simple, you use the `+` sign

For interpolation, you do `$" {variable} "`. The `$` sign is only used once, outside the entire string

```csharp
// concatenation
"Hello " + args[0] + "!"

// interpolation
$"Hello, {args[0]}!"
```

String interpolation is what is called Template literals or template strings in JavaScript

```c#
$"Hello, {args[0]}!"
```

is the JS equivalent of

```js
;`Hello, ${args[0]}!`
```

### Types

```csharp
void // returns nothing
string[] // string array
double[] grades // array called 'grades' containing 'double' value type
List<double> // a List of type double
float // floating point values
double // double precision floating point values, like financial software precise, takes up more storage space than float
```

```csharp
int x = 34; // explicit type, explicitly tell what type it is
var y = 34; // implicit type, let compiler figure out type
```

Implicit typing with `var` is nice because it can automatically determine the type and looks neat. Some people prefer it, some don't.

`var` is still strongly types though, because `var` only works when you are initialize the value.

```c#
var z = 87.2; // var figures out type

z = "string"; // illegal!
```

```c#
var z; // implicit typing won't work
z = 87.2;
```

### Arrays

```c#
double[] numbers; // declare array
double[] grades = new double[3] // initialize array and specify the no. of elements it'll contain
```

```c#
double[] grades = new double[3]; // explicit typing
var numbers = new double[3]; // implicit typing
```

```c#
// array initialization syntax
var number = new double[] {13.2, 29.1, 22.1, 33.1};
```

```c#
var number = new[] {13.2, 29.1, 22.1, 33.1}; // compiler will figure out array size and array type
```

When also initializing the array with values, you don't need to provide the size of the array, the compiler will figure out how many by the amount of initial values you provided

### Looping through Arrays

```c#
foreach (double grade in grades)
{
  // code goes here
}
```

### Arrays vs. Lists

Arrays don't dynamically grow. That means they are impossible to use when we don't know the quantity of values the array is going to hold.

Unlike arrays, you can keep adding values into a list with the `.Add()` method

### Lists

```c#
List<T> // T = type of elements in the list
```

```c#
List<double> grades = new List<double>(); // explicit typing
```

```c#
var numbers = new List<double>(); // implicit typing
```

```c#
List<double> grades = new List<double>() { 13.2, 29.1, 33.1 };
```

Notice the `()` at the end.

```c#
{
  List<double> grades = new List<double>() { 13.2, 29.1, 33.1 };

  grades.Add(52.1);

  var result = 0.0;

  foreach (double grade in grades)
  {
    result += grade;
  }

  var averageGrade = result / grades.Count;

  Console.WriteLine($"The average grade is: {averageGrade:N1}"); // The average grade is 31.8
}
```

`:N1` is a format specifier, it means show 1 number after the double, i.e. `31.8` instead of `31.875`

## Links

- [docs: Console Class](https://docs.microsoft.com/en-us/dotnet/api/system.console?view=netcore-3.1)
- [C# Fundamentals: Learning the C# Syntax](https://app.pluralsight.com/player?course=csharp-fundamentals-dev&author=scott-allen&name=6ca45ca9-e54b-4ed0-83d7-ae27f1c6078d&clip=0&mode=live)
