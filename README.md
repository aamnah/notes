# Aamnah's Notes

This combines all the notes from the various sites and from my local machine.

Previously, i have setup a site with Hugo, and another one with Gatsby. Both had different content. This repo combines the content from both those sites.

The idea with this repo is that it'll be used as a submodule for my portfolio site. Then it wouldn't matter what static site generator i use, i'll always be referencing this repo that contains just the notes and nothing else.

TODO:

- [ ] Fix image URLs
  - [ ] update the URLs and references inside posts
  - [x] combine the image folders
- [x] test adding this repo as a git `submodule` to a Hugo or Gatsby site
- [x] fix draft status
- [x] fix inconsistencies between `path` and `slug` (change all to `slug`)

### Drafts

- Hugo has no `drafts/` directory and you can't set one in the configuration file. What it has instead is `draft: true` inside a file.
- Gatsby doesn't have a built in drafts functionality either. What i had done was add a `status` value to frontmatter, so `status: draft` meant it was a draft.
- To make _drafts_ compatible for both Gatsby and Hugo, i have used Hugo's style of `draft: true` (instead of `status: draft`) and have updated Gatsby site accordingly

| Functionality     | Hugo          | Gatsby                                                | Configuration                        |
| ----------------- | ------------- | ----------------------------------------------------- | ------------------------------------ |
| Drafts            | `draft: true` | queries based on custom frontmatter (`status: draft`) | no config for a drafts dir in either |
| Images and Assets |               |                                                       |                                      |
| Static folder     | `static/`     | `static/`                                             |                                      |
