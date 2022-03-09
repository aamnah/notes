---
title: Notes on state management in React Apps
date: 2020-08-04
slug: notes-state-management
---

|           | [MobX][mobx]                                        | [Redux][redux]                               | [Context + Hooks][context]      | [Easy Peasy][easy-peasy] | Recoil       |
| --------- | --------------------------------------------------- | -------------------------------------------- | ------------------------------- | ------------------------ | ------------ |
| Status    | stable, being used in Production at large companies | battle tested in large scale production apps |                                 |                          | experimental |
|           | multiple stores                                     | multiple reducers                            | multiple contexts               |                          |              |
| Tooling   |                                                     | Redux DevTools                               |                                 |                          |              |
| Verbosity |                                                     | verbose, but Redux Toolkit to the rescue     | verbose, but useContext is cool |                          |              |

### MobX

Observable pattern. In MobX you can directly edit the state tree, unlike Redux where you must dispatch _actions_ in order to update state.

### Easy Peasy

data fetching and side effects included

### React Context vs. Redux

There isn't much difference in complexity or verbosity. You still gotta wrap stuff around and write all the reducers and disptach all the actions. The functionality is pretty much the same. The code is also fairly similiar (specially the reducers and dispatch)

By the looks of it, Context isn't providing anything new or solving an issue better. It's just replicating what Redux already does, minus the DevTools.

Redux vs React Context hence is not even a competition.

## React Context

> Context is a way to share state between unrelated or distant components. All you have to do is wrap your components in a `Context.Provider` and then call `useContext(Context)` inside that component to access your state and helper functions.

You have to use `useContext()` with `useReducer()`. `useReducer()` provideds the logic for updating your state, give shape to the data in your state..

In your folder structure, you'll have a `contexts` instead of `store` folder

```js
import React, { useContext } from 'react'
const { loading, data, more } = useContext(MyContext)
```

With React Context, the meat of the code is in the Provider. That's where you write your reducers. Creating the context is just creating a constant, and using the context is also just creating a constant with `useContext()`. Unlike Redux, there are no action creators.

## Links

- [Introduction to the React Context API](https://www.youtube.com/watch?v=DjasGquy64o)
- [Introducing the React Context API](https://www.youtube.com/watch?v=yzQ_XulhQFw)
- [React Hooks: useContext](https://www.youtube.com/watch?v=u06qAON66iw)
- [React Hooks: useReducer](https://www.youtube.com/watch?v=cKzrgB6MqqM)
- [The Problem with React's Context API](https://leewarrick.com/blog/the-problem-with-context/)

[mobx]: https://mobx.js.org/README.html
[redux]: https://redux.js.org/
[context]: https://reactjs.org/docs/context.html
[easy-peasy]: https://easy-peasy.now.sh/
