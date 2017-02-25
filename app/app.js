import React, {Component} from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import configureStore from './store/configure-store'
import Root from './root'

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}
