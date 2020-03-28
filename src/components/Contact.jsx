import React from 'react'
import styled from 'styled-components'

// import Button from './common'
import { Input, Label } from './common/Form'
export default function Contact() {
  return (
    <div id="contact">
      <h1>Send me a message</h1>
      <form name="Contact" method="POST" data-netlify-honeypot="bot-field" data-netlify="true">
        <input type="hidden" name="form-name" value="Aamnah.com Contact" />
        <InputGroup>
          <FormInput>
            <Label htmlFor="name">Name</Label>
            <input name="name" type="text" placeholder="Henry Cavill" id="name" />
          </FormInput>
          <FormInput>
            <Label htmlFor="phone">Phone (optional)</Label>
            <input name="phone" type="phone" placeholder="+1 (123) 1234567" id="phone" />
          </FormInput>
        </InputGroup>

        <InputGroup>
          <FormInput>
            <Label htmlFor="email">Email</Label>
            <input name="email" type="email" placeholder="you@yourdomain.com" id="email" />
          </FormInput>
          <FormInput>
            <Label htmlFor="website">Website (optional)</Label>
            <input name="website" type="text" placeholder="www.domain.com" id="website" />
          </FormInput>
        </InputGroup>

        <InputGroup>
          <FormInput>
            <Label htmlFor="message">Message</Label>
            <textarea name="message" placeholder="say something pleasant" className="Input" id="message" />
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
