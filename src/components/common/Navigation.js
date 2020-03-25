import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
export function Navigation() {
  return (
    <StyledNavigation>
      <NavigationItem to="#about">About</NavigationItem>

      <NavigationItem to="#work">Work</NavigationItem>

      <NavigationItem to="/blog">Blog</NavigationItem>

      <NavigationItem to="#testimonials">Testimonials</NavigationItem>

      <NavigationItem to="#contact">Contact</NavigationItem>
    </StyledNavigation>
  )
}

const StyledNavigation = styled.div`
  display: flex;
  padding: 1em;
  list-style: none;
`
const NavigationItem = styled(Link)`
  margin-right: 1em;
`
