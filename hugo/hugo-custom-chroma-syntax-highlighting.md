---
date: 2022-11-30
slug: hugo-custom-chroma-syntax-highlighting
title: Customizing Chroma in Hugo and Light/Dark syntax highlighting themes
---


**tl;dr**
1. Disable inline styles for syntax highlighting
2. Generate stylesheets
3. Use an inline `<style>` tag in your template file, and load Hugo partials inside a media query

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

Yes, you can load CSS files as partials. They just need to be in the `layout/partials` folder

Links
---

- [Docs: Syntax Highlighting](https://gohugo.io/content-management/syntax-highlighting/)
- [Hugo Chroma Syntax Highlighting Dark/Light Mode](https://bwiggs.com/posts/2021-08-03-hugo-syntax-highlight-dark-light/)
- [hugo gen chromastyles](https://gohugo.io/commands/hugo_gen_chromastyles/)