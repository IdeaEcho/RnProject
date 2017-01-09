'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/counter';
import CounterPage from './counterPage';
import * as counterActions from '../actions/counterActions';
import ScrollableTabView, {DefaultTabBar } from 'react-native-scrollable-tab-view';
import {
    Text,
    View
 } from 'react-native';

class HomeApp extends Component {
  constructor(props) {
      super(props);
  }
  render() {
    const { state, actions } = this.props;
    return (
        <ScrollableTabView
            tabBarPosition='bottom'
            renderTabBar={() => <DefaultTabBar/>}>
            <View tabLabel='发现'>
                 <CounterPage  />
            </View>
            <Text tabLabel='扫码点餐'/>
            <Text tabLabel='我的'/>
        </ScrollableTabView>
    );
  }
}

export default connect(state => ({
    state: state.counter
  }),
  (dispatch) => ({
    actions: bindActionCreators(counterActions, dispatch)
  })
)(HomeApp);
