---
title: Globals in TS 
description: Access or declare values in the global scope in TypeScript
date: 2021-04-27
---

### Old way

create a `foo.d.ts` file and declare a `var`

```js
// Global file
var ENVIRONMENT = '@ConfigurationManager.AppSettings["Environment"]'; // picking up the env value from a Web.config file in .NET MVC project
```

```ts
// globalConstants.d.ts
declare var ENVIRONMENT: string
```

```ts
// foo.ts
const Sentry = {
    dsn: "https://iamawesome.sentry.dsn",
    logger: "Awesome Web App",
    environment: ENVIRONMENT, // this is defined globally 
  },
```

### New way

Use `globalThis` to access any globally defined variables (no need to create type declarations). [read more](https://devblogs.microsoft.com/typescript/announcing-typescript-3-4/#type-checking-for-globalthis)

You must use `var` (no `let` or `const`)


```js
// Global file
var ENVIRONMENT = '@ConfigurationManager.AppSettings["Environment"]'; // picking up the env value from a Web.config file in .NET MVC project
```

```ts
// foo.ts
const Sentry = {
    dsn: "https://iamawesome.sentry.dsn",
    logger: "Awesome Web App",
    environment: globalThis.ENVIRONMENT, // this is defined globally 
  },
```
