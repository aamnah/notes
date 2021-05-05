---
title: Using Typescript to generate RequireJS (AMD) modules and export behaviour
date: 2021-05-06
tags:
  - TypeScripts
  - DurandalJS
  - KnockoutJS
  - Bindings
  - Modules
---

I'm compiling to AMD modules.

- Default exports are exported as `exports.default = Awesomesauce`
- Individual exports with `export class Awesomesauce` output `exports.Awesomesauce = Awesomesauce`
- Individual exports with `export = Awesomesauce` output `return Awesomesauce`. `exports =` syntax specifies a single object that is exported from the module

Default exports work fine when i am importing TS modules into TS modules manually. But when DurandalJS/KnockoutJS does the automatic ViewModel+View binding i run into weird issues. Hence this thorough checkup of what exports are like and what DurandalJS/KnockoutJS is expecting..

Answer was found in the [TypeScript docs related to modules](https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require):

> Both CommonJS and AMD generally have the concept of an `exports` object which contains all exports from a module.

> They also support replacing the `exports` object with a custom single object. Default exports are meant to act as a replacement for this behavior; however, the two are incompatible. TypeScript supports export = to model the traditional CommonJS and AMD workflow.

> The `export =` syntax specifies a single object that is exported from the module. This can be a class, interface, namespace, function, or enum.

> When exporting a module using `export =`, TypeScript-specific `import module = require("module")` must be used to import the module.

### tl;dr:

When working with CommonJS/AMD

- Do NOT use default exports if you want CommonJS/AMD interop. Default exports and the `exports` object in CommonJS/AMD are incompatible. (The former is actually the replacement for the latter).
- Use `export = Class` and not `export Class`.
- Must use `import Class = require("Class")` to import all `export = ` modules

Here's the `tsconfig.json`

```json
{
  "compileOnSave": true,
  "enableAutoDiscovery": true,
  "compilerOptions": {
    "target": "ES2015",
    "module": "amd",
    "sourceMap": true,
    "lib": ["ESNext", "dom"]
  }
}
```

And here's are the outputs of different export patterns:

### Method 1

```ts
export class Awesomesauce {
  // code goes here
}
```

Result is `exports.Awesomesauce = Awesomesauce;`

```js
define(['require', 'exports'], function (require, exports) {
  'use strict'
  Object.defineProperty(exports, '__esModule', { value: true })
  exports.Awesomesauce = void 0
  class Awesomesauce {}
  exports.Awesomesauce = Awesomesauce
})
//# sourceMappingURL=module1.js.map
```

### Method 2

```ts
class Awesomesauce {
  // code goes here
}

export = Awesomesauce
```

Result is `return Awesomesauce;`

```js
define(['require', 'exports'], function (require, exports) {
  'use strict'
  class Awesomesauce {}
  return Awesomesauce
})
//# sourceMappingURL=module2.js.map
```

### Method 3

```ts
export default class Awesomesauce {
  // code goes here
}
```

Result is `exports.default = Awesomesauce`

```js
define(['require', 'exports'], function (require, exports) {
  'use strict'
  Object.defineProperty(exports, '__esModule', { value: true })
  class Awesomesauce {}
  exports.default = Awesomesauce
})
//# sourceMappingURL=module3.js.map
```

### Method 4

```ts
class Awesomesauce {
  // code goes here
}

export default Awesomesauce
```

Result is `exports.default = Awesomesauce`, same as Method 3 above

```js
define(['require', 'exports'], function (require, exports) {
  'use strict'
  Object.defineProperty(exports, '__esModule', { value: true })
  class Awesomesauce {}
  exports.default = Awesomesauce
})
//# sourceMappingURL=module4.js.map
```

## Links

- [`export =` and `import = require()`](https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require)
- [Avoid Export Default](https://basarat.gitbook.io/typescript/main-1/defaultisbad)
- [module.exports vs. export default in Node.js and ES6](https://stackoverflow.com/questions/40294870/module-exports-vs-export-default-in-node-js-and-es6)
- [MDN: export](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export)
