/**
 * 商品详情
 */
'use strict';
import React from 'react';
import {
  Dimensions,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { NaviGoBack } from '../utils/CommonUtils';
import Header from '../components/Header';
var {height, width} = Dimensions.get('window');

class GoodDetails extends React.Component {
  constructor(props) {
    super(props);
    this.buttonBackAction=this.buttonBackAction.bind(this);
    this.state={

      }
  }
    //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }
  render() {
    return (
       <View style={{backgroundColor:'#fff',flex:1}}>
           <Header title='菜品详情'  hasBack={true}
           backAction={()=>{this.buttonBackAction()}}  />
      </View>
    );
  }
}
let styles = StyleSheet.create({

});
export default GoodDetails;
