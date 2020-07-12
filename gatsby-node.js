const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

// `onCreateNode` is a Gatsby lifecycle method that gets called whenever a new node is created. In this case only MDX nodes are touched.
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  // you only want to operate on `Mdx` nodes. If you had content from a
  // remote CMS you could also check to see if the parent node was a
  // `File` node here
  if (node.internal.type === 'Mdx' || node.internal.type === 'File') {
    // `createFilePath` is a function from gatsby-source-filesystem that translates file paths to usable URLs.
    const slug = createFilePath({
      // The node you'd like to convert to a path
      // e.g. from a markdown, JSON, YAML file, etc
      node,
      // Method used to get a node
      // The parameter from `onCreateNode` should be passed in here
      getNode,

      // The base path for your files.
      // Defaults to `src/pages`. For the example above, you'd use `src/content`.
      basePath: `content`,

      // Whether you want your file paths to contain a trailing `/` slash
      // Defaults to true
      trailingSlash: false,
    })

    createNodeField({
      // Name of the field you are adding
      name: 'slug',

      // Individual MDX node
      node,

      // The `value` in the createNodeField call is the URL you’ll use later to set up our page.
      // Generated value based on filepath with "blog" prefix. you
      // don't need a separating "/" before the value because
      // createFilePath returns a path with the leading "/".
      // value: `/foo${value}`, // /foo/30_day_code_challenge_codecademy/
      value: `${slug}`,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  // `reporter` is like Gatsby's internal console.log()
  // Destructure the createPage function from the actions object
  const { createPage } = actions

  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter

  // This query is only useful in the next step, where you use the `slug` value to create pages
  // and can pass content to the page being created
  const postResults = await graphql(`
    query {
      allMdx {
        edges {
          node {
            fields {
              slug
            }
            fileAbsolutePath
          }
        }
      }
    }
  `)
  if (postResults.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query', postResults.errors)
  }

  // Create blog post pages.
  const posts = postResults.data.allMdx.edges

  posts.forEach(({ node }, index) => {
    createPage({
      path: node.fields.slug, // This is the slug you created before
      // This component will wrap our MDX content
      component: path.resolve(`./src/components/Layout/Post.jsx`),
      // Add optional context data to be inserted as props into the page component..
      // The context data can also be used as arguments to the page GraphQL query.
      // The page "path" is always available as a GraphQL argument.
      // Keys in the context object that match up with arguments in the page query (in this case: "title"), will be used as variables. Variables are prefaced with $, so passing a title property will become $title in the query.
      context: { absolutePath: node.fileAbsolutePath },
    })
  })

  // CATEGORY PAGES
  const categoryResults = await graphql(`
    query {
      allDirectory(filter: { sourceInstanceName: { eq: "content" } }) {
        edges {
          node {
            name
            relativePath
          }
        }
      }
    }
  `)

  if (categoryResults.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query', categoryResults.errors)
  }

  categoryResults.data.allDirectory.edges.forEach(({ node }) => {
    if (node.name === node.relativePath) {
      createPage({
        path: node.name,
        component: path.resolve(`./src/components/Layout/Category.jsx`),
        context: { name: node.name, relativePath: node.relativePath },
      })
    }
  })
}
