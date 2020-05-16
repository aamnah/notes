const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

// `onCreateNode` is a Gatsby lifecycle method that gets called whenever a new node is created. In this case only MDX nodes are touched.
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  // you only want to operate on `Mdx` nodes. If you had content from a
  // remote CMS you could also check to see if the parent node was a
  // `File` node here
  if (node.internal.type === 'Mdx') {
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

  // Create blog post pages.
  const posts = result.data.allMdx.edges

  posts.forEach(({ node }, index) => {
    createPage({
      path: node.fields.slug, // This is the slug you created before
      // This component will wrap our MDX content
      component: path.resolve(`./src/components/Layout/Post.jsx`),
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id },
    })
  })
}
