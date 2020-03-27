import React from 'react'

import { DefaultLayout } from '../components/Layout'
import { SEO } from '../components/common/SEO'

export default function NotFoundPage() {
  return (
    <DefaultLayout>
      <SEO title="404: Not found" />
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </DefaultLayout>
  )
}
