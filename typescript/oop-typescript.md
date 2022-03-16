---
title: Object Oriented Programming (OOP) in TypeScript
date: 2021-04-18
---

Unlike other programming languages, JavaScript has **many way** of creating objects.

- object literal - great for passing state around
- constructor functions
- `Object.create()` - take a base object and create an object from that
- Class

there are a bunch of other ways as well, like _prototype pattern_ and _module pattern_

OOP is all about _using Classes to create Objects_.

- abstraction
- encapsulation
- inheritance
- polymorphism

Abstract complex functionality into an object that can be used as the base for other objects.
Objects provide public access points that can be used to interact with private members
Objects can share functionality from existing objects and create a family hierarchy
Objects exhibit the same behaviour but in a different way

Classes are usually PascalCase (camelCase first alphabet of word capital as well). It's convention.

Classes have class _members_. Memebers can be:

- Fields (Variables, backing data store for property)
- Properties (Properties expose fields)
- Constructor
- Methods (Functions are called Methods in a class, you also don't use the `function` keyword when you're defining a method)

`public` and `private` modifiers. All members are **public by default**. `private` is only available in TS and not in plain JS. Since `private` is not available, there is no concept of _fields_ either.

### Fields

Fields are just _private_ variables for the Class. Fields are not publicly accessible, because they are private (duh). But, you can `get` or `set` fields, and `get` and `set` can be public methods. And since `get` and `set` are accessors, they can have logic inside. Most of the time, they are used for filtering or modifying the data passed to the Class and then updating it's fields after verifying the data is in the form you wanted. They're an additional public layer that let's you go through it in order to access private fields.

Properties will not always have backing fields, they can just be calculations or some such.

`get` is used to retrieve property data while `set` is used to assign data to the backing field. `get` and `set` allow us to run code on the reading and writing of a property.

> `set` syntax binds an object property to a function to be called when there is an attempt to set that property

### Fields vs. Properties

Fields are private, Properties are a public interface to those private fields. Fields are private and can be used only inside that class, no one else can use.

When you need filtering or logic, you create a field and access it via a property. If you don't need any filtering, you can just create a public property

a class can be instantiated locally where it was created or it can be instantiated from elsewhere

### Constructors

Constructors are _initializers_ for properties. They are called whenever a class is instantiated. If you want something to be inside every object created when the class is instantiated, you put it inside the contructor. It can accept params and can map those params to properties.

You can use the constructor to give default properties to object, you can use it to pass on initial data, _seed_ the new object so to speak. Think of the constructor as the _initialization routine_. You **can only have one** in JS (other languages have the concept of _overloaded constructors_)

### Automatic Properties

By using automated properties, a property will be generated, and the constructor value will be mapped to it.

The following two TS blocks will generate the same JS code. (Keep in mind that `private` and `public` modifiers are a TS thing, they won't show up in the JS code)

```js
class Person1 {
    private _awesome: boolean
    firstName: string
    lastName: string

    constructor(awesome: boolean, firstName: string, lastName: string) {
        this._awesome = awesome
        this.firstName = firstName
        this.lastName = lastName
    }
}
```

```js
class Person2 {
    constructor(private awesome: boolean, public firstName: string, public lastName: string) {}
}
```

```js
class Person1 {
  constructor(awesome, firstName, lastName) {
    this.awesome = awesome // will have `this._awesome` in the one where you created the field yourself, but the value will be the same in both
    this.firstName = firstName
    this.lastName = lastName
  }
}
```

### Static members

Static members (as opposed to _instance members_)

- Static members can be called from outside the class without instanciating the class

### Interfaces

Interfaces come into play when you want consistency _across_ different Classes. It's simple to have consistency when there is an established _inheritance_, since all inherited classes will inherit the core functionality from the parent class. But what if multiple different classes can have that functionality, and you want it to be consistent? That's where interfaces come in.

Interfaces can help define the _shape_ of an object. Interfaces don't generate code, they don't get to production, they're only used during development. Interfaces are for documentation, for structure, and for improved DX.

### Generic types

Generic types let you add _placeholders_ for types, they are placed inside `<>`

### Extending interfaces

You do that with the `extends` keyword. You can **extend multiple interfaces**

```ts
interface Account extnds AccountSettings, AccoountInfo {}
```

### Using interfaces

You can either create classes based on the interfaces using the `implements` keyword, or you can use interfaces as types

## Links

- [Creating Object-oriented TypeScript Code](https://app.pluralsight.com/library/courses/typescript-creating-object-oriented-code/table-of-contents)

- [TypeScript Basics | 18 Inheritance and abstract class](https://www.youtube.com/watch?v=CrIlx_FjMnc)
