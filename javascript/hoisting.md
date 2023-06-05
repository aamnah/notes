---
title: Hoisting in JavaScript
date: 2022-07-31
draft: true
---

Declared vs. undeclared variables

```js
console.log(x) // Uncaught ReferenceError: x is not defined
x = 4
console.log(x)
```

```
Uncaught ReferenceError: x is not defined
```

`x` is undeclared, because no `var`, `let` or `const` keyword was used to _declare_ it. We're _assigning_ a value but it hasn't been declared before

```js
console.log(x)
var x = 4
console.log(x)
```

```
undefined
4
```

```js
var x; // declaration
x = 4; // assignment
```

Before running, JS moves all the _declarations_ to the top of the file/code, so you wouldn't get a `ReferenceError` when referencing `x` before it is assigned, you'd get an `undefined` for the value of `x` because it hasn't 

Because of hoisting, the code would actually become the following when it is run

```js
var x; // <-- (hoisted) declaration

console.log(x) // undefined
x = 4 // <-- assignment
console.log(x) // 4
```