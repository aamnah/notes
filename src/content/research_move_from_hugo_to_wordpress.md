---
title: Research on moving from Hugo to WordPress
path: research_move_from_hugo_to_wordpress
date: 2020-05-01
status: draft
---

Here's the thing: i want comments. And not the shitty Dsiqus, and not [roll out my own system](https://www.taniarascia.com/add-comments-to-static-site/).

Rolling out my own system feels redundant to me. If i wanted to setup a server, i'd just stick with WordPress.

And that's the idea i'm exploring at the moment. Move all my notes to WordPress. Top benefits of doing that are:

- being able to add posts on my iPad
- having a comment system with moderation and spam protection built in
- still being able to use something like Hugo or Gatsby to build a static site version on top of it

The things that i have to consider

- Moving markdown posts to WordPress.

### Moving markdown posts to WordPress

That's where my Hugo setup has an edge over my Gatsby setup. Hugo uses markdown, plain and simple. Gatsby uses MDX. And MDX is new and not that well supported. I mean, i couldn't even find a proper syntax highlighting plugin for the existing fenced code blocks in markdown.. I have hundreds of posts written in Markdown, written before Gatsby was even released, and MDX expects me to use a `<Highlight />` React component instead just to be able to do syntax highlights for code blocks.

There is a [postmark](https://github.com/dirtsimple/postmark) extension for `wp-cli` that syncs markdown files to WordPress posts and pages and lets you chose stuff from frontmatter as well.

## Links

- [My Impressions of Hugo as a WordPress Developer](https://dev.to/tylerlwsmith/my-impressions-of-hugo-as-a-wordpress-developer-1hho)
