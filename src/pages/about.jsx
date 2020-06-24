import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { DefaultLayout } from '../components/Layout'
import { Head, Image, Link, SEO, Tag, Pullquote } from '../components/common'

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
        <li>is fluent in three languages</li>
        <li>enjoys writing bash scripts</li>
        <li>needs coffee</li>
        <li>loves steak</li>
        <li>owns a company</li>
        <li>plays the pink panther theme song on ukulele</li>
      </ul>
      <Pullquote>
        Out of all the things that i do, i particularly enjoy writing Sass stylesheets, designing UI mockups and writing
        bash scripts.
      </Pullquote>
      <h3>Current setup</h3>
      <ul>
        <li>Computer: Custom built PC / Lenovo Thinkpad / Macbook Air</li>
        <li>Editor: Visual Studio Code</li>
        <li>Host: Netlify</li>
        <li>Site Generator: Gatsby / Hugo</li>
      </ul>

      {/* Add pictures of workspace */}
      <h3>Current job: Frontend Developer</h3>
      <p>
        <Tag>reactjs</Tag> <Tag>react-native</Tag> <Tag>react-redux</Tag> <Tag>typescript</Tag>
      </p>
      <p>
        I am the project manager / UI UX person / frontend developer who also sets up CI/CD build pipelines and manages
        Linux servers now and then.
      </p>
      <p>
        My main role is frontend development. I am contributing to two legacy applications, one made with ASP.NET MVC 5
        and the other made with Durandal and Knockout.js. Then i'm working on the upcoming version of the application
        that's being built with React Native and Typescript.
      </p>

      <p>
        I also work on the UI of said application, to the extent where i have designed 20+ screens of the initial
        release and have built a design prototype for the rest of the frontend team to take lead from.
      </p>

      <p>
        The CI/CD for the React Native project was also setup by me, using Bitbucket Pipelines. It takes the project,
        builds it, sends it to the app stores and so on.
      </p>

      <p>
        On occasion i use the command line to manage Linux servers for WordPress websites using the LAMP stack. This
        includes installing packages, setting up Apache server, setting up virtual hosts, install SSLs, creating user
        accounts and changing file and folder permissions.
      </p>

      <p>
        To top it all off, i also oversee management of the various projects the team is working on to make sure
        everyone is productive. This includes creating and tracking tasks, provide access/information where needed, and
        hosting standups.
      </p>

      <nav>
        <a href="https://stackoverflow.com/users/story/890814">Stackoverflow</a>
      </nav>
    </DefaultLayout>
  )
}
