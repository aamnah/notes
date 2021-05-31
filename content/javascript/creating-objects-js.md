---
title: The myriad ways of creating objects in JavaScript
date: 2021-04-18
lastmod: 2021-05-09
---

Everything is an Object (or a primitive). JavaScript has more than one way of creating objects. (Other languages like Java can only create objects via Classes..)

- `new Object()` <- this one isn't used much in favor of object literals
- Object literals `{}`
- Constructor functions
- Object.create()
- Classes

Accessing object _properties_ also has two different ways. The _dot notation_ and the _bracket notation_. Dot notation works everywhere, except when the property/method name has _spaces_ in it, or starts with a number. Basically, bracket notation let's you access property names that are _illegal_ in JS. For example, you can not have variable names that start with a number. You can not have variable names with spaces and so on. If for some reason you do end up with _keys_ like these in your object, you can access them with bracket notation because bracket notation takes a `string`. A string could have anything inside it, say `8998sda` or `date of birth` or `!@Q@$!@#$`..

```js
const person = {}

person.name = 'Aamnah' // Dot syntax
person['date of birth'] = '16 November' // Bracket syntax
```

### Objects literals

`{}` is what you call an _object literal_, it's just a pair of empty pair of curly brackets. That's how simple a basic object is. Everything inside becomes it's properties and methods.

```js
const objLiteral = {
  balance: 600,
}
```

### Constructor functions

```js
function FunctionObject() {
  // notice the uppercase, PascalCase function name
  this.balance = 700
}

const functionObj = new FunctionObject() // notice the use of `new`
```

### Object.create()

```js
const objCreate = Object.create(objLiteral)
```
