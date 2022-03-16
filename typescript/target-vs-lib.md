---
title: TypeSScript config - `target` vs. `lib`
date: 2021-09-06
---

- `target` is pretty self explanatory, it determines which version your final JS code will be compiled down to.
- `lib` basically tells TS what features not to complain about
- By default, when you specify a `target`, the default `lib` includes that target and `dom`

- `lib` specifies a set of bundled library _declaration files that describe the target runtime environment_.

```
--lib  Specify a set of bundled library declaration files that describe the target runtime environment.
one or more:  es5, es6, es2015, es7, es2016, es2017, es2018, es2019, es2020, es2021, esnext, dom, dom.iterable, webworker,                          webworker.importscripts, webworker.iterable, scripthost, es2015.core, es2015.collection, es2015.generator, es                         2015.iterable, es2015.promise, es2015.proxy, es2015.reflect, es2015.symbol, es2015.symbol.wellknown, es2016.a                         rray.include, es2017.object, es2017.sharedmemory, es2017.string, es2017.intl, es2017.typedarrays, es2018.asyn                         cgenerator, es2018.asynciterable, es2018.intl, es2018.promise, es2018.regexp, es2019.array, es2019.object, es                         2019.string, es2019.symbol, es2020.bigint, es2020.promise, es2020.sharedmemory, es2020.string, es2020.symbol.                         wellknown, es2020.intl, es2021.promise, es2021.string, es2021.weakref, esnext.array, esnext.symbol, esnext.as                         ynciterable, esnext.intl, esnext.bigint, esnext.string, esnext.promise, esnext.weakref
```

`lib` does NOT include any polyfills. If you add `ESNext`, it'll not mean that TypeScript will compile down your TS code written in `ESNext` to your `ES2015` or whatever `target`. It will mean that you're kina sorta promising TS that these libs will be supported, so don't complain about it.

For example, if my `target` is `ES2015`, specifying `ESNext` as `lib` will NOT convert `.includes()` to `ES2015` code.

> Remember, TS **never** injects polyfills in your code.

.

> You want polyfills you need to add those yourself

.

> So in short: configure `target` first, and if you need any extra polyfill in your project OR you **know** your browser(s) will support this little extra feature, `lib` is how to make TS happy about it.

## Links

- [What does the TypeScript "lib" option really do?](https://stackoverflow.com/a/50987516/890814)
- [TSConfig Reference - lib](https://www.typescriptlang.org/tsconfig#lib)
- [What does the tsconfig option "lib" do?](https://stackoverflow.com/a/39306295/890814)
