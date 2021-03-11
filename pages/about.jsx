import React from 'react'

import { DefaultLayout } from 'components/Layout'
import { Head, Link, SEO, Tag, Pullquote } from 'components/common'

import workspace_1 from '../images/aamnah_workspace_1.jpg'
import workspace_2 from '../images/aamnah_workspace_2.jpg'
export default function AboutPage() {
  return (
    <DefaultLayout>
      <Head />
      <SEO title="About" />
      <section>
        <h1>Aamnah</h1>
        <ul>
          <li>works as a frontend developer</li>
          <li>has a degree in Journalism and Maths</li>
          <li>studied Mass Communication at Kinnaird College</li>
          <li>fluently speaks three languages</li>
          <li>enjoys writing bash scripts</li>
          <li>
            balances between work, home and <em>dolce far niente</em>
          </li>
          <li>needs coffee</li>
          <li>loves a juicy medium-well steak</li>
          <li>owns a company</li>
          <li>plays the pink panther theme song on ukulele</li>
        </ul>
        <Pullquote>
          Out of all the things that i do, i particularly enjoy writing Sass stylesheets, designing UI mockups and
          writing bash scripts.
        </Pullquote>
      </section>
      <section>
        <img src={workspace_1} />
      </section>
      <section>
        <h3>Current setup</h3>
        <ul>
          <li>
            Computer
            <ul>
              <li>Custom built PC</li>
              <li>Lenovo Thinkpad</li>
              <li>Macbook Air</li>
            </ul>
          </li>
          <li>
            Keyboard
            <ul>
              <li>The GMMK TKL (Gateron Brown switches)</li>
              <li>Logitech G512 Carbon (Romer-G Linear switches)</li>
            </ul>
          </li>
          <li>Editor: Visual Studio Code</li>
          <li>Host: Netlify</li>
          <li>Site Generator: Gatsby / Hugo</li>
        </ul>
      </section>

      {/* Add pictures of workspace */}

      <section>
        <img src={workspace_2} />
      </section>
      <section>
        <h3>Current job: Frontend Developer</h3>
        <p>
          <Tag>reactjs</Tag> <Tag>react-native</Tag> <Tag>redux</Tag> <Tag>typescript</Tag> <Tag>styled-components</Tag>
        </p>
        <p>
          I am the project manager / UI UX person / frontend developer who also sets up CI/CD build pipelines and
          manages Linux servers now and then.
        </p>
        <p>
          My main role is frontend development. I am contributing to two legacy applications, one made with ASP.NET MVC
          5 and the other made with Durandal and Knockout.js. Then i'm working on the upcoming version of the
          application that's being built with React Native and Typescript.
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
          everyone is productive. This includes creating and tracking tasks, provide access/information where needed,
          and hosting standups.
        </p>
        <nav>
          <Link external href="https://stackoverflow.com/users/story/890814">
            Stackoverflow
          </Link>
        </nav>
      </section>
    </DefaultLayout>
  )
}