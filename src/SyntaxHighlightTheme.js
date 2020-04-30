let Color = {
  color: '#393A34',
  background: '#f5f2f0',
  comment: '#999988',
  string: '#690',
  punctuation: '#393A34',
  property: '#1BBC9B',
  atrule: '#07a',
  function: '#ff6400',
  color9: '#6f42c1',
  keyword: '#905',
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
      types: ['punctuation', 'operator'],
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
      types: ['atrule', 'keyword', 'attr-name', 'selector'],
      style: {
        color: Color.atrule,
      },
    },
    {
      types: ['function', 'deleted', 'tag'],
      style: {
        color: Color.function,
      },
    },
    {
      types: ['function-variable'],
      style: {
        color: Color.color9,
      },
    },
    {
      types: ['tag', 'selector', 'keyword'],
      style: {
        color: Color.keyword,
      },
    },
  ],
}

export default theme
