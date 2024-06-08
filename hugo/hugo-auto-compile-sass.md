---
title: Auto compiling Sass and SCSS in Hugo
date: 2022-10-28
lastmod: 2024-06-08 
draft: false
description: This is a general overview of the `ToCSS` pipe in Hugo's asset management
tags:
- Hugo
- Dart Sass
---

```go
{{ $scss := resources.Get "scss/main.scss" }}
{{ $css := $scss | resources.toCSS }}

<link rel="stylesheet" href="{{ $css.RelPermalink }}">
```

- Your Sass files need to be in the `assets/` folder for you to be able to pipe commands with `|`. By default the [assetDir](https://gohugo.io/hugo-pipes/introduction/#asset-directory) is `assets/` in the project root. By default, you can only have one `assetDir`
  - You can mount your theme's assets directory `themes/BLAH/assets/` (i.e. multiple `assetDir`s) as a module with a custom mount configuration. Read: [Hugo assets directory](./hugo-assets-directory)
- `:=` is also known as the walrus operator. It means definition and assignment
- `resources.Get`locates the filename given in Hugo’s assets filesystem and creates a `Resource` object that can be used for further transformations. 
- `RelPermalink` would get the relative permalink. Meaning `/scss/main.css` instead of `http://mysite.com/scss/main.css`

```go
{{ $scss := resources.Get "scss/main.scss" }}
{{ $css := $scss | ToCSS }}

<link rel="stylesheet" href="{{ $css.RelPermalink }}">
```

```go
{{ $style := resources.Get "scss/main.scss" | resources.ToCSS }}

<link rel="stylesheet" href="{{ $style.RelPermalink }}">
```

You can also specify options like you normally would if you ran `dart-sass` or `sass` CLI

```go
{{ $options := (dict "targetPath" "style.css" "outputStyle" "compressed" "enableSourceMap" (not hugo.IsProduction) "includePaths" (slice "node_modules/myscss") "transpiler" "libsass") }}
{{ $style := resources.Get "sass/main.scss" | resources.ToCSS $options }}
```

- for `transpiler` you can specify `dartsass` instead of the default `libsass`, but you'd need to have [Dart Sass](https://gohugo.io/hugo-pipes/transpile-sass-to-css/#dart-sass) installed for that
- setting `outputStyle` to `compressed` will handle Sass/SCSS files minification better than the more generic `resources.Minify`.


### Troubleshooting

An error like below most likely means that the file is not in `assetDir`. Check your file paths and make sure the file path is included in your `assetDir` location(s)

```
execute of template failed at <resources.ToCSS>: error calling ToCSS: no Resource provided in transformation
```


Links
---

- [ToCSS](https://gohugo.io/hugo-pipes/transpile-sass-to-css/)
- [Hugo assets directory](./hugo-assets-directory)