import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from '../store'
import '../index.css'

class Header extends Component {
  onInputKeyUp = e => {
    const { inputValue, addUndoItem, onInputChange } = this.props
    if (e.keyCode === 13 && !!inputValue) {
      addUndoItem(inputValue)
      onInputChange('')
    }
  }

  render() {
    const { inputValue, onInputChange } = this.props
    return (
      <div className="header">
        <div className="header_content">
          TodoList
          <input
            placeholder="Add Todo"
            className="header_input"
            data-test="header-input"
            value={inputValue}
            onChange={e => {
              onInputChange(e.target.value)
            }}
            onKeyUp={this.onInputKeyUp}
          ></input>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  inputValue: state.todo.inputValue,
})
const mapDispatch = dispatch => ({
  onInputChange(value) {
    dispatch(actions.changeInputValue(value))
  },
})

export default connect(mapState, mapDispatch)(Header)
