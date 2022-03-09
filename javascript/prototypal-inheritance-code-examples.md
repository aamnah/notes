---
title: Prototypal Inheritance in JavaScript with code examples
category: JavaScript
date: 2021-05-05
---

```js
const obj = {
  firstName: 'Aamnah',
}

const protoObj = {
  lastname: 'Awesome',
}

const protoDaddy = {
  age: 27,
}

const protoGrandDad = {
  occupation: 'Software Engineer',
}

const protoGrandGrand = {
  hobbies: ['playing ukulele', 'netflix and chill', 'learning the art of code'],
  isAwesome: true,
}

Object.setPrototypeOf(obj, protoObj) // make obj inherit from protoObj
Object.setPrototypeOf(protoObj, protoDaddy) // make protoObj inherit from protoDaddy
Object.setPrototypeOf(protoDaddy, protoGrandDad) // make protoDaddy inherit from protoGrandDad
Object.setPrototypeOf(protoGrandDad, protoGrandGrand) // make protoGrandDad inherit from protoGrandGrand

console.log(obj) // you get the ENTIRE CHAIN of prototypes inherited
/*
[object Object] {
  age: 27,
  firstName: "Aamnah",
  hobbies: ["playing ukulele", "netflix and chill", "learning the art of code"],
  isAwesome: true,
  lastname: "Awesome",
  occupation: "Software Engineer"
}
*/
```

```js
/*
Prototypal Inheritance in JS
.__proto__ is ES6
Object.prototype() is ES5
*/

let johny = {}
let animal = {
  kind: 'human',
}

console.log(animal)
/*
[object Object] {
  kind: "human"
}
*/

console.log(johny) // [object Object] { ... }

// add the `animal` object to the prototype of johny
johny.__proto__ = animal

console.log(johny)
/*
[object Object] {
  kind: "human"
}
*/

console.log(johny.kind) // "human"
console.log(animal.isPrototypeOf(johny)) // true

animal.kind = 'dinosaur'
// `johny` will change it's kind too because it is inheriting from `animal`
console.log(johny.kind) // "dinosaur"

// updating (overriding) the property
johny.kind = 'buffalo'
console.log(johny.kind) // "buffalo"
console.log(animal.kind) // "dinosaur"
```

The myriad ways of assigning prototypes..

```js
// Various ways of assigning prototypes

var john = {}
john.__proto__ = animal // ES6 way

var nancy = {}
Object.setPrototypeOf(nancy, animal) // ES5 way, works in ES6 too

var sally = Object.create(animal) // ES5 way, works in ES6 too

var jane = Object.create(animal, { food: { value: 'iceacream' } }) // passing it a prototype object to base on, while also default properties for the new object (in the form of an object _describing_ the property)
console.log('jane: ', jane)
console.log(jane.food) // "iceacream"
```

## Resources

- [Advanced Javascript - Section 7: Object Orientation](https://www.udemy.com/course/javascript-advanced/learn/lecture/18034697#overview)
- [The Modern JavaScript Bootcamp- Section 10: Advanced Objects and Functions](https://www.udemy.com/course/modern-javascript/learn/lecture/9873126#overview)
- [JavaScript: Understanding the Weird Parts - Section 5: Object-Oriented Javascript and Prototypal Inheritance](https://www.udemy.com/course/understand-javascript/learn/lecture/2237552#overview)
- [Creating Object-oriented TypeScript Code](https://app.pluralsight.com/library/courses/typescript-creating-object-oriented-code)
