---
title: What i did
description: an almost daily log of the things i end up doing, What i learned and the progress i have made over time
slug: progress
sidemenu: true
date: 2017-03-17
lastmod: 2020-06-30
---

#### July 1, 2020

- Got the entire pipeline tested up till the point where i'm sending a built Android app bundle `.aab` to Firebase App Distribution
- The pipeline at this point has these steps:
  - Publish to Expo
  - Export static files
  - Deploy to Netlify (self-host)
  - Build app bundle
  - Send to Firebase
- Got familiar with using custom Docker containers inside the pipeline
- Brought down the time to build from ~40 minutes (using Expo) to ~10 minutes (using turtle)

#### June 30, 2020

- Learned and used YAML anchors
- Used artifacts in a bitbucket pipeline
- Setup a step that changes `--release-channel` based on Deployment variables
- Deployment variables vs. Repository variables
- Encoding and decoding a keystore as base64 for use in CI/CD

#### June 29, 2020

- Seep dive into the Android app signing process
- App signing key vs. Upload key

For the month of March, Arpil and May or so of 2020, read the [working from home during COVID-19](https://blog.aamnah.com/personal/14_days_social_isolation) post

#### May 19, 2020

- Watched [TypeScript: The Big Picture](https://app.pluralsight.com/library/courses/typescript-big-picture/).

Love [Simon Allardice](https://app.pluralsight.com/profile/author/simon-allardice) and his courses, the guy has a knack of explaining things in a simple and understandable way

#### May 18, 2020

- Finished the fourth module of C# Fundamentals
  - [Working with Classes and Objects](https://app.pluralsight.com/player?course=csharp-fundamentals-dev&author=scott-allen&name=1d2231ff-33d0-499b-8934-94df99d39d74&clip=0&mode=live)

#### May 17, 2020

- Spent a whole lot of time fixing a broken Opencart site. Turned out it was _cache_ inside a folder that was outside of `public_html/`. smh.

- Finished the third module of [Object-Oriented Programming Fundamentals in C#](https://app.pluralsight.com/library/courses/object-oriented-programming-fundamentals-csharp)
  - [Identifying Classes from Requirements](https://app.pluralsight.com/player?course=object-oriented-programming-fundamentals-csharp&author=deborah-kurata&name=oop-fundamentals-csharp-m2-identifying-classes&clip=0&mode=live)

#### May 16, 2020 (Sat)

- Spent the most part of the day looking into an Opencart website and transferring it's setup as well as upgrading the server it was on
- Made notes on C#, wrote a couple of blog posts
- Added Google Analytics and RSS feed to the Gatsby site

#### May 15, 2020

- Spent a lot of time looking into Zendesk API and handling customer support for work
- Implemented incremental Netlify builds for the Gatsby site

#### May 14, 2020

- revised the C# course modules on [C# Fundamentals](https://app.pluralsight.com/library/courses/csharp-fundamentals-dev)
- pushed major updates to the Gatsby blog including generating pages for MDX posts based on filenames instead of `path` in frontmatter. Also merged the content into one folder. So it's `content` for all of them with a folder called `personal` inside. Previously it used to be a folder called `notes` for non-personal dev notes and a folder called `blog` for personal blog posts. Having multiple folders made it difficult when building templates as i always had to apply filters on queries..
- Work included looking into SignalR connectivity issues and stuff like wildcard SSLs and custom domain names for Azure services
- practiced uke

#### May 13, 2020

- Felt enlightened after finding out that sending messages to a Slack channel is as easy as posting data to a webhook using something as basic as a `curl` command. This opens up so many possibilities for scripting notifications.. I started looking into it because i wanted to send monitoring alerts for a linux server if it was running high on CPU/RAM..
- Looked into a variety of system monitoring tools. The ones that i particularly liked were `htop`, `sar`, Munin and Monit
- worked out
- practiced uke

#### 13 Jul 2018 Fri

- TLDR Dev Notes
  - Fixed some styles for the Hugo based sites (used CSS grid)
  - Deployed the Hugo based site to Netlify
- JS Labs
  - Generated and uploaded the favicon and touch icons [generator](https://realfavicongenerator.net/)
- Desi On Keto
  - Generated and uploaded the favicon and touch icons

#### 12 Jul 2018 Thurs

- JavaScript Coding challenges (average scores and winner, grade calculator, BMI calculator)
- JS Labs
  - Registered and put up a website for jslabs.pk
  - Designed the logo
- [Drumkit](https://drumkit.jslabs.pk) in pure vanilla JS

#### 12 Nov 2017 Sun

- [Note: Notes on handling clicks and taps on iOS devices and touch enabled mobile browsers]()

#### 11 Nov 2017 Sat

- Focus for the day: Browser events, capturing, bubbling, propagation and delegation
- [Note: Event Capturing, Event Bubbling and Event Delegation]()
- [Note: Resetting an 'Unavailable' Serial Number on a Mac]()
- [Note: Get all kinds of information about your Mac machine using the Terminal]()

##### 22 March 2017 Wed

- [Functions and Event Delegation](https://codyhouse.co/course/learn-javascript-jquery/)

##### 21 March 2017 Tues

- [Querying the DOM II](https://codyhouse.co/course/learn-javascript-jquery/)
- Web APIs and Interfaces
- Querying the DOM
- HTMLCollection and NodeList

##### 20 March 2017 Mon

- [Querying the DOM I](https://codyhouse.co/course/learn-javascript-jquery/)

##### 19 March 2017 Sun

- [TLDR: ES6 Classes vs. Constructor Functions](/es6-classes-vs-constructor-functions)

##### 17 March 2017 Fri

- [Learn and Understand NodeJS](https://www.udemy.com/understand-nodejs/learn/v4)
  - Modules, Exports and Require
- [TLDR: Prototypal Inheritance and Constructor Functions](/prototypal-inheritance-constructor-functions)

##### 16 March 2017 Thurs

- [Learn and Understand NodeJS](https://www.udemy.com/understand-nodejs/learn/v4)
  - V8: The JavaScript Engine
  - The Node Core

##### 15 March 2017 Wed

- [HTML Image Maps](http://tldrdevnotes.com/html-img-map-clickable-areas-coords-shape)

##### 26 Dec 2016 Mon

- Nodeschool.io functional-javascript-workshop (passed till 6)
- `.every()`
- `.reduce()`
- Recursion

##### 25 Dec 2016 Sun

- Async/await functions
- `.forEach()`
- `.map()`
- `.reduce()`
- `.concat()`
- `.filter()`

##### 15 Dec 2016 Thurs

- [YouTube: Michael Jackson - React Router at react-europe 2015](https://www.youtube.com/watch?v=Q6Kczrgw6ic&t=382s)
- [YouTube: The myth of the “Real JavaScript Developer” – Brenna O'Brien / Front-Trends 2016](https://www.youtube.com/watch?v=Xt5qpbiqw2g)

##### 14 Dec 2016 Wed

- worked on my Twitch app (reducers and actions for fetching data for an array of users + add users)
- [YouTube: Anjana Vakil: Learning Functional Programming with JavaScript - JSUnconf 2016](https://www.youtube.com/watch?v=e-5obm1G_FY)
- [YouTube: React Router v4 with Michael Jackson and Ryan Florence - Modern Web](https://www.youtube.com/watch?v=Vur2dAFZ4GE)

##### 13 Dec 2016 Tues

- Twitch app project: Refactored the actions and reducers
- Twitch app project: defined my state shape

##### 12 Dec 2016 Mon

- [Pluralsight: React Core Concepts](https://www.pluralsight.com/courses/react-flux-building-applications)
- [Treehouse: The JavaScript 'use strict' Statement](https://teamtreehouse.com/library/the-javascript-use-strict-statement-2)
- [Treehouse: Template Strings](https://teamtreehouse.com/library/template-strings)
- Pair programming session 6pm-7:30pm
- Started my twitch app and worked on putting Redux in place

##### 11 Dec 2016 Sun

- [Pluralsight: React Lifecycle](https://www.pluralsight.com/courses/react-flux-building-applications)
- Wikipedia Viewer app works

##### 10 Dec 2016 Sat

- [Youtube: Connecting React & Redux](https://www.youtube.com/watch?v=nrg7zhgJd4w&list=PLoYCgNOIyGADILc3iUJzygCqC8Tt3bRXt&index=5#t=246.991283)
- [Pluralsight: Actions, Stores and Reducers](https://app.pluralsight.com/library/courses/react-redux-react-router-es6/table-of-contents)
- [Pluralsight: Connecting React to Redux](https://app.pluralsight.com/library/courses/react-redux-react-router-es6/table-of-contents)
- Provider, Connect, mapStateToProps, mapDispatchToProps, bindActionCreators
- [Pluralsight: Async in Redux](https://app.pluralsight.com/library/courses/react-redux-react-router-es6/table-of-contents)

##### 9 Dec 2016 Fri

- made a redux app with API, got stuck with React integration (mapping)
- made a react-redux app with API again, got stuck with reducers (parts of state not updating)
- cursed profusely

##### 8 Dec 2016 Thurs

- back to the very basics, did the completely React-less Redux counter form Dan's Redux basics course
- Dan's redux basics course
- Looked into async actions in redux, updating store with fetched data

##### 7 Dec 2016 Wed

- wrapped my head around middleware
- wrapped my head around redux fundamentals (actions, reducers, enhancers, selectors)
- [Docs: Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html)
- spent hours reading Redux and React docs
- created the example redux todo app

##### 3 Dec 2016 Sat

- Higher-order functions (2 hrs)

##### 28 Nov 2016 Mon

- Why Redux?
- [TutsPlus: Modern Web Apps with React and Redux](https://code.tutsplus.com/courses/modern-web-apps-with-react-and-redux)
- [SitePoint: React the ES6 Way](https://www.sitepoint.com/premium/courses/react-the-es6-way-2914/)

##### 27 Nov 2016 Sun

- SASS loader for Webpack
- Standard JS Style
- Standard JS Style loader for Webpack
- Arrow function syntax
- Local storage API

##### 25 Nov 2016 Fri

- finished the Random Quotes project
  - added a tweet button using Web intent (Twitter docs)
  - generate new quote with button click (enclosed the reqwest stuff in `fetchQuote()` and called it from another function called `handleClick()`)
- `this`
- bind

##### 24 Nov 2016 Thurs

- got data in and presented it in React

##### 23 Nov 2016 Wed

- `var`, `let` and `const`
- Promises
- XMLHttpRequest
- [YouTube: Arrow Function Syntax](https://www.youtube.com/watch?v=6sQDTgOqh-I)

##### 22 Nov 2016 Tues

- React JS Fundamentals: Pure Functions, props, and nesting React components in React
- Created a react project that has nested components, pushed to Gitlab
- PropTypes

##### 21 Nov 2016 Mon

- FCC: Intermediate JS Algo - Roman Numeral Converter
- FCC: Intermediate JS Algo - Steamroller
- FCC: Intermediate JS Algo - Everything be true
- React JS Fundamentals: Intro to JS Ecosystem
- React JS Fundamentals: NPM
- React JS Fundamentals: Webpack for React
- React JS Fundamentals: First React Component
- React JS Fundamentals: Babel, Webpack and React
- React JS Fundamentals: Nested Components and Props in React
- React JS Fundamentals: Building UIs with Pure Functions and Function Composition in React
- [Pure Functions](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976##.bgkqjam90)

##### 20 Nov 2016 Sun

- FCC: Basic JS Algo - Caesar's Cipher
- FCC: Intermediate JS Algo - Arguments Optional
- FCC: Intermediate JS Algo - Diff Two Arrays
- FCC: Intermediate JS Algo - Missing Letters
- FCC: Intermediate JS Algo - Boo Who
- FCC: Intermediate JS Algo - Finders Keepers
- FCC: Intermediate JS Algo - Binary Agents

##### 19 Nov 2016 Sat

- Treehouse: Exploring JavaScript Conditionals (Switch statements, ternary operator, Short circuit evaluation)
- Treehouse: Introduction to Babel (transpiler)
- Treehouse: JavaScript Loops, Arrays and Objects
- Treehouse: React intro (JS library to build UI)
- Google: 'wtf is react and why do i need it'
- Google: JS Composition
