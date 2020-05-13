---
title: Dynamically generate Mdx pages based on file name
date: 2020-05-14
---

I followed some tutorial online to setup generating pages for MDX content.

My setup is a bit different right now as i don't have content in just one directory called pages. I have two different directories at the same level that both contain blog posts..

This setup was bothersome because i had to specify a `path` in frontmatter every time. I'd much rather it take the filename as the basis for the URL.

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
      value: `/notes${slug}`,
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
