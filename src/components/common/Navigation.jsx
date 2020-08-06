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
        <Link className="Navigation-item" to="/blog">
          Blog
        </Link>
        <Link className="Navigation-item" to="/contact">
          Contact
        </Link>
        <Link
          external
          className="Navigation-item"
          to="https://notes.aamnah.com"
        >
          Notes
        </Link>
      </div>
      <div className="Navigation-right">
        <Link
          external
          className="Navigation-item"
          to="https://www.behance.net/aamnah"
        >
          <Icon name="behance" />
        </Link>
        <Link
          external
          className="Navigation-item"
          to="https://www.instagram.com/aamnahakram/"
        >
          <Icon name="instagram" />
        </Link>
        <Link
          external
          className="Navigation-item"
          to="https://www.linkedin.com/in/aamnah/"
        >
          <Icon name="linkedin" />
        </Link>
        <Link
          external
          className="Navigation-item"
          to="https://github.com/aamnah"
        >
          <Icon name="github" />
        </Link>
      </div>
    </div>
  )
}
