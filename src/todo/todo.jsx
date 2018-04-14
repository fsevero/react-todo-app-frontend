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

    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
    this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleClearSearch = this.handleClearSearch.bind(this)

    this.refresh()
  }

  handleAdd() {
    const description = this.state.description
    axios.post(URL, { description })
      .then( resp => this.refresh() )
  }

  handleRemove(todo) {
    axios.delete(`${URL}/${todo._id}`)
      .then( resp => this.refresh(this.state.description) )
  }

  handleMarkAsDone(todo) {
    axios.put(`${URL}/${todo._id}`, {...todo, done:true})
      .then( resp => this.refresh(this.state.description) )
  }

  handleMarkAsPending(todo) {
    axios.put(`${URL}/${todo._id}`, {...todo, done:false})
      .then( resp => this.refresh(this.state.description) )
  }

  handleSearch() {
    this.refresh(this.state.description)
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

        <TodoForm handleAdd={this.handleAdd}
                  handleSearch={this.handleSearch}
                  handleClearSearch={this.handleClearSearch} />

        <TodoList handleMarkAsDone={this.handleMarkAsDone}
                  handleMarkAsPending={this.handleMarkAsPending}
                  handleRemove={this.handleRemove}/>
      </div>
    )
  }
}