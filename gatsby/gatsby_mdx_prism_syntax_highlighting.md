---
title: Syntax highlighting for fenced code blocks in Gatsby MDX
date: 2020-05-01
slug: gatsby_mdx_prism_syntax_highlighting
---

My Gatsby setup uses MDX. And i need to add syntax highlighting to the fenced code blocks

Had to install the `prism-react-renderer` plugin

```bash
npm install --save prism-react-renderer
```

And in my `gatsby-browser.js` i needed to add the following code

```jsx
import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import Highlight, { defaultProps, theme } from 'prism-react-renderer'
import github from 'prism-react-renderer/themes/github'

/* eslint-disable */
const component = {
  pre: (props) => {
    const className = props.children.props.className || ''
    const matches = className.match(/language-(?<lang>.*)/)
    return (
      <Highlight
        {...defaultProps}
        code={props.children.props.children}
        language={matches && matches.groups && matches.groups.lang ? matches.groups.lang : ''}
        theme={github}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    )
  },
}
export const wrapRootElement = ({ element }) => {
  return <MDXProvider components={component}>{element}</MDXProvider>
}
```

And that's it. Now all fenced code blocks in Markdown will show proper syntax highlighting

The theme i am using [came with the plugin](https://github.com/FormidableLabs/prism-react-renderer/tree/master/src/themes), but i plan on [creating my custom theme](https://github.com/FormidableLabs/prism-react-renderer#theming) to match the site.

Will probably have to add support for additional languages

### Add support for additional languages

You have to install the `prismjs` package

```bash
npm i prismjs
```

And then add the following to `gatsby-browser.js`

```jsx
import Prism from 'prism-react-renderer/prism'
;(typeof global !== 'undefined' ? global : window).Prism = Prism // gotta do this one otherwise it'll say Prism is not defined

require('prismjs/components/prism-csharp')
```

You can see a [list of included languages here](https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js) and [all supported langs here](https://github.com/PrismJS/prism/tree/master/components)

## Links

- [Syntax Highlighting in Gatsby MDX](https://malikgabroun.com/syntax-highlighting-in-gatsby-mdx)
