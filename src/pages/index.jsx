import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { DefaultLayout } from 'components/Layout'
import { Head, Link, SEO, Icon } from 'components/common'
import Portfolio from 'components/Portfolio'
import { Breakpoint } from 'Theme'
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

      <Intro>
        <div id="about">
          <h1>Hi, I'm Aamnah</h1>
          <h3>
            I'm a <strong>frontend software developer</strong> <br />
            with a passion for <strong>UI & UX design</strong>
          </h3>
          <Link to="/contact" className="Button">
            Let's connect
          </Link>
        </div>
        {/* <Icon name="logo" fill="#202938" size={200} /> */}
      </Intro>

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
        <Link to="/notes">view all</Link>
      </div>
      <Portfolio />
    </DefaultLayout>
  )
}

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media all and ${Breakpoint.tablet} {
    flex-direction: row;
    justify-content: flex-start;
  }
  align-content: center;
  align-items: center;
`
