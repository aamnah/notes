import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { DefaultLayout } from '../components/Layout'
import { Head, Image, Link, SEO } from '../components/common'

export default function AboutPage() {
  // const data = useStaticQuery(graphql`
  //   query AboutQuery {

  //   }
  // `)
  return (
    <DefaultLayout>
      <Head />
      <SEO title="About" />

      <h3>Aamnah</h3>
      <ul>
        <li>works as a frontend developer</li>
        <li>has a degree in Journalism and Maths</li>
        <li>studied Media Studies at Kinnaird College</li>
        <li>can speak three languages</li>
        <li>enjoys writing bash scripts</li>
        <li>needs coffee</li>
        <li>loves steak</li>
        <li>owns a company</li>
        <li>plays the pink panther theme song on ukulele</li>
      </ul>

      <h3>Currently using</h3>
      <ul>
        <li>Computer: Custom built PC / Lenovo Thinkpad / Macbook Air</li>
        <li>Editor: Visual Studio Code</li>
        <li>Host: Netlify</li>
        <li>Site Generator: Gatsby / Hugo</li>
      </ul>

      {/* Add pictures of workspace */}
    </DefaultLayout>
  )
}
