import React from 'react'

import './Label.scss'
export function Label({ children, className, ...rest }) {
  return (
    <label className={`${className} Label`} {...rest}>
      {children}
    </label>
  )
}
