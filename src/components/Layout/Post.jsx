import React from 'react'
import PropTypes from 'prop-types'
// import { useStaticQuery, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import './main.scss'
import './Post.scss'
import { Header, Footer, Navigation, SEO, SiteContainer, ContentContainer } from '../common'

export default function PostLayout({ pageContext, children }) {
  const { title, body, date, description, excerpt, lastmod } = pageContext

  return (
    <SiteContainer>
      <SEO title={title} />

      <Navigation />

      <ContentContainer className="Post">
        <h1>{title}</h1>
        <h4> {description ? description : excerpt}</h4>
        <div className="Post-meta">
          {lastmod ? (
            <div className="Post-meta-date">Last updated: {lastmod}</div>
          ) : (
            <div className="Post-meta-date">{date}</div>
          )}
        </div>
        <MDXRenderer>{body}</MDXRenderer>
        {children}
      </ContentContainer>
      <Footer />
    </SiteContainer>
  )
}

PostLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
