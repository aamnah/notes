---
title: Custom Path mapping (i.e. absolute imports) in React and React Native
date: 2020-08-04
slug: custom-path-mapping-absolute-imports
---

The benefit of doing so

- neater imports and organization
- when i move components around by copy pasting code, the paths in the import statements don't change. I know VS Code can auto-update import paths, and it is wonderful, but when it does the path updates you have to go in and save all files where the path was updated. Not having to update any paths to begin with is cool.

You have to update both `babel.config.js` and `tsconfig.json` if you're using Typescrip.

### Babel setup

```bash
npm i -D babel-plugin-module-resolver
```

```js
// babel.config.js
module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          src: './src',
          tests: ['./tests/'],
          components: './src/components',
          // add more here
        },
      },
    ],
  ],
}
```

### Typescript setup

```json
/* tsconfig.json */
{
  "compilerOptions": {
    "target": "esnext",
    "baseUrl": "./" /* Base directory to resolve non-absolute module names. */,
    "paths": {
      "*": ["src/*"],
      "components/*": ["src/components/*"]
      /* Add more here */
    }
  }
}
```

Now you can import like this..

```ts
import { List, Wrapper } from 'components/common' // ../../components/common
import Lists from 'components/Lists'
import Tags from 'components/Tags'
import { Color, Dimension } from 'Theme' // ../../Theme.ts
```

## Links

- [Using Custom Path Aliases with TypeScript](https://reactnative.dev/docs/typescript#using-custom-path-aliases-with-typescript)
