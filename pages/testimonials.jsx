import React from 'react'

import { DefaultLayout } from 'components/Layout'
import { Head, Image, Link, SEO, Tag, Pullquote } from 'components/common'
import { data } from 'data'
import { Testimonial } from 'components/common'

export default function TestimonialsPage({ testimonials = data.testimonials }) {
  return (
    <DefaultLayout>
      <Head />
      <SEO title="Testimonials" />

      <h1>What they say..</h1>

      {testimonials.map((item) => {
        const { quote, author, position, company } = item
        return (
          <Testimonial
            quote={quote}
            author={author}
            position={position}
            company={company}
          />
        )
      })}
    </DefaultLayout>
  )
}
