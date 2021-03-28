---
title: Getting started with C language on a Mac
date: 2021-03-25
---

machine: MacBook Pro (2020, M1 chip)

why: recently, i have developed a curious interest in computer science history and the genius that came out of Bell Labs. This includes UNIX, and the language C. So i just wanted to go through some programming fundamentals in this _OG_ language of the _OG_ operating system.

## Notes

- C comes pre-installed on a Mac. Check with `clang --version`
- Files with _source_ code end in `.c`
- Files with _compiled_ code end in `.out` (if you haven't passed a custom filename, see next point)
- You compile your file with the `cc` command. For example `cc hello.c`. By default, it'll output to a file called `a.out`. You can pass an _output_ file name with the `-o` flag. For example, `cc hello.c -o hello` and it'll save your compiled code to a file called `hello` (notice the lack of `.out` at the end)
- The output file it gives you is an _executable_ (marked by an asterisk in the Terminal listing). You can run any executable file in your current directory by prepending the filename with `./`. For example: `./a.out`
- I tried executing the file by typing just `a.out` but got a `zsh: command not found: a.out` instead. `./a.out` works.

## Hello World

```c
# include <stdio.h>

int main () {
  printf("hello, world\n");
}
```

The [book](https://www.amazon.com/Programming-Language-2nd-Brian-Kernighan/dp/0131103628) doesn't mention the `int`, but if you run the code without it, you'll get a warning like the following:

```
hello.c:3:1: warning: type specifier missing, defaults to 'int'
      [-Wimplicit-int]
main () {
^
1 warning generated.
```

It'll still compile though, if you `ls` now, you'll see a file called `a.out` (that's the default file name) in the same directory.

## Machine code

The compiled code is a bunch of gibberish (machine code). You can't view it in VS Code, it'll refuse to display it saying _it is either binary or uses an unsupported format_, and if you try to see file contents in the Terminal with `cat a.out`, you'll see bats!

```
����X� H__PAGEZERO�__TEXT@@__text__TEXT`?#`?�__stubs__TEXT�?��__stub_helper__TEXT�?�?�__cstring__TEXT�?�?__unwind_info__TEXT�?H�?�__DATA_CONST@@@@__got__DATA_CONST@�__DATA�@�@__la_symbol_ptr__DATA�__data__DA�H__LINKEDIT�@�"�� �0�0h���H
                 P��
                     /usr/lib/dyld�.Ly(�;໽x݀eg)2

                                               a*(�`?
                                                     8<
                                                       /usr/lib/libSystem.B.dylib&`)h�UH��H��H�=7��1ɉE��H��]Ð�%v@L�u@AS�%e�h�����hello, world
`?44�?4
       �?#Q@dyld_stub_binderQr�s@_printf�__mh_execute_header!main%�~��`?$ __mh_execute_header_main_printfdyld_stub_binder__dyld_private%
```

What it compiles down to is machine code,and since i am not a machine, i don't really care about what it looks like. I care about what i can do with its powers.

## The `main()` function

Unlike the programming languages that i am already familiar with (JavaScript, Python, Bash, PHP), C programs **must have a function called `main`**. `main` is your entry point. You can define other function with other names, but if you wanted to execute something as part of your main program, you'll have it in a function called `main`. Your program begins executing at the the beginning of `main` and goes line by line from there. **Every program must have a function called `main` somewhere.**

Languages that are derived from C (e.g. C++, C#, Objective-C) also by default must have a `main` function. Same is the case with Java, every Java application begins with a class definition, and every class must have the `main` method. Pascal (another language that pre-dates C) is similar to C in this regard, only Pascal programs start with the `program` keyword.

```java
// Language: Java
class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

```c
// Language: C
# include <stdio.h>

int main () {
  printf("hello, world\n");
}
```

```csharp
// Languages: C#
namespace HelloWorld
{
  class Hello {
    static void Main(string[] args)
    {
      System.Console.WriteLine("Hello World!");
    }
  }
}
```

```pascal
// Language: Pascal
program HelloWorld(output);
begin
  writeln('Hello, world!');
end.
```

After learning about this hardcore `main` requirement, i now understand why some frontend devs call their JS and CSS files `main.js` and `main.css`, they probably have a CS background ¯\_(ツ)\_/¯ and this is probably where the file names come from

## Links

- [C Programming Language, 2nd Edition](https://www.amazon.com/Programming-Language-2nd-Brian-Kernighan/dp/0131103628)
- [Why do most programming languages have to have a main function?](https://www.quora.com/Why-do-most-programming-languages-have-to-have-a-main-function)
- [The Importance of the main() Function in C Programming](https://www.dummies.com/programming/c/the-importance-of-the-main-function-in-c-programming)
- [Learn C](https://www.learn-c.org/)
