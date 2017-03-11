/**
 * 商品详情
 */
'use strict'
import React from 'react'
import {
  Dimensions,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import Header from '../components/Header'
import { NaviGoBack } from '../utils/CommonUtils'
var {height, width} = Dimensions.get('window')

class FoodDetails extends React.Component {
  constructor(props) {
    super(props)
    this.buttonBackAction=this.buttonBackAction.bind(this)
    this.state={

      }
  }
    //返回
  buttonBackAction(){
      const {navigator} = this.props
      return NaviGoBack(navigator)
  }
  render() {
    return (
       <View style={{backgroundColor:'#fff',flex:1}}>
          <Header title='菜品详情' hasBack={true} backAction={()=>{this.buttonBackAction()}} />

      </View>
    )
  }
}
let styles = StyleSheet.create({

})
export default FoodDetails
