/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path')
exports.createPages = async ({ graphql, actions, reporter }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            frontmatter {
              path
              date
              description
              excerpt
              lastmod
              title
            }
            body
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }
  // Create blog post pages.
  const posts = result.data.allMdx.edges
  // you'll call `createPage` for each result
  posts.forEach(({ node }, index) => {
    createPage({
      // This is the path you created before
      // (or `node.frontmatter.path`)
      path: node.frontmatter.path,
      // This component will wrap our MDX content
      component: path.resolve(`./src/components/Layout/Post.js`), // /media/aamnah/Files/Sites/blog.aamnah.com/src/components/Layout/Post.js
      // You can use the values in this context in
      // our page layout component
      context: {
        // Add optional context data to be inserted
        // as props into the page component..
        //
        // The context data can also be used as
        // arguments to the page GraphQL query.
        //
        // The page "path" is always available as a GraphQL
        // argument.
        id: node.id,
        title: node.frontmatter.title,
        body: node.body,
      },
    })
  })
}
