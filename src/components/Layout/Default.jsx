import React from 'react'
import PropTypes from 'prop-types'
// import { useStaticQuery, graphql } from 'gatsby'

import './main.scss'
import { Footer, Navigation, SiteContainer, ContentContainer } from '../common'

export default function DefaultLayout({ children }) {
  // const data = useStaticQuery(graphql`
  //   query PageQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)

  return (
    <SiteContainer>
      <Navigation />
      <ContentContainer>{children}</ContentContainer>
      <Footer />
    </SiteContainer>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
