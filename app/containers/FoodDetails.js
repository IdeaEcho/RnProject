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
import TasteLevel from '../components/TasteLevel'
import { NaviGoBack } from '../utils/CommonUtils'
var {height, width} = Dimensions.get('window')

class FoodDetails extends React.Component {
  constructor(props) {
    super(props)
    this.buttonBackAction=this.buttonBackAction.bind(this)
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
            </View>
            {food.acid!=0 && <View style={styles.info}>
                <Text style={styles.info_title}>酸：</Text>
                <TasteLevel type='acid' level={food.acid} />
            </View> }
            {food.sweet!=0 && <View style={styles.info}>
                <Text style={styles.info_title}>甜：</Text>
                <TasteLevel type='sweet' level={food.sweet} />
            </View> }
            {food.hot!=0 && <View style={styles.info}>
                <Text style={styles.info_title}>辣：</Text>
                <TasteLevel type='hot' level={food.hot} />
            </View> }
            {food.salty!=0 && <View style={styles.info}>
                <Text style={styles.info_title}>咸：</Text>
                <TasteLevel type='salty' level={food.salty} />
            </View> }
        </View>
    )
    }
}
let styles = StyleSheet.create({
    box: {
        borderColor:'#1c2c3b',
        borderRadius:15,
        height:322,
        width:322,
        alignItems:'center',
        marginTop:20,
        borderWidth: 1
    },
    item_image: {
        marginTop:0,
        borderRadius:15,
        width:320,
        height:320
    },
    info:{
        flexDirection: 'row',
        width:322,
        height:25,
        marginTop:15,
        marginLeft:30,
    },
    info_title:{
        marginTop:3,
        fontSize: 18,
        color: '#1c2c3b'
    },
})
export default FoodDetails
