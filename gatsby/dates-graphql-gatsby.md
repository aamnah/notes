---
title: Dates in Gatsby GraphQL
slug: dates-graphql-gatsby
date: 2020-05-03
---

tl;dr: pass a Momentjs date string as the value for `formatString` parameter for `date`

```graphql
date(formatString: 'YYYY, MMM DD')
```

```graphql
query BlogQuery {
  allFile(
    filter: { sourceInstanceName: { in: ["blog", "notes"] } }
    sort: { order: DESC, fields: childMdx___frontmatter___date }
  ) {
    nodes {
      id
      name # filename
      base # filename.ext
      absolutePath # the file path
      dir # absolutePath minus base
      childMdx {
        frontmatter {
          title
          path # the URL path
          description
          date(formatString: "YYYY, MMM DD") # 2020, May 03
        }
      }
    }
  }
}
```

### Automatically figuring out `lastmod`

I thought i could use the `mtime` value to automatically figure out the `lastmod` value that i usually put in frontmatter when i update an existing post. Just in case i forget to update `lastmod`, it'd use `mtime` to figure out the date the file was modified on the system.

In theory, it sounds like it may work. But practically, it doens't. Because `mtime` (modified) depends on `ctime` (created). Your `mtime` value by default is equal to `ctime`, i.e. first modification time is when the file was created.

So if i clone the repo on May 3rd on another system, all `mtime` values will change to reflect May 3rd, as that's when the file started existing on the system. And i have multiple systems where i keep cloning things..

Conclusion: You can't use `mtime` to automatically generate the time the post was last modified, it's unrelaible

## Links

- https://momentjs.com/docs/#/displaying/format/
- https://harrycresswell.com/notes/formatting-dates-gatsby/
