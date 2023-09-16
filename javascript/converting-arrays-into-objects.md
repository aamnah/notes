---
title: Converting Arrays into Objects for easily finding values by key
date: 2023-09-06
---

What i have:

An array of objects. An object contains an `id` that is a number corresponding to a `name` that is a string. The array defines movie genres that are returned by TMDB API. 

This array of objects is difficult to get values from. If i want to get the name of a genre by `id`, i have to loop over the entire array to find that value.

```js
const genresArray = [
    {
      id: 28,
      name: 'Action',
    },
    {
      id: 12,
      name: 'Adventure',
    },
    {
      id: 16,
      name: 'Animation',
    },
    {
      id: 35,
      name: 'Comedy',
    },
    {
      id: 80,
      name: 'Crime',
    },
    {
      id: 99,
      name: 'Documentary',
    },
    {
      id: 18,
      name: 'Drama',
    },
    {
      id: 10751,
      name: 'Family',
    },
    {
      id: 14,
      name: 'Fantasy',
    },
    {
      id: 36,
      name: 'History',
    },
    {
      id: 27,
      name: 'Horror',
    },
    {
      id: 10402,
      name: 'Music',
    },
    {
      id: 9648,
      name: 'Mystery',
    },
    {
      id: 10749,
      name: 'Romance',
    },
    {
      id: 878,
      name: 'Science Fiction',
    },
    {
      id: 10770,
      name: 'TV Movie',
    },
    {
      id: 53,
      name: 'Thriller',
    },
    {
      id: 10752,
      name: 'War',
    },
    {
      id: 37,
      name: 'Western',
    },
  ]
```

What i want:

An object with the `id` as _key_.

```js
{
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
}
```

And here is how we'd do it in TypeScript

```ts
interface GenresObject {
  [index: number]: string
}
let genresObject: GenresObject = {}

genresArray.map(genre => {
  genresObject[genre.id]: genre.name
})
```

This shape of the object makes it very easy to get a genre `name` by `id`. For example:

```js
console.log(genresObject.10770) // 'TV Movie'
```