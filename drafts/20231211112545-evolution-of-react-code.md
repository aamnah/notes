---
title: Evolution of React code
date: 2023-12-11T11:25:45+02:00
uuid: 20231211112545
slug: evolution-of-react-code
draft: true
description: 
tags: 
---

The evolution of React code

Fetching asynchronous data

```tsx
function List({pageId}) {
  const [ items, setItem ] = useState()

  useEffect(() => {
    fetchItems(pageId).then(setItems)
  }, [pageId])

  return items[pageId].map(items => <li>{item}</li>)
}
```

Prone to errors if the `pageId` changes. Writing a lot of this code manually is cumbersome, which is why we have data fetching libraries like Apollo, useSWR, React Query, or RTK Query (if you're using Redux Toolkit). They provide APIs and _hooks_ that hide the complexity for us.

```tsx
function List({pageId}) {
  const [ items, setItem ] = useDate(pageId)

  if (isLoading) {
    return <Spinner />
  }

  return items[pageId].map(items => <li>{item}</li>)
}
```

What's involved is 
- reading the data
- specifying the loading state
- rendering the data

reading the data and specifying the state, when linked together, cause unnecessary issues.

better way would be to have two components
- component that loads the data
- components that renders the loading state



```tsx
function List({pageId}) {
  const [ items, setItem ] = useDate(pageId)
```

```tsx
  <Suspense fallback={<Spinner />}>
    <List pageId={pageId} />
  </Suspense>
  return items[pageId].map(items => <li>{item}</li>)
}
```

Children that do not have a loading state of their own will use the nearest parent's loading state

```tsx
function List({pageId}) {
  <Suspense fallback={<Skeleton />}>
    <Header />
    <List pageId={pageId} />
  </Suspense>
}
```

If you want the children to have their own state, wrap them in their own Suspense component

```tsx
function List({pageId}) {
  <Suspense fallback={<Skeleton />}>
    <Header />
    <Suspense fallback={<ListPlaceholder />}>
      <List pageId={pageId} />
    </Suspense>
  </Suspense>
}
```

Changing loading screens with Suspense means that you do not have to change any data fetching code in order for them to work

```tsx
function List({pageId}) {
  <Suspense fallback={<Skeleton />}>
    <Header />
    <Suspense fallback={<ListPlaceholder />}>
      <ListLayout>
        <SpecialList pageId={pageId} />
      </ListLayout>
    </Suspense>
  </Suspense>
}
```