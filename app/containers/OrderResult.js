/**
 * 订单提交结果
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
  InteractionManager
} from 'react-native'
import { NaviGoBack } from '../utils/CommonUtils'
import Header from '../components/Header'
import OrderDetails from './OrderDetails'
var {height, width} = Dimensions.get('window')

class OrderResult extends React.Component {
  constructor(props) {
    super(props);
    this.buttonBackAction=this.buttonBackAction.bind(this);
    this.itemButtonActiom=this.itemButtonActiom.bind(this);
  }
    //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }
    itemButtonActiom(position){
        const {navigator} = this.props;
        if(position === 0){
            InteractionManager.runAfterInteractions(() => {
            navigator.push({
              component: OrderDetails,
              name: 'OrderDetails'
               });
            });
        }else if(position === 1){

        }
  }
  render() {
    const {navigator,route} = this.props;
    return (
        <View style={styles.container}>
        <Header title={route.name} hasBack={true} backAction={()=>{this.buttonBackAction()}}/>
          <View style={styles.content}>
                <View style={{justifyContent:'center',alignItems:'center',height:100}}>
                     <Image source={require('../imgs/logo@round.png')} style={{width:40,height:40}}/>
                     <Text style={{color:'black',fontSize:15,marginTop:15}}>恭喜您,订单提交成功!</Text>
                </View>
                <Image source={require('../imgs/ic_center_line.png')} style={{height:1}}/>
                <View style={{marginLeft:13,marginTop:22}}>
                    <View style={{flexDirection:'row'}}>
                          <Text style={styles.title}>订单状态</Text>
                          <Text style={styles.des}>待付款</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:8}}>
                          <Text style={styles.title}>订单号</Text>
                          <Text style={styles.des}>89550546696142992</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:8}}>
                          <Text style={styles.title}>应付金额</Text>
                          <Text style={styles.price}>¥{route.total}</Text>
                    </View>
                </View>
                <Image source={require('../imgs/ic_center_line.png')} style={{height:1,marginTop:22}}/>
                <View style={{marginTop:22,marginLeft:13,marginRight:13}}>
                     <Text style={{fontSize:13,color:'#999'}}>温馨提示:请您在提交订单后20分钟内完成支付,否则订单会自动取消</Text>
                     <View style={styles.btn_box}>
                          <TouchableOpacity style={styles.btn_order} onPress={()=>{this.itemButtonActiom(0)}}>
                                <Text style={styles.btn_tv}>查看订单</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.btn_pay} onPress={()=>{this.itemButtonActiom(1)}}>
                                <Text style={styles.btn_tv}>付款</Text>
                          </TouchableOpacity>
                     </View>
                </View>
          </View>
       </View>
    );
  }
}
let styles = StyleSheet.create({
    container: {
        backgroundColor:'#f5f5f5',
        flex:1
    },
    content: {
        marginTop:10,
        marginLeft:10,
        marginRight:10,
        backgroundColor:'white'
    },
    title: {
        width:70,
        fontSize:16,
        color:'black'
    },
    des:{
        marginLeft:30,
        fontSize:16,
        color:'#777'
    },
    price: {
        marginLeft:30,
        fontSize:16,
        color:'#ff3939'
    },
    btn_box:{
        flexDirection:'row',
        justifyContent:'space-between',
        height:70,
        marginLeft:15,
        marginRight:15,
        marginTop:30,
        flex:1,
        paddingBottom:22
    },
    btn_pay:{
        width:130,
        height:35,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ff3939',
        borderRadius:5,
    },
    btn_order:{
        width:130,
        height:35,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#55798f',
        borderRadius:5,
        marginRight:10
    },
    btn_tv:{
        color:'#fff',
        alignSelf:'center'
    }
});
export default OrderResult;
