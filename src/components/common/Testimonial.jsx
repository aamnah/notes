import React from 'react'
import styled from 'styled-components'

export function Testimonial() {
  return (
    <Container>
      <Quote>
        Aamnah is a great person to work with as she is able to manage her own
        time and continuously contribute to the organization. She is creative
        and a thought leader in the internet industry.
      </Quote>
      <Cite>
        <Author>Amir Anzur</Author>
        <Position>
          Director of Digital Innovation, <br /> HM Revenue & Customs
        </Position>
      </Cite>
    </Container>
  )
}

const Container = styled.div`
  padding: 1em;
  background: white;
  border-radius: 8px;
`
const Cite = styled.p`
  line-height: 1.2;
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
