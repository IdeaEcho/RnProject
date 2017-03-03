import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as Actions from '../actions'

const App = ({todos, price, actions}) => (
  <div>
    <Header addTodo={actions.addTodo} addSum={actions.addSum}/>
    <MainSection todos={todos} price={price} actions={actions} />
  </div>
)

App.propTypes = {
  todos: PropTypes.array.isRequired,
  price: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  todos: state.todos,
  price: parseFloat(state.price)
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
