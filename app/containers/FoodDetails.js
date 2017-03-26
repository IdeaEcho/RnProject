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
    const {route} = this.props
    let food = route.food
    return (
        <View style={{backgroundColor:'#fff',flex:1,alignItems:'center'}}>
            <Header title={food.dish_name} hasBack={true} backAction={()=>{this.buttonBackAction()}} />
            <View style={styles.box}>
                    <Image source={food.dish_photo ? {uri:food.dish_photo} : require('../imgs/logo@round.png')} style={styles.item_image}/>
                    <View style={{alignItems:'center',marginTop:10}}>
                        <Text style={styles.item_title}>{food.dish_name}</Text>
                    </View>
            </View>
            <View style={styles.info}>
                <Text style={styles.info_title}>酸：{food.acid}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.info_title}>甜：{food.sweet}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.info_title}>辣：{food.hot}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.info_title}>咸：{food.salty}</Text>
            </View>
        </View>
    )
    }
}
let styles = StyleSheet.create({
    box: {
        borderColor:'#1c2c3b',
        borderRadius:15,
        height:370,
        width:322,
        alignItems:'center',
        marginTop:30,
        borderWidth: 1
    },
    item_image: {
        marginTop:0,
        borderRadius:15,
        width:320,
        height:320
    },
    item_title: {
        fontSize: 20,
        color: '#1c2c3b'
    },
    info:{
        flexDirection: 'row',
        width:322,
        height:20,
        marginTop:10,
        marginLeft:30,
    },
    info_title:{
        fontSize: 16,
        color: '#1c2c3b'
    },
})
export default FoodDetails
