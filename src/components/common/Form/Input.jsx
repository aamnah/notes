import React from 'react'

import './Input.scss'
export function Input({ type = 'text', placeholder = 'placeholder', className, ...rest }) {
  return <input type={type} placeholder={placeholder} className={`${className} Input`} value={value} {...rest} />
}
