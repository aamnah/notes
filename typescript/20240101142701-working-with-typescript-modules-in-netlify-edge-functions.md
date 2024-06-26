---
title: Working with TypeScript Modules in Netlify Edge Functions
date: 2024-01-01T14:27:01+02:00
uuid: 20240101142701
slug: working-with-typescript-modules-in-netlify-edge-functions
draft: false
description: Imports for TypeScript modules for Edge Functions are different because of the Deno runtime environment
tags: 
- netlify
- typescript
- deno
---

## Importing TS Files
Netlify Edge Functions use Deno as the runtime, so you'll follow Deno standards for importing/exporting files

- In your import statements, you need to add the `.ts` file extension at the end of your filename. For example `./person.ts`. File extensions are required when importing modules. All your imported files should have file extensions for their own imports too.

```ts
// Netlify Function
import Person, { sayHello } from "../someDir/person.ts";
```

```ts
// ../someDir/person.ts
import { randomFoo } from "./foo.ts"; // nested imports need to have file extensions too

export const sayHello
export default Person
```

Otherwise you will get similar to the following error:

```
TypeError: Module not found "file:///media/Files/foo/netlify/edge-functions/constants".
```

- If you want to import normal TS files, they need to be outside the edge functions directory. Anything inside the edge functions directory is expected to be a _module_ that has a _default_ export and returns a _function_; i.e. be an edge function itself.

If you're trying to import another file in the edge functions directory, that file needs to be an edge function module, i.e. it should return a function. If you just want to have a basic TS file, for example for saving constant strings, move it outside the edge functions directory

```ts
// file: netlify/edge-functions/weather.ts
import { OWM_API_KEY, OWM_BASE_URL } from "../../constants.ts"
```

```ts
// file: src/constants.ts
export const OWM_API_KEY = Netlify.env.get("OPENWEATHER_API_KEY")
export const OWM_BASE_URL = `https://api.openweathermap.org/data/2.5/weather`
```


## Exporting Netlify Function modules
- In your exported modules, you need a _default_ export, and that default export must be a _function_.

Otherwise you will get similar to the following error:

```
◈ Failed to load Edge Function constants. The file does not seem to have a function as the default export.
```

### Links
- [Deno: Importing JavaScript modules](https://docs.deno.com/runtime/manual/getting_started/first_steps#importing-javascript-modules)
- [Netlify: Runtime environment](https://docs.netlify.com/edge-functions/api/#runtime-environment)