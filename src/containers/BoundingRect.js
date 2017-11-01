import React from 'react'

const cloneDOMRect = ({ bottom, height, left, right, top, width, x, y }) =>
  ({ bottom, height, left, right, top, width, x, y })

export default class Layout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      size: {
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0,
        x: 0,
        y: 0,
      }
    }
  }

  componentWillUnmount () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.getSize)
    }
  }

  componentDidMount() {
    this.getSize = () => this.setState({
      size: cloneDOMRect(this.refs.wrapper.getBoundingClientRect()),
    })
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.getSize, false)
    }
    this.getSize()
  }

  render() {
    const clonedChildren = React.Children
      .map(this.props.children, child => React.cloneElement(child, this.state))

    return (
      <div ref="wrapper" {...this.props} >{clonedChildren}</div>
    )
  }
}
