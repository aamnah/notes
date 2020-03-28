import React from 'react'

import './Footer.scss'
import { Link } from './Link'
export function Footer() {
  return (
    <footer className="Footer">
      Coded with love and built using{' '}
      <Link external to="https://www.gatsbyjs.org">
        Gatsby
      </Link>
    </footer>
  )
}
