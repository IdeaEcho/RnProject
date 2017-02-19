'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import ScrollableTabView, {DefaultTabBar } from 'react-native-scrollable-tab-view';
import {
    Text,
    View
 } from 'react-native';

 import Counter from '../components/counter';
 import CounterPage from './counterPage';
 import MenuPage from './menuPage';
 import ScanPage from './scanPage';
 import UserPage from './userPage';
 import * as counterActions from '../actions/counterActions';


class HomeApp extends Component {
  constructor(props) {
      super(props);
  }
  render() {
    const { state, actions } = this.props;
    console.log('ssss');
    return (
        <ScrollableTabView
            tabBarPosition='bottom'
            renderTabBar={() => <DefaultTabBar/>}>
            <View tabLabel='主页'>
                 <MenuPage  />
            </View>
            <View tabLabel='扫码点餐'>
                 <ScanPage  />
            </View>
            <View tabLabel='我的'>
                 <UserPage  />
            </View>
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
