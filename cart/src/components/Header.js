import React, { PropTypes, Component } from 'react'
import TodoTextInput from './TodoTextInput'

export default class Header extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
    addSum: PropTypes.func.isRequired
  }

  handleSave = (text,price) => {
    if (text.length !== 0) {
      this.props.addTodo(text)
      this.props.addSum(parseFloat(price).toFixed(2))
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <TodoTextInput newTodo
                       text="Food1"
                       price={10.233}
                       onSave={this.handleSave}
                       placeholder="What needs to be done?" />
      </header>
    )
  }
}
