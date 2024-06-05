---
title: Light and Dark image variants based on CSS prefers-color-scheme query
date: 2024-06-05T17:38:11+03:00
uuid: 20240605173811
slug: light-and-dark-images-based-on-color-scheme
draft: true
description: 
tags: 
---

Show different images based on CSS `prefers-color-scheme` media query

```html
<picture alt="postage stamp">
    <source srcset="/images/finland_postal_stamp_white_border.png" media="(prefers-color-scheme: dark)">
    <img src="/images/finland_postal_stamp_colored_border.png" />
</picture>
```