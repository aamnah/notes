---
date: 2021-12-13
title: Getting up to speed with Regex in order to redirect URLs
tags:
  - regex
  - redirects
---

We have 5 different types of news pages:

- News (the main blog posts listing page)
- Category
- Archive (listing page that lists all posts)
- Monthly archive (archive page that lists posts from a particular month in a year)
- Article (the individual blog past page)

All these pages have a different URL structure. We are going to redirect them based on what type of page it is, and then build the new URL by taking parts from the old URL

### Monthly archive pages

```
/news/September-2021
```

Matching `September-2021` with regex

```js
let monthlyArchive = new RegExp('/([a-z]w+)-(d{4})/i')
```

i could either do `[a-zA-z]` to match both uppercase and lowercase alphabets, or i can add the `i` flag at the end to make the entire match case-insensitive. In the example above, i have used the `i` flag

Alternatively, you can specify the month names as a group of possible values, this will be more accurate than the above as we're matching for very specific values and not just word characters

```js
;/(January|February|March|April|May|June|July|August|September|October|November|December)-(\d{4})/i
```

### Category pages

```
/news/category/support-soldiers/3
```

Category page determining factors:

- path starts with `/news/category` (unique, only category pages start with this)
- path ends with _category ID_ which is all digits
- splitting the path on `/` will give you 5 parts

```js
console.debug('/news/category/support-soldiers/3'.split('/')) // ["", "news", "category", "support-soldiers", "3"]
console.debug('/news/category/support-soldiers/3'.split('/').length) // 5
```

I went with `pathname.startsWith('/news/category/')` because this path is unique for category pages and is the simplest solution

### Post pages

```
/news/royal-marines-show-us-troops-whos-boss-in-military-exercise/7986
```

```
/news/royal-marines-show-us-troops-whos-boss-in-military-exercise/7986
/news/will-former-soldiers-be-taking-on-new-police-roles-against-organized-crime/7964
/news/veterans-honoured-with-pathway-decorated-with-thousands-of-names-of-former-soldiers/7925
/news/british-army-to-tackle-climate-change-with-2-million-trees/7920
/news/covid-has-a-new-enemy-military-students/7896
/news/our-girl-inspires-17-year-old-to-take-up-army-medic-role/7902
```

- path starts with `/news` (not unique, other news related pages also start with this)
- path ends with _post ID_ which is all digits
- splitting `URL.pathname` on `/` will give you 4 parts

### Determining path by checking how it starts

```js
let url = new URL('https://forcespenpals.co.uk/news/category/support-soldiers/3')

let isCategoryUrl = url.pathname.startsWith('/news/category')

console.log(isCategoryUrl) // true
```

### Determining path by checking how many parts it has

If you can not determine the type of URL based on how the path starts, you can try checking the URL type by seeing how many parts the path has

```js
console.debug('/news/September-2021'.split('/').length) // 3
console.debug('/news/category/support-soldiers/3'.split('/').length) // 5
console.debug('/news/royal-marines-show-us-troops-whos-boss-in-military-exercise/7986'.split('/').length) // 4
```

Lucky for us, we do have different number of total path elements for monthly archive, category, and post page URLs.

- if it is 4 parts it is a post URL (``/news/royal-marines-show-us-troops-whos-boss-in-military-exercise/7986`)
- if it is 3 parts it could be a monthly archive URL (`/news/September-2021`)
- if it is 5 parts it could be a category URL (`/news/category/support-soldiers/3`)

When splitting a URL path on `/` be very careful about beginning and trailing slashes because the number of resulting elements changes

```js
console.debug('/news'.split('/').length) // 2
console.debug('/news/'.split('/').length) // 3

console.debug('/news/archive'.split('/').length) // 3
console.debug('/news/archive/'.split('/').length) // 4
```

```js
console.debug('news/September-2021'.split('/')) // ["news", "September-2021"]
console.debug('/news/September-2021'.split('/')) // ["", "news", "September-2021"]
```

First element is an empty string because of the `/` at the beginning of the path. **When you get a `pathname` from a URL object, it always has a `/` at the beginning and no trailing `/` at the end**

```js
let testUrl = new URL(
  'https://forcespenpals.co.uk/news/british-army-to-tackle-climate-change-with-2-million-trees/7920',
)
console.log(testUrl.pathname) // "/news/british-army-to-tackle-climate-change-with-2-million-trees/7920"
```

### Determining path by matching against a regex pattern

```js
;/\/(news)\/[^\n\r\/]*\/(\d+)/i
```

will match post URL

```
/news/royal-marines-show-us-troops-whos-boss-in-military-exercise/7986
```

- starts with `/news`
- ends with digits (e.g. `7986`)
- has only one `/` separated part between start and end pattern

```js
;/\/(news)\/.*\/(\d+)/i
```

https://app.forcespenpals.co.uk/#activity
will match both category and post

```
/news/category/support-soldiers/3
/news/royal-marines-show-us-troops-whos-boss-in-military-exercise/7986
```

## Links

- [Fireshop.io: regex cheat sheet](https://fireship.io/lessons/regex-cheat-sheet-js/)
- [Regexr](https://regexr.com/)
- [regex101](https://regex101.com/)
- [RegExp.prototype.test()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)
- [API: URL](https://developer.mozilla.org/en-US/docs/Web/API/URL)
- [URL()](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL)
