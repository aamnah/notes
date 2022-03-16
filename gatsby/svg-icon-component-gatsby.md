---
title: Adding an SVG component to Gatsby (React)
date: 2020-04-06
slug: svg-icon-component-gatsby
---

For React projects created with `create-react-app`, you can not import an SVG as `ReactComponent`, and that adds it as an inline SVG. In Gatsby it doesn't work.

This code would not work

```jsx
import { ReactComponent as Logo } from './logo.svg'
function App() {
  return (
    <div>
      {/* Logo is an actual React component */}
      <Logo />
    </div>
  )
}
```

You'll get the following error instead

```
Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
```

Importing the SVG as an image would work. But that's an _image_, defeats the entire purpose of using an SVG in the first place. You can not make an image file show different variants based on media queries in a straightforward and contained way. Besides, Gatsby's own `<Image>` component is great for static images.

```jsx
import logo from '../assets/img/logo-responsive.svg'

function App() {
  return (
    <main>
      {/* the SVG will show as an image and will not be used as an inline SVG */}
      <img src={logo} alt="logo" />
    </main>
  )
}
```

So we gotta create a component for icons that'll return SVGs based on the `name` we pass to it.

## Links

- [Adding Images, Fonts, and Files](https://create-react-app.dev/docs/adding-images-fonts-and-files/)
