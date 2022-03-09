---
title: Variables and Constants
date: 2021-03-28
lastmod: 2022-01-12
draft: true
---

| Language   | Keyword                   | Syntax                 |
| ---------- | ------------------------- | ---------------------- |
| JavaScript | `let`, `const`, and `var` | `let name = "Aamnah";` |
| TypeScript |                           |                        |
| Bash       |                           |                        |
| C#         | `string name = "Jane";`   |                        |
| C++        |                           |                        |
| C          |                           |                        |
| Dart       |                           |                        |
| Swift      |                           |                        |
| Python     |                           |                        |

You can save a value with a name, for readability, or for reuse. For example, `age` could be a named value that could be 12, 65, 34 or whatever. These named values are called _variables_ if you think they'll change when the program is run by/for different people, or they are called _constant_ if they're never going to change after they have been _initialized_.

A variable is any value that can change, or any value that you'll know later. Some examples of variable values:

- _Price_ is a variable, it can change for different items
- _Age_ is a variable, different people are of different ages
- _Name_ is a variable, different people have different names

They can be _strong, statically_ typed (C++, Java, Rust, Swift), or they can be _dynamically_ typed (Python, JavaScript) or they can be _hybrid_ (Dart, TypeScript)

Variables can be of different _types_ (Strings, Booleans, Integers). You may have to explicitly mention the _type_ or you may let the compiler _infer_ it (i.e. you can _imply_ that it's a string..)

And variables can have different _scopes_

- JavaScript has `const`, `let` and `var`. `let` is _block scope_, `const` is for values that don't change, and `var` is _function scoped_

|                    | `var`   | `const` | `let`   |
| ------------------ | ------- | ------- | ------- |
| global scope       | &check; | -       | -       |
| function scope     | &check; | &check; | &check; |
| block scope        | -       | &check; | &check; |
| can be re-assigned | &check; | -       | &check; |

When a _named_ value can only be assigned once and can not be changed later, we call it a _constant_ value. For example, year Pakistan got its independence is 1947. It will always be 1947, so it is a _constant_ value.

Variable values can be re-assigned.

Keywords: scope, strongly typed, dynamically typed, initialize, declare, assign

```js
// JavaScript

// declaration
var name
let age
const year

// declaration + assignment
var myName = "Aamnah"
var myAwesomenessLevel = 1000
let isValid = true


var a, b, c, d // multiple declarations separated by coma
var a = "something",
    b = "some other things",
    c = true,
    d = 90 // multiple assignments separated by coma

let x = 10, y = 20
let total = x + y
```

- All JavaScript is valid TypeScript since _TypeScript is a superset of JavaScript_

```ts
// TypeScript
```

```bash
# Bash

```

```dart
// Dart

```

```go
// Go
```

```csharp
// C#
// Declaration only, assign later
string fullName;

// Declaration and assignment in one go
string firstName = "Jane";
string lastName = "Doe";

// Assignment (and an example of string interpolation)
fullName = $"{firstName} {lastName}" // "Jane Doe"

// Output to the screen (and an example of concatenation)
Console.WriteLine("Hello " + fullName) // Concatenation
```

```cpp
// C++

```

```py
# Python
name = "Aamnah"
age = 32
isCool = True # booleans start with uppercase
```

```swift
// Swift
// var makes a variable
// let makes a constant
var name = "Aamnah"
let yearOfIndependence = 1947
```

### Type checking

### Semi-colons at the end

### single quotes or double quotes

### Declaration and assignment
