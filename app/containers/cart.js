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
        cart: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props);
        this.onClearCart=this.onClearCart.bind(this);
        this.payItemAction=this.payItemAction.bind(this);
        this.onAddNum=this.onAddNum.bind(this);
        this.onCutNum=this.onCutNum.bind(this);
        // this.updateTotalprice=this.updateTotalprice.bind(this);
        this.state={
            sum:0
        }
    }
    componentWillMount() {
        const {actions} = this.props
        // actions.updateSumAction()
    }
    onClearCart() {
        const {actions} = this.props
        actions.clearCartAction()
        // actions.updateSumAction()
    }
    onDeleteFood(id) {
        const {actions} = this.props
        actions.deleteFoodAction(id)
        // actions.updateSumAction()
    }
    onAddNum(id,price) {
        const {actions} = this.props
        actions.addNumAction(id,price)
        // actions.updateSumAction()
    }
    onCutNum(id,price) {
        const {actions} = this.props
        actions.cutNumAction(id,price)
        // actions.updateSumAction()
    }
    // updateTotalprice() {
    //     this.state.sum=0
    //
    //     this.props.cart.forEach(food => {this.state.sum = parseFloat(this.state.sum) + parseFloat(food.price)*parseInt(food.num);console.log(food.num);} )
    // }
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
            {cart.foods.map(food =>
                <CartItem key={food.id}
                                  food={food}
                                  deleteFoodAction={()=>{this.onDeleteFood(food.id)}}
                                  addNumAction={()=>{this.onAddNum(food.id,food.price)}}
                                  cutNumAction={()=>{this.onCutNum(food.id,food.price)}} />
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
                    <Text style={{color:'white',fontSize:15}}>提交订单-￥{cart.total}</Text>
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
