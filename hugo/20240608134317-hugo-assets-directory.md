---
title: Hugo assets directory
date: 2024-06-08T13:43:17+03:00
uuid: 20240608134317
slug: hugo-assets-directory
draft: false
description: 
tags: 
- hugo pipes
- asset management
---

- If you want any file to be processed by [Hugo Pipes](https://gohugo.io/hugo-pipes/introduction/), for example compiling Sass stylesheets or converting TypeScript files to JavaScript, it needs to be in the _assets_ directory, which by default is `assets/`, but can be configured in `config.toml`
- Unlike `staticDir` which can take an array of values for multiple static directories, there can only be one `assetDir`

```toml
staticDir = ['assets', 'static']
assetDir = 'assets/'
```

- If you are creating or using a custom theme, the files in the themes asset directory `themes/foo/assets` will NOT be processed by Hugo pipes by default.

- You can however _mount_ multiple asset directories. Mounting a new directory means the default directory is ignored, so be sure to explicitly add it again if you want the default directory to work

```toml
# config.toml
[module]
  [[module.mounts]]
    source = 'assets'
    target = 'assets'
  [[module.mounts]]
    source = 'themes/foo/assets'
    target = 'assets'
```

Now, if you link to a _resource_ with path `css/custom.scss`, it will look in both `css/custom.scss` and `themes/amnastic/css/custom.scss`

```html
{{ $scss_options := (dict "transpiler" "libsass" "outputStyle" "compressed") }}
{{ $scss_file := resources.Get "css/custom.scss" }}
{{ $customStyles := $scss_file | resources.ToCSS $scss_options | minify }}

<link rel="stylesheet" href="{{ $customStyles.RelPermalink }}">
```

After the resources are processed, Hugo publishes them to the `publishDir`, which by default is `public/`. The link would look like this when compiled

```html
<link rel="stylesheet" href="/css/custom.min.css">
```

## assetDir vs staticDir
If a file needs to be loaded as a _resource_ and processed by [Hugo Pipes][hugo pipes], it needs to be in `assetDir` location(s)
  - Example files: `styles.scss`, `main.ts`, images etc.
  - Example processes: Minification, compilation, concatenation, fingerprinting and so on..
  - Default location: `assets/` in project base
  - URLs: Since _resources_ are published to the `publishDir` after they have been processed, you can reference them with their relative URL which would be just the file name. For example: `/styles.css` instead of `assets/styles.css`

If i file needs to be in the `publishDir` when the site is built, and does not need any processing or compiling, it needs to be in the `staticDir`
  - Example files: `favicon.ico`, `robots.txt`, `manifest.json` etc.
  - Default location: `static/` in project base
  - URLs: All files in the `static/` directory can be directly referenced by their relative URL. For example, the file at location `static/manifest.json` can be referenced anywhere in the site with the relative URL `/manifest.json`. Same as `assetDir`, no need to mention `staticDir` in the final URL


Links
---
- [Module configuration: mounts](https://gohugo.io/hugo-modules/configuration/#module-configuration-mounts)
- [Mount multiple directories as Hugo `assets`](https://discourse.gohugo.io/t/mount-multiple-directories-as-hugo-assets/44267/2)
- [Hugo Pipes](https://gohugo.io/hugo-pipes/introduction/)

[hugo pipes]: https://gohugo.io/hugo-pipes/introduction/