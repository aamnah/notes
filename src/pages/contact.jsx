import React from 'react'

import Contact from 'components/Contact.jsx'

import { DefaultLayout } from 'components/Layout'
import { Head, Image, Link, SEO } from 'components/common'

export default function ContactPage() {
  return (
    <DefaultLayout>
      <SEO title="Contact Aamnah" />
      <Contact />
    </DefaultLayout>
  )
}
