/**
 * 购物车页面
 */
'use strict'
import React, {Component, PropTypes} from 'react'
import{
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    InteractionManager,
    StyleSheet
} from 'react-native'
var {height, width} = Dimensions.get('window')
import Header from '../components/Header'
import CartItem from '../components/CartItem'
import OrderResult from './OrderResult'
import { toastShort } from '../utils/ToastUtil'
import { performOrderAction } from '../actions/OrderAction'
import { connect } from 'react-redux'

class Cart extends Component {
    static propTypes = {
        cart: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props)
        this.onClearCart=this.onClearCart.bind(this)
        this.payItemAction=this.payItemAction.bind(this)
        this.onAddNum=this.onAddNum.bind(this)
        this.onCutNum=this.onCutNum.bind(this)
        this.state = {
            customer_id:'',
            store_token:'',
            table:1
        }
    }
    onClearCart() {
        const {actions} = this.props
        actions.clearCartAction()
    }
    onDeleteFood(data) {
        const {actions} = this.props
        actions.deleteFoodAction(data)
    }
    onAddNum(id,price) {
        const {actions} = this.props
        actions.addNumAction(id,price)
    }
    onCutNum(id,price) {
        const {actions} = this.props
        actions.cutNumAction(id,price)
    }
    //结算按钮
    payItemAction(){
        const {navigator, cart, dispatch} = this.props
        if(cart.total<=0) {
            toastShort('忘记点餐啦')
        }else {
            storage.load({
              key: 'userinfo',
              autoSync: true,
              syncInBackground: true,
            }).then(ret => {
              this.state.customer_id = ret.phone
              storage.load({
                key: 'foodsinfo',
                autoSync: true,
                syncInBackground: true,
              }).then(ret => {
                this.state.store_token = ret.storetoken
                this.state.table = ret.table
                toastShort(JSON.stringify(this.state))
                dispatch(performOrderAction(this.state, cart, navigator))
              }).catch(err => {
                console.warn(err.message);
              })
            }).catch(err => {
              console.warn(err.message);
            })
            // InteractionManager.runAfterInteractions(() => {
            // navigator.push({
            //   component: OrderResult,
            //   name: '订单结果',
            //   order: cart
            //    })
            // })
        }
    }
    render() {
        const { cart } = this.props
        return (
        <View style={styles.container}>
            <Header title='购物车' right='清空' hasRight={true} rightAction={()=>{this.onClearCart()}} />
            {cart.foods&&cart.foods.map(food =>
                <CartItem key={food.dish_id}
                                  food={food}
                                  deleteFoodAction={()=>{this.onDeleteFood(food)}}
                                  addNumAction={()=>{this.onAddNum(food.dish_id,food.dish_price)}}
                                  cutNumAction={()=>{this.onCutNum(food.dish_id,food.dish_price)}} />
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
        )
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
})

function mapStateToProps(state) {
  const { order } = state
  return {
    order
  }
}

export default connect(mapStateToProps)(Cart)
