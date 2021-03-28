---
title: One day with Go (Getting Started)
date: 2021-03-28
---

Let's Go as long as i can till i get bored or overwhelmed.

### What do i expect from a day of exploration?

I'm obviously not going to understand the complexities of _stack vs. heap_, _concurrency_ (_channels_ and _goroutines_) or get bothered with tabs used by _gofmt_, i actually like tabs. I also don't expect to fully understand stuff like _pointers_ and _interfaces_ and _closures_ and _generics_ right away (i'm a self-taught frontend dev, remember?)

But i do expect to:

- get familiar with most of the syntax (comments, variables, functions)
- get comfortable with the go tooling
- have a Go environment setup and know how to structure and run projects
- know how to use bits of code by other people (i.e. the equivalent of using an npm package..)
- know enough to look in the right places
- have a better grasp of what i _don't know_

It'd also help if i had enough of the background knowledge in system languages to understand at least half the argument. Why is _concurrency_ a big deal? This can be answered by a knowledge of other languages. Why do they keep comparing it with _Java_ and _C++_? But unlike Java and C++, i can still use it magnificently for frontend, right? (i know about WebAssembly, just wanted to highlight that Go could be the one language i can use since it compiles to JavaScript as well as native code..)

### Why Go?

It seems like the best of both worlds. I get performance and simplicity. I can target literally any platform be it mobile, desktop, web or something like a raspberry pi. I can compile to native code as well as JS. So that means i am still connected to my JS roots and can expand into system apps very easily. Ken Thompson is involved. He's a personal tech hero for me. Thompson's the creator of Unix and involved with the C language. Without him i wouldn't have the operating systems i like (macOS, Ubuntu) and we in general wouldn't have the personal computers as we know them that we have right now.

Google is behind it and it has picked up steam.

### What can you build with it?

- Web Applications
- Web Services (concurrency is at the heart of Go)
- Task automation (Go has the simplicity of a scripting language)
- Machine learning (can give Python a challenge)

### Programs written in Go

- Docker
- Kubernetes
- Hugo
- Fedora CoreOS (a minimal OS running applications as containers)

### Hello World

```go
package main // where the program sits

import ( "fmt" )

/*
The main() function, when part of the main package, identifies the entry point of an application
*/
func main() {
  fmt.Println("Go Go Go!")
}
```

### Formatting and Whitespace

- Whitespace isn't critical, code will still work without it
- Tabs are used instead of spaces (you have the freedom of setting the tab size to whatever you want)
- `fmt` is the package that'll automatically format your code. There is a standard set of code formatting practices, which is followed by the tool.
- Go has ASI (automatic semicolon insertion), just like JavaScript

### Documentation

- Documentation is built in with `go doc`
- The comments in your code make up the documentation for your app/package and can be accessed with `go doc`

### Running code

You do that with `go run FILENAME.go`. It'll compile the program to a _temporary_ directory and execute the application for you.

- Run a file `go run FILENAME.go`
- Run a module `go run MODULENAME` (it's a module if a `go.mod` file exists)

### Importing packages

```go
/*
This is an import block
it allows multiple packages to be imported without repeating the "import" keyword
it's what you call a parenthesized, "factored" import statement.
*/
import (
  "fmt"
  "os"
)
```

Technically, you can also write separate import statements, one per package, but i don't see why you'd wanna do that.

```go
// multiple statements would work too, not really recommended though
import "fmt"
import "math"
```

- no commas needed when importing. add one package per line as a string (i.e. between double quotes)
- if you're using VS Code and the Go plugin, it'll automatically add the import statement for a package you reference in code when you save the file. It'll also give you autocomplete and possible options you can use i.e. all the function that are exposed on the package you are using
- if you import something and not use it, it'll tell you (no ESlint needed like JS), and it'll fail the build. I like it. Yell at me if i'm doing random imports, force me to update my code. I have to request for this behaviour in JavaScript by using ESLint.

An example of package not being used and the error you'll get

```go
package main

import (
	"fmt"
)

func main() {
	// fmt.Println("Hello, playground")
}
```

```
./prog.go:4:2: imported and not used: "fmt"

Go build failed.
```

Another example of package not being used (unnecessary import) and you getting an error

```go
package main

import (
	"fmt"
  "os"
)

func main() {
	// fmt.Println("Hello, playground")
}
```

```
./prog.go:4:2: imported and not used: "fmt"
./prog.go:5:2: imported and not used: "os"

Go build failed.
```

### Exports

Any name that starts with a capital letter is exported. For example, `Pizza` is an exported name, as is `Pi`, which is exported from the `math` package.

> When importing a package, you can refer only to its exported names. Any "unexported" names are not accessible from outside the package.

### Functions

```go
package main

import "fmt"

func add(x int, y int) int {
	return x + y
}

func main() {
	fmt.Println(add(42, 13))
}
```

- types are mentioned _after_ the variable, i.e. type is [to the right](https://elizarov.medium.com/types-are-moving-to-the-right-22c0ef31dd4a) of the variable. This is similar to other modern languages like Kotlin/Swift/Rust/Typescript, and different from older languages like C/Java/C#/Dart
- if the types are the same then you can mention it once for the params, i.e. `x int, y int` can be written as `x, y int`

### Variables

You have about three ways of initializing variables

```go
var i int // declaration on one line
i = 42 // assignment on the other
```

```go
var f = 3.14 // declaration and assignment in one go
```

```go
firstName := "Aamnah" // type is not explicit (let the compiler figure it out) still a var underneath
```

- `:=` is known as the walrus operator, and is just syntactic sugar for `var` declaration, it's not used for anything else
- if you initialize a variable but don't use it, the compiler will yell at you and the build will fail. Awesome stuff! i like that i don't have to manually do ESLinty stuff with Go that i have to do with JavaScript.

### Data Types

- `int`
- `float32` and `float64`
- `boolean`

### Organizing projects and code

- We call them _modules_ (before Go 1.3 they were called _workspaces_)
- initialize the module with `go.mod` file with `go mod init MODULENAME`
- `MODNAME` is usually the URL path of the repo (e.g. github.com/aamnah/notes)
- the URL you mention as the module name is used to identify the place you'd go to to find dependencies

```
// filename: go.mod

module github.com/aamnah/go-test

go 1.16
```

## Links

- [Go: Getting Started - Pluralsight course by Mike Van Sickle](https://app.pluralsight.com/courses/f481226c-9b60-4cf5-814c-aa7a125de254/table-of-contents)
- [Learn Go Programming - Golang Tutorial for Beginners - FCC course by Mike Van Sickle](https://www.youtube.com/watch?v=YS4e4q9oBaU)
- [Go Playground](https://play.golang.org/)
- [Go Tour](https://tour.golang.org/welcome/)
- [The Little Go Book](https://www.openmymind.net/The-Little-Go-Book/)
- [Best practices for a new Go developer](https://blog.rubylearning.com/best-practices-for-a-new-go-developer-8660384302fc)
- [How to Write Go Code](https://golang.org/doc/code)
