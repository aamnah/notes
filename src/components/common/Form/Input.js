import React from 'react'
import styled from 'styled-components'

export function Input({ type, placeholder }) {
  return <StyledInput type={type} placeholder={placeholder} />
}

const StyledInput = styled.input`
  border-radius: 25p;
`
