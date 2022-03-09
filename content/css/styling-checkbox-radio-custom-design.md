---
title: Styling checkboxes and radio
date: 2020-08-12
lastmod: 2020-08-13
slug: styling-checkbox-radio-custom-design
---

- You can either style the `::after` of `input` or the `::before` of `label`
- It has to be able to show styles when we Tab to the input, so i can't do `display: none` on the original radio or checkbox

With `::before` pattern i can't do a this design

![some custom styles for radio](../images/custom-radio-designs.png)

By default you can't really style the `checkbox` and `radio` inputs.. What you can do is create your own.

You can add styles to the `::before` and `::after` to show the box or circle and change its colors.

There are two different ways you can write your HTML

```html
<!-- 
  Input and Label next to each other
  You have to manually link these two using `id` and `for`
  -->
<input id="pizza" type="checkbox" />
<label for="pizza">Full pizza?</label><br />
<input id="coke" type="checkbox" />
<label for="coke">Coke bottle too?</label><br />
```

```html
<!-- 
  Input inside Label
  these get automatically linked together, clicking the label will click the input
  -->
<label><input type="checkbox" />Extra cheese? </label><br />
<label><input type="checkbox" />Burger? </label><br />
```

Notice the `<br />`, `input` is `display: inline-block` and `label` is `display: inline` by default.

### Can't style `checkbox` and `radio` directly

If you try to style `checkbox` and `radio` input types directly, you'll fail. The code below will never work and is entirely useless..

```css
/* Checbox */
input[type='checkbox'] {
  background: red;
  color: yellow;
}

input[type='checkbox']:checked {
  background: green;
  color: blue;
}

/* Radio */
input[type='radio'] {
  background: orange;
  color: orangered;
}

input[type='radio']:checked {
  padding: 2em;
  background: thistle;
  color: plum;
}
```

### Using `label`, `span`, `::before`, `::after` or `+`

the `+` is for sibling elements. `checkbox[type='radio']:checked + label` will actually select the `label` next to the `radio` input that is `checked`.

Here's a quick run down of child and sibling selectors

- `>` child combinator selector (direct descendant)
- `+` adjacent sibling combinator (directly after)
- `~` general sibling combinator (anywhere after as long as it's on the same level)

#### The `::before` and `::after` on `input`

I prefer this one because it is neater and simpler code. You don't worry about the labels and use the `::before` on `input`. With this you also don't have to worry about hiding anything or being able to tab through

These styles don't care if your code was `<label><input></label>` (`input` inside of `label`) or `<label></label><input>` (`label` and `input` next to each other)..

```scss
/* Checbox */
input[type='checkbox'] {
  position: relative;
}

input[type='checkbox']::before {
  position: absolute;
  width: 1em;
  height: 1em;
  content: '';
  top: 0;
  left: 0;
  background: wheat;
}

/* Checbox - checked */
input[type='checkbox']:checked::before {
  background: crimson;
}
```

We have now something that looks like this image

![Basic checkbox styles](./styling-checkbox-1.png)

To make this work for both `radio` and `checkbox`, just combine them

```scss
/* Checbox & Radio */
input[type='radio'],
input[type='checkbox'] {
  position: relative;
}

input[type='radio']::before,
input[type='checkbox']::before {
  position: absolute;
  width: 1em;
  height: 1em;
  content: '';
  top: 0;
  left: 0;
  background: wheat;
}

input[type='radio']:checked::before,
input[type='checkbox']:checked::before {
  background: crimson;
}
```

Now you're set to style them however you want. I added a border and some margin

```scss
/* Checbox & Radio */
input[type='radio'],
input[type='checkbox'] {
  position: relative;
  margin-right: 0.4em;
}

input[type='radio']::before,
input[type='checkbox']::before {
  position: absolute;
  width: 1em;
  height: 1em;
  content: '';
  top: 0;
  left: 0;

  border: 1px solid dodgerblue;
}

input[type='radio']:checked::before,
input[type='checkbox']:checked::before {
  background: crimson;
}

// Checkbox
input[type='checkbox']::before {
  border-radius: 2px;
}

// Radio
input[type='radio']::before {
  border-radius: 50%;
}
```

And i took out the background color i had given the radio/checbkox. This is where i notice the issue with this approach

It's not replacing the original radio and checkbox, it's adding styles on top of it.. I can still see the original border underneath, and if i hide it or adjust opacity, it applies to my custom styles as well..

![Custom styles showing on top of original styles](./custom_checkbox_radio.png)
![Custom styles dimmed opacity](./custom_checkbox_radio_opacity.png)

You can do `appearance: none`, but that is [not very cross-browser friendly](https://developer.mozilla.org/en-US/docs/Web/CSS/appearance) and it also messes up all styles (which i don't feel like spending the time on fixing..)

```bash
input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
```

![appearance: none](./appearance_none.png)

The above is fine i guess, as long as you always have a `background-color`. But i wanted to test the other approach too, so now i'm on to styling the `label` instead of the `input`..

#### The `::before` and `::after` on `label`

## Links

- [Child and Sibling Selectors](https://css-tricks.com/child-and-sibling-selectors/)
- [MDN: appearance](https://developer.mozilla.org/en-US/docs/Web/CSS/appearance)
- [how to remove default status of Selectbox/Checkbox?](https://stackoverflow.com/questions/16350227/how-to-remove-default-status-of-selectbox-checkbox)
