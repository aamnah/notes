---
title: Typescript Notes
slug: typescript-notes
date: 2020-08-04
---

> we can get the "nice and short" error message mentioning out `Banana` type if we use `interface` instead of `type`

### Array of objects

Here's an object of type `List`

```ts
interface List {
  id: number
  title: string
}
```

And we want an array `Lists` of objects `List`, which can be done the following two ways:

using an indexer

```ts
// using an indexer
interface Lists {
  [index: number]: List
}
```

and my preferred one

```ts
interface Lists extends Array<List> {}
```

And now we can declare the interface like so

```ts
// Option A
var result: List[] = [
  { id: 0, label: 'CId', key: 'contentId' },
  { id: 1, label: 'Modified By', key: 'modifiedBy' },
  { id: 2, label: 'Modified Date', key: 'modified' },
  { id: 3, label: 'Status', key: 'contentStatusId' },
  { id: 4, label: 'Status > Type', key: ['contentStatusId', 'contentTypeId'] },
  { id: 5, label: 'Title', key: 'title' },
  { id: 6, label: 'Type', key: 'contentTypeId' },
  { id: 7, label: 'Type > Status', key: ['contentTypeId', 'contentStatusId'] },
]

// Option B
var result: Lists = [
  { id: 0, label: 'CId', key: 'contentId' },
  { id: 1, label: 'Modified By', key: 'modifiedBy' },
  { id: 2, label: 'Modified Date', key: 'modified' },
  { id: 3, label: 'Status', key: 'contentStatusId' },
  { id: 4, label: 'Status > Type', key: ['contentStatusId', 'contentTypeId'] },
  { id: 5, label: 'Title', key: 'title' },
  { id: 6, label: 'Type', key: 'contentTypeId' },
  { id: 7, label: 'Type > Status', key: ['contentTypeId', 'contentStatusId'] },
]
```

## Links

- [How can I define an interface for an array of objects with Typescript?](https://stackoverflow.com/a/25470775/890814)
