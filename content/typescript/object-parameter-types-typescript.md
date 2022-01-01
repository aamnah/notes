---
date: 2021-12-23
slug: object-parameter-types-typescript
title: Pass objects as parameters with their types specified and default values
tags:
  - typescript
---

## Passing arguments as an object

Passing arguments to a function as an object makes the meaning much more clear from the name of the properties and the order in which you pass them no longer matters.

```js
const createUser = (username, date, isAdmin, isSubscribed) => {
  // Create user
}

createUser('Abeeha', '2021-12-23', false, true)
```

vs.

```js
const createUser = ({ username, date, isAdmin, isSubscribed }) => {
  // Create user
}

createUser({ username: 'Abeeha', date: '2021-12-23', isAdmin: false, isSubscribed: true })
```

## Parameter objects and TypeScript

Now, coming to the TS bits, here's the interface of a request to an API call

```ts
interface PopularUserRequest {
  Application: 'uk' | 'us'
  Sex: 'm' | 'f' | 'notSet'
  Count: number
  ShowMilitaryOnly: boolean
}
```

Here's how you'd pass

```ts
export default async function fetchPopularUsers({ Application, Sex, Count, ShowMilitaryOnly }: PopularUserRequest) {
  // code goes here
}
```

And here's how you'd pass the object param with it's type specified and default values

```ts
export default async function fetchPopularUsers({
    Application: 'uk',
    Sex: 'notSet',
    Count: 52,
    ShowMilitaryOnly: false,
  }: PopularUserRequest,
) {
  // code goes here
}
```

Here's how you'd call this function and pass an object as parameter

```ts
fetchPopularUsers({
  Application: 'uk',
  Sex: 'notSet',
  Count: 52,
  ShowMilitaryOnly: false,
})
```

## Links

- [Interfaces in TypeScript: What are they and how do we use them](https://blog.logrocket.com/interfaces-in-typescript-what-are-they-and-how-do-we-use-them-befbc69b38b3/)
