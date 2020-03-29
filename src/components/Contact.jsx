import React from 'react'
import styled from 'styled-components'

// import Button from './common'
import { Input, Label } from './common/Form'
export default function Contact() {
  const handleContactSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div id="contact">
      <h1>Send me a message</h1>
      <form
        name="Contact"
        method="POST"
        action="/thanks/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        // onSubmit={handleContactSubmit}
      >
        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        <Input type="hidden" name="form-name" value="Contact" />
        <InputGroup>
          <FormInput>
            <Label htmlFor="name">Name</Label>
            <Input name="name" type="text" placeholder="Henry Cavill" id="name" />
          </FormInput>
          <FormInput>
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input name="phone" type="phone" placeholder="+1 (123) 1234567" id="phone" />
          </FormInput>
        </InputGroup>

        <InputGroup>
          <FormInput>
            <Label htmlFor="email">Email</Label>
            <Input name="email" type="email" placeholder="you@yourdomain.com" id="email" />
          </FormInput>
          <FormInput>
            <Label htmlFor="website">Website (optional)</Label>
            <Input name="website" type="text" placeholder="www.domain.com" id="website" />
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
