import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

export default class TodoTextInput extends Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired,
    text: PropTypes.string,
    price: PropTypes.number,
    placeholder: PropTypes.string,
    editing: PropTypes.bool,
    newTodo: PropTypes.bool
  }

  state = {
    text: this.props.text || ''
  }

  handleSubmit = e => {
    const text = e.target.value.trim()
    const price = e.target.getAttribute('data-price')
      this.props.onSave(text,price)
      if (this.props.newTodo) {
        this.setState({ text: '' })
      }
  }

  render() {
    return (
      <input className={
        classnames({
          edit: this.props.editing,
          'new-todo': this.props.newTodo
        })}
        type="button"
        placeholder={this.props.placeholder}
        value={this.props.text}
        data-price={this.props.price}
        onClick={this.handleSubmit} />
    )
  }
}
