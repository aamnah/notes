---
title: Bash script to bootstrap React Native project
date: 2020-07-29
slug: bootstrap-project-react-native-prettier-eslint-navigation
status: draft
category: Bash Scripting
tags:
  - 'react native'
  - eslint
  - prettier
  - 'react navigation'
---

https://gist.github.com/aamnah/4cd9f92bde643840939dcd8ffba7eed1

react native project init

### Typescript

```bash
# create project (with Typescript support)
npx react-native init Listy --template react-native-template-typescript
```

This will change ESLint config (e.g. Prettier plugins may change)

### Redux

would you like to add redux? (y/n)

```bash
npm i redux react-redux @reduxjs/toolkit
```

### React Navigation

would you like to add navigation? (y/n)

install

```bash
# React Navigation (and dependencies)
npm i @react-navigation/native react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

add config to app.js

### Prettier

remove the old config and add my own

```bash
add_prettier_config() {
  rm -rf .prettierrc.js
  touch .prettierrc.yaml

  echo "
# .prettierrc or .prettierrc.yaml
# Options: https://prettier.io/docs/en/options.html

tabWidth: 2
semi: false
trailingComma: 'all'
singleQuote: true
jsxBracketSameLine: false

" > .prettierrc.yaml
}

add_prettier_config
```

### ESLint

Would you like to update ESLint config (group import statements)? (y/n)

```bash
update_eslint_config() {
  npm i -D eslint eslint-plugin-import @typescript-eslint/parser

  rm -rf .eslintrc.js
  touch .eslintrc.yaml

  echo "
# .eslintrc.yaml
# Configuration: https://eslint.org/docs/user-guide/configuring
# Using with Prettier: https://prettier.io/docs/en/integrating-with-linters.html#recommended-configuration

root: true

extends:
  - '@react-native-community'
  - plugin:import/errors
  - plugin:import/warnings
  - plugin:import/typescript
  - prettier # needs to be LAST, so it gets the chance to override other configs.
  - prettier/react

plugins:
  - import

settings:
  import/resolver:
    node:
      extensions: ['.js', '.jsx', '.ts', '.tsx']
      moduleDirectory: ['node_modules', 'src/']

rules:
  import/order:
    - error
    - groups:
        - builtin
        - external
        - internal
        - - parent
          - sibling
      pathGroups:
        - pattern: react
          group: external
          position: before
      pathGroupsExcludedImportTypes:
        - react
      newlines-between: always
      alphabetize:
        order: asc
        caseInsensitive: true

" > .eslintrc.yaml
}

update_eslint_config
```

## Links

- [Automatically sort import statements in React projects](https://blog.aamnah.com/react/sort-import-statements-react-eslint-automatic)
