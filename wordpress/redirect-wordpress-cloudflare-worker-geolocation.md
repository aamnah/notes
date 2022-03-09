---
title: Redirect a WordPress site using Cloudflare Workers and geolocation data
date: 2021-11-22
slug: redirect-wordpress-cloudflare-worker-geolocation
---

Basic worker

```js
addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  return new Response('Hello worker!', {
    headers: { 'content-type': 'text/plain' },
  })
}
```

Geolocation: Hello World

```js
// Get all geolocation data fields and display them in HTML.

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  let html_content = ''
  let html_style = 'body{padding:6em; font-family: sans-serif;} h1{color:#f6821f}'

  html_content += '<p> Colo: ' + request.cf.colo + '</p>'
  html_content += '<p> Country: ' + request.cf.country + '</p>'
  html_content += '<p> City: ' + request.cf.city + '</p>'
  html_content += '<p> Continent: ' + request.cf.continent + '</p>'
  html_content += '<p> Latitude: ' + request.cf.latitude + '</p>'
  html_content += '<p> Longitude: ' + request.cf.longitude + '</p>'
  html_content += '<p> PostalCode: ' + request.cf.postalCode + '</p>'
  html_content += '<p> MetroCode: ' + request.cf.metroCode + '</p>'
  html_content += '<p> Region: ' + request.cf.region + '</p>'
  html_content += '<p> RegionCode: ' + request.cf.regionCode + '</p>'
  html_content += '<p> Timezone: ' + request.cf.timezone + '</p>'

  let html = `
<!DOCTYPE html>
<body>
  <head>
    <title> Geolocation: Hello World </title>
    <style> ${html_style} </style>
  </head>
  <h1>Geolocation: Hello World!</h1>
  <p>You now have access to geolocation data about where your user is visiting from.</p>
  ${html_content}
</body>`

  return new Response(html, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  })
}
```

Country code redirect

```js
// Redirect a response based on the country code in the header of a visitor.

/**
 * A map of the URLs to redirect to
 * @param {Object} countryMap
 */
const countryMap = {
  US: 'https://example.com/us',
  EU: 'https://eu.example.com/',
}
/**
 * Returns a redirect determined by the country code
 * @param {Request} request
 */
function redirect(request) {
  // Use the cf object to obtain the country of the request
  // more on the cf object: https://developers.cloudflare.com/workers/runtime-apis/request#incomingrequestcfproperties
  const country = request.cf.country

  if (country != null && country in countryMap) {
    const url = countryMap[country]
    return Response.redirect(url)
  } else {
    return fetch(request)
  }
}

addEventListener('fetch', (event) => {
  event.respondWith(redirect(event.request))
})
```

## Links

- [Cloudflare Workers: Get started guide](https://developers.cloudflare.com/workers/get-started/guide)
- [Location-based personalization at the edge with Cloudflare Workers](https://blog.cloudflare.com/location-based-personalization-using-workers/)
- [Country code redirect](https://developers.cloudflare.com/workers/examples/country-code-redirect)
- [Geolocation: Hello World](https://developers.cloudflare.com/workers/examples/geolocation-hello-world)
