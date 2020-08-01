import React from 'react'

import './Button.scss'
import { Icon } from './Icon'
export function Button({ type, icon, children, ...rest }) {
  return (
    <button type={type ? type : 'submit'} className="Button" {...rest}>
      {icon ? <Icon name={icon} fill="white" className="Button-icon" /> : null}
      {children}
    </button>
  )
}
