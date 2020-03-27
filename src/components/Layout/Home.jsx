/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
// import { useStaticQuery, graphql } from 'gatsby'

import './main.scss'
import { Header, Footer, Navigation } from '../common'

export function HomeLayout({ children }) {
  return (
    <>
      <Header />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <Navigation />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}

HomeLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
