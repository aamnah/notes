---
title: Generating Hugo templates for subsections
slug: hugo-template-subsections
date: 2022-03-11
tags:
  - Hugo
---

I have a `posts/` folder added as a git submodule inside the `content/` folder, which has close to 40 folders inside it, each folder is what i call a _subsection_ or category. Treating it like a _section_ allows me to automatically set _category_ titles for the files inside each folder instead of having to manually update the frontmatter for each file in that folder.

There are two mains reasons for adding my _posts_ as a git submodule. One was because i wanted to allow general public to be able to edit these posts on Github. The other was that i wanted to be able to easily port all my posts the next time i wanted to change the static site generator, i'll just add the `posts` folder as a submodule.

> A section cannot be defined or overridden by a front matter parameter – it is strictly derived from the content organization structure.

Now, Gatsby has no concept of **sub**sections. It only recognizes \_top level\_ directories
inside `content` as sections. So it'd recognize the following structure, all folders will be treated as a _section_ and you'll be able to get them with `.Site.Sections`

```
content/
  ├── algorithms/
  ├── android/
  ├── api/
  ├── armbian/
  ├── aws/
```

but not the structure below

```
content/
└── posts/
    ├── algorithms/
    ├── android/
    ├── api/
    ├── armbian/
    ├── aws/
```

as all folders will return `.CurrentSection` as `posts` because for nested sections, this is the first path element in the directory, so: `/posts/algorithms/mypost/ => posts`.

Keep in mind that in order for it to show up as a section, it must have an `_index.html` file inside the directory

```
content/
└── posts/
    ├── algorithms/
    |   └── _index.md
    ├── android/
    |   └── _index.md
    ├── api/
    |   └── _index.md
    ├── armbian/
    |   └── _index.md
    ├── aws/
    |   └── _index.md
```

The `_index.html` could be as simple as

```md
---
title: my Amazing section
---
```

### Get a list of all subsections (e.g. `webdev` in `posts/webdev`)

I need to get all sections inside my top-level section (which is `content/posts/`) and list all the pages inside them

```html
{{ range (where .Site.Sections "Section" "posts") }} {{ range sort .Sections "Title" }}
<h4><a href="{{ .Permalink }}">{{ .Title}}</a></h4>
{{ range .Pages }}
<ul>
  <li><a href="{{ .Permalink }}">{{ .Title}}</a></li>
</ul>
{{ end }} {{ end }} {{ end }}
```

- `{{ range (where .Site.Sections "Section" "posts") }}` will get an array of all pages inside inside a top-level section called `posts`.
- `{{ range .Sections }` will get all _sections_ below `posts/`. Each section will have its own `.Title` and `.Permalink`
- `{{ range sort .Sections "Title" }` will sort the array alphabetically based on section `Title`

The same code would look like this if you declare a variable name for each array element, e.g. `$section`

```html
{{ range (where .Site.Sections "Section" "posts") }} {{ range $section := sort .Sections "Title" }}
<h4><a href="{{ $section.Permalink }}">{{ $section.Title}}</a></h4>
{{ range $section.Pages }}
<ul>
  <li><a href="{{ .Permalink }}">{{ .Title}}</a></li>
</ul>
{{ end }} {{ end }} {{ end }}
```

I prefer not declaring another variable as it just increases the code without any major benefit and the _wallrus_ operator `:=` confuses people who are not familiar with Go

If i just wanted to alphabetically list all subsection, i'd use the following snippet

```html
<ul>
  {{ range (where .Site.Sections "Section" "posts") }} {{ range sort .Sections "Title" }}
  <li><a href="{{ .Permalink }}">{{ .Title}}</a></li>
  {{ end }} {{ end }}
</ul>
```

## Links

- [Hugo Docs: Content Sections](https://gohugo.io/content-management/sections/)
