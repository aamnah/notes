---
title: Add author profiles to blog posts on Hugo websites
date: 2024-06-27T22:31:33+03:00
uuid: 20240627223133
slug: hugo-add-author-profiles-to-blog-posts
draft: false
description: 
tags: 
---

There are multiple ways you can add authors. The following is a single author per post scenario where the author details are saved in `hugo.toml`. Alternate way of doing that would be with [taxonomies]()

Here is how the config would look like in `hugo.toml`
```toml
[author]
  [author.aamnah]
    name = "Lily"
    url = "https://mysite.com"
    bio = "a small author bio."
```

And here is how you would use it in a template, for example the `layouts/_default/single.html` file:

```go
{{/*  Post Meta  */}}
<div class="mb-6 text-xs">
  {{ if .Params.author }}
    {{ if .Site.Author }}
      {{/*  
        index macthes are case sensitive. 
        'Lily' in .Params.author will not match 'lily' in .Site.Author.lily.name
        use lowercase strings for both for a more predictable result  
        */}}
      {{ $author_name := index .Site.Author (strings.ToLower .Params.author) (strings.ToLower "name") }}
      {{ $author_url := index .Site.Author (strings.ToLower .Params.author) (strings.ToLower "url") }}
      {{ $author_bio := index .Site.Author (strings.ToLower .Params.author) (strings.ToLower "bio") }}

      <span>By <a href="{{ $author_url }}">{{ $author_name }}</a>, {{ $author_bio }}</span> 
    {{ else }}
      <p>By {{ .Params.author }}</p>
    {{ end }}
  {{ end }}
</div>
```




Links
---
- [.Site.Author Usage?](https://discourse.gohugo.io/t/site-author-usage/31459/8)
- [https://gohugo.io/functions/collections/indexfunction/](index)
- [Hugo tips: How to create author pages](https://www.netlify.com/blog/2018/07/24/hugo-tips-how-to-create-author-pages/)
- [How to add authors to your Hugo site](https://moonbooth.com/hugo/authors/)