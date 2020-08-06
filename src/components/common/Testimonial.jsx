import React from 'react'
import styled from 'styled-components'

export function Testimonial({ quote, author, position, company }) {
  return (
    <Container>
      <Quote>{quote}</Quote>
      <Cite>
        <Author>{author}</Author>
        {position ? <Position>{position}</Position> : null}
        {company ? (
          <Company>
            , <br />
            {company}
          </Company>
        ) : null}
      </Cite>
    </Container>
  )
}

const Container = styled.div`
  padding: 1.6rem;
  background: white;
  border-radius: 8px;
  margin-bottom: 1.6rem;
`
const Cite = styled.p`
  line-height: 1.2;
  color: var(--color-faded);
`
const Quote = styled.p``
const Author = styled.span`
  color: var(--color-primary);
  display: block;
`
const Position = styled.span`
  font-size: 0.8em;
  color: var(--color-faded);
`
const Company = styled.span`
  font-size: 0.8em;
`
