---
title: Using SWR
date: 2020-07-13
slug: using-swr-react-hook
status: draft
---

### Why SWR?

> I was storing my remotely fetched data in useReducer or useState and manually mutating (or via a reducer), and then maybe reloading from the server in some cases, but not in others. And I was using React Context to make the data available to unrelated components in my app.

The company that built SWR (and Next.js!) is Vercel (previously Zeit), doesn't use Redux at all.

> No, we don't use redux or any state management libraries like redux at ZEIT. So far we've found SWR to be a reliable and much simpler alternative to remote data management across our dashboard.
> We do use `useReducer` to minimize re-renders and manage complex state, though!
> <cite>[ref](https://github.com/vercel/swr/issues/315#issuecomment-606172104)</cite>

SWR caches data by default

### Getting started

```bash
npx create-react-app practice-swr --template typescript
cd practice-swr

npm i swr axios
code .
```

i'm going to be using `axios` for the fetcher functions, because i'm used to it..

a basic _fetcher_ function using `fetch`

```js
const fetcher = (...args) => fetch(...args).then((res) => res.json())
```

the same with `axios`

```js
import axios from 'axios'

const fetcher = (url = apiUrl) => axios.get(url).then((response) => response.data)

function App() {
  const { data, error } = useSWR('/api/data', fetcher)
  // ...
}
```

or

```js
const fetcher = (...args) => axios.get(...args).then((response) => response.data)
```

### the usual way

```js
import React, { useEffect } from 'react'

export default function App() {
  const [date, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      // magic
    }

    fetchData()
  }, []) // [] will make it run only once

  retrun()
  // blah
}
```

### the SWR way

```js
import React, { useState } from 'react'
import useSWR from 'swr'

export default function App() {
  const { data, error } = useSWR('http://blah', (url:string) => axios(url).then(response) => response.data )

  if (error) { // there was an error }
  if (!data) { // data hasn't arrived yet, `undefined` by default }
  return ( // got data, do something )

}

```

## Links

- [swr](https://github.com/vercel/swr)
- [swr docs](https://swr.vercel.app/getting-started)
- [Youtube: React Data Fetching with Hooks using SWR](https://www.youtube.com/watch?v=oWVW8IqpQ-A)
- [Why You Should Be Storing Remote Data in a Cache (and Not in State)](https://medium.com/better-programming/why-you-should-be-separating-your-server-cache-from-your-ui-state-1585a9ae8336)
- [Managing Remote Data with SWR](https://dev.to/juliang/managing-remote-data-with-swr-7cf)
