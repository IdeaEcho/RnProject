import React, {Component} from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import configureStore from './store/configure-store'
import HomeApp from './containers/homeApp'

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HomeApp />
      </Provider>
    );
  }
}
