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
import NoneItem from '../components/NoneItem'
import Loading from '../components/Loading_DD'
import OrderResult from './OrderResult'
import { toastShort } from '../utils/ToastUtil'
import { performOrderAction } from '../actions/OrderAction'
import { connect } from 'react-redux'


class Cart extends Component {
    static propTypes = {
        cart: PropTypes.object.isRequired,
        order: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props)
        this.onClearCart=this.onClearCart.bind(this)
        this.payItemAction=this.payItemAction.bind(this)
        this.onAddNum=this.onAddNum.bind(this)
        this.onCutNum=this.onCutNum.bind(this)
        this.state = {
            customer_id:'',
            access_token:'',
            table_id:1
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
        } else {
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
                this.state.access_token = ret.storetoken
                this.state.table_id = ret.table
                let dish_json = []
                cart.foods.forEach(function(value, key) {
                    var dish = {
                        id : value.dish_id,
                        no: value.num
                    }
                    dish_json.push(dish)
                })
                var data = Object.assign(this.state, {dish_json:dish_json});
                dispatch(performOrderAction(JSON.stringify(data), navigator))
              }).catch(err => {
                console.warn(err.message);
              })
            }).catch(err => {
              toastShort('未登录')
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
        const { cart,order } = this.props
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
            {cart.foods=='' && <NoneItem />}
            <View style={{flex:1,justifyContent:'flex-end'}}>
                <TouchableOpacity style={styles.btn} onPress={()=>{this.payItemAction()}}>
                    <Text style={{color:'white',fontSize:15}}>提交订单-￥{cart.total}</Text>
                </TouchableOpacity>
            </View>
            <Loading visible={order.loading} />
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
