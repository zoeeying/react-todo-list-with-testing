import React, { Component } from 'react'
import Header from './components/Header'
import UndoList from './components/UndoList'
import './index.css'

class TodoList extends Component {
  state = {
    undoList: [],
  }

  addUndoItem = value => {
    this.setState({
      undoList: [
        ...this.state.undoList,
        {
          value,
          status: 'blur',
        },
      ],
    })
  }

  deleteItem = index => {
    const newList = [...this.state.undoList]
    newList.splice(index, 1)
    this.setState({
      undoList: newList,
    })
  }

  changeStatus = index => {
    const { undoList } = this.state
    this.setState({
      undoList: undoList.map((item, listIndex) => {
        if (index === listIndex) {
          return {
            ...item,
            status: 'focus',
          }
        }
        return {
          ...item,
          status: 'blur',
        }
      }),
    })
  }

  onInputBlur = index => {
    const { undoList } = this.state
    this.setState({
      undoList: undoList.map((item, listIndex) => {
        if (index === listIndex) {
          return {
            ...item,
            status: 'blur',
          }
        }
        return item
      }),
    })
  }

  onInputChange = (index, value) => {
    const { undoList } = this.state
    this.setState({
      undoList: undoList.map((item, listIndex) => {
        if (index === listIndex) {
          return {
            ...item,
            value,
          }
        }
        return item
      }),
    })
  }

  render() {
    const { undoList } = this.state
    return (
      <>
        <Header addUndoItem={this.addUndoItem} />
        <UndoList
          list={undoList}
          deleteItem={this.deleteItem}
          changeStatus={this.changeStatus}
          onInputBlur={this.onInputBlur}
          onInputChange={this.onInputChange}
        />
      </>
    )
  }
}

export default TodoList
