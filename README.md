# Aamnah's Blog

Gatsby based site for the blog on [blog.aamnah.com](https://blog.aamnah.com)

Uses MDX for the post content. I always had this issue where i couldn't use CSS classes in Makrdown, and if i did add any HTML, any markdown wouldn't render inside that HTML block. MDX fixes that. I can write in the Markdown that i am familiar with, and add all the jazz with JSX as well.

## TODO

- [x] Deploy the blog at Netlify
- [x] Get MDX posts working
- [ ] (in progress) Build a layout for posts
- [ ] (in progress) Build a layout for the Home page of the site
- [ ] (in progress) Add Recent posts tp the Home page
- [ ] Add sitemap
- [ ] Add RSS feed
- [ ] Figure out post images
- [ ] (in progress) Fix post routes for MDX
- [ ] Add a component for inline SVGs
- [ ] Add SVG icon component (heart)
- [ ] Convert to Sass, see [Using Sass in Gatsby](https://www.gatsbyjs.org/docs/sass/)

## Notes

- consider moving this blog to aamnah.com/blog, for SEO reasons. aamnah.com would then become the home page of this gatsby site..
- renaming files to `.mdx` seems to be a good idea. kept getting random errors. Changing extension back to `.md` fixed build errors

```
Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: null.
```

I commented out the `gatsby-plugin-page-creator` out of the config since i had added my own in `gatsby-config.js` as well. That solved the build error.
