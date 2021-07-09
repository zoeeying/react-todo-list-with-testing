import React, { Component } from 'react'
import '../index.css'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
    }
  }

  onInputChange = e => {
    this.setState({
      inputValue: e.target.value,
    })
  }

  onInputKeyUp = e => {
    const { inputValue } = this.state
    const { addUndoItem } = this.props
    if (e.keyCode === 13 && !!inputValue) {
      addUndoItem(inputValue)
      this.setState({
        inputValue: '',
      })
    }
  }

  render() {
    const { inputValue } = this.state
    return (
      <div className="header">
        <div className="header_content">
          TodoList
          <input
            placeholder="Add Todo"
            className="header_input"
            data-test="header-input"
            value={inputValue}
            onChange={this.onInputChange}
            onKeyUp={this.onInputKeyUp}
          ></input>
        </div>
      </div>
    )
  }
}

export default Header
