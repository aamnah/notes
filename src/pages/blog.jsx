import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { DefaultLayout } from '../components/Layout'
import { Link, SEO } from '../components/common'

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
    <DefaultLayout>
      <SEO title="Blog" />

      <h1>Recent Posts</h1>
      <ul>
        {data.allFile.nodes.map(post => {
          let { title, path, description, date } = post.childMdx.frontmatter
          return path ? (
            <li key={post.id}>
              <Link to={path}>{title !== '' ? title : post.name}</Link>
            </li>
          ) : (
            <li key={post.id}>{title !== '' ? title : post.name}</li>
          )
        })}
      </ul>
    </DefaultLayout>
  )
}
