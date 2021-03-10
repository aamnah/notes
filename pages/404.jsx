import React from 'react'

import { DefaultLayout } from 'components/Layout'
import { SEO, Head } from 'components/common'

export default function NotFoundPage() {
  return (
    <DefaultLayout>
      <Head />
      <SEO title="404: Not found" />
      <h1>
        404
        <br />
        Couldn't find what you were looking for?
      </h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness. </p>
      <ul>
        <li>Maybe the page has moved</li>
        <li>There could be a typo in the URL</li>
        <li>The page didn't exist to begin with</li>
        <li>Dog ate it</li>
      </ul>
      <h3>Search me maybe?</h3>
      <input type="text" placeholder="enter text here " />

      <h3>Here are the latest notes:</h3>
      <li>Setting up a contact form on Gatsby using Netlify Forms</li>
      <li>Creating WordPress shortcodes</li>
      <li>Show a country selection popup and save choice in Cookie</li>
      <li>Setting up a WordPress Multisite Network in Subfolders</li>
      <li>14 days of DevOps</li>

      <h3>Here are the most popular tags:</h3>
      <ul>
        <li>linux (20 posts) </li>
        <li>es2015 (11 posts) </li>
        <li>mysql (11 posts) </li>
        <li>bash (10 posts) </li>
        <li>how-to (10 posts) </li>
      </ul>
    </DefaultLayout>
  )
}
