---
title: How to create a Grid system in Sass
slug: how-to-create-grid-sass
date: 2015-08-04
category: "CSS and SASS"
---

Making your own grid system is also pretty straightforward in Sass. The following example is a Sass @mixin from [David Demaree’s article](http://www.alistapart.com/articles/getting-started-with-sass/) on A List Apart which takes one argument — $span — which will be passed into our @mixin as a variable:

```scss
$column-width: 21em;
$gutter: 1.5em;

@mixin grid($span) {
  float: left;
  margin-right: $gutter;
  margin-bottom: $gutter;
  width: ($column-width * $span) + ($gutter * ($span - 1));
}
```

And then later that mixin can be used with containers using simple @include:

```scss
header {
  @include grid(3);
}

article {
  @include grid(2);
}

aside {
  @include grid(1);
  margin-right: 0;
}
```
    
To make this a bit easier to understand, our grid (layout) would now look like this when containers are laid on top of it:

![Sass Grid](../assets/img/sass-grid.png)


[Source](http://viljamis.com/blog/2012/extending-css/)
