---
title: ES5 and ES6 React component styles
categories:
  - "ReactJS"
date: 2016-12-05
lastmod: 2024-07-12
---

NOTE (2024-07-12): _Stateless_ components are no longer _a thing_, they're called _function components_ now, and can optionally have state. This is a really old post and may not reflect modern React practices. 

- ES5 createClass Component
- ES6 Class Components
- ES5 Stateless Component
- ES6 Stateless Component

## ES5 createClass Component

```javascript
var HelloWorld = React.createClass({
  render: function () {
    return <h1>Hello World!M/h1>;
  }
});
```
## ES6 Class Components

```jsx
import React, { Component } from "react";

export default class Login extends Component {  
  render() {
    return (
      <div>
        Login Form will go here
      </div>
    )
  }
}
```

- No autobind, requires explicit bind with ES6 class
 
```jsx
// Works fine with ES5 createClass
<div onClick={ this.handleClick() }></div>

// Requires Explicit binding with ES6 Class
<div onClick={ this.handleClick().bind(this) }></div>
```
- PropTypes  are declared separately
- Default props are declared separately
- Set initial state in constructor


## ES5 Stateless Component

```jsx
var HelloWorld = function(props) {
  return <h1>Hello World!</h1>;
};
```
## ES6 Stateless Component

```jsx
const HelloWorld = (props) => {
  return <h1>Hello World!</h1>
}
```

OR 

```jsx
function HelloWorld(props) {
  return <h1>Hello World!</h1>
}
```
