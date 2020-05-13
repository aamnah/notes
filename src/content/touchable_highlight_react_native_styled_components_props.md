---
title: Passing style props to React Native core components in styled-components
date: 2020-04-21
path: touchable_highlight_react_native_styled_components_props
---

```jsx
// using the `attrs` constructor to pass style props
// see https://github.com/styled-components/styled-components/pull/365
// and https://github.com/styled-components/styled-components/issues/149
const Container = styled.TouchableHighlight.attrs({
  underlayColor: Color.primaryDark,
})`
  justify-content: center;
  align-content: center;
  align-items: center;
`
```
