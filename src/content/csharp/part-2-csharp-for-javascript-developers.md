---
path: csharp-for-javascript-developers-part-2
title: C# for JavaScript developers - part 2
description: Introduction to the syntax and debugging
date: 2020-05-16
---

- Comments are same as usual, `//` for inline and `/* */` for multiline
- `if () {} else {}` is the same
- semicolons `;` are _not_ optional
- it's strongly typed, which you should be comfortable with if you have used Typescript
- `using` statement in C# is the JavaScript `import` equivalent
- the braces `{}` on their own lines is a C# style thing
- `void` means we are not _returning_ any values
- arrays are 0-based index, no surprise there

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
List<double> // a List of type double
```

### Looping through Arrays

### Arrays vs. Lists

## Links

- [docs: Console Class](https://docs.microsoft.com/en-us/dotnet/api/system.console?view=netcore-3.1)
