import React from 'react'
import { mount } from 'enzyme'
import TodoList from '../../index'
import { findTestWrapper } from '@/utils/testUtils'

it('输入框输入内容 => 点击回车 => 列表中展示输入的内容项', () => {
  const wrapper = mount(<TodoList />)
  const inputEle = findTestWrapper(wrapper, 'header-input')
  const value = '小畅叙好好学习'
  inputEle.simulate('change', {
    target: { value },
  })
  inputEle.simulate('keyUp', {
    keyCode: 13,
  })
  const listItems = findTestWrapper(wrapper, 'list-item')
  expect(listItems.length).toEqual(1)
  expect(listItems.text()).toContain(value)
})
