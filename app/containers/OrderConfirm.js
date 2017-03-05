/**
 * 订单确认
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
  ListView,
  InteractionManager,
} from 'react-native';
import { NaviGoBack } from '../utils/CommonUtils';
import Header from '../components/Header'
var {height, width} = Dimensions.get('window');
import OrderResult from './OrderResult';

class OrderConfirm extends React.Component {

  constructor(props) {
    super(props);
    this.buttonBackAction=this.buttonBackAction.bind(this);
    this.payItemAction=this.payItemAction.bind(this);
  }
    //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }

  //订单提交
  payItemAction(){
      const {navigator} = this.props;
      InteractionManager.runAfterInteractions(() => {
        navigator.push({
          component: OrderResult,
          name: 'OrderResult'
           });
        });
  }

  render() {
    const {navigator,route} = this.props;
    return (
        <View style={{backgroundColor:'#f5f5f5',flex:1}}>
            <Header title='订单确认' hasBack={true} backAction={()=>{this.buttonBackAction()}}/>
            <View style={{flex:1,justifyContent:'flex-end'}}>
                <TouchableOpacity style={styles.btn} onPress={()=>{this.payItemAction()}}>
                         <Text style={{color:'white',fontSize:14}}>确定提交</Text>
               </TouchableOpacity>
            </View>
       </View>
    );
  }
}
const styles=StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#f5f5f5'
    },
    item:{
        backgroundColor:'white',
        flexDirection:'row'
    },
    item_image:{
        width:50,
        height:50,
        margin:10,
        borderRadius:5
    },
    item_content:{
        flex:1,
        marginTop:10,
        marginBottom:10
    },
    item_title:{
        marginRight:8,
        color:'black'
    },
    item_btn: {
        marginRight:10,
        fontSize:11,
        color:'#aaa'
    },
    btn:{
        height:40,
        backgroundColor:'#ff7e5e',
        justifyContent:'center',
        alignItems:'center'
    }
});
export default OrderConfirm;
