---
date: 2022-03-10
title: 'Pro tip: Pass an object as function params and use destructuring'
---

```ts
interface GreetingParams {
  name?: string // keep this for backward compatbility
  firstName?: string // replaces name
  lastName?: string
  lastNameFirst?: boolean
}

function greet({
  name,
  firstName = name, // if firstName not provided, use name as firstName
  lastName,
  lastNameFirst = false,
}: GreetingParams) {
  if (!lastName) {
    return `Hello, ${firstName}`
  }
  return `Hello ${lastNameFirst ? lastName + ' ' + firstName : firstName + ' ' + lastName}`
}

// Backward compatible with old signature
greet({ name: 'John' })
// New signature with first name only
greet({ firstName: 'John' })
// New signature with first name and last name
greet({ firstName: 'John', lastName: 'Doe' })
// New signature with first name and last name, last name first
greet({ firstName: 'John', lastName: 'Doe', lastNameFirst: true })
```

## Links

- [Stop Using Function Parameters Now](https://blog.bitsrc.io/stop-using-function-parameters-now-d320cf0932df)
