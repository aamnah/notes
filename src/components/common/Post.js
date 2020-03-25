import React from 'react'

export function Post({ Post }) {
  let { title, path, description, date } = Post.frontmatter
  return (
    <>
      <h1>{title}</h1>
      <div>
        {path} <br />
        {description} <br />
        {date} <br />
      </div>
      <main>{Post.body}</main>
    </>
  )
}
