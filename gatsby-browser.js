import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import Prism from 'prism-react-renderer/prism'
import syntaxTheme from './src/SyntaxHighlightTheme'
;(typeof global !== 'undefined' ? global : window).Prism = Prism

require('prismjs/components/prism-csharp')
require('prismjs/components/prism-php')

const component = {
  pre: (props) => {
    const className = props.children.props.className || ''
    const matches = className.match(/language-(?<lang>.*)/)
    return (
      <Highlight
        {...defaultProps}
        code={props.children.props.children}
        language={matches && matches.groups && matches.groups.lang ? matches.groups.lang : ''}
        theme={syntaxTheme}
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
