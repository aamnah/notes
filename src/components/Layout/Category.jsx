import React from 'react'
import { graphql } from 'gatsby'

import './main.scss'
// import './Post.scss'
import { Header, Footer, Navigation, SEO, SiteContainer, ContentContainer } from '../common'
// import { useStaticQuery } from 'gatsby'

// For pages, Gatsby is capable of handling queries with variables because of its awareness of page context. However, page queries can only be made in top-level page components.
// and you need to `export` this query
// Keys in the context object that match up with arguments in the page query (in this case: "title"), will be used as variables. Variables are prefaced with $, so passing a title property will become $title in the query.
export const data = graphql`
  query CategoryQuery($relativePath: String!) {
    allFile(filter: { relativeDirectory: { eq: $relativePath } }) {
      edges {
        node {
          childMdx {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }
    }
  }
`
export default function CategoryLayout({ data, children, pageContext }) {
  return (
    <SiteContainer>
      <SEO title={pageContext.name} />

      <Navigation />

      <ContentContainer>
        <h1>{pageContext.name}</h1>
        <ul>
          {data.allFile.edges.map((post) => {
            const mdx = post.node.childMdx
            return (
              <li>
                <a href={mdx.fields.slug}>{mdx.frontmatter.title}</a>
              </li>
            )
          })}
        </ul>
      </ContentContainer>
      <Footer />
    </SiteContainer>
  )
}
