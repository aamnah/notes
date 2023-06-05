---
date: 2022-11-30
title: Using PrismJS for Hugo sites
slug: hugo-chroma-prismjs
---

NOTE: I have stopped using Prism for syntax highlighting and use Hugo's built-in Chroma highlighting instead. The huge advantage Chroma has over Prism is site performance. Chroma renders the highlighted syntax at build time whereas Prism renders client side. Prism is also going to download ~50kb on site load. The file size is actually bigger if you are using many plugins and supporting many languages.

---

Hugo uses [Chroma](https://github.com/alecthomas/chroma) by default. You can use [Prism](https://prismjs.com/index.html) instead if you want. PrismJS gives you a lot of flexibility in terms of plugins, themes and portability.

Prism has [quite a few neat plugins](https://prismjs.com/plugins/) like [Copy to Clipboard Button](https://prismjs.com/plugins/copy-to-clipboard) and [Treeview](https://prismjs.com/plugins/treeview/). There are also a bunch of [themes available](https://github.com/PrismJS/prism-themes), and you can easily create your own theme by creating a `.css` file.

Prism also make your syntax highlighting more portable. If you decide to move away from Hugo, you can easily take your `.css` theme and use it in your new site in a different framework.

Make sure you disable the built-in Chroma config to avoid style overrides

```toml
[markup]
  [markup.highlight]
    codeFences = false
    guessSyntax = false
    noClasses = false # whether to use classes instead of inline styles 
```

The rest is pretty usual. Download `prism.js` and `prism.css` and add them to your site's `static` folder. Link to `prism.css` in the `<head>` and link to `prism.js` before the closing body tag `</body>`


Links
---

- [How to integrate Prism.js code highlighting with Hugo](https://janaksingh.com/blog/hugo-add-prismjs-code-highlighting/)

