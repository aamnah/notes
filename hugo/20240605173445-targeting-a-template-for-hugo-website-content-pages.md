---
title: Targeting a template for Hugo website content pages
date: 2024-06-05T17:34:45+03:00
uuid: 20240605173445
slug: targeting-a-template-for-hugo-website-content-pages
draft: false
description: 
tags: 
---

To use a specific layout for your content pages and override the default template lookup order, you specify `layout`, `kind`, or both in the front matter. Here are a bunch of examples:

```
layouts/notes/baseof.html - serves as the templates for the notes SECTION
layouts/page/notes.html - serves as the template for the notes PAGE
```

Here's an example directory structure for your layouts:

```
themes/amnastic/layouts/notes/     
├── baseof.html
├── landing.html                
├── section.html               
└── single.html                  
                                                               
0 directories, 4 files 
```

    
- If you just define `layout:notes` in your content page, it will render the PAGE layout at `layouts/pages/notes.html`

```yaml
# use the template at layouts/pages/notes.html
layout: notes 
```

- If you just define `type:notes`, it will render the layout template at `layouts/notes/baseof.html` or `layouts/notes/single.html`

```yaml
# use the template at layouts/notes/baseof.html or layouts/notes/single.html
type: notes 
```

- If you define a `type` and a `layout` both, it will look under the `type` directory for that specific `layout`, like the following:

```yaml
type: notes # look under layouts/notes/
layout: landing # for a layout called landing, i.e. layouts/notes/landing.html
```

### Defining layouts for subsections

I have one _notes_ (usually called _posts_) with folders serving as post _categories_. From Hugo's perspective, `notes/` is a section and all the individual directories inside `notes/`, for example `notes/algorithms/`, `notes/android` etc. are all sub-sections. In my site, i have about 50+ of these subsections.

```
/notes/
├── algorithms/
├── android/
├── api/
├── armbian/
├── aws/
├── bash-scripting/
├── cheatsheets/
├── commands/
├── _index.md/
├── ios/
├── javascript/
```

The issue i have with these _sub_ sections is that they do not always pick up the right layout, which is `/layouts/notes/`. In other words, how do i specify the layout for all these subsections in one go without having to edit 50+ `_index.md` files for each sub-section? I looked into doing this in the config file but couldn't find anything.

FYI, the long way of doing it would be editing the `_index.md` file of each sub-section and adding `type:notes` to the front matter.

[https://gohugo.io/content-management/front-matter/#cascade](cascade) is the answer. `cascade` set in the front matter of parent will set a value for all its descendants, unless the descendant has its own value set.

```yaml
---
title: Notes

cascade:
- _target:
    kind: page
    path: /notes/**
  params:
    type: notes

---
```

Links
---

- https://gohugo.io/templates/lookup-order/#target-a-template