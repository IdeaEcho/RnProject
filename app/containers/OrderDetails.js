'use strict';
import React from 'react';
import {
  Dimensions,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'

import { NaviGoBack } from '../utils/CommonUtils'
import Header from '../components/Header'
import ShortLineTwo from '../components/ShortLineTwo'
var {height, width} = Dimensions.get('window')

class OrderDetails extends React.Component {
    constructor(props) {
        super(props);
    }
    //返回
    buttonBackAction(){
        const {navigator} = this.props;
        return NaviGoBack(navigator);
    }

  render() {
    const {navigator, route} = this.props;
    const order = route.order
    const dishes = JSON.parse(order.dish)
    return (
       <View style={{backgroundColor:'#f5f5f5',flex:1}}>
           <View style={{flex:1}}>
                <Header title={route.name} hasBack={true} backAction={()=>{this.buttonBackAction()}}/>
                <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                     <View style={{flexDirection:'row',height:70,backgroundColor:'white',alignItems:'center'}}>
                           <Image source={order.store_avatar ?  {uri:order.store_avatar} : require('../imgs/order/ic_order_shop_icon.png')} style={{width:40,height:40,marginLeft:10}}/>
                           <Text style={{fontSize:15,marginLeft:10,color:'black'}}>{order.store_name}</Text>
                           <View style={{alignItems:'flex-end',flex:1,marginRight:8}}>
                                <Image source={require('../imgs/order/ic_order_arrow_right.png')} style={styles.item_view_icon}/>
                           </View>
                     </View>
                     <ShortLineTwo/>
                     {dishes&&dishes.map(dish =>
                         <View key={dish.id} style={{flexDirection:'row',backgroundColor:'white',height:35,alignItems:'center'}}>
                               <Text style={{marginLeft:10,flex:5}}>{dish.name}</Text>
                               <Text style={styles.font_red}>x{dish.num}</Text>
                               <View style={{flex:2,alignItems:'flex-end',marginRight:10}}>
                                    <Text style={styles.font_red}>¥{dish.price}</Text>
                               </View>
                         </View>
                     )}
                     <ShortLineTwo/>
                     <View style={{flexDirection:'row',backgroundColor:'white',height:35,alignItems:'center'}}>
                           <Text style={{marginLeft:10}}>餐具</Text>
                           <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                                <Text style={{fontSize:14}}>¥4</Text>
                           </View>
                     </View>
                     <ShortLineTwo/>
                     <View style={{flexDirection:'row',backgroundColor:'white',height:35,alignItems:'center'}}>
                           <Text style={{marginLeft:10}}>总计¥{order.order_price}</Text>
                           <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                                <Text style={styles.font_red}>总计¥{order.order_price}</Text>
                           </View>
                     </View>
                     <View style={{height:35,justifyContent:'center'}}>
                           <Text style={{color:'#777',marginLeft:8}}>其他信息</Text>
                     </View>
                     <View style={{flexDirection:'row',backgroundColor:'white',height:35,alignItems:'center'}}>
                           <Text style={{marginLeft:10}}>订单编号</Text>
                           <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                                <Text style={{fontSize:14}}>{order.order_id}</Text>
                           </View>
                     </View>
                     <View style={{flexDirection:'row',backgroundColor:'white',height:35,alignItems:'center'}}>
                           <Text style={{marginLeft:10}}>订单时间</Text>
                           <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                                <Text style={{fontSize:14}}>{order.order_time}</Text>
                           </View>
                     </View>
                     <View style={{flexDirection:'row',backgroundColor:'white',height:35,alignItems:'center',marginBottom:8}}>
                           <Text style={{marginLeft:10}}>支付方式</Text>
                           <View style={{flex:1,alignItems:'flex-end',marginRight:10}}>
                                <Text style={{fontSize:14}}>线下支付</Text>
                           </View>
                     </View>
                </ScrollView>
           </View>
           <View style={{justifyContent:'flex-end'}}>
                <TouchableOpacity style={styles.item_layout}>
                       <Text style={styles.font_red}>再来一单</Text>
                </TouchableOpacity>
           </View>
      </View>
    );
  }
}
let styles = StyleSheet.create({
   item_layout:{
        backgroundColor:'white',
        height:45,
        alignItems:'center',
        justifyContent:'center'
    },
    item_view_icon:{
        width:10,
        height:15,
    },
    font_red:{
        color:'#ff3939',
        fontSize:14
    }
});
export default OrderDetails
