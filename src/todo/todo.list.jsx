import React from 'react'
import { connect } from "react-redux";

import IconButton from '../template/icon.button'

const TodoList = props => {
  const renderRows = () => {
    const list = props.list || []
    return list.map(todo => (
      <tr key={todo._id}>
        <td className={todo.done ? 'marked-as-done': ''}>
          {todo.description}
        </td>
        <td>
          <IconButton hide={todo.done} style="success" icon="check" onClick={() => props.handleMarkAsDone(todo)}/>
          <IconButton hide={!todo.done} style="warning" icon="undo" onClick={() => props.handleMarkAsPending(todo)}/>
          <IconButton hide={!todo.done} style="danger" icon="trash" onClick={() => props.handleRemove(todo)}/>
        </td>
      </tr>
    ))
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Descrição</th>
          <th className="table-actions">Ações</th>
        </tr>
      </thead>
      <tbody>
        {renderRows()}
      </tbody>
    </table>
  )
}

const mapStateToProps = state => ({list: state.todo.list})

export default connect(mapStateToProps)(TodoList)