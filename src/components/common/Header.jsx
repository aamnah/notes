import { Link, useStaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import './Header.scss'
export function Header({ siteTitle }) {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  let headerTitle = siteTitle ? siteTitle : data.site.siteMetadata.title

  return (
    <div className="Header">
      <h1 style={{ margin: 0 }}>
        <Link to="/" className="Header-title">
          {headerTitle}
        </Link>
      </h1>
    </div>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}
