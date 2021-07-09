import React, { Component } from 'react'
import '../index.css'

class UndoList extends Component {
  render() {
    const { list, deleteItem, changeStatus, onInputBlur, onInputChange } = this.props
    return (
      <div className="undo_list">
        <div className="undo_list_title">
          正在进行
          <div data-test="show-count" className="undo_list_count">
            {list.length}
          </div>
        </div>
        <ul className="undo_list_content">
          {list.map((item, index) => (
            <li
              data-test="list-item"
              key={index}
              className="undo_list_item"
              onClick={() => {
                changeStatus(index)
              }}
            >
              <span>
                {item.status === 'blur' ? (
                  item.value
                ) : (
                  <input
                    value={item.value}
                    className="list-input"
                    data-test="list-input"
                    onBlur={() => {
                      onInputBlur(index)
                    }}
                    onChange={e => {
                      onInputChange(index, e.target.value)
                    }}
                  ></input>
                )}
              </span>
              <div
                className="undo_list_delete"
                data-test="delete-item"
                onClick={e => {
                  e.stopPropagation()
                  deleteItem(index)
                }}
              >
                -
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default UndoList
