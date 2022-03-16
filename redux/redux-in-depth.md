---
title: Redux in depth
date: 2020-08-01
slug: redux-in-depth
draft: true
description: This article has way too many notes to be called a summary. It's more of an aattempt at trying to understand Redux to the point where i am able to describe it 3 sentences max. Because, if you can't explain it simply, you don't understand it well enough.
---

> Redux: a single centralized place to contain the global state in your application, and specific patterns to follow when updating that state to make the code predictable.

```
view -> action -> dispatcher -> store -> view
```

|         | Description                                                                                                                 | Representation                        |
| ------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| State   | single source of truth, immutable, explicit changes, (i.e. you can't edit the state directly, you must do it via _actions_) | `{}`                                  |
| Action  | Events that trigger updates in the state, an object describing a _change_ in the state                                      | `{ type: "DO_SOMETHING" }`            |
| Reducer | A _pure_ function that describes mutations in state. Takes the existing state and an action and returns a new state         | `(prevState, action) => { newState }` |

Terminology & Concepts

- store
- action
- action creators
- payload
- slice
- dispatch
- selectors
- pure functions
- immutability

## State

> It serves as a centralized store for state that needs to be used across your entire application, with rules ensuring that the state can only be updated in a predictable fashion.

It's a shared global state that many different parts of your application can access and update. You no longer have to pass data down with props (prop-drilling), you can access it directly from the state. In the entire app, there is only one _Store_, which makes it the single source of truth for the entire app.

The state is in put into a centralized location outside your component tree.

Example state:

```js
{
  conversations: {
    isFetching: boolean,
    isLoading: boolean,
    error: {},
    list: {}
  },
  users: {},
  activity: {}
}
```

## Action

- plain JavaScript object, minimal represntation of a change to state
- actions are _dispatched_, that's what they call sending/invoking an action
- when Redux receives an action to _do something_, a reducer handles what mutations to perform
- actions are like orders, they tell reducers _what_ to do (plus some necessary info). _how_ to do it is the reducer's job

Tips:

- handle failures before success, failures are much simpler to handle

Example actions:

```js
{ type: 'FETCH_DATA_REQUEST' }
{ type: 'FETCH_DATA_FAILURE', error: 'Oops' }
{ type: 'FETCH_DATA_SUCCESS', response: { ... } }
```

```js
{ type: 'FETCH_DATA_REQUEST' }
{ type: 'FETCH_DATA_FAILURE', payload: { error: 'Oops' } }
{ type: 'FETCH_DATA_SUCCESS', payload: { response: { ... } } }
```

There are two main naming conventions for actions. One is the all caps snake case (`ADD_TODO_SUCCESS`), and the other is camel case including the category that this action belongs to (`todos/todoAdded`). The first one is how it was done originally in redux and necessitated the need of _action constants_ (which were basically string constants to avoid typos), and the latter is how Redux Toolkit does it by default.

These properties are common in a modern Redux an action:

- **_type_**: Required. A string or Symbol indicating the action type.
- **payload**: Optional with Redux, Required with Redux Toolkit. Any value or object containing data related to the action. Object is preferred (and convention).
- **meta**: Optional. Any value or object containing data that isn’t part of the payload. For example, for anlytics

## Reducer

> Reducers act like event listeners, and when they hear an action they are interested in, they update the state in response.

- reducers can _never_ update the state directly in place (i.e. mutate it). They must make a copy of it, make changes to that copy and then return the copy.
- pure function, which means no side effects (can't fetch data, make asynchronous API calls, accessing the browser cache and so on)
- because we can't do side effects inside Redux, we have have middleware like `redux-thunk` and `redux-saga` to handle asynnchronous things for us.

Example reducers:

```js
const increment = () => {
  setCounter((prevCounter) => prevCounter + 1)
}
```

```js
const initialState = { value: 0 }

function counterReducer(state = initialState, action) {
  // Check to see if the reducer cares about this action
  if (action.type === 'counter/increment') {
    // If so, make a copy of `state`
    return {
      ...state,
      // and update the copy with the new value
      value: state.value + 1,
    }
  }
  // otherwise return the existing state unchanged
  return state
}
```

Here's the cheatsheet on updating objects and arrays without mutating them.

The fact that you bsolutely do not mutate state is important because React

#### payload

> An action object can have other fields with additional information about what happened. By convention, we put that information in a field called payload.

- `payload` is just a property on action objects, it groups everything other than `type`.
- techniocally, it's not a hard requirement when describing an _action_ in Redux, but it is convention that is widely used (i.e. the most common usage pattern) and often recommended
- `action.payload` is a pattern built into libraries like Redux Toolkit

```js
// without payload property
{
  type: 'DO_SOMETHING',
  foo: '',
  bar: '',
  baz: ''
}
```

```js
// with payload property
{
  type: 'DO_SOMETHING',
  payload: {
    foo: '',
    bar: '',
    baz: ''
  }
}
```

#### slice

- _slice_ just means a part of the state.

#### action creators

No longer needed with Redux Toolkit

#### store

the object that holds the state is called store. It's just **one plain old JavaScript object**. You can serioulize it and use it to rehydrate a state extactly to the point where the app was..

### pure functions

pure functions are like math function, same input will produce same output and nothing else would happend on the _side_..

stuff that's impure

- console.logs are impure
- mutatig objects and arrays

## Redux Toolkit

You no longer have to worry about creating action creators anymore

```
applyMiddleware: function()
bindActionCreators: function()
combineReducers: function()
compose: function()
createStore: function()
```

compose() takes multiple functions and combines them into one..

```js
// <script src="https://unpkg.com/redux@4.0.5/dist/redux.min.js"></script>

// behold, a reducer function!
const reducer = (state = { value: 1 }, action) {
  // takes in existing state and an action, and returns new state after handling whatever happened

  console.log('something happened', action)
  return state
}

// createStore only takes one argument, which is a reducer function. if you have multiple reducers, this one will be the 'root' reducer
// i.e. a reducer that combines all the other reducers
const store = createStore(reducer)

console.log(store) // ["dispatch", "subscribe", "getState", "replaceReducer"]

console.log(store.getState()) // [object Object] { value: 1 }

store.dispatch('yo') // Error: Actions must be plain objects.
store.dispatch({ greeting: 'yo!'}) // Error: Actions may not have an undefined "type" property
store.dispatch({ type: 'greeting'})

/*
"something happened"
[object Object] {
  type: "@@redux/INITf.u.z.e.4.n"
}
"something happened"
[object Object] {
  type: "greeting"
}
*/
```

## Notes

- Asynchronous actions in Redux require middleware (i.e. 3rd party libraries e.g. Redux Thunk or Redux Saga)
- Redux is an iimplementation of [
  the Flux pattern](https://facebook.github.io/flux/docs/overview.html)

## Links

- [Redux](https://redux.js.org/)
- [Redux Essentials](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)
- [Frontend Masters: State Management with Redux & MobX](https://frontendmasters.com/courses/redux-mobx/)
- [Egghead.io: Getting Started with Redux](https://egghead.io/courses/getting-started-with-redux)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Redux to the rescue!](https://medium.com/@jtbennett/redux-to-the-rescue-42717fcfd9c9)
