---
title: Transforming API response with Axios `transformResponse()` function
date: 2023-09-16T15:39:19
uuid: 20230916153919
slug: axios-transform-response
description: 
tags:
  - axios
  - react
  - api
---

```js
axios({
  method,
  url,
  transformResponse: [(data) => {
    return data
  }]
}).then(response => { console.log(response) })
```

If you're getting `undefined`, there are a few things that you need to keep in mind.

- The response returned is a `STRING`, you need to parse it to `JSON`
- Use a `try .. catch` block so that you catch errors

```ts
async function fetchMovieGenres() {
  // Get the list of official genres for movies.

  const TMDB_API_TOKEN = ''
  
  try {
    let response = await axios({
      url: `/genre/movie/list`,
      method: `get`,
      baseURL: `https://api.themoviedb.org/3`,
      headers: {
        Authorization:
          `Bearer ${TMDB_API_TOKEN}`,
      },
      transformResponse: [
        (response) => {
          // Do whatever you want to transform the data
          // e.g. convert the genres array of objects into object of objects
          // easier to get values by ID that way

          // 1. Use a try catch block to find errors
          try {
            console.log(`API Response:`, response)
            // 2. Response is a STRING. You need to parse it to JSON
            // One way to identify that right away is interactivity with the response in Console
            // Objects can be interacted with, can be folded and are color coded. Strings are just gray text
            console.log(`Response type from API:`, typeof response)

            let parsedResponse

            try {
              parsedResponse = JSON.parse(response)
              console.log(`Parsed Response: `, parsedResponse)
              console.log(`Response type after parsing:`, typeof parsedResponse)
            } catch (error) {
              console.error(
                `There was an error while parsing response data`,
                error
              )
            }

            if (parsedResponse.status === 'success') {
              return parsedResponse.data
            } else {
              console.error(`There was an error while fetching data`)
            }

          } catch (error) {
            console.error(
              `There was an error with Axios transformResponse()`,
              error
            )
          }
        },
      ],
    })
    return response
  } catch (error) {
    console.error(
      `There was an error when getting movie genres with Axios: \n${error}`
    )
  }
}
```


Links
---
- [Axios example with transformResponse.js](https://gist.github.com/klummy/cf739bdb3c63264d8d6427d9b6f8772d)
- [axios transformResponse returning undefined](https://stackoverflow.com/questions/61125557/axios-transformresponse-returning-undefined)