---
date: 2022-11-30
lastmod: 2024-06-08
slug: hugo-custom-chroma-syntax-highlighting
title: Customizing Chroma in Hugo and Light/Dark syntax highlighting themes
description: Conditionally loading CSS stylesheets in Hugo and loading CSS files as partials is possible. 
---


**tl;dr**
1. Disable inline styles for syntax highlighting
2. Generate stylesheets
3. Use an inline `<style>` tag in your template file, and load Hugo partials inside a media query (or load stylesheet based on a data attribute value)

---

Hugo uses [Chroma](https://github.com/alecthomas/chroma) by default. You can use [Prism](https://prismjs.com/index.html) instead if you want. 

Chroma renders the highlighted syntax at build time

PrismJS gives you a lot of flexibility in terms of plugins, themes and portability.

PrismJS renders client side whereas Chroma probably renders at build time. Chroma is probably really good for site performance.

My considerations for using one or the other:
- performance. is it going to download ~50kb on site load? is it going to render on every page load or at build time?
- portability. can i take my syntax highlighting related changes away with me if i decide to move away from Hugo?
- flexibility. can i add line numbers and file names? can i add a click to copy button?

PrismJS has a few neat plugins like [treeview](https://prismjs.com/plugins/treeview/)


I have been using PrismJS for my sites so far. It's flexible and extendible. 

Chroma renders the highlighted syntax at build time, so i decided to switch

```toml
[markup]
  [markup.highlight]
    noclasses = false

```


```bash
hugo gen chromastyles --style=emacs > layouts/partials/css/syntax-light.css
hugo gen chromastyles --style=monokai > layouts/partials/css/syntax-dark.css
```

You can see [code samples using different themes here](https://xyproto.github.io/splash/docs/longer/all.html) 

light = xcode, manni, emacs
dark = fruity, dracula, native, rrt, vim

comments should be italic and muted color. it should be different from the color of strings and should not be used for anything else
all strings should be a different color


```css
<style type="text/css" media="screen">
@media (prefers-color-scheme: dark) { 
  {{ partial "css/syntax-dark.css" . | safeCSS }}
}
@media (prefers-color-scheme: light) { 
  {{ partial "css/syntax-light.css" . | safeCSS }} 
}
</style>
```

Yes, you can load CSS files as partials. They just need to be in the `layout/partials` folder. Using a partial means that the code is included as inline code inside the HTML.

Alternatively, you can set the `media`attribute directly on `<link>`as well:

```html
<link
  rel="stylesheet"
  href="/css/syntax-light.css"
  media="screen and (prefers-color-scheme: light)"
/>
<link
  rel="stylesheet"
  href="/css/syntax-dark.css"
  media="screen and (prefers-color-scheme: dark)"
/>
```

If your theme changes based on a `data` attribute, like `data-theme="dark"` and not based on the `prefers-color-scheme` media query like `@media (prefers-color-scheme: dark) {}`, then your code to load the relevant CSS file based on current theme will not work. The issue here is that you need to load both styles from both stylesheets, not one, because the theme can change dynamically any time.

My solution in a scenario like this is to merge your stylesheet into one and use an attribute selector to change my CSS custom properties. See the code below for an example:

```css
html[data-theme="dark"] {
  --color-syntax-bg: hsl(231.4, 14.9%, 15%);
}

html[data-theme="default"],
html[data-theme="light"] {
  --color-syntax-bg: hsl(180deg 11% 95%);
}

/* Background */ .bg { background-color: var(--color-syntax-bg); }
/* PreWrapper */ .chroma { background-color: var(--color-syntax-bg); }
```

and then load just a single stylesheet, no conditional loading needed in HTML or JS

```html
<link rel="stylesheet" href="/css/syntax.css" />
```

Links
---

- [Docs: Syntax Highlighting](https://gohugo.io/content-management/syntax-highlighting/)
- [Hugo Chroma Syntax Highlighting Dark/Light Mode](https://bwiggs.com/posts/2021-08-03-hugo-syntax-highlight-dark-light/)
- [hugo gen chromastyles](https://gohugo.io/commands/hugo_gen_chromastyles/)