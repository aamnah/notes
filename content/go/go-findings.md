---
title: Go findings
date: 2021-03-28
draft: true
---

- A function can [return any number of results](https://tour.golang.org/basics/6)
- There is _named_ return values and then there is [_naked_ return values](https://tour.golang.org/basics/7)
- Go is an object-oriented language, but it is not a class-based language and does not support inheritance. Basically, it follows the _composition over inheritance_ approach.
- Go is both an object-oriented language and also _not_ an object-oriented language.
- Go compiles to a single binary, meaning all your dependencies are in one (executable) file that you can take anywhere, it's very portable.

> you can fire off a goroutine, have it run, and keep going while it and thousands of its brethren process in the background. Network timeout? Don’t worry, your goroutine will manage it while the main loop continues. Complete database failure? Your goroutine will know, and you can gracefully work around the issue.

> “The Goroutines are multiplexed to fewer number of OS threads,” [wrote Naveen Ramanathan on GoLangBot](https://golangbot.com/about/), a Go learning resource. “There might be only one thread in a program with thousands of Goroutines. If any Goroutine in that thread blocks, say, waiting for user input, then another OS thread is created and the remaining Goroutines are moved to the new OS thread. All these are taken care of by the runtime and we, as programmers, are abstracted from these intricate details and are given a clean API to work with concurrency.”

## Links

- [What’s so great about Go?](https://stackoverflow.blog/2020/11/02/go-golang-learn-fast-programming-languages/)
- [Best practices for a new Go developer](https://blog.rubylearning.com/best-practices-for-a-new-go-developer-8660384302fc)
