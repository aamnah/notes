import React from 'react'
import { Link } from '../components/common'
import { useStaticQuery, graphql } from 'gatsby'

import { HomeLayout } from '../components/Layout'
import Contact from '../components/Contact.jsx'
import { Image, SEO } from '../components/common'

export default function IndexPage() {
  const data = useStaticQuery(graphql`
    query IndexQuery {
      allFile(filter: { sourceInstanceName: { eq: "posts" } }) {
        nodes {
          id
          childMdx {
            frontmatter {
              title
              path # the URL path
              description
              date
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
      <h1>Hi, I'm Aamnah</h1>
      <div id="about">
        <p>I'm a frontend developer. I design, develop and maintain sites, apps and user interfaces.</p>

        <p>ISTP, minimalist, chronically curious, and usually a good listener.</p>

        <p>Life is a balance between work, home and dolce far niente.</p>

        <p>Some of my interests are electronics, DIY, design, technology and cooking.</p>
      </div>

      {/* <div id="work">
        <h1>Work</h1>
      </div> */}

      <div id="recent-posts">
        <h1>Recent Posts</h1>
        <ul>
          {data.allFile.nodes.map(post => {
            let { title, path, description, date } = post.childMdx.frontmatter
            return path ? (
              <li key={post.id}>
                <a href={path}>{title !== '' ? title : post.name}</a>
              </li>
            ) : (
              <li key={post.id}>{title !== '' ? title : post.name}</li>
            )
          })}
        </ul>
        <Link to="/blog">view all</Link>
      </div>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>

      <Contact />
    </HomeLayout>
  )
}
