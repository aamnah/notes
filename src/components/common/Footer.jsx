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
      <div className="Footer-bottom">
        <small>
          Powered by{' '}
          <Link external to="https://www.gatsbyjs.org">
            Gatsby
          </Link>{' '}
          and{' '}
          <Link external to="https://www.netlify.com/">
            Netlify
          </Link>{' '}
          and magic!
        </small>

        <Link to="/rss.xml">RSS</Link>
      </div>
    </footer>
  )
}
