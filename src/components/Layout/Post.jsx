import React from 'react'
import PropTypes from 'prop-types'
// import { useStaticQuery, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import './main.scss'
import { Header, Footer, Navigation, SEO, SiteContainer, ContentContainer } from '../common'

export default function PostLayout({ pageContext, children }) {
  const { title, body } = pageContext

  return (
    <SiteContainer>
      <SEO title={title} />
      {/* <Header /> */}

      <Navigation />

      <ContentContainer>
        <h1>{title}</h1>
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
