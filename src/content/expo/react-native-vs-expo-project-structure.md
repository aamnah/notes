---
title: Project structure - Expo vs. React Native
slug: react-native-vs-expo-project-structure
date: 2020-06-24
---

```bash
# create a react native project with typescript
npx react-native init AwesomeTSProject --template react-native-template-typescript
```

```
.
├── android/
├── app.json
├── App.tsx
├── babel.config.js
├── index.js
├── ios/
├── metro.config.js
├── node_modules/
├── package.json
├── package-lock.json
├── __tests__/
└── tsconfig.json

4 directories, 8 files
```

```bash
# create an Expo project
expo init my-project
```

```
.
├── app.config.js
├── App.tsx
├── assets
├── babel.config.js
├── components
├── constants
├── hooks
├── navigation
├── node_modules
├── package.json
├── screens
├── tsconfig.json
└── types.tsx

7 directories, 6 files
```
