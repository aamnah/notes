---
title: Get unique values out of an array
slug: unique-array-values-with-set
date: 2020-07-13
---

```js
let categories = [...new Set(data.map((crime) => crime.category))]
```
