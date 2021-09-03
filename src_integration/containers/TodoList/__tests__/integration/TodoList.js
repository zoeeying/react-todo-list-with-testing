/* eslint-disable jest/no-mocks-import */
import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { findTestWrapper } from '@/utils/testUtils'
import store from '@/store/createStore'
import TodoList from '../../index'
import axios from '../../__mocks__/axios'

// 使用Jest中的定时器代替真正的定时器
// 每个测试用例执行的时候，重置定时器调用
beforeEach(() => {
  jest.useFakeTimers()
  axios.success = true
})

it('输入框输入内容 => 点击回车 => 列表中展示输入的内容项', () => {
  const wrapper = mount(
    <Provider store={store}>
      <TodoList />
    </Provider>
  )
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

it('打开页面5秒后请求接口 => 请求正常 => 展示接口返回的数据', done => {
  const wrapper = mount(
    <Provider store={store}>
      <TodoList />
    </Provider>
  )
  // 运行测试时，立即执行定时器中的代码，无需真正等待定时器设置的时间
  jest.runAllTimers()
  expect(setTimeout).toHaveBeenCalledTimes(1) // setTimeout被执行了1次
  // 异步请求接口的测试用例，需要更新wrapper，且需要手动执行一下done函数
  // 可以使用setTimeout代替process.nextTick
  // 运行测试的时候，不会真的调用axios，而是调用__mocks__中的axios
  process.nextTick(() => {
    wrapper.update()
    const listItems = findTestWrapper(wrapper, 'list-item')
    expect(listItems.length).toEqual(1)
    done()
  })
})

it('打开页面5秒后请求接口 => 请求异常 => 页面展示正常，只是没有列表数据', done => {
  axios.success = false
  const wrapper = mount(
    <Provider store={store}>
      <TodoList />
    </Provider>
  )
  jest.runAllTimers()
  expect(setTimeout).toHaveBeenCalledTimes(1)
  process.nextTick(() => {
    wrapper.update()
    const listItems = findTestWrapper(wrapper, 'list-item')
    expect(listItems.length).toEqual(0)
    done()
  })
})
