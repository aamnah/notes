import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { DefaultLayout } from 'components/Layout'
import { Head, Image, Link, SEO, Icon } from 'components/common'
import Contact from 'components/Contact.jsx'
import Portfolio from 'components/Portfolio'

export default function IndexPage() {
  const data = useStaticQuery(graphql`
    query IndexQuery {
      allMdx(sort: { order: DESC, fields: frontmatter___date }, limit: 7) {
        # get reverse chronologoical order, i.e. lastmod on top
        edges {
          node {
            id
            excerpt
            frontmatter {
              title
              path
              date
              status
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  return (
    <DefaultLayout>
      <Head />

      <SEO title="Home" />

      <Icon name="logo" fill="#202938" size={200} />

      <div id="about">
        <h2>Hi, I'm Aamnah</h2>
        <p>
          I'm a <strong>frontend software developer</strong> with a passion for <strong>UI & UX design</strong>.{' '}
          <Link to="/contact">Let's connect</Link>.
        </p>

        <p>ISTP, minimalist, chronically curious, and usually a good listener.</p>

        <p>
          Life is a balance between work, home and <em>dolce far niente</em>.
        </p>

        <p>Some of my interests are electronics, DIY, design, technology and cooking.</p>
      </div>

      <div id="recent-posts">
        <h2>Recent Posts</h2>
        <ul>
          {/* {data.allFile.nodes.map((post) => { */}
          {data.allMdx.edges.map((post) => {
            let { title, status } = post.node.frontmatter
            let { slug } = post.node.fields

            return (
              <li key={post.id}>
                {status === 'draft' ? <span>DRAFT </span> : null}
                <Link to={slug}>{title !== '' ? title : slug}</Link>
              </li>
            )
          })}
        </ul>
        <Link to="/blog">view all</Link>
      </div>
      <Portfolio />
      <Contact />
    </DefaultLayout>
  )
}
