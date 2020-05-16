import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { DefaultLayout } from '../components/Layout'
import { Link, SEO, Head } from '../components/common'

export default function BlogPage() {
  const data = useStaticQuery(graphql`
    query BlogQuery {
      allMdx(sort: { order: DESC, fields: frontmatter___date }) {
        # get reverse chronologoical order, i.e. lastmod on top
        edges {
          node {
            id
            excerpt
            frontmatter {
              title
              date(formatString: "YYYY, MMM DD") # 2020, May 03
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  return (
    <DefaultLayout>
      <Head />
      <SEO title="Blog" />

      <h1>Blog</h1>
      <ul>
        {data.allMdx.edges.map((post) => {
          let { title, date } = post.node.frontmatter
          let { slug } = post.node.fields

          {
            /* let { title, path, date } = post.childMdx.frontmatter */
          }
          {
            /* let { id, name } = post */
          }
          return (
            <li key={post.node.id}>
              <small>{date}</small> <Link to={slug}>{title !== '' ? title : slug}</Link>
            </li>
          )
        })}
      </ul>
    </DefaultLayout>
  )
}
