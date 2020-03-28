import React from 'react'
import styled from 'styled-components'

// import Button from './common'
import { Input } from './common/Form'
export default function Contact() {
  return (
    <div id="contact">
      <h1>Send me a message</h1>
      <form name="Aamnah.com Contact" method="POST" data-netlify="true">
        <InputGroup>
          <FormInput>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input type="text" placeholder="Henry Cavill" name="name" id="name" />
          </FormInput>
          <FormInput>
            <InputLabel htmlFor="phone">Phone (optional)</InputLabel>
            <Input type="text" placeholder="+1 (123) 1234567" name="phone" id="phone" />
          </FormInput>
        </InputGroup>
        <InputGroup>
          <FormInput>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input type="text" placeholder="you@yourdomain.com" id="email" />
          </FormInput>
          <FormInput>
            <InputLabel htmlFor="website">Website (optional)</InputLabel>
            <Input type="text" placeholder="www.domain.com" id="website" />
          </FormInput>
        </InputGroup>

        <InputGroup>
          <FormInput>
            <InputLabel htmlFor="message">Message</InputLabel>
            <textarea placeholder="say something pleasant" className="Input" id="message" />
          </FormInput>
        </InputGroup>

        <button type="submit" className="Button">
          Submit
        </button>
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
