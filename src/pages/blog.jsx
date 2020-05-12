import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { DefaultLayout } from '../components/Layout'
import { Link, SEO } from '../components/common'

export default function BlogPage() {
  const data = useStaticQuery(graphql`
    query BlogQuery {
      allFile(
        filter: { sourceInstanceName: { eq: "blog" } }
        sort: { order: DESC, fields: childMdx___frontmatter___date }
      ) {
        nodes {
          id
          name # filename
          base # filename.ext
          absolutePath # the file path
          dir # absolutePath minus base
          childMdx {
            frontmatter {
              title
              path # the URL path
              # description
              date(formatString: "YYYY, MMM DD") # 2020, May 03
            }
          }
        }
      }
    }
  `)

  return (
    <DefaultLayout>
      <SEO title="Blog" />

      <h1>Recent Posts</h1>
      <ul>
        {data.allFile.nodes.map((post) => {
          let { title, path, date } = post.childMdx.frontmatter
          let { id, name } = post
          return path ? (
            <li key={id}>
              <small>{date}</small> <Link to={path}>{title !== '' ? title : name}</Link>
            </li>
          ) : (
            <li key={id}>
              <small>{date}</small> {title !== '' ? title : name}
            </li>
          )
        })}
      </ul>
    </DefaultLayout>
  )
}
