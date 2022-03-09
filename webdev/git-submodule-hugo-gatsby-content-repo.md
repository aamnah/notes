---
title: Using Git submodules to bring in markdown content from a single git repo
date: 2021-03-20
draft: true
slug: git-submodule-hugo-gatsby-content-repo
---

Alright, i just did it. The command to add themes to Hugo sites gave me the courage. It was as simple as running

```bash
git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke.git themes/ananke
```

and voila, i had all my content right there inside Hugo. The submodule is it's own repo, so you can `cd` to the submodule folder and `git push` to push to that particular repo which is different from your main project's repo.

---

The history of my blog/site has been like this: started with WordPress, moved to markdown and Jekyll, moved to Hugo, moved to Gatsby when i started learning React.

Right now i have two websites with different content, one is the Hugo one which has a lot of content, it used to be a separate site for my dev notes (i had TLDRdevnotes.com), but then i ended up changing it to notes.aamnah.com. Then i started a blog with my other site

Setting up custom page routes based on _slugs_ was more complicated than it needed to be. So i have decided to go back to using Hugo. I liked it, it was simple, it was fast and the templating was also very friendly.

Having moved between i don't ever want to have to move content from here to there again. I also don't want to start a new repo and lose all history.

Here comes git submodules. The idea is to have the content (i.e. markdown files and images) in one repo, and then include that repo in any future projects. That way i won't have to worry about moving content, it'll just be a repo that i can include inside any other repo as a submodule.

Hugo is written in Go, which i have a curious interest in these days..

# The Aamnah.com v7 Project

- Create a new site with Hugo/Nextjs?
- Create a template with Hugo for the site
- Add comments this time. i need unique post IDs for this. How do i link the comments to a particular post? i can't base the uniqueness on the slug, title or the filename, since all three can change down the line.
  - Do i populate a database based on the markdown files, build an API on top of it and then use that API?
  - Do i write a script to generate the post templates and add a generated unique ID to the post metadata then? How do i update the existing post files then?

## Hugo vs. Nextjs

- Would Go instead of JS be an issue for me? Since i am a developer familiar with JS and know fancy little about Go. Do i want to make that commitment of getting familiar with yet another programming language? Do i have the time to make that commitment?
- How easy is it to work with APIs? Hugo doesn't work with API content by the looks of it, but NextsJS offers it out of the box. Question is, how many APIs am i going to use on my person site? There is definitely going to be one for comments. And then the blog content may need to come from an API as well. Contentful?

## Links

- [](https://git-scm.com/book/en/v2/Git-Tools-Submodules)s
