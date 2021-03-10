---
title: Common GraphQL queries for Gatsby
path: gatsby_graphql_queries
date: 2020-03-29
---

NOTES:

- can't do string interpolation or use props in a static query

### Get all files in a specific folder

You can do that with `sourceInstanceName` on `file`

```graphql
{
  allFile(filter: { sourceInstanceName: { eq: "notes" } }) {
    nodes {
      sourceInstanceName
      name
    }
  }
}
```

`notes` is the folder in the above query, and you'll get the names of all files in that folder. Without that filter, you'll get something like this

```graphql
{
  allFile {
    nodes {
      sourceInstanceName
      name
    }
  }
}
```

```graphql
{
  "data": {
    "allFile": {
      "nodes": [
        {
          "sourceInstanceName": "images",
          "name": "Banner-Aamnah-LinkedIn"
        },
        {
          "sourceInstanceName": "images",
          "name": "Logo-white"
        },
        {
          "sourceInstanceName": "images",
          "name": "Logo"
        },
        {
          "sourceInstanceName": "images",
          "name": "gateron-switch-3pin-5pin"
        },
        {
          "sourceInstanceName": "images",
          "name": "email-notification-settings"
        },
        {
          "sourceInstanceName": "images",
          "name": "netlify-contact-submission-response"
        },
        {
          "sourceInstanceName": "images",
          "name": "CherryMX-Switch-Guide"
        },
        {
          "sourceInstanceName": "pages",
          "name": "404"
        },
        {
          "sourceInstanceName": "pages",
          "name": "blog"
        },
        {
          "sourceInstanceName": "pages",
          "name": "index"
        },
        {
          "sourceInstanceName": "blog",
          "name": "first-mechanical-keyboard"
        },
        {
          "sourceInstanceName": "blog",
          "name": "setup-gatsby-mdx-blog"
        },
        {
          "sourceInstanceName": "blog",
          "name": "ukulele-notes"
        },
        {
          "sourceInstanceName": "blog",
          "name": "14_days_social_isolation"
        },
        {
          "sourceInstanceName": "notes",
          "name": "gatsby-netlify-contact-form"
        },
        {
          "sourceInstanceName": "notes",
          "name": "gatsby_graphql_queries"
        }
      ]
    }
  }
}
```

It picks up the stuff in `images`, `blog`, `notes` and `pages` directories..
