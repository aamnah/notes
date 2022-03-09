---
title: TypeSScript config - `target` vs. `lib`
date: 2021-09-06
---

- `target` is pretty self explanatory, it determines which version your final JS code will be compiled down to.
- `lib` basically tells TS what features not to complain about
- By default, when you specify a `target`, the default `lib` includes that target and `dom`

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
