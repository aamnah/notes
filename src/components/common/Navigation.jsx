import React from 'react'

import { Link } from './Link'
import './Navigation.scss'
export function Navigation() {
  return (
    <div className="Navigation">
      <div className="Navigation-left">
        <Link className="Navigation-item" to="/">
          Home
        </Link>
        <Link className="Navigation-item" to="/about">
          About
        </Link>
        <Link className="Navigation-item" to="/#contact">
          Contact
        </Link>
        <Link className="Navigation-item" to="/blog">
          Blog
        </Link>
        {/* <Link className="Navigation-item" to="/notes">
        Notes
      </Link> */}
        <Link external className="Navigation-item" to="https://notes.aamnah.com">
          Notes
        </Link>
      </div>
      <div className="Navigation-right">
        <Link external className="Navigation-item" to="https://www.behance.net/aamnah">
          Behance
        </Link>
        <Link external className="Navigation-item" to="https://www.instagram.com/aamnahakram/">
          Instagram
        </Link>
        <Link external className="Navigation-item" to="https://github.com/aamnah">
          Github
        </Link>
      </div>
    </div>
  )
}
