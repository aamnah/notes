import React from 'react'

/*
Needed to create this component in order to embed Gists from Github
https://betterstack.dev/blog/how-to-embed-a-github-gist-in-your-website/
*/
export class Gist extends React.Component {
  constructor(props) {
    super(props)
    this.gist = props.id
    this.file = props.file
    this.stylesheetAdded = false
    this.state = {
      loading: true,
      src: '',
    }
  }

  // The Gist JSON data includes a stylesheet to add to the page
  // to make it look correct. `addStylesheet` ensures we only add
  // the stylesheet one time.
  addStylesheet = (href) => {
    if (!this.stylesheetAdded) {
      this.stylesheetAdded = true
      var link = document.createElement('link')
      link.type = 'text/css'
      link.rel = 'stylesheet'
      link.href = href

      document.head.appendChild(link)
    }
  }

  componentDidMount() {
    // Create a JSONP callback that will set our state
    // with the data that comes back from the Gist site
    var gistCallback = Gist.nextGistCallback()
    window[gistCallback] = function(gist) {
      this.setState({
        loading: false,
        src: gist.div,
      })
      this.addStylesheet(gist.stylesheet)
    }.bind(this)
    var url = 'https://gist.github.com/' + this.props.id + '.json?callback=' + gistCallback
    if (this.props.file) {
      url += '&file=' + this.props.file
    }
    // Add the JSONP script tag to the document.
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    document.head.appendChild(script)
  }
  render() {
    if (this.state.loading) {
      return <div>loading gist from github...</div>
    } else {
      return <div dangerouslySetInnerHTML={{ __html: this.state.src }} />
    }
  }
}
// Each time we request a Gist, we’ll need to generate a new
// global function name to serve as the JSONP callback.
var gistCallbackId = 0
Gist.nextGistCallback = () => {
  return 'embed_gist_callback_' + gistCallbackId++
}

// USAGE
// <Gist id="aVolpe/fffbe6a9e9858c7e3546fb1d55782152"/>
// <Gist id="aVolpe/fffbe6a9e9858c7e3546fb1d55782152" file="SetUtils.java"/>
