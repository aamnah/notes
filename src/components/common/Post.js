import React from 'react'

export function Post({ post }) {
  let { title, path, description, date } = post.frontmatter
  return (
    <>
      <h1>{title}</h1>
      <div>
        {path} <br />
        {description} <br />
        {date} <br />
      </div>
      <main>{post.body}</main>
    </>
  )
}
