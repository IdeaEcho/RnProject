import React, { Component, PropTypes } from 'react'
import TodoItem from './TodoItem'
import Footer from './Footer'

export default class MainSection extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    price: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired
  }

  handleClearCompleted = () => {
    this.props.actions.clearCompleted()
  }

  renderFooter(completedCount) {
    const { todos, price} = this.props
    // const sum = todos.length - completedCount

    if (todos.length) {
      return (
        <Footer completedCount={completedCount}
                price={price}
                onClearCompleted={this.handleClearCompleted.bind(this)}
                 />
      )
    }
  }

  render() {
    const { todos, actions } = this.props


    return (
      <section className="main">
        <ul className="todo-list">
          {todos.map(todo =>
            <TodoItem key={todo.id} todo={todo} {...actions} />
          )}
        </ul>
        {this.renderFooter()}
      </section>
    )
  }
}
