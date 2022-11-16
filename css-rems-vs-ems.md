---
title: Rems vs. Ems
date: 2022-11-16
slug: css-rems-vs-ems
draft: true
---


- Ems _compound_, because they are always relative to the _parent_ element (could be anything: `div`, `span`, `a`, `section` and so on..)
- Rems are always relevant to the _root_ element (which is `:root` or `html`)
- Both ems and rems are responsive units, relative to the `font-size` property of parent or root element. By default `1rem` or `1em` usually equals to `16px` which is the browser's default font-size at 100% zoom.
- Use rems for font sizes and ems for stuff like button paddings

Why?

- It makes responsive design a breeze. For example: if my sizes (paddings, margins, heights etc.) are set using `rem` values, changing the `font-size` on `html` using a bunch of media queries will change the sizes for my entire design accordingly.