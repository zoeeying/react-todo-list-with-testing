import React from 'react'
import TodoList from './containers/TodoList'
import NotFound from './containers/NotFound'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={TodoList} />
        <Route path="/" component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
