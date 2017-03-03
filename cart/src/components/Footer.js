import React, { PropTypes, Component } from 'react'

export default class Footer extends Component {
  static propTypes = {
    price: PropTypes.number.isRequired,
    onClearCompleted: PropTypes.func.isRequired
  }

  renderTodoCount() {
    const { price } = this.props

    return (
      <span className="todo-count">
      {price > 1 &&
        <strong>{price}</strong> $
      }
      </span>
    )
  }


  renderClearButton() {
    const { completedCount, onClearCompleted } = this.props
    if (completedCount > 0) {
      return (
        <button className="clear-completed"
                onClick={onClearCompleted} >
          Clear completed
        </button>
      )
    }
  }

  render() {
    return (
      <footer className="footer">
        {this.renderTodoCount()}
        {this.renderClearButton()}
      </footer>
    )
  }
}
