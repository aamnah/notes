import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { DefaultLayout } from 'components/Layout'
import { Link, SEO, Head } from 'components/common'

export default function NotesPage() {
  const data = useStaticQuery(graphql`
    query NotesQuery {
      allMdx(sort: { order: DESC, fields: frontmatter___date }) {
        # get reverse chronologoical order, i.e. lastmod on top
        edges {
          node {
            id
            excerpt
            frontmatter {
              title
              date(formatString: "YYYY, MMM DD") # 2020, May 03
              status
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
      <SEO title="Notes" />

      <h1>Notes</h1>
      <p>
        Here is my dev notebook and braindump. Use the `Ctrl/Cmd + F` to find what you are looking for. <br />
      </p>
      <List>
        {data.allMdx.edges.map((post) => {
          let { title, date, status } = post.node.frontmatter
          let { slug } = post.node.fields

          {
            /* let { title, path, date } = post.childMdx.frontmatter */
          }
          {
            /* let { id, name } = post */
          }
          return (
            <ListItem key={post.node.id}>
              {status === 'draft' ? (
                <span>
                  DRAFT <Link to={slug}>{title !== '' ? title : slug}</Link>
                </span>
              ) : (
                <Link to={slug}>{title !== '' ? title : slug}</Link>
              )}
              {/* <small style={{ color: 'var(--color-faded)', whiteSpace: 'nowrap' }}>{date}</small>{' '} */}
            </ListItem>
          )
        })}
      </List>
    </DefaultLayout>
  )
}

const List = styled.ul`
  ${'' /* margin-left: 0; */}
`

const ListItem = styled.li`
  ${'' /* display: flex; */}
`
