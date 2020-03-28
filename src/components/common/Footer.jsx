import React from 'react'

import './Footer.scss'
import { Link } from './Link'
export function Footer() {
  return (
    <footer className="Footer">
      {' '}
      <p>
        Please note that this site and the posts on it are, and will always be, a work in progress. If i waited for
        perfection, i’d never get anything done.{' '}
      </p>
      <small>
        Coded with love and built using{' '}
        <Link external to="https://www.gatsbyjs.org">
          Gatsby
        </Link>
      </small>
    </footer>
  )
}
