import React from 'react'

export function ContentContainer({ children, ...rest }) {
  return <main {...rest}>{children}</main>
}
