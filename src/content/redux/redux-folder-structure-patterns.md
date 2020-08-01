---
title: Redux folder structure patterns
date: 2020-08-01
slug: redux-folder-structure-patterns
---

## The original cruft

a `store` folder with separate `actions` and `reducers` folder inside.

```
src
└── store
    ├── actions
    │   ├── activity.ts
    │   ├── conversations.ts
    │   ├── index.ts
    │   ├── report.ts
    │   └── search.ts
    ├── index.ts
    └── reducers
        ├── activity.ts
        ├── conversations.ts
        ├── index.ts
        ├── report.ts
        └── search.ts
```

## The Redux toolkit

### Feature based: one folder for one feature

Following is from the [offical Redux template](https://github.com/reduxjs/cra-template-redux) for Create React App

```
src
└── features
    └── counter
        ├── Counter.js
        ├── Counter.module.css
        └── counterSlice.js
```

### Functionality based: one file for all redux

This is what i have been following up till now

```
src
├── components
│   ├── Activity.tsx
│   ├── Conversations.tsx
│   ├── index.ts
│   ├── Report.tsx
│   └── Search.tsx
└── store
    ├── activity.ts
    ├── conversations.ts
    ├── index.ts
    ├── report.ts
    ├── rootReducer.ts
    └── search.ts
```

```
src
├── components
│   └── counter
│       └── Counter.jsx
└── store
     └── counter.js
```

if you're creating separate files for component styles

```
src
├── components
│   └── counter
│       ├── Counter.js
│       └── Counter.module.css
└── store
     └── counter.js
```

An example when you're using Redux Saga and making API calls, you'll have folders called `services` for APIs and `sagas` for your saga-related code.

```
src
├── components
│   ├── Activity.tsx
│   ├── Conversations.tsx
│   ├── index.ts
│   ├── Report.tsx
│   └── Search.tsx
├── sagas
│   ├── activity.ts
│   ├── conversations.ts
│   ├── index.ts
│   ├── report.ts
│   └── search.ts
├── services
│   ├── activity.ts
│   ├── conversations.ts
│   ├── index.ts
│   ├── report.ts
│   └── search.ts
└── store
    ├── activity.ts
    ├── conversations.ts
    ├── index.ts
    ├── report.ts
    ├── rootReducer.ts
    └── search.ts
```
