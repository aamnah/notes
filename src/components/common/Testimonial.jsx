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

  box-shadow: 0 12px 16px rgba(55, 178, 168, 0.05);
  border: #eee;
  border-radius: 25px;
  border-top-left-radius: 0;
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
