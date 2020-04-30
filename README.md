# Aamnah's Blog

[![Netlify Status](https://api.netlify.com/api/v1/badges/f69f90e0-215e-464d-9240-af3be99d3d6f/deploy-status)](https://app.netlify.com/sites/blog-aamnah/deploys)

Gatsby based site for the blog on [blog.aamnah.com](https://blog.aamnah.com)

Uses MDX for the post content. I always had this issue where i couldn't use CSS classes in Makrdown, and if i did add any HTML, any markdown wouldn't render inside that HTML block. MDX fixes that. I can write in the Markdown that i am familiar with, and add all the jazz with JSX as well.

## TODO

- [x] Deploy the blog at Netlify
- [x] Get MDX posts working
- [ ] (in progress) Build a layout for posts
- [ ] (in progress) Build a layout for the Home page of the site
- [x] Add Recent posts tp the Home page
- [ ] Add sitemap
- [ ] Add RSS feed
- [ ] Figure out post images
- [x] Fix post routes for MDX
- [ ] Add a component for inline SVGs (logo)
- [ ] Add SVG icon component (heart, external link)
- [x] Convert to Sass, see [Using Sass in Gatsby](https://www.gatsbyjs.org/docs/sass/)
- [x] Add a [Contact form](https://www.netlify.com/blog/2017/07/20/how-to-integrate-netlifys-form-handling-in-a-react-app/)
- [ ] Use IP detection and show different placeholder text (e.g. phone format) for different countries
- [x] Add syntax highlighting for code blocks ([Prismjs](https://prismjs.com/))
  - [ ] Add a custom theme for highlighting
- [x] Add support for _Draft_ status

## Notes

- consider moving this blog to aamnah.com/blog, for SEO reasons. aamnah.com would then become the home page of this gatsby site..\
- it seems that Layout _pages_ need to be a default export. In your `index.js` for the `Layouts` folder, you'd export default components as follows:

```js
export { default as DefaultLayout } from './Default.jsx'
export { default as HomeLayout } from './Home.jsx'
export { default as PostLayout } from './Post.jsx'
```

## .mdx and .jsx

- renaming files to `.mdx` seems to be a bad idea. kept getting random errors. Changing extension back to `.md` fixed build errors

```
Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: null.
```

I commented out the `gatsby-plugin-page-creator` out of the config since i had added my own in `gatsby-config.js` as well. That solved the build error.

- renaming files to `.jsx` means you gotta specify the file extension everywhere (e.g. `gatsby-config.js` and `gatsby-node.js`). You'd also need to specify the file extension if you are importing components in an `index.js` file. For example

```js
// components/common/index.js

export * from './Button.jsx'
export * from './Favicon.jsx'
export * from './Footer.jsx'
export * from './Header.jsx'
export * from './Link.jsx'
export * from './Navigation.jsx'
export * from './SEO.jsx'
```

## Linking

If you use Gatsby `<Link>` instead of `<a>` it makes the change of _internal_ pages smooth, you don't do a full page refresh every time. Underneath, it's using Reach Router `@reach/router`, so it only works on internal links. For external links you'd still use `<a>`
