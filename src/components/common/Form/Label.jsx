import React from 'react'

import './Label.scss'
export function Label({ children, htmlFor, className, ...rest }) {
  return (
    <label htmlFor={htmlFor} className={`${className} Label`} {...rest}>
      {children}
    </label>
  )
}
