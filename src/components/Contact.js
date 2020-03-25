import React from 'react'
import styled from 'styled-components'

import Button from './common/Button'
import Input from './common/Form/Input'
export function Contact() {
  return (
    <div id="contact">
      <h1>Contact</h1>
      <form>
        <InputGroup>
          <FormInput>
            <InputLabel htmlFor="name">Name</InputLabel>
            <input type="text" placeholder="Henry Cavill" />
          </FormInput>
          <FormInput>
            <InputLabel htmlFor="phone">Phone (optional)</InputLabel>
            <input type="text" placeholder="+1 (123) 1234567" />
          </FormInput>
        </InputGroup>
        <InputGroup>
          <FormInput>
            <InputLabel htmlFor="email">Email</InputLabel>
            <input type="text" placeholder="you@yourdomain.com" />
          </FormInput>
          <FormInput>
            <InputLabel htmlFor="website">Website (optional)</InputLabel>
            <input type="text" placeholder="www.domain.com" />
          </FormInput>
        </InputGroup>

        <InputGroup>
          <FormInput>
            <InputLabel htmlFor="message">Message</InputLabel>
            <textarea placeholder="say something pleasant" />
          </FormInput>
        </InputGroup>

        <input type="submit" value="Send" />
        {/* <Button>Send</Button> */}
      </form>
    </div>
  )
}

const FormInput = styled.div`
  ${'' /* background: salmon; */}
  margin-bottom: 1em;
  margin-right: 1em;
  display: inline-block;
`

const InputGroup = styled.div`
  ${'' /* background: goldenrod; */}
`

const InputLabel = styled.label`
  display: block;
`
