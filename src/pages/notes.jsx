import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { SiteContainer, Link, Head } from '../components/common'
import { DefaultLayout } from '../components/Layout'
// import { RecentPosts } from '../components/common/Recent'
export default function NotesPage() {
  const data = useStaticQuery(graphql`
    query NotesQuery {
      allFile(
        filter: { sourceInstanceName: { eq: "notes" } }
        sort: { order: DESC, fields: childMdx___frontmatter___date }
      ) {
        nodes {
          id
          childMdx {
            frontmatter {
              title
              path # the URL path
              description
              date(formatString: "YYYY, MMM DD")
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
      <Head />
      <SiteContainer>
        <h1>Notes</h1>
        <ul>
          {data.allFile.nodes.map((note) => {
            let { title, path, date } = note.childMdx.frontmatter
            return (
              <li>
                <small>{date}</small>
                <Link to={path}> {title}</Link>
              </li>
            )
          })}
        </ul>

        {/* <RecentPosts title="Recent dev notes" folder="notes" /> */}
      </SiteContainer>
    </DefaultLayout>
  )
}
