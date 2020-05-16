import React from 'react'

export default function Portfolio() {
  return (
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
  )
}
