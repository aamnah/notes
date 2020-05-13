import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { HomeLayout } from '../components/Layout'
import { Image, Link, SEO } from '../components/common'
import Contact from '../components/Contact.jsx'

export default function IndexPage() {
  // const data = useStaticQuery(graphql`
  //   query IndexQuery {
  //     allFile(
  //       filter: { sourceInstanceName: { in: ["blog", "notes"] } }
  //       sort: { order: DESC, fields: childMdx___frontmatter___date }
  //       limit: 5
  //     ) {
  //       # get reverse chronologoical order, i.e. lastmod on top
  //       nodes {
  //         id
  //         name # filename
  //         base # filename.ext
  //         absolutePath # the file path
  //         dir # absolutePath minus base
  //         childMdx {
  //           frontmatter {
  //             title
  //             path # the URL path
  //             date
  //             lastmod
  //           }
  //         }
  //       }
  //     }
  //   }
  // `)

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
    <HomeLayout>
      <SEO title="Home" />
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>

      <h2>Hi, I'm Aamnah</h2>
      <div id="about">
        <p>I'm a frontend developer. I design, develop and maintain sites, apps and user interfaces.</p>

        <p>ISTP, minimalist, chronically curious, and usually a good listener.</p>

        <p>
          Life is a balance between work, home and <em>dolce far niente</em>.
        </p>

        <p>Some of my interests are electronics, DIY, design, technology and cooking.</p>
      </div>

      {/* <div id="work">
        <h2>Work</h2>
      </div> */}

      <div id="recent-posts">
        <h2>Recent Posts</h2>
        <ul>
          {/* {data.allFile.nodes.map((post) => { */}
          {data.allMdx.edges.map((post) => {
            let { title } = post.node.frontmatter
            let { slug } = post.node.fields

            return (
              <li key={post.id}>
                <Link to={slug}>{title !== '' ? title : slug}</Link>
              </li>
            )
          })}
        </ul>
        <Link to="/blog">view all</Link>
      </div>
      <div id="projects">
        {/* TODO: Jazz this up. Add screenshots, description, github icons and more */}
        <h2>Projects</h2>
        <h4>Themes</h4>
        <ul>
          <li>
            <a href="https://github.com/aamnah/oh-my-zsh-custom/blob/master/themes/amnastic.zsh-theme">
              amnastic.zsh-theme
            </a>
          </li>
          <li>
            <a href="https://github.com/aamnah/tmux-flat-theme">tmux Flat Theme</a>
          </li>
          <li>
            <a href="https://github.com/aamnah/MarkdownEditing-BlackboardTheme">MarkdownEditing-BlackboardTheme</a>
          </li>
          <li>
            <a href="https://github.com/aamnah/LightPaper-Blackboardish">LightPaper-Blackboardish</a>
          </li>
        </ul>
      </div>
      <Contact />
    </HomeLayout>
  )
}
