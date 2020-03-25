---
title: How i got this blog site up with Gatsby
path: setup-gatsby-mdx-blog
date: 2020-03-19
---

I initially wanted to serve Markdown files, but then made the decision in favor of MDX because of it's capability to render Markdown mixed with JSX.

```bash
npx gatsby new blog.aamnah.com
cd blog.aamnah.com
npm run develop # start dev server http://localhost:8000
npm run build # build production site
npm run serve # serve production site you built, http://localhost:9000

npx gatsby help # show available commands
npx gatsby new help # show help for a specific command
```

### Rendering Markdown files

We need a _source_ plugin to source files from a folder, and then we need a _transformer_ plugin to transform markdown to something Gatsby can query via GraphQL.

```bash
npm i gatsby-source-filesystem gatsby-transformer-remark
```

### MDX

I always had this issue where i couldn't use CSS classes in Makrdown, and if i did add any HTML, any markdown wouldn't render inside that HTML block. MDX fixes that. I can write in the Markdown that i am familiar with, and add all the jazz with JSX as well.

Using it with Gatsby is pretty easy.

```bash
npm i gatsby-plugin-mdx @mdx-js/mdx@latest @mdx-js/react@latest gatsby-plugin-page-creator
```

By default, it'll pick any files inside the `src/pages` directory. If you want it to pick up from other directories and automatically build, you need the `gatsby-plugin-page-creator` plugin, and the directory should already be sourced with `gatsby-source-filesystem`. Here's a sample config where i am using `src/posts` as my directory for blog posts

```js
plugins: [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `posts`,
      path: `${__dirname}/src/posts/`,
      ignore: [`**/\.*`], // ignore files starting with a dot
    },
  },
  {
    resolve: 'gatsby-plugin-page-creator',
    options: {
      path: `${__dirname}/src/posts`,
    },
  },
  `gatsby-plugin-mdx`,
]
```

### Sass

```bash
# install Sass plugins
npm install --save node-sass gatsby-plugin-sass
```

add `gatsby-plugin-sass` to plugins array in `gatsby-config.js`

Convert the `.css` files to `.scss` and you're good.

### Troubleshooting

#### React hooks error

```
  1. You might have mismatching versions of React and the renderer (such as React DOM)
  2. You might be breaking the Rules of Hooks
  3. You might have more than one copy of React in the same app
  See https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.
```

This was probably caused by Gatsby starter kit using outdated versions.. if you get this random error about React hooks, do this

- delete `node_modules` and `package-lock.json`
- npm install

and then

```bash
npm uninstall react react-dom gatsby
npm install react react-dom gatsby
```

#### Build failed because path doesn't exist

```
12:01:43 PM: The path passed to gatsby-source-filesystem does not exist on your file system:
12:01:43 PM: /opt/build/repo/src/data
12:01:43 PM: Please pick a path to an existing directory.
12:01:43 PM: See docs here - https://www.gatsbyjs.org/packages/gatsby-source-filesystem/
```

This was fixed by commenting out the code sourcing `src/data` (also removed trailing slashes for good measure). To be clear, the directory existed, it just didn't have any files, i.e. empty directory.

I had added it during configuration because i thought i might need it later.

## Links

- [Quick Start with Gatsby: Create, Develop, and Build Gatsby Sites From the Command Line](https://egghead.io/lessons/gatsby-quick-start-with-gatsby-create-develop-and-build-gatsby-sites-from-the-command-line)
- [Quick Start](https://www.gatsbyjs.org/docs/quick-start/)
- [gatsby-source-filesystem](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/?=)
- [Creating and Modifying Pages](https://www.gatsbyjs.org/docs/creating-and-modifying-pages/)

MDX

- [MDX: Gatsby](https://mdxjs.com/getting-started/gatsby)
- [gatsby-plugin-mdx](https://www.gatsbyjs.org/packages/gatsby-plugin-mdx/?=mdx)
- [Blogging with Gatsby & MDX](https://reacttraining.com/blog/gatsby-mdx-blog/)
