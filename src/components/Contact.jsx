import React, { useState } from 'react'
import styled from 'styled-components'

import { Breakpoint } from 'Theme'
import { Button, Icon, Link } from './common'
import { Input, Label } from './common/Form'
export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  const handleContactSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div id="contact">
      <h1>Contact</h1>
      <Social>
        <Link external className="Social-link" to="https://www.behance.net/aamnah">
          <Icon name="behance" />
        </Link>
        <Link external className="Social-link" to="https://www.instagram.com/aamnahakram/">
          <Icon name="instagram" />
        </Link>
        <Link external className="Social-link" to="https://www.linkedin.com/in/aamnah/">
          <Icon name="linkedin" />
        </Link>
        <Link external className="Social-link" to="https://github.com/aamnah">
          <Icon name="github" />
        </Link>
      </Social>
      <p>Use the form below to send me a message..</p>
      <Form
        name="Contact-form"
        method="POST"
        // action="/thanks/" // this will be our custom Thank You page
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        // onSubmit={handleContactSubmit}
      >
        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        <Input type="hidden" name="form-name" value="Contact-form" />
        <InputGroup>
          <FormInput>
            <Label htmlFor="name">Name</Label>
            <Input name="name" type="text" placeholder="Henry Cavill" id="name" />
          </FormInput>
          <FormInput>
            <Label htmlFor="email">Email</Label>
            <Input name="email" type="email" placeholder="henry@cavill.com" id="email" />
          </FormInput>
        </InputGroup>

        <InputGroup>
          <FormInput>
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input name="phone" type="phone" placeholder="+1 (123) 1234567" id="phone" />
          </FormInput>
          <FormInput>
            <Label htmlFor="website">Website (optional)</Label>
            <Input name="website" type="text" placeholder="www.cavill.com" id="website" />
          </FormInput>
        </InputGroup>

        <InputGroup>
          <FormInput>
            <Label htmlFor="message">Message</Label>
            <Textarea
              name="message"
              placeholder="say what you mean, mean what you say"
              className="Input"
              id="message"
            />
          </FormInput>
        </InputGroup>

        <Button type="submit" className="Button" icon="plane">
          Send Message
        </Button>
      </Form>
    </div>
  )
}

const Form = styled.form`
  max-width: 40rem;
`

const FormInput = styled.div`
  display: inline-block;
  width: 100%;
  margin-right: 2em;
  margin-bottom: 0.6em;
`

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: stretch;
  flex-direction: column;

  @media screen and ${Breakpoint.tablet} {
    flex-direction: row;
  }
`

const Textarea = styled.textarea`
  min-height: 10rem;
`
const Social = styled.div`
  margin-bottom: 1em;
  display: flex;

  .Social-link {
    padding: 0 1em;
  }
`
