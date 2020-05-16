import React from 'react'

import { DefaultLayout } from '../components/Layout'
import { SEO, Head } from '../components/common'

export default function NotFoundPage() {
  return (
    <DefaultLayout>
      <Head />

      <SEO title="404: Not found" />
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </DefaultLayout>
  )
}
