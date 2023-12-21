---
title: Convert Create React App project to Vite
date: 2023-12-21T13:51:49+02:00
uuid: 20231221135149
slug: convert-create-react-app-cra-to-vite
draft: false
description: 
tags: 
---

- Make sure all the needed dependencies in `package.json` are copied to the new project and installed
- Make sure the `import` paths are okay

#### URLs need to be updated in `index.html`

`%PUBLIC_URL%` is Create React App specific, you need that for CRA to be able to [process files in the `public/` folder](https://create-react-app.dev/docs/using-the-public-folder/). For Vite, it is not necessary.

```html
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
<link rel="icon" type="image/png" sizes="32x32" href="%PUBLIC_URL%/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="%PUBLIC_URL%/favicon-16x16.png">
<link rel="mask-icon" href="%PUBLIC_URL%/safari-pinned-tab.svg" color="#ed254e">
<meta name="msapplication-TileColor" content="#000411">
<link rel="apple-touch-icon" sizes="180x180" href="%PUBLIC_URL%/apple-touch-icon.png">
<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />

<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
```
would become

```html
<link rel="icon" href="/favicon.ico" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ed254e">
<meta name="msapplication-TileColor" content="#000411">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="apple-touch-icon" href="/logo192.png" />
```

#### Environment variables (`process.env`)
[Vite: Env and Mode](https://vitejs.dev/guide/env-and-mode)

`process.env` is not available. Vite exposes env variables on the `import.meta.env` variable instead.

Make sure to also change the variable prefix from `REACT_APP_` to `VITE_` as only variables prefixed with `VITE_` are exposed to your Vite-processed code

```ts
const TMDB_API_TOKEN = process.env.REACT_APP_TMDB_API_TOKEN
```

would become

```ts
const TMDB_API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN
```

Also update these variables in your deploy environment, for example; update them in Netlify

#### Build location
Output directory for builds is `build/` in CRA while `dist/` in Vite. 

If you have been deploying with Netlify, either change the value for _Publish Directory_ in Netlify Admin or `netlify.toml`

```toml
[build]
base = "/"
command = "npm run build"
publish = "dist/"
```

Or you can update your build directory by changing the value for `build.outDir` in `vite.config.js` to `build`

```ts
export default defineConfig({
  // ...
  build: {
    outDir: 'build'
  }
})
```