---
title: React Hooks - useEffect
date: 2020-07-13
draft: true
slug: react-hooks-useeffect
---

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
}
```

This is wrong

```js
  useEffect(async () => {
    // magic
  },
```

This is right

```js
useEffect(() => {
  async function fetchData() {
    // magic
  }

  fetchData()
}, [])
```
