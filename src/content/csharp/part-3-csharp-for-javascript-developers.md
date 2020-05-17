---
title: C# for JavaScript developers - part 3
slug: csharp-for-javascript-developers-part-3
description: Working with Classes and Objects
date: 2020-05-18
lastmod: 2020-05-18
---

- _Namespaces_ avoid collision. If i write a class called List and you write a class called list, they won't mess each other up if they are in different namespaces
- State is data, stored in instances (objects) of the class
- Behaviour is methods to manipulate the state (data)
- In C#, we do one class per file, it's a convention
- Objects are _instances_ of a Class. Class is the blueprint, Object is the instance created using that blueprint and can hold different data/state
- Class is a blueprint for creating objects, it defines the behaviour
- Different objects can hold different data/state, but the available behaviour would be the same

### Behaviour (method)

```c#
namespace GradeBook
{
  class Book
  {
    public void AddGrade(double grade)
    {
      // do something with the passed grade
    }
  }
}
```

### State (field)

```c#
using System.Collections.Generic;

namespace GradeBook
{
  class Book
  {
    public void AddGrade(double grade)
    {
      grades.Add(grade);
    }

    // field definition
    List<double> grades = new List<double>(); // can't use var or implicit typing
  }
}
```

```
System.NullReferenceException: Object reference not set to an instance of an object.
```

You're using a field or variable that has not been properly initialized

### Constructor

Constructor constructs objects.. It handles initialization of the object. It comes with every class by default, and you can change it's behaviour by explicitly defining it

```c#
// CONSTRUCTOR
public Book()
{
  grades = new List<double>();
}
```

```c#
namespace GradeBook
{
  class Book
  {
    // CONSTRUCTOR
    // it must be the same name as the class, must be public
    public Book(string name)
    {
      grades = new List<double>();
      this.name = name; //referring to our class field with this.name to differentiate it from parameter 'name'
    }

    // METHOD
    public void AddGrade(double grade)
    {
      grades.Add(grade);
    }

    // FIELD
    List<double> grades;
  }
}
```

### Access modifiers (public, private ..)

Access modifier determine access to members of the class

- `public` means code outside of the Class can have access to this member (method, field)
- `private` is default. can only be used inside the Class by other members of the Class

Typically, you don't want to expose the state of the class to outside elements. This prevents invalid values and let's you change the implementation details later, in the background.

### this

Yep, `this` is in C#, it's and Object oriented language, duh. `this` refers to values _within_ the class. It's implicitly used, so you only ever need to be specified if you're using the same parameter name as your field name..

### static

`static` class and members can not be _instantiated_. They will not be passed on to the object instance. `static` members are part of the Class, but not part of the resulting object

## Links

- [C# Fundamentals - Working with Classes and Objects](https://app.pluralsight.com/player?course=csharp-fundamentals-dev&author=scott-allen&name=1d2231ff-33d0-499b-8934-94df99d39d74&clip=0&mode=live)
- [Access Modifiers (C# Programming Guide)](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/access-modifiers)
- [Static Classes and Static Class Members (C# Programming Guide)](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/static-classes-and-static-class-members)
