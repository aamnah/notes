import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/common/SEO'

export default function BlogPage() {
  const data = useStaticQuery(graphql`
    query BlogQuery {
      allFile(filter: { sourceInstanceName: { eq: "posts" } }) {
        nodes {
          id
          childMdx {
            frontmatter {
              title
              path # the URL path
              description
              date
            }
          }
          name # filename
          base # filename.ext
          absolutePath # the file path
          dir # absolutePath minus base
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Blog" />

      <h1>Recent Posts</h1>
      <ul>
        {data.allFile.nodes.map(post => {
          let { title, path, description, date } = post.childMdx.frontmatter
          return path ? (
            <li key={post.id}>
              <a href={path}>{title !== '' ? title : post.name}</a>
            </li>
          ) : (
            <li key={post.id}>{title !== '' ? title : post.name}</li>
          )
        })}
      </ul>
    </Layout>
  )
}
