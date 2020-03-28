import React from 'react'
import styled from 'styled-components'

// import Button from './common'
import { Input, Label } from './common/Form'
export default function Contact() {
  return (
    <div id="contact">
      <h1>Send me a message</h1>
      <form name="Aamnah.com Contact" method="POST" netlify data-netlify="true">
        <input type="hidden" name="form-name" value="Aamnah.com Contact" />
        <InputGroup>
          <FormInput>
            <Label htmlFor="name">Name</Label>
            <Input type="text" placeholder="Henry Cavill" name="name" id="name" />
          </FormInput>
          <FormInput>
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input type="phone" placeholder="+1 (123) 1234567" name="phone" id="phone" />
          </FormInput>
        </InputGroup>

        <InputGroup>
          <FormInput>
            <Label htmlFor="email">Email</Label>
            <Input type="email" placeholder="you@yourdomain.com" name="email" id="email" />
          </FormInput>
          <FormInput>
            <Label htmlFor="website">Website (optional)</Label>
            <Input type="text" placeholder="www.domain.com" name="website" id="website" />
          </FormInput>
        </InputGroup>

        <InputGroup>
          <FormInput>
            <Label htmlFor="message">Message</Label>
            <textarea placeholder="say something pleasant" className="Input" name="message" id="message" />
          </FormInput>
        </InputGroup>

        <button type="submit" className="Button">
          Send Message
        </button>
        {/* <Button>Send</Button> */}
      </form>
    </div>
  )
}

const FormInput = styled.div`
  display: inline-block;
`

const InputGroup = styled.div`
  ${'' /* background: goldenrod; */}
`
