import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { HomeLayout } from '../components/Layout'
import { Image, Link, SEO } from '../components/common'
import Contact from '../components/Contact.jsx'

export default function IndexPage() {
  const data = useStaticQuery(graphql`
    query IndexQuery {
      allFile(filter: { sourceInstanceName: { eq: "blog" } }, sort: { fields: modifiedTime, order: DESC }) {
        # get reverse chronologoical order, i.e. lastmod on top
        nodes {
          id
          childMdx {
            frontmatter {
              title
              path # the URL path
              description
              date
              lastmod
            }
          }
          name # filename
          base # filename.ext
          absolutePath # the file path
          dir # absolutePath minus base
        }
      }
    }
  `)
  return (
    <HomeLayout>
      <SEO title="Home" />
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>

      <h1>Hi, I'm Aamnah</h1>
      <div id="about">
        <p>I'm a frontend developer. I design, develop and maintain sites, apps and user interfaces.</p>

        <p>ISTP, minimalist, chronically curious, and usually a good listener.</p>

        <p>
          Life is a balance between work, home and <em>dolce far niente</em>.
        </p>

        <p>Some of my interests are electronics, DIY, design, technology and cooking.</p>
      </div>

      {/* <div id="work">
        <h1>Work</h1>
      </div> */}

      <div id="recent-posts">
        <h1>Recent Posts</h1>
        <ul>
          {data.allFile.nodes.map((post) => {
            let { title, path, description, date } = post.childMdx.frontmatter
            return path ? (
              <li key={post.id}>
                <Link to={path}>{title !== '' ? title : post.name}</Link>
              </li>
            ) : (
              <li key={post.id}>{title !== '' ? title : post.name}</li>
            )
          })}
        </ul>
        <Link to="/blog">view all</Link>
      </div>

      <Contact />
    </HomeLayout>
  )
}
