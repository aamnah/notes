---
title: Notes on transpiling and compile targets
date: 2021-09-02
slug: notes-transpiling-compile-targets
---

- Transpiling to older compile targets results in bulkier code with lots of polyfills. 6x more code in some cases. Supporting IE11 will give you bulky oversized code that runs really slow.
- ES2017 has 95% browser support. Transpiling to ES2017 is recommended by Google experts (because it is cost effective)
- ES2021 has 70% browser support
- Node 12.8 supports ES2019+ natively. The `exports` field implies ES2019 code because it is only available in Node 12.8. (`main` can still be used as an ES5 fallback)
- You can check serve different JS files based on `type="module"` and `type="nomodule"` attributes added to your `<script>` tags

There are two ways of supporting both modern and older browsers:

- Compile application twice for different targets (one bundle for modern, one bundle for legacy)
- Compile application once for modern ES2017 (all code incl. deps will be ES2017 at this point) and then transpile that down for legacy targets

### Generating multiple bundles

Generating bundles for different targets is usually simple with bundlers. For example, [rollup](https://rollupjs.org/guide/en/) supports bundling from several unrelated inputs to several outputs.

#### Rollup

```js
// rollup.config.js (building more than one bundle)

export default [
  {
    input: 'main-a.js',
    output: {
      file: 'dist/bundle-a.js',
      format: 'cjs',
    },
  },
  {
    input: 'main-b.js',
    output: [
      {
        file: 'dist/bundle-b1.js',
        format: 'cjs',
      },
      {
        file: 'dist/bundle-b2.js',
        format: 'es',
      },
    ],
  },
]
```

#### Typescript

```bash
tsc -p /path/to/first/tsconfig.json --outFile controllers.js
tsc -p /path/to/second/tsconfig.json --outFile plugins.js
```

or if `outFile` or `outDir` is mentioned inside the `tsconfig.json`

```bash
tsc -p /path/to/first/tsconfig.json
tsc -p /path/to/second/tsconfig.json
```

### Typescript and Rollup

Use `tsc` to transpile the Typescript into an intermediate build folder, then I use rollup to bundle that transpiled code and output it to the desired destination.

## Links

- [Chrome Developer Summit 2020 - Transitioning to modern JavaScript](https://www.youtube.com/watch?v=cLxNdLK--yI&ab_channel=GoogleChromeDevelopers)
- [Publish, ship, and install modern JavaScript for faster applications](https://web.dev/publish-modern-javascript/)
