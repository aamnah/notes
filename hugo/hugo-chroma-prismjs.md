---
date: 2022-11-30
title: Using PrismJS for Hugo sites
slug: hugo-chroma-prismjs
---

Hugo uses Chroma by default. You can use Prism instead if you want. 

PrismJS renders client side whereas Chroma probably renders at build time. Chroma is probably really good for site performance.

Make sure you disable the built-in Chroma config to avoid style overrides

```toml
[markup]
  [markup.highlight]
    codeFences = false
    guessSyntax = false
    noClasses = true
```