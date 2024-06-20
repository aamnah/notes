---
title: Sorted imports in TypeScript projects
date: 2023-12-28T14:28:39+02:00
uuid: 20231228142839
slug: sorted-imports-in-typescript-projects
draft: false
description: Sort your import statements in React and TypeScript projects for consistency and lesser cognitive load 
tags: 
- ReactJS
---

```bash
npm install --save-dev \
  @typescript-eslint/parser \
  eslint-plugin-import \
  eslint-import-resolver-typescript \
  eslint-plugin-simple-import-sort
```

```js
// .eslintrc.cjs
module.exports = {
  extends: [
    'eslint:recommended',
    // ...
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    //  ...
    sourceType: 'module',
  },
  plugins: [
    //  ...
    'simple-import-sort', 
    'import'
  ],
  rules: {
    // ...
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
  },
  settings: {
    //  ...
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
}
```

Links
---

- [eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort)
- [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import/)
