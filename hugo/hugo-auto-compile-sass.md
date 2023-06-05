---
title: Auto compiling Sass in Hugo
date: 2022-10-28
draft: true
---

```go
{{ $scss := resources.Get "scss/main.scss" }}
{{ $css := $scss | resources.toCSS }}

<link rel="stylesheet" href="{{ $css.RelPermalink }}">
```

- Your Sass files need to be in the `/assets` folder for you to be able to pipe commands with `|` 
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

You can also specify options like you normally would if you ran Sass CLI

```go
{{ $options := (dict "targetPath" "style.css" "outputStyle" "compressed" "enableSourceMap" (not hugo.IsProduction) "includePaths" (slice "node_modules/myscss") "transpiler" "libsass") }}
{{ $style := resources.Get "sass/main.scss" | resources.ToCSS $options }}
```

- for `transpiler` you can specify `dartsass` instead of the default `libsass`. but you'd need to have embedded-dart installed for that
- setting `outputStyle` to `compressed` will handle Sass/SCSS files minification better than the more generic `resources.Minify`.

If you have 