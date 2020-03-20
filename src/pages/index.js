import React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"

import HomeLayout from "../components/layout-home"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query HomeQuery {
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
      <h1>Recent Posts</h1>
      <ul>
        {data.allFile.nodes.map(post => {
          let { title, path, description, date } = post.childMdx.frontmatter
          return path ? (
            <li>
              <a href={path}>{title !== "" ? title : post.name}</a>
            </li>
          ) : (
            <li>{title !== "" ? title : post.name}</li>
          )
        })}
      </ul>

      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </HomeLayout>
  )
}

export default IndexPage
