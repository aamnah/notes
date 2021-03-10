---
title: Dynamically generate Mdx pages based on file name
date: 2020-05-14
---

I followed some article to setup generating pages for MDX content. That tutorial used the `path` value defined in frontmatter to build the page. Which is bothersome because now i gotta specify a `path` in frontmatter every time. Otherwsie the build will fail. I'm coming from Jekyll and Hugo, and the path was always optional.

I'd much rather it take the filename as the basis for the URL, which i have now managed to do, by following yet another article.

Here's the code for both.

The first one is generating pages based on the `path` value and then i'm using this on the index pages and applying a filter to get posts from different folders

```jsx
const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query', result.errors)
  }
  // Create blog post pages.
  const posts = result.data.allMdx.edges
  // you'll call `createPage` for each result
  posts.forEach(({ page }, index) => {
    createPage({
      path: page.frontmatter.path,
      component: path.resolve(`./src/components/Layout/Post.jsx`),
      context: {
        id: page.id,
      },
    })
  })
}
```

And this one is generating pages based on filename and taking them from the `notes` directory. I don't have to add any `path` values to the frontmatter

```jsx
const { createFilePath } = require('gatsby-source-filesystem')
const path = require('path')

// Add a field called 'slug', which is basically filename + directory
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const slug = createFilePath({
      node,
      getNode,
      basePath: `notes`,
      trailingSlash: false,
    })

    createNodeField({
      name: 'slug',
      node,
      value: `${slug}`,
    })
  }
}

// Use that slug field to create pages
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query', result.errors)
  }

  const posts = result.data.allMdx.edges
  posts.forEach(({ node }, index) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/components/Layout/Post.jsx`),
      context: { id: node.id },
    })
  })
}
```

Now i want it to use `path` (if defined) for custom URL slug and use filename as a default fallback. But that bit i'll get to at some other time..

## Links

- [Programmatically Creating Pages](https://www.gatsbyjs.org/docs/mdx/programmatically-creating-pages/)
- [Creating Slugs for Pages](https://www.gatsbyjs.org/docs/creating-slugs-for-pages/)
- [gatsby-source-filesystem](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/)
- [createFilePath](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/#createfilepath)
- [createNodeField](https://www.gatsbyjs.org/docs/actions/#createNodeField)
- [How to create pages dynamically in Gatsby using MDX](https://malikgabroun.com/gatsby-create-pages-with-mdx)
- [Static vs Normal Queries](https://www.gatsbyjs.org/docs/static-vs-normal-queries/)
