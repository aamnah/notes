---
title: The big deal about concurrency in Go
date: 2021-03-28
status: draft
---

```go
package main
import (
  "fmt"
  "time"
)
func hello() {
  fmt.Println("Hello world goroutine")
}
func main() {
  go hello()
  time.Sleep(1 * time.Second)
  fmt.Println("main function")
}
```

The `main` function works just like it does in C. In this code, `main` fires off a goroutine—indicated by [the go keyword](https://stackoverflow.com/questions/26006856/why-use-the-go-keyword-when-calling-a-function)—called `hello()`. The program takes a quick nap and then continues. If anything were to happen in the `hello()` function, the main function wouldn’t notice. All that’s important is the work is done.

The program finishes when the `main` routine wakes up and fires off a `Println`. The `hello()` function could be anything—a data call, a transaction, a queue entry—and it would run while the rest of the program churns along. Like the aforementioned vine, think of goroutines as little flowers that branch off and die while the main vine keeps going.

Want to see it in action? Check out this [snippet at the Go Playground](https://play.golang.org/p/U9ZZuSql8-) and you’ll see just how goroutines work.

## Links

- [](https://stackoverflow.blog/2020/11/02/go-golang-learn-fast-programming-languages/)
