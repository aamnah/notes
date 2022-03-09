---
title: Durandal Notes
date: 2021-04-17
---

### View Composition

- You define a template to include with Knockout's `data-bind` attribute and specify a value for `compose`. e.g. `data-bind=compose: 'file/path'`
- `compose` is a _custom binding_ for Knockout
- You can bind to a partial view, which will just be a plain HTML file e.g. `navbar.html`. Partial views have no matching JavaScript file, and are stored in the `views` folder. If you bind a partial without a viewmodel, it'll bind it to the parent element's viewmodel.
- OR you can bind to a ViewModel, which will get the viewmodel, get it's matching view, bind them together, and then insert it into the DOM.

```html
<section data-bind="compose: 'navbar.html'"></section>
<!-- just HTML, no JS involved -->

<section data-bind="compose: 'viewmodels/navbar'"></section>
<!-- get the viewmodel and the matching view, bind them together and insert into DOM -->
```
