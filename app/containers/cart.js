/**
 * 购物车页面
 */
'use strict';
import React, {Component, PropTypes} from 'react';
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
import CartItem from '../components/CartItem'
import OrderConfirm from './OrderConfirm'
class Cart extends Component {
    static propTypes = {
        cart: PropTypes.array.isRequired
    }
    constructor(props) {
        super(props);
        this.onClearCart=this.onClearCart.bind(this);
        this.payItemAction=this.payItemAction.bind(this);
    }
    onClearCart() {
        this.props.actions.clearCartAction()
    }
    onDeleteFood(id) {
        this.props.actions.deleteFoodAction(id)
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
        const { cart } = this.props
        return (
        <View style={styles.container}>
            <Header title='购物车' right='清空' hasRight={true} rightAction={()=>{this.onClearCart()}} />
            {cart.map(food =>
                <CartItem key={food.id} food={food} deleteFoodAction={()=>{this.onDeleteFood(food.id)}} />
             )}
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
