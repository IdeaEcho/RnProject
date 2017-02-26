/**
 * 购物车页面
 */
'use strict';
import React, {Component} from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    InteractionManager,
    StyleSheet
} from 'react-native';
var {height, width} = Dimensions.get('window');
import Header from '../components/Header'
import OrderConfirm from './OrderConfirm';
class Cart extends Component {
    constructor(props) {
        super(props);
        this.topItemAction=this.topItemAction.bind(this);
        this.payItemAction=this.payItemAction.bind(this);

    }
    topItemAction(position){
        if(position === 0){

        }
    }
    renderItemImage(data){
    //    if(data.picture === ''){
    if(true){
         return (
              <Image source={require('../imgs/ic_center_icon.png')} style={styles.item_image} />
           )
       } else {
         return (
           <Image source={{uri:data.picture}} style={styles.item_image} />
           )
       }
    }
    //结算按钮
    payItemAction(){
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
        navigator.push({
          component: OrderConfirm,
          name: 'OrderConfirm'
           });
        });
    }
    render() {
        return (
        <View style={styles.container}>
            <Header title='购物车' right='清空' hasRight={true} rightAction={()=>{this.topItemAction(0)}} />
            <View style={styles.item}>
                {this.renderItemImage()}
                <View style={styles.item_content}>
                    <Text style={styles.item_title}>data.name</Text>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <TouchableOpacity>
                            <Text style={styles.item_btn}>删除</Text>
                        </TouchableOpacity>
                        <Text style={styles.item_btn}>数量</Text>
                        <TouchableOpacity style={{width:15,height:15}} >
                            <Image source={require('../imgs/store/ic_store_add.png')}
                            style={{width:15,height:15}} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{justifyContent:'flex-end'}}>
                <Text style={{fontSize:15,marginRight:10,marginBottom:25}}>¥data.min_price</Text>
                </View>
            </View>
            <View style={{flex:1,justifyContent:'flex-end'}}>
                <View style={{backgroundColor:'white',width:width,height:40}}>
                    <View style={{flexDirection:'row',marginLeft:15,marginTop:5}}>
                    <Text style={{fontSize:11,color:'black',flex:1}}>折扣</Text>
                        <View style={{flex:1,alignItems:'flex-end',marginRight:15}}>
                        <Text style={{color:'red',fontSize:11}}>8.8折</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.btn} onPress={()=>{this.payItemAction()}}>
                    <Text style={{color:'white',fontSize:15}}>提交订单-￥</Text>
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
        backgroundColor:'#fb633a',
        justifyContent:'center',
        alignItems:'center'
    }
});

export default Cart;
