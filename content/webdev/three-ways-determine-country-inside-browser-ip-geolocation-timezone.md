---
title: Three ways of determining the user's country inside the browser (Geolocation API, IP address, Timezone)
date: 2021-08-20
slug: three-ways-determine-country-inside-browser-ip-geolocation-timezone
---

- through browser's Geolocation API (needs user consent)
- through IP address (https://extreme-ip-lookup.com/json/)
- determine country by checking `timezone`

For Node based apps you can use [countries-and-timezones](https://www.npmjs.com/package/countries-and-timezones) which is ~9kb and can give you a country based on the timezone

### Geolocation API

### IP Address

Services like [ipinfo.io](https://ipinfo.io/) give you 50k requests/month for free.

```js
fetch('https://extreme-ip-lookup.com/json/')
  .then((res) => res.json())
  .then((response) => {
    console.log('Country: ', response.country)
  })
  .catch((data, status) => {
    console.log('Request failed')
  })
```

```json
{
  "businessName": "Digitalcourage.de",
  "businessWebsite": "www.digitalcourage.de",
  "city": "Amsterdam",
  "continent": "Europe",
  "country": "Netherlands",
  "countryCode": "NL",
  "ipName": "tor-exit-relay-7.anonymizing-proxy.digitalcourage.de",
  "ipType": "Business",
  "isp": "Cia Triad Security LLC",
  "lat": "52.37403",
  "lon": "4.88969",
  "org": "Zwiebelfreunde E.V.",
  "query": "185.220.102.253",
  "region": "Noord-Holland",
  "status": "success"
}
```

### Timezone (Internationalization API)

```js
console.log(Intl.DateTimeFormat().resolvedOptions().timeZone) // 'Asia/Karachi'
```

## Links

- [Detect location and local timezone of users in JavaScript](https://blog.logrocket.com/detect-location-and-local-timezone-of-users-in-javascript-3d9523c011b9/)
- [How to detect browser country in client site? - Stack Overflow](https://stackoverflow.com/a/65043902/890814)
- [Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
