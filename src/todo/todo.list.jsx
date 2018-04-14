import React from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import IconButton from '../template/icon.button'

import { markAsDone, markAsPending } from "./todo.actions";

const TodoList = props => {
  const renderRows = () => {
    const list = props.list || []
    return list.map(todo => (
      <tr key={todo._id}>
        <td className={todo.done ? 'marked-as-done': ''}>
          {todo.description}
        </td>
        <td>
          <IconButton hide={todo.done} style="success" icon="check" onClick={() => props.markAsDone(todo)}/>
          <IconButton hide={!todo.done} style="warning" icon="undo" onClick={() => props.markAsPending(todo)}/>
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
const mapDispatchToProps = dispatch => bindActionCreators({markAsDone, markAsPending}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)