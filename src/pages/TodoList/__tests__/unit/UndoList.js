import React from 'react'
import { shallow } from 'enzyme'
import UndoList from '../../components/UndoList'
import { findTestWrapper } from '@/utils/testUtils'

describe('测试UndoList组件', () => {
  const listData = [
    { value: '学习Jest', status: 'blur' },
    { value: '学习React', status: 'blur' },
    { value: '学习单元测试', status: 'blur' },
  ]

  it('UndoList组件样式渲染正常', () => {
    const wrapper = shallow(<UndoList list={[]} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('当传入数据为空数组时，count显示为0，列表无内容', () => {
    const wrapper = shallow(<UndoList list={[]} />)
    const countEle = findTestWrapper(wrapper, 'show-count')
    const listItems = findTestWrapper(wrapper, 'list-item')
    expect(countEle.text()).toBe('0')
    expect(listItems.length).toBe(0)
  })

  it('当传入数据不是空数组时，count显示为数组长度，列表有内容', () => {
    const wrapper = shallow(<UndoList list={listData} />)
    const countEle = findTestWrapper(wrapper, 'show-count')
    const listItems = findTestWrapper(wrapper, 'list-item')
    expect(countEle.text()).toBe('3')
    expect(listItems.length).toBe(3)
  })

  it('当传入数据不是空数组时，存在删除按钮', () => {
    const wrapper = shallow(<UndoList list={listData} />)
    const deleteItems = findTestWrapper(wrapper, 'delete-item')
    expect(deleteItems.length).toBe(3)
  })

  it('当传入数据不是空数组时，点击某个删除按钮，会调用删除方法', () => {
    const fn = jest.fn()
    const wrapper = shallow(<UndoList list={listData} deleteItem={fn} />)
    const deleteItems = findTestWrapper(wrapper, 'delete-item')
    // deleteItems是wrapper数组，如果想模拟点击第二个删除按钮
    // 不可以直接使用deleteItems[1]，需要使用deleteItems.at(1)
    const index = 1
    deleteItems.at(index).simulate('click', {
      stopPropagation: () => {},
    })
    expect(fn).toHaveBeenLastCalledWith(index) // fn最后一次被调用传入的参数是1
  })

  it('当点击某一项时，触发执行changeStatus函数', () => {
    const fn = jest.fn()
    const index = 1
    const wrapper = shallow(<UndoList list={listData} changeStatus={fn} />)
    const listItem = findTestWrapper(wrapper, 'list-item')
    listItem.at(index).simulate('click')
    expect(fn).toHaveBeenLastCalledWith(index) // fn最后一次被调用传入的参数是1
  })

  it('当某一项status是focus时，展示input输入框', () => {
    listData[0].status = 'focus'
    const wrapper = shallow(<UndoList list={listData} />)
    const inputItem = findTestWrapper(wrapper, 'list-input')
    expect(inputItem.length).toBe(1)
  })

  it('当某一个input输入框失去焦点时，触发onInputBlur函数', () => {
    listData[0].status = 'focus'
    const fn = jest.fn()
    const wrapper = shallow(<UndoList list={listData} onInputBlur={fn} />)
    const inputItem = findTestWrapper(wrapper, 'list-input')
    inputItem.simulate('blur')
    expect(fn).toHaveBeenLastCalledWith(0)
  })

  it('当某一个input输入框变更时，触发onInputChange函数', () => {
    listData[0].status = 'focus'
    const value = '小畅叙'
    const fn = jest.fn()
    const wrapper = shallow(<UndoList list={listData} onInputChange={fn} />)
    const inputItem = findTestWrapper(wrapper, 'list-input')
    inputItem.simulate('change', {
      target: { value },
    })
    expect(fn).toHaveBeenLastCalledWith(0, value)
  })
})
