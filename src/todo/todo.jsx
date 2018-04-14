import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/page.header'

import TodoForm from './todo.form'
import TodoList from './todo.list'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      description: '',
      list: []
    }

    this.handleClearSearch = this.handleClearSearch.bind(this)

    this.refresh()
  }

  handleClearSearch() {
    this.refresh()
  }

  refresh(description = '') {
    const search = description ? `&description__regex=/${description}/` : ''
    axios.get(`${URL}?sort=-createdAt${search}`)
      .then( resp => this.setState({...this.state, description, list: resp.data}) )
  }

  render() {
    return (
      <div>
        <PageHeader name="Tasks" small="form" />
        <TodoForm handleClearSearch={this.handleClearSearch} />
        <TodoList />
      </div>
    )
  }
}