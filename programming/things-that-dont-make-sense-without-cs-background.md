---
title: Things that do not make sense if you don't have a CS background
date: 2022-12-02
lastmod: 2026-04-14
draft: true
---

### WTF are **generics**? What's the big deal?

Generics let you write a function or a data structure that works with **any type**, without rewriting it once per type. The `T` (or whatever letter) is a placeholder — the real type is filled in when the code is used.

Without generics, in a statically-typed language, you'd have to write:

```ts
function firstOfNumbers(arr: number[]): number { return arr[0] }
function firstOfStrings(arr: string[]): string { return arr[0] }
function firstOfUsers(arr: User[]): User { return arr[0] }
```

With generics, you write it once:

```ts
function first<T>(arr: T[]): T {
  return arr[0]
}

first([1, 2, 3])        // T is number
first(["a", "b"])       // T is string
first([user1, user2])   // T is User
```

**Life without generics**

Before generics existed, you had two bad options:

1. **Copy-paste the function for every type** — exactly what the first example above does. Works, but every bug fix now has to be applied in three places.
2. **Use a "universal" type and cast everything** — in old Java (pre-1.5) you stored things in a `List` of `Object`, then cast back when you pulled them out:

   ```java
   List list = new ArrayList();
   list.add("hello");
   String s = (String) list.get(0);   // cast at runtime — hope you're right!
   list.add(42);                       // compiler doesn't stop you
   String s2 = (String) list.get(1);  // 💥 ClassCastException at runtime
   ```

   You lost type safety. The compiler couldn't help you. Bugs that should have been caught at compile time only blew up when the code ran.

Old Go (before 1.18, released 2022) had the same problem — people used `interface{}` (now called `any`) and type assertions, with the same trade-off. C still has this problem and uses `void*` plus manual casting, or macros.

**Which languages have generics:**

- **Have them:** C++ (called "templates", since forever), Java (since 1.5, 2004), C#, TypeScript, Rust, Swift, Kotlin, Go (since 1.18, 2022)
- **Don't have them:** C (uses `void*` or preprocessor macros), older Java / older Go
- **Don't really need them:** dynamically-typed languages like JavaScript, Python, Ruby — a function already takes whatever you throw at it. There's nothing for generics to constrain.

**Why it's a big deal:** you get type safety (the compiler still knows what's in the array) without code duplication. If you came from JavaScript, this feels weird because JS doesn't care about types — a function just takes whatever. The moment you touch TypeScript, C#, Java, Go, or Rust, generics start mattering.

---

### WTF is **garbage collection**? What's the big deal?

This will be relevant if you started on the web and JavaScript was your first language, and you never coded in C.

Every time your program creates an object, the computer reserves a chunk of memory for it. That memory has to be **freed** when the object is no longer needed, otherwise your program keeps eating RAM until it crashes (a "memory leak").

In C/C++, you do this yourself:

```c
char *name = malloc(100);   // reserve 100 bytes
// ...use it...
free(name);                 // give it back
```

Forget to `free`? You leak memory. Free twice? The program crashes. Free it and then use it? Worse — "use-after-free" bugs are a classic source of security vulnerabilities.

**Garbage collection** is the language doing this for you. A background process tracks which objects are still reachable from your running code. Anything unreachable gets freed automatically.

```js
let user = { name: "Aamnah" }
user = null
// the old { name: "Aamnah" } object is now unreachable
// the GC will eventually clean it up — you don't do anything
```

**Why it's a big deal:** GC is why you've never thought about memory in JavaScript, Python, Go, Java, C#, etc. The trade-off is a runtime cost — the GC has to run periodically, which can cause small pauses. That's usually invisible, but it matters for games, real-time systems, and low-latency servers. Languages like C, C++, and Rust skip GC for performance (Rust instead uses "ownership" rules at compile time to make sure memory is freed correctly without a runtime GC).