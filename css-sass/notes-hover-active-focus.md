---
title: Notes on styling active, hover and focus states
date: 2020-08-12
slug: notes-hover-active-focus
---

As a beginner you may style only the `hover` states and forget about `active` and `focus`.

- `focus` is important in form design, this comes into play when you are _tabbing through_ the input items and `focus` tells you what field is selected.
- `active` is important in buttons, this is when you have clicked on a button and haven't let go of the mouse yet (the click is not yet over). `active` tells you what you are actively pressing on..
- the styles for `hover`, `active` and `focus` can be grouped together and `hover` and `focus` are usually the same.
- the _order_ in which you specify these styles is important.

1. Link
2. Visited
3. Hover
4. Active
5. Focus

## Links

- [CSS Basics: Styling Links Like a Boss](https://css-tricks.com/css-basics-styling-links-like-boss/)
