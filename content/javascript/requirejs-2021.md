---
date: 2021-12-08
title: RequireJS in 2021
---

**Do we need RequireJS in 2021?**
Absolutely not. RequireJS was relevant 8 years ago (before ES2015 released), it's not any more. The problem it was trying to solve (JS modules and dependency management) has been fixed natively in JavaScript.

Learning it today mainly serves two purposes. It allows you to work on _legacy_ projects, and you get familiar with _JS history_. The API is not that extensive though, you can go through the docs in a day and most of the functionality and config makes sense. Any confusion you may feel as a modern JS developer who started with ES6 to begin with would arise from actually understanding _why_ we needed RequireJS in the first place, not with how it works.

RequireJS is not the only one of it's kind. There is also CommonJS which was the original module solution used by NodeJS. NodeJS v13 introduced experimental support for ES6 modules. You can get an idea of [different module loaders and their syntax](https://www.typescriptlang.org/tsconfig#module) in the TypeScript docs

> Well-known module loaders used in JavaScript are Node.js’s loader for CommonJS modules and the RequireJS loader for AMD modules in Web applications.

With ES2015 (ES6), we get built-in support for modules in JavaScript. Like with CommonJS, each file is its own module.

A _module_ is just a file that _exports_ some code that you can then _import_ in another file

**Compatibility issues**

- You can not use CommonJS syntax with ES modules syntax, they're not interoperable
- If you're using TypeScript with RequireJS, keep in mind the incompatibility of **default exports** with AMD/CommonJS which have a single [`exports` object](https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require) as the default export

> When exporting a module using `export =`, TypeScript-specific `import module = require("module")` must be used to import the module.

```ts
import module = require('module')

export = foo
```

## Links

- [JavaScript Modules: From IIFEs to CommonJS to ES6 Modules](https://www.youtube.com/watch?v=qJWALEoGge4&t=1713s)
- [JavaScript Modules in 100 Seconds](https://www.youtube.com/watch?v=qgRUr-YUk1Q)
