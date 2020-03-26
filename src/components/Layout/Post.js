/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Header from '../Header'
import Post, { Footer, Navigation } from '../common'
import './layout.scss'
import SEO from '../common/SEO'

export default function PostsLayout({ pageContext, children }) {
  const { title, body } = pageContext
  return (
    <>
      <SEO title={title} />
      <Header />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <Navigation />
        <h1>{title}</h1>

        <main>
          <MDXRenderer>{body}</MDXRenderer>
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}

PostsLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
