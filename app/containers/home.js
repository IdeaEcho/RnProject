'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {
    Text,
    View,
    Image,
    StyleSheet
 } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Menu from './menu';
import Cart from './cart';
import Index from './index';
import Scan from './scan';
import User from './user';
import * as counterActions from '../actions/counterActions';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab:'home'
        };
    }
  render() {
    return (
        <TabNavigator>
            <TabNavigator.Item
            title="推荐"
            selected={this.state.selectedTab === 'home'}
            selectedTitleStyle={styles.selectedTextStyle}
            titleStyle={styles.textStyle}
            renderIcon={() => <Image source={require("../imgs/tab_good.png")} style={styles.iconStyle}/>}
            renderSelectedIcon={() => <Image source={require("../imgs/tab_good_press.png")} style={styles.iconStyle}/>}
            onPress={() => this.setState({ selectedTab: 'home' })}>
            <Index {...this.props}/>
            </TabNavigator.Item>
            <TabNavigator.Item
            title="订单"
            selected={this.state.selectedTab === 'order'}
            selectedTitleStyle={styles.selectedTextStyle}
            titleStyle={styles.textStyle}
            renderIcon={() => <Image source={require("../imgs/tab_menu.png")} style={styles.iconStyle}/>}
            renderSelectedIcon={() => <Image source={require("../imgs/tab_menu_press.png")} style={styles.iconStyle}/>}
            onPress={() => this.setState({ selectedTab: 'order' })}>
            <Menu {...this.props} />
            </TabNavigator.Item>

            <TabNavigator.Item
            title="购物车"
            selected={this.state.selectedTab === 'cart'}
            selectedTitleStyle={styles.selectedTextStyle}
            titleStyle={styles.textStyle}
            renderIcon={() => <Image source={require("../imgs/tab_cart.png")} style={styles.iconStyle}/>}
            renderSelectedIcon={() => <Image source={require("../imgs/tab_cart_press.png")} style={styles.iconStyle}/>}
            onPress={() => this.setState({ selectedTab: 'cart' })}>
            <Cart {...this.props} />
            </TabNavigator.Item>

            <TabNavigator.Item
            title="我的"
            selected={this.state.selectedTab === 'user'}
            selectedTitleStyle={styles.selectedTextStyle}
            titleStyle={styles.textStyle}
            renderIcon={() => <Image source={require("../imgs/tab_user.png")} style={styles.iconStyle}/>}
            renderSelectedIcon={() => <Image source={require("../imgs/tab_user_press.png")} style={styles.iconStyle}/>}
            onPress={() => this.setState({ selectedTab: 'user' })}>
            <User {...this.props}/>
            </TabNavigator.Item>
        </TabNavigator>
        );
        }
        }
const styles=StyleSheet.create({
   iconStyle:{
       width:26,
       height:26,
   },
   textStyle:{
       color:'#999',
   },
   selectedTextStyle:{
       color:'#fb633a',
   }
});
export default connect(state => ({
    state: state.counter
  }),
  (dispatch) => ({
    actions: bindActionCreators(counterActions, dispatch)
  })
)(Home);
