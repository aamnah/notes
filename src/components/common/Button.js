import React from 'react'
import styled from 'styled-components'

export function Button({ children }) {
  return <StyledButton>{children}</StyledButton>
}

const StyledButton = styled.button`
  padding: 1em 2em;
`
