---
title: Notes on SWR
description: Exploring the use case for SWR and if i can use it as a replacement for Redux
slug: swr-vs-redux
date: 2020-08-04
---

tl;dr:

- Application state !== remote data from a server. Remote data should be in a cache, application state should be in state (React Context is fine)
- Once you accept the above, you'll stop using Redux to store everything that comes back from the server (i.e. remote data)
- Because you stopped making a client side copy of the server side data, you no longer have to worry about your state becoming stale
- You can access the data from the SWR cache the same way you can access data from a store. Because SWR cahce is a global state object. (fyi, server side data is also called cache)
- You can use Axios with SWR, it will not force you to give it up. As a matter of fact, you can use any library you want for making HTTP requests
- With SWR, you no longer have to worry about manually updating `error`, `loading`, `success` state and write reducers for them. SWR gives you these out of the box
- SWR is only meant for reading data (GET), for other CRUD operations, you can [handle them outside SWR](https://github.com/vercel/swr/discussions/364#discussioncomment-24398)
- You can use a `mutate` function to update SWR cache
- You still need global app state, (be it Redux or React Context), we just don't store remote data in it.

---

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Its cache is a global state object, keys are things in the state, useSWR calls and dependent fetching are selectors. Not sure about the local app state part though that would probably need to be in a separate context. <a href="https://twitter.com/rauchg?ref_src=twsrc%5Etfw">@rauchg</a> is smarter than me so he might have a better idea!</p>&mdash; Giuseppe (@giuseppegurgone) <a href="https://twitter.com/giuseppegurgone/status/1189979434738159616?ref_src=twsrc%5Etfw">October 31, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Basic mentality behind SWR is that **remote data is not state**, it belongs in a cache.

> "Remote data is read-only. It doesn’t belong in the same location as our UI state."

If you don't keep server side data in state (making a client side copy), it won't become stale.

| Server cache                             | Local state                            |
| ---------------------------------------- | -------------------------------------- |
| Conversations, User profiles, Blog posts | Is the modal open? Is the box checked? |

### Bandwidth concerns

SWR is great if we're using GraphQL, because then you are not making multiple HTTP calls every time you need data, so all the _revalidating_ is _less expensive_. But if you're using plain old REST APIs with lots of HTTP requests, i wonder how much bandwidth it'll consume and if we can afford making so many calls so frequently?

### Deduping

The _key_ you pass to `useSWR`helps SWR identify our request. If the key is the same for multiple requests, only one API call will be made and all components will get the results.

> all components fetching the same data are updated when the data changes.

### Transitioning an existing app that uses Redux

You can use `onSuccess` callback on `useSWR` to [dispatch redux actions](https://github.com/vercel/swr/discussions/364#discussioncomment-24396)..

### Persisting SWR cache?

SWR is using an in-memory Map for the cache (both React and React Native). It does not save cache with AsyncStorage or MemoryStore in React Native. Right now it clears everything on hard refresh. [According to folks from Vercel](https://github.com/vercel/swr/issues/16#issuecomment-547271304), LocalStorage is IO heavy and slowed down rendering. ANd IndexedDb is async, which means SWR can not return data from cache synchronously.

With Redux, persisting is simple, you use [redux-persist](https://github.com/rt2zz/redux-persist). A similar ready made solution for SWR doesn't exist yet. There is [swr-sync-storage](https://github.com/sergiodxa/swr-sync-storage) from a guy who used to work at Vercel, and it'll sync SWR cache with `localStorage` or `sessionStorage` to get offline cache. But it's for web and not React Native.

tl;d: you can do it, but it'll save the entire cache and is not performant as disk IO is heavy

### Conclusion

As of now, i can't use SWR in React Native apps because a solution to persist it by synching it to `AsyncStorage` (HDD/Disk) doesn't exist (yet). So the in-memory (RAM) cache will be gone every time i exit the app. If i exit the app and the next time i open it and i'm offline, the cache will be blank and i won't have any data to make the app usable offline.

I can use it in React on the web, and i can persist it to Web `localStorage` or `sessionStorage`.

My ideal scenario is using SWR on the web with GraphQL API and persisting it to web storage for offline access.

## Links

- [SWR](https://swr.vercel.app/)
- [Managing Remote Data with SWR](https://dev.to/juliang/managing-remote-data-with-swr-7cf)
- [React State Management in 2020](https://dev.to/juliang/react-state-management-in-2020-3c58)
- [Why You Should Be Storing Remote Data in a Cache (and Not in State)](https://medium.com/better-programming/why-you-should-be-separating-your-server-cache-from-your-ui-state-1585a9ae8336)
- [React Data Fetching with Hooks using SWR](https://www.youtube.com/watch?v=oWVW8IqpQ-A)
- [How SWR works behind the scenes](https://dev.to/juliang/how-swr-works-4lkb)
- [Usage with Redux and Redux ORM](https://github.com/vercel/swr/discussions/364)
- [Four Ways to Fetch Data in React](https://www.bitnative.com/2020/07/06/four-ways-to-fetch-data-in-react/)
