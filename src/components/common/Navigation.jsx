import React from 'react'

import { Link } from './Link'
import './Navigation.scss'
export function Navigation() {
  return (
    <div className="Navigation">
      <Link className="Navigation-item" to="#about">
        About
      </Link>
      <Link className="Navigation-item" to="#work">
        Work
      </Link>
      <Link className="Navigation-item" to="/blog">
        Blog
      </Link>
      <Link className="Navigation-item" to="#testimonials">
        Testimonials
      </Link>
      <Link className="Navigation-item" to="#contact">
        Contact
      </Link>
      <Link external className="Navigation-item" to="https://tldrdevnotes.com">
        Notes
      </Link>
    </div>
  )
}
