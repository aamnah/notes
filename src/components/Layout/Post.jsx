import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Helmet from 'react-helmet'

import './main.scss'
import './Post.scss'
import { Header, Footer, Navigation, SEO, SiteContainer, ContentContainer } from '../common'
// import { useStaticQuery } from 'gatsby'

// For pages, Gatsby is capable of handling queries with variables because of its awareness of page context. However, page queries can only be made in top-level page components.
// and you need to `export` this query
export const data = graphql`
  query PostQuery($id: String!) {
    site {
      siteMetadata {
        github_url
      }
    }
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        path
        date(formatString: "MMM DD, YYYY")
        description
        excerpt
        lastmod(formatString: "MMM DD, YYYY")
        title
      }
    }
  }
`

export default function PostLayout({ data, children }) {
  // const { title, body, date, description, excerpt, lastmod, path } = pageContext
  const { title, date, description, excerpt, lastmod, path } = data.mdx.frontmatter

  return (
    <SiteContainer>
      <SEO title={title} description={description ? description : excerpt} />

      <Navigation />

      <ContentContainer className="Post">
        <h1>{title}</h1>
        {description ? <h4>{description}</h4> : excerpt ? <h4>{excerpt}</h4> : null}
        <div className="Post-meta">
          <div>
            <a href="{`${data.site.siteMetadata.github_url}/blob/master/content/devops/dotnet_core_bitbucket_pipelines_aws_ebs.md`}">
              Edit on Github {path}
            </a>
          </div>
          <div>{path}devops/dotnet_core_bitbucket_pipelines_aws_ebs.md</div>
          {lastmod ? (
            <div className="Post-meta-date">Last updated: {lastmod}</div>
          ) : (
            <div className="Post-meta-date">{date}</div>
          )}
          <div className="Post-meta-section">
            <a href="/devops">DevOps</a>
          </div>
        </div>

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
