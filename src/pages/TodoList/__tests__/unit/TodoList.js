import React from 'react'
import { shallow } from 'enzyme'
import TodoList from '../../index'

describe('测试TodoList组件', () => {
  const listData = [
    { value: '学习Jest', status: 'blur' },
    { value: '学习React', status: 'blur' },
    { value: '学习单元测试', status: 'blur' },
  ]

  it('初始化列表为空', () => {
    const wrapper = shallow(<TodoList />)
    expect(wrapper.state('undoList')).toEqual([])
  })

  it('Header组件存在addUndoItem属性', () => {
    const wrapper = shallow(<TodoList />)
    const Header = wrapper.find('Header')
    expect(Header.prop('addUndoItem')).toBeTruthy()
  })

  it('addUndoItem被调用，undoList增加一条数据', () => {
    const wrapper = shallow(<TodoList />)
    const item = '叙宝早起学习'
    wrapper.instance().addUndoItem(item)
    const undoList = wrapper.state('undoList')
    expect(undoList.length).toBe(1)
    expect(undoList[undoList.length - 1]).toEqual({
      value: item,
      status: 'blur',
    })
  })

  it('UndoList组件接收list、deleteItem、changeStatus、onInputBlur、onInputChange参数', () => {
    const wrapper = shallow(<TodoList />)
    const UndoList = wrapper.find('UndoList')
    expect(UndoList.prop('list')).toBeTruthy()
    expect(UndoList.prop('deleteItem')).toBeTruthy()
    expect(UndoList.prop('changeStatus')).toBeTruthy()
    expect(UndoList.prop('onInputBlur')).toBeTruthy()
    expect(UndoList.prop('onInputChange')).toBeTruthy()
  })

  it('deleteItem被调用，undoList减少一条数据', () => {
    const wrapper = shallow(<TodoList />)
    wrapper.setState({
      undoList: listData,
    })
    wrapper.instance().deleteItem(1)
    expect(wrapper.state('undoList')).toEqual([listData[0], listData[2]])
  })

  it('changeStatus被调用，undoList数据项的status被修改', () => {
    const wrapper = shallow(<TodoList />)
    wrapper.setState({
      undoList: listData,
    })
    wrapper.instance().changeStatus(1)
    expect(wrapper.state('undoList')[1]).toEqual({
      ...listData[1],
      status: 'focus',
    })
  })

  it('onInputBlur被调用，undoList数据项的status被修改', () => {
    const wrapper = shallow(<TodoList />)
    listData[0].status = 'blur'
    wrapper.setState({
      undoList: listData,
    })
    wrapper.instance().onInputBlur(0)
    expect(wrapper.state('undoList')[0]).toEqual({
      ...listData[0],
      status: 'blur',
    })
  })

  it('onInputChange被调用，undoList数据项的value被修改', () => {
    const wrapper = shallow(<TodoList />)
    listData[0].status = 'focus'
    wrapper.setState({
      undoList: listData,
    })
    wrapper.instance().onInputChange(0, '小畅叙')
    expect(wrapper.state('undoList')[0]).toEqual({
      ...listData[0],
      value: '小畅叙',
    })
  })
})
