import React from 'react'
import { shallow } from 'enzyme'
import Header from '../../components/Header'
import { findTestWrapper } from '../../../../utils/testUtils'

describe('测试Header组件', () => {
  it('快照测试，保证样式渲染正常', () => {
    const wrapper = shallow(<Header />)
    expect(wrapper).toMatchSnapshot()
  })

  it('包含input', () => {
    const wrapper = shallow(<Header />)
    const inputElement = findTestWrapper(wrapper, 'header-input')
    expect(inputElement.length).toBe(1)
  })

  it('input初始值是空串', () => {
    const wrapper = shallow(<Header />)
    const inputElement = findTestWrapper(wrapper, 'header-input')
    expect(inputElement.prop('value')).toEqual('')
  })

  it('input的值会跟随用户输入变化', () => {
    const wrapper = shallow(<Header />)
    const inputElement = findTestWrapper(wrapper, 'header-input')
    const inputValue = '今天是好好学习的叙宝'
    // 写法1：对组件中的state数据进行测试，适用于单元测试
    inputElement.simulate('change', {
      // 模拟事件
      target: { value: inputValue },
    })
    expect(wrapper.state('inputValue')).toEqual(inputValue)
    // 写法2：对DOM的属性进行测试，适用于集成测试
    // 这里需要重新获取一下DOM元素，重新渲染后的DOM元素上的属性值才是更新后的值
    // const inputElement2 = wrapper.find("input[data-test='header-input']")
    // expect(inputElement2.prop('value')).toBe(inputValue)
  })

  it('input框回车，如果值为空，无操作', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Header addUndoItem={fn} />)
    const inputElement = findTestWrapper(wrapper, 'header-input')
    wrapper.setState({ inputValue: '' }) // input框没有值
    inputElement.simulate('keyUp', {
      keyCode: 13,
    })
    expect(fn).not.toHaveBeenCalled()
  })

  it('input框回车，如果值不为空，函数被调用，最后清除掉input框中的内容', () => {
    const fn = jest.fn()
    const wrapper = shallow(<Header addUndoItem={fn} />)
    const inputElement = findTestWrapper(wrapper, 'header-input')
    wrapper.setState({ inputValue: '今天是好好学习的叙宝' }) // input框输入了值
    inputElement.simulate('keyUp', {
      keyCode: 13,
    })
    expect(fn).toHaveBeenCalled()
    expect(fn).toHaveBeenLastCalledWith('今天是好好学习的叙宝')
    const newInputElement = findTestWrapper(wrapper, 'header-input')
    expect(newInputElement.prop('value')).toBe('')
  })
})
