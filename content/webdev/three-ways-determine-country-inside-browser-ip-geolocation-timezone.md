---
title: Three ways of determining the user's country inside the browser (Geolocation API, IP address, Timezone)
date: 2021-08-20
lastmod: 2021-08-25
slug: three-ways-determine-country-inside-browser-ip-geolocation-timezone
---

- through browser's Geolocation API (needs user consent)
- through IP address (https://extreme-ip-lookup.com/json/)
- determine country by checking `timezone`

For Node based apps you can use [countries-and-timezones](https://www.npmjs.com/package/countries-and-timezones) which is ~9kb and can give you a country based on the timezone

### Geolocation API

This i didn't pay much attention to because i did not want to prompt the user to get their permission for using their location. Overtly creepy.

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

I ended up using [countries-and-timezones](https://www.npmjs.com/package/countries-and-timezones) which is a lightweight JS lib for matching a timezone with a country. Got what i wanted in less than 20kb and no external API calls.

Keep in mind that this relies on the user setting their timezone correctly. While one timezone can be in multiple countries (for example: `Europe/Zurich` is in Germany, Switzerland and Liechtenstein..), there are actually separate timezone definitions for each country (for example `Europe/Berlin` and `Europe/Vaduz`), that the user has probably set correctly. But there's definitely no guarantee.

(Since my use case was pre-selecting a country in a country selection dropdown, i have provided them with a simple way of correcting any mismatches. The detection and pre-selection is just to make the user's life easy)

```html
<script src="https://cdn.jsdelivr.net/gh/manuelmhtr/countries-and-timezones@latest/dist/index.min.js"></script>
```

```js
// Load the file if you have saved it locally and not sourcing a script in HTML
// import "../lib/countries-and-timezones.min.js"

let browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
let browserCountry = ct.getCountryForTimezone(browserTimezone) // {id: "PK", name: "Pakistan", timezones: Array(1)}
```

## Links

- [Detect location and local timezone of users in JavaScript](https://blog.logrocket.com/detect-location-and-local-timezone-of-users-in-javascript-3d9523c011b9/)
- [How to detect browser country in client site? - Stack Overflow](https://stackoverflow.com/a/65043902/890814)
- [Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
