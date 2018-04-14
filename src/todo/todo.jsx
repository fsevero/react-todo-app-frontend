import React from 'react'

import PageHeader from '../template/page.header'

import TodoForm from './todo.form'
import TodoList from './todo.list'

export default props => (
  <div>
    <PageHeader name="Tasks" small="form" />
    <TodoForm />
    <TodoList />
  </div>
)