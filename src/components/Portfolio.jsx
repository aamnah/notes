import React from 'react'

import { data } from 'data'
export default function Portfolio() {
  return (
    <div id="projects">
      {/* TODO: Jazz this up. Add screenshots, description, github icons and more */}
      <h2>Projects</h2>
      <h4>Themes</h4>
      <ul>
        {data.projects.themes.map((theme) => {
          const { id, title, link } = theme
          return (
            <li key={id}>
              <a href={link}>{title}</a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
