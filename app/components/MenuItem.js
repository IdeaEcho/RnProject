/**
 * 设置界面Item布局
 */
'use strict';
import React, {PropTypes} from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';

renderItemImage(data){
   if(data.picture === ''){
     return (
          <Image source={require('../imgs/ic_center_icon.png')} style={styles.item_image} />
       )
   } else {
     return (
       <Image source={{uri:data.picture}} style={styles.item_image} />
       )
   }
}

const MenuItem = ({ food, onAddToCartClicked}) => (
    <TouchableOpacity onPress={()=>{this.onPressItemRight(data)}}>
         <View style={{backgroundColor:'white',flexDirection:'row'}}>
              {this.renderItemImage(food)}
              <View style={{flex:1,marginTop:10,marginBottom:10}}>
                   <Text style={styles.item_title}>{food.name}</Text>
                   <View style={{flexDirection:'row',marginTop:5}}>
                          <Text style={styles.item_des}>月售{food.month_saled}</Text>
                          <Text style={styles.item_des}>赞{food.praise}</Text>
                   </View>
                   <Text style={styles.item_price}>¥{food.price}</Text>
              </View>
              <View style={{justifyContent:'flex-end'}}>
                   <TouchableOpacity style={styles.btn_add}
                        onPress={()=>{this.addToCartAction(data)}}
                        >
                        <Image source={require('../imgs/store/ic_store_add.png')}
                               style={{width:20,height:20}}/>
                   </TouchableOpacity>
              </View>
         </View>
    </TouchableOpacity>
);
const styles=StyleSheet.create({
    item_image:{
        width:60,
        height:60,
        margin:10,
        borderRadius:5
    },
    item_title:{
        marginRight:8,
        color:'black'
    },
    item_des:{
        marginRight:10,
        fontSize:11,
        color:'#aaa'
    },
    item_price:{
        color:'red',
        fontSize:15,
        marginTop:5
    },
    btn_add:{
        width:30,
        height:30,
        marginRight:10,
        marginBottom:10
    }
});

export default SettingItem;
