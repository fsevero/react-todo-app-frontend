import { combineReducers } from "redux";

const rootReducer = combineReducers({
  todo: () => ({
    description: 'Ler livro',
    list: [{
      _id: 1,
      description: 'Pagar fatura do cartão',
      done: true
    },{
      _id: 2,
      description: 'Reunião com equipe às 10:00',
      done: false
    },{
      _id: 3,
      description: 'Consulta médica depois do almoço na terça',
      done: false
    }]
  })
})

export default rootReducer