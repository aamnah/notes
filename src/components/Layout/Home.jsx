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
import { Header, Footer, Navigation, SiteContainer, ContentContainer } from '../common'

export default function HomeLayout({ children }) {
  return (
    <SiteContainer>
      {/* <Header /> */}
      <Navigation />
      <ContentContainer>{children}</ContentContainer>
      <Footer />
    </SiteContainer>
  )
}

HomeLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
