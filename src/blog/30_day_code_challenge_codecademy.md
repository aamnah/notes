---
title: Codecademy's 30 Day Code Challenge
date: 2020-04-02
path: 30_day_code_challenge_codecademy
---

I'll be doing 30 days (hopefully) of C#, starting with the course on Codecademy. I'll be happy if i even manage to do two weeks though. A month is a long time to plan for.

## Day 3

Was too occupied with other things on the weekend (setup an Ubuntu server with Opencart and added SFTP user etc.). Only did the bare minimum to keep the 30 days streak

Codecademy:

- Working with Numbers
  - Numerical Data Types
  - Arithmetic Operators

The Pluralsight course is much better in terms of it's knowledge level and thoroughness. Where Codecademy is going on about data types and numbers, the Pluralsight course started with an intro to the `dotnet` CLI, project structure and debugging in the first section.

## Day 2

April 3, 2020

- Started [C# Fundamentals](https://app.pluralsight.com/courses/0096b00d-2398-435a-82f7-3f5401408ab1/table-of-contents) on Pluralsight. They were doing a #FreeApril month.
- Finished the section on _Introducing C# and .NET_

Learned:

- difference between .NET and .NET Core
- .NET runtime - CLR and
- Setting VS Code up for C#
- Running the project with `dotnet` CLI
- General project structure
- String interpolation
  - inside the `{}` you can put an expression
  - an _expression_ produces some sort of value

```c#
static void Main(string[] args)
{
  Console.WriteLine("Hello, " + args[0] + " !");
  Console.WriteLine($"Hello, {args[0]} !");
}
```

- passing params to the application

```bash
dotnet run BLAH # params for the dotnet CLI
dotnet run -- BLAH # params for the application
```

- an _exception_ represents an error condition
- _handled_ exception = yes, i expected this error to occur
- _unhandled_ exception = halt/crash your program, .NET runtime won't allow program to continue executing

- Finished the [Working with Numbers](https://www.codecademy.com/courses/learn-c-sharp/lessons/csharp-working-with-numbers/) section on Codecademy

Learned:

- different data types take different amounts of memory. Choosing a data type that takes up less memory will result in faster applications

- `int` whole numbers - 76, 2, 978, 12123
- `float`, `double`, `decimal` decimal values
  - `decimal` is the most precise. think financial applications precise - 489872.76m
  - `double` is more precise than a `float` and faster to process than a `decimal`. usually the best choice - 39.76876
  - the `m` at the end of a decimal value tells C# it's a `decimal` type and not a `double`

## Day 1

April 2, 2020

Went through the [Hello World of C#](https://www.codecademy.com/learn/learn-c-sharp)

Learned:

- basic data types
- outputting stuff to the console
- reading user input from the console
- changing (casting) data types
