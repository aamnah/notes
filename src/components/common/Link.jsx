import React from 'react'
import { Link as GatsbyLink } from 'gatsby'

import './Link.scss'
/**
Custom link component that handles both internal and external links

internal links are handled with Link from Gtasby (Reach Router)
external links are HTML <a> tags
which link the component returns depends on the `external: boolean` prop being present 

https://www.gatsbyjs.org/docs/gatsby-link/
*/

export function Link({ to, children, external, target = '_blank', className }) {
  if (external) {
    return (
      <a href={to} target={target} rel="noopener noreferrer" className={`${className} Link Link-external`}>
        {children}
      </a>
    )
  }
  return (
    <GatsbyLink to={to} className={`${className} Link Link-internal`} activeClassName="Link-active">
      {children}
    </GatsbyLink>
  )
}
