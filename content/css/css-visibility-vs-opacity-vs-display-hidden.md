---
title: Opacity vs. Visibility vs. Display hidden
date: 2020-08-12
slug: css-visibility-vs-opacity-vs-display-hidden
---

- `display: none` takes it out of the document flow, and removes it from accessibility tree
- `opacity: 0` makes the element transparent, but keeps it in the document flow, and you can click on it
- `visibility: hidden` makes the element invisible, keeps it in the document, but you can't click on it

To understand the difference between `visibility: hidden` and `opacity: 0`, think of custom designed radio/checkboxes. With `visibility: hidden` you can not Tab to them or click them.

## Links

- [MDN: display](https://developer.mozilla.org/en-US/docs/Web/CSS/display)
- [Hidden content for better a11y](https://gomakethings.com/hidden-content-for-better-a11y/)
- [Does opacity:0 have exactly the same effect as visibility:hidden](https://stackoverflow.com/a/273076)
