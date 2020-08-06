---
title: Pure ways of editing objects and arrays in JavaScript
date: 2020-08-06
slug: pure-edit-copy-array-object-javascript
tags:
  - redux
---

tl;dr: use speard operator for both arrays and objects for consistent syntax. Alternatives are `Obect.assign()` and `Array.concat()`

---

## Objects

Copying objects

```js
const original = { a: 1, b: 2 }

// Object.assign()
const copy1 = Object.assign({}, original)

// Spread operator
const copy2 = { ...original }
```

extending objects

```js
const original = { a: 1, b: 2 }
const extension = { c: 3 }

// Combine multiple objects with Object.assign()
const extendedCopy1 = Object.assign({}, original, extension)

// Combine multiple objects with Spread operator
const extendedCopy2 = { ...original, ...extension }
```

## Arrays

Copying arrays

```js
// Copy array
const original = [1, 2, 3]

// .slice() with no args
const copy = [1, 2, 3].slice()
```

extending arrays

```js
const original = [1, 2, 3]

// Array.concat() returns a new array
const extended = original.concat(4)
const moreExtended = original.concat([4, 5])

// Spread operator
const extended2 = [...original, 3, 4]
const moreExtended2 = [...original, ...extended2]
```

fyi: according to an article, `Array.push()` is 945x faster than `Array.concat()`
