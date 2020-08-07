---
title: Getting started with React Context
date: 2020-08-05
---

Are we doing the Context vs. Redux debate? No. Just consider this article as someone who hasn't heard of Redux, someone who's new to React, managing state that needs to be shared by multiple components, with React's built-in functionality.

Every component that's using a particular context re-renders if anything tin that context changes.

Provider will have hooks and redux logic

- `<Provider>` must be passed a `value` prop, this value is what the Consumer will have access to. This will be your values in state and funtcions to modify state etc.

```tsx
import React, { createContext, useContext, useState } from 'react'

import { sampleData } from 'sample-data.ts'

const ListsContext = createContext(sampleData.lists)
ListsContext.displayName = 'ListsContext'

// the hook to use our context and have reducer logic
function useListsContext() {
  const context = useContext(ListsContext)
  if (!context) throw new Error('ListsContext must be used with ListsProvider')
  return context
}

// the provider we'll export
function ListsProvider(props: any) {
  const [data, setData] = useState(sampleData.lists)

  const value = { data, setData }

  return <ListsContext.Provider value={value} {...props} />
}

export { useListsContext, ListsProvider }
```

```ts
import React, { Fragment } from 'react'

import { Text } from 'react-native'

import * as Type from './Lists.types'
import { useListsContext, ListsProvider } from './ListsContext'

export default function Lists(props: any) {
  const data: Type.Lists = useListsContext()

  return (
    <ListsProvider>
      <Fragment {...props}>
        <Header>
          <Text>Lists</Text>
        </Header>
        <Body>
          {data.map((list: Type.List) => (
            <Item key={list.id}>
              <Title>{list.title}</Title>
              <Description>3 items</Description>
            </Item>
          ))}
        </Body>
      </Fragment>
    </ListsProvider>
  )
}
```

Leigh Hailday passes {children}
https://www.youtube.com/watch?v=u06qAON66iw

Kent C. Dodds does not
https://kentcdodds.com/blog/application-state-management-with-react

### without context

```tsx
import React from 'react'

import { View } from 'react-native'
import styled from 'styled-components/native'

import { Color } from 'Theme'

interface TagProps {
  title: string
  desc: string
  color: string
}

interface TagsProps {
  data: any
}

export function Tag({ title, desc, color, ...rest }: TagProps) {
  return (
    <StyledTag color={color} {...rest}>
      <Title>{title}</Title>
      <Description>{desc}</Description>
    </StyledTag>
  )
}

export default function Tags({ data, ...rest }: TagsProps): JSX.Element {
  return (
    <Container {...rest}>
      {data.map((tag) => (
        <Tag key={tag.id} title={tag.title} desc={tag.description} color={tag.color} />
      ))}
    </Container>
  )
}
```

### with context

```tsx
// TagsContext.tsx
import React, { createContext, useContext, useState } from 'react'

import { sampleData } from 'sample-data'

const TagsContext = createContext(sampleData.tags)
TagsContext.displayName = 'TagsContext'

export function useTagsContext() {
  const context = useContext(TagsContext)

  if (!context) throw new Error('useTagsContext must be used within TagsProvider')
  return context
}

export function TagsProvider(props: any) {
  const [data, setData] = useState(sampleData.tags)

  const value = { data, setData }
  return <TagsContext.Provider value={value} {...props} />
}
```

```tsx
// Tags.tsx
import React from 'react'

import styled from 'styled-components/native'

import { Color } from 'Theme'

import { useTagsContext, TagsProvider } from './TagsContext'

interface TagProps {
  title: string
  desc: string
  color: string
}

export function Tag({ title, desc, color, ...rest }: TagProps): JSX.Element {
  return (
    <StyledTag color={color} {...rest}>
      <Title>{title}</Title>
      <Description>{desc}</Description>
    </StyledTag>
  )
}

export function Tags(props: any): JSX.Element {
  const data = useTagsContext()

  return (
    <TagsProvider>
      <Container {...props}>
        {data.map((tag) => (
          <Tag key={tag.id} title={tag.title} desc={tag.description} color={tag.color} />
        ))}
      </Container>
    </TagsProvider>
  )
}
```

### Usage with `useReducer`

### Debugging and DevTools

[Standalone react-devtools](https://www.npmjs.com/package/react-devtools) exist, but the Context shows as a component inside the veryyyy long component tree. And you can't search with `Ctrl + F` even if you give your context a `displayName`. Have fun finding your context provider and consumer..

You should definitely enable `console.log` by running `npx react-native log-android` while the app is running. You only have to enable it once.

[react-native-debugger](https://github.com/jhen0409/react-native-debugger) for Redux is far superior. [react-context-devtool](https://github.com/deeppatel234/react-context-devtool) looks good, but that only appears to be working with React for web and not React Native. Same for [reactext](https://github.com/reactext/reactext)

### Persisting Context

No out of the box solution exists. It'd probably be a manual implementation along the lines of saving every change to `LocalStorage` (web) or `AsyncStorage` (native), and then reading from storage instead of Context if the app is offline

- [Global Cached State in React using Hooks, Context, and Local Storage](https://medium.com/@akrush95/global-cached-state-in-react-using-hooks-context-and-local-storage-166eacf8ab46)
- [React Context API - persist data on page refresh](https://stackoverflow.com/a/53455443/890814)

### Redux vs. Context

- [React Native Debugger](https://github.com/jhen0409/react-native-debugger) works with Redux
- Persisting state and offline data is simple with `redux-persist`
- Type definitions are included in Redux Toolkit. With React Context manually adding the types every time is an asolute annoyance.

### Conclusion

I built an app where a couple of components were using their own contexts. I gave up at the point where i couldn't debug the actions that i was dispatching and being unable to see a nice diff in state change that was happening as a result..

Switching from Redux to React Context felt like i was going out of my way to make my dev life difficult. Things that just worked with Redux (and Redux Toolkit) like type definitions, devtools are something you have to put in extra manual effort for in React Context.

As of this writing, i still fail to understand why i shouldn't be using Redux. I hated its verbosity at one point, but Redux Toolkit (which is now the default approach) has made it cool and typescript friendly. Context is not at par in terms of DX.

I would stick with Redux just for the DevTools alone. If i had to switch, i'd probably invest in learning MobX..

### Other random questions

- How do i handle updating one context from inside another when i'm using multiple contexts? For example, adding messages to a conversation..
- How do i cancel dispatched actions? Cancel an AJAX request? Redux Sagas or Redux Observables? Can i do that with React Context?

## Links

- [docs: Context](https://reactjs.org/docs/context.html)
- [](https://kentcdodds.com/blog/application-state-management-with-react)
- [Introduction to the React Context API](https://www.youtube.com/watch?v=DjasGquy64o)
- [Introducing the React Context API](https://www.youtube.com/watch?v=yzQ_XulhQFw)
- [React Hooks: useContext](https://www.youtube.com/watch?v=u06qAON66iw)
- [React Hooks: useReducer](https://www.youtube.com/watch?v=cKzrgB6MqqM)
- [The Problem with React's Context API](https://leewarrick.com/blog/the-problem-with-context/)
