import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { SiteContainer, Link } from '../components/common'
import { DefaultLayout } from '../components/Layout'
export default function NotesPage() {
  const data = useStaticQuery(graphql`
    query NotesQuery {
      allFile(filter: { sourceInstanceName: { eq: "notes" } }) {
        nodes {
          sourceInstanceName
          name
          childMdx {
            frontmatter {
              title
              path
            }
          }
        }
      }
    }
  `)

  return (
    <DefaultLayout>
      <SiteContainer>
        <h1>Notes</h1>
        <ul>
          {data.allFile.nodes.map((note) => {
            let { title, path } = note.childMdx.frontmatter
            return (
              <li>
                <Link to={path}>{title}</Link>
              </li>
            )
          })}
        </ul>
      </SiteContainer>
    </DefaultLayout>
  )
}
