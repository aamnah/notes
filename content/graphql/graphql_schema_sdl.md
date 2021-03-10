---
title: Schema definition in GraphQL (example)
date: 2020-05-02
path: graphql_schema_sql_example
---

- _SDL_ is Schema Definition Language
- `!` means it's a required field
- `[]` means it's a list (like an array)
- `ID` is automatically generated
- There are three root types: `query`, `mutation` and `subscription`
  - `query` lets you read data (the R of CRUD)
  - `mutation` lets you create, update and delete data (the C, U, and D of CRUD)
  - `subscription` lets you subscribe to realtime updates and keep receiving data whenever an event occurs (e.g. a mutation)

```graphql
# TYPES
# a type called Person for creating user objects
type Person {
  id: ID!
  name: String!
  age: Int!
  posts: [Post!]!
}

type Post {
  title: String!
  author: Person!
}

# Query type to retrieve a list of Person
type Query {
  allPersons(last: Int): [Person!]! # return a list of all users, can accept a `last` parameter to only show last X no. of Persons created
  allPosts(last: Int): [Post!]!
}

# Mutation type to create/update/delete a Person
type Mutation {
  createPerson(name: String!, age: Int!): Person! # return a single person object, created by this mutation
  updatePerson(id: ID!, name: String!, age: Int): Person!
  deletePerson(id: ID!): Person! # delete the Person having the provided `id`
  # add CUD for posts here..
}

# Subscription type to subscribe to the events of Person being created/updated/deleted
type Subscription {
  newPerson: Person!
  updatedPerson: Person!
  deletedPerson: Person!
  # add events for post here..
}
```

```graphql
# QUERIES
{
  allPersons {
    id
    name
    age
  }
}

mutation {
  createPerson(name: "Henry", age: 32) {
    id
  }
}

subscription {
  newPerson {
    id
    name
    age
  }
}
```

## Links

- [Exploring GraphQL: A Query Language for APIs](https://www.edx.org/course/exploring-graphql-a-query-language-for-apis)
