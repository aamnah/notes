import React from 'react'
import { Link } from 'gatsby'

export function PostLink({ post }) {
  let { title, path, name } = post
  return <Link to={path}>{title !== '' ? title : post.name}</Link>
}
