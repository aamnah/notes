import React from 'react'
import { Helmet } from 'react-helmet'

export function Head() {
  return (
    <Helmet>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#13B2A9" />
      <meta name="msapplication-TileColor" content="#13B2A9" />
    </Helmet>
  )
}
