let Color = {
  background: '#1e1e1e',
  color: '#abb2bf',
  comment: '#5c6370',
  keyword: '#c678dd',
  tag: '#e06c75',
  string: '#98c379',
  property: '#d19a66',
  // parameter: '#e5c07b',
  parameter: '#84bfb5',
  function: '#61afef',
  operator: '#56b6c2',
  punctuation: '#abb2bf',

  color5: '#56b6c2',
  color9: '#6f42c1',
  color3: '#f92672',
}

var theme = {
  plain: {
    color: Color.color,
    backgroundColor: Color.background,
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: Color.comment,
        fontStyle: 'italic',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['string', 'attr-value'],
      style: {
        color: Color.string,
      },
    },

    {
      types: ['operator', 'punctuation'],
      style: {
        color: Color.punctuation,
      },
    },
    {
      types: ['entity', 'url', 'symbol', 'number', 'boolean', 'variable', 'constant', 'property', 'regex', 'inserted'],
      style: {
        color: Color.property,
      },
    },
    {
      types: ['attr-name'], // className, style, onClick etc
      style: {
        color: Color.property,
      },
    },
    {
      types: ['atrule'], // ? not in jsx
      style: {
        color: Color.atrule,
      },
    },
    {
      types: ['selector'], // ? not in jsx
      style: {
        color: '#f00',
      },
    },
    {
      types: ['function'], // render(), getElementById(), map() etc.
      style: {
        color: Color.function,
      },
    },
    {
      types: ['deleted', 'tag'], // div, pre, button etc.
      style: {
        color: Color.tag,
      },
    },
    {
      types: ['function-variable'], // ?
      style: {
        color: Color.color9,
      },
    },
    {
      types: ['keyword'], // import, class, extends etc.
      style: {
        color: Color.keyword,
      },
    },
    {
      types: ['parameter'], // import, class, extends etc.
      style: {
        color: Color.parameter,
      },
    },
  ],
}

export default theme
