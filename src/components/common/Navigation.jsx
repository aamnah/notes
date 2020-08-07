import React from 'react'

import { Link } from './Link'
import './Navigation.scss'
import { Icon } from './Icon'
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
        <Link className="Navigation-item" to="/testimonials">
          Testimonials
        </Link>
        <Link className="Navigation-item" to="/notes">
          Notes
        </Link>
        <Link className="Navigation-item" to="/contact">
          Contact
        </Link>
        <Link external className="Navigation-item" to="https://notes.aamnah.com">
          Archive
        </Link>
      </div>
    </div>
  )
}
