---
title: Looping over an Array vs. looping over an Object
date: 2021-08-22
---

- Data needs to be modelled differently
- It's easier to find things in an object with key value pairs than it is in an array
- You'll see this sort of data modeling in usage of state libraries like Redux where we have data _stores_ and need to get values from those stores after finding them first..

### Array containing (anonymous) objects

```js
;[
  {
    name: 'Iceland',
    dialCode: '+354',
    alpha2code: 'IS',
    alpha3code: 'ISL',
    flag: 'ISL.svg',
  },
  // {...}
]
```

Looping over it with `.map()`

```js
countriesDataObject
  .map((country) => {
    return `<li>
            <img src="data/flags/${country.flag}" class="flag" alt="${country.name}" title="${country.name}" />
            ${country.dialCode}
          </li>`
  })
  .join('')
```

### Object containing (named) objects

```js
{
  "ISL" : {
    name: 'Iceland',
    dialCode: '+354',
    alpha2code: 'IS',
    alpha3code: 'ISL',
    flag: 'ISL.svg',
  },
  // {...}
}
```

Looping over it with a `for ... in` loop and `Object.entries()`

```js
let html = ''

for (const [key, value] of Object.entries(countriesDataObject)) {
  html += `<li><img src="data/flags/${value.flag}" class="flag" alt="${value.name}" title="${value.name}" />  ${value.dialCode}</li>`
}

return html
```
