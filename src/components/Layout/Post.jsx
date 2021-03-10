import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import './main.scss'
import './Post.scss'
import { Header, Footer, Navigation, SEO, SiteContainer, ContentContainer, Icon } from '../common'
// import { useStaticQuery } from 'gatsby'

// For pages, Gatsby is capable of handling queries with variables because of its awareness of page context. However, page queries can only be made in top-level page components.
// and you need to `export` this query
// Keys in the context object that match up with arguments in the page query (in this case: "title"), will be used as variables. Variables are prefaced with $, so passing a title property will become $title in the query.
export const data = graphql`
  query PostQuery($absolutePath: String!) {
    site {
      siteMetadata {
        post_edit_url
      }
    }
    mdx(fileAbsolutePath: { eq: $absolutePath }) {
      body
      frontmatter {
        title
        status
        path
        slug
        date(formatString: "MMM DD, YYYY")
        description
        excerpt
        lastmod(formatString: "MMM DD, YYYY")
      }
    }
    file(absolutePath: { eq: $absolutePath }) {
      relativePath
      relativeDirectory
    }
  }
`

export default function PostLayout({ data, children }) {
  // const { title, body, date, description, excerpt, lastmod, path } = pageContext
  const { title, date, description, excerpt, lastmod, status } = data.mdx.frontmatter
  const { relativePath, relativeDirectory } = data.file

  return (
    <SiteContainer>
      <SEO title={title} description={description ? description : excerpt} />

      <Navigation />

      <ContentContainer className="Post">
        <h1>{title}</h1>
        <div className="Post-meta">
          <div>
            <a href={`${data.site.siteMetadata.post_edit_url}/${relativePath}`}>
              <Icon name="github" size={16} className="Post-meta-icon" />
              Edit on Github
            </a>
            <br />
            <span>
              <Icon name="terminal" size={16} className="Post-meta-icon" />
              {relativePath}
            </span>
            <br />
            <span>
              <a href={`/${relativeDirectory}`}>
                <Icon name="folder" size={16} className="Post-meta-icon" />
                {relativeDirectory}
              </a>
            </span>
          </div>
          {lastmod ? (
            <div className="Post-meta-date">
              <Icon name="history" size={16} className="Post-meta-icon" />
              Last updated: {lastmod}
            </div>
          ) : (
            <div className="Post-meta-date">
              <Icon name="history" size={16} className="Post-meta-icon" />
              {date}
            </div>
          )}
          {status === 'draft' ? (
            <div className="Post-meta-status">
              <Icon name="bulb" size={16} className="Post-meta-icon" />
              DRAFT
            </div>
          ) : null}
        </div>
        {description ? <h4>{description}</h4> : excerpt ? <h4>{excerpt}</h4> : null}

        <MDXRenderer>{data.mdx.body}</MDXRenderer>
        {children}
      </ContentContainer>
      <Footer />
    </SiteContainer>
  )
}

PostLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
