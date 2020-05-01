let Color = {
  background: '#f1f1f1',
  color: '#333',
  punctuation: '#6a737d',
  keyword: '#ac19d8',
  tag: '#f92672',
  string: '#690',
  property: '#ff6400',
  // parameter: '#e5c07b',
  parameter: '#16967f',
  function: '#07a',
  operator: '#56b6c2',
  comment: '#abb2bf',

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
