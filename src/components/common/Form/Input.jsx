import React from 'react'

import './Input.scss'
export function Input({ type, placeholder }) {
  return <input type={type} placeholder={placeholder} className="Input" />
}
