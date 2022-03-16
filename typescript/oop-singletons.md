---
title: Singletons in TypeScript
date: 2021-05-09
---

I'm not going to get in to the debate of why and if you should use _singletons_, i'm quite yet figuring that out myself.. But i am working on a legacy project written in OOP-style TypeScript and it has about a hundred singleton classes. So, naturally, i wanted to get up to speed with them. Anyhoo..

and here's how you create a singleton in TypeScript

A singleton is a class that _must only ever have one single instance of it_ and no more. Basically, you block anyone from creating another instance of it.

Static members don't need an _instance_ of a class in order to be used. You can call any static member from any class without actually instantiating that class. If you make properties and methods `static` then we don't really need an instance of the class in order to use the functionality, do we?

But even if we have `static` members inside a class, the class itself can still be instantiated with `new`. How do we stop people from creating instances of it?

The old, standard code looks like this:

```ts
export default class MessageService extends ServiceBase {
  private static _instance: MessageService = new MessageService()

  constructor() {
    super()

    // throw an error if someone tries to use `new` to create an instance, tell them to use the `getInstance()` method instead
    if (MessageService._instance) {
      throw new Error('Error: Instantiation failed: Use MessageService.getInstance() instead of new.')
    }

    MessageService._instance = this
  }

  static getInstance(): MessageService {
    return MessageService._instance
  }
}
```

Here's how you'll use it

```ts
messageService: MessageService = MessageService.getInstance()
```

Each new `MessageService` operation will return the same instance. We also added a user friendly message to let the users of this class to know that it is a singleton and they can not instantiate this class with `new` and should use `getInstance()` that we have provided to them.

Another way of doing it is to make the `constructor()` `private`.

> Changing the scope of a `constructor` to `private` removes our ability to use the `new` keyword.

## Links

- [](https://blog.bitsrc.io/the-singleton-pattern-in-typescript-b906303fda93)
- [](https://stackoverflow.com/a/36978360/890814)
