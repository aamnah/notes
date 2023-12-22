---
title: Generic Props in React and TypeScript to get rid of Children being Implicitly Any
date: 2023-12-22T09:46:01+02:00
uuid: 20231222094601
slug: generic-props-in-react-and-typescript-children-implicit-any
draft: false
description: 
tags: 
---

```
error TS7031: Binding element "children" implicitly has an "any" type.
```

If you have ever come across the error above, it usually happens in a situation where you have a wrapper element that will have children, but you don't know all the other props it might be getting and are spreading them..

You can get rid of the error by typing the props you are spreading as generic props. Code would look like below:

```tsx
import { ReactNode } from 'react'

interface Props<T> {
  props: T
  children: ReactNode
}
export default function CardList<T>({ children, ...rest }: Props<T>) {
  return (
    <div {...rest}>
      {children}
    </div>
  )
}
```




