---
title: Using Prettier to automatically fix syntax for you
date: 2018-02-20
slug: prettier
---

```bash
npm i -D Prettier
```

```bash
# Pretty a file
npm prettier src/Filename.js --write
```

```bash
# Prettier config file
touch ~/.prettierrc
```

```
{}
```

`{}` just means take everything default. VS Code will automatically start using prettier to format your files if it sees a `.prettierrc` file. Make sure you have the following settings enabled in VS Code settings

```bash
# VS Code config
Editor: Format On Save
Prettier: Require Config
```

```json
"scrpts": {
	"format": "prettier --write 'src/**/*.{js,jsx,html,css,json}'"
}
```

https://frontendmasters.com/courses/complete-react-v4/adding-prettier-cli-script/

# ESLint

Prettier handles formatting (spacing etc.), ESLint handles stylistic choices (variables not being used)

With ESLint you can use the Standard, Airbnb or ESLint recommended rules.

```bash
npm i -D eslint eslint-config-prettier eslint-plugin-prettier
```

You can see what ESLint did with the `--debug` flag

```json
"scrpts": {
    "lint": "eslint '**/*.{js,jsx}'"
}
```

```bash
eslint 'src/**/*.{js,jsx}' --debug

# the -- let's it know that we want to pass in ore params with the npm command
npm run lint -- --debug
```

ESLint came after JSHint which came after JSLint

```json
// allow these globals and don't warn for them
"globals": {
	"React": true
}
```
