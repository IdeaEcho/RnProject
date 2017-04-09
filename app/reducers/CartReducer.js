/**
 * 购物车列表Reducers
 */
'use strict';
import * as types from '../common/ActionTypes'

const initialState = {
    foods:[],
    count:0,
    total:0
}
export default function cart(state = initialState, action){
    switch (action.type) {
        //加入购物车
        case types.ADD_FOOD:
            if(state.foods.some(food => food.dish_id==action.data.dish_id)){ //如果购物车已有相同id菜品
                return {
                    foods: state.foods.map(food =>
                    food.dish_id === action.data.dish_id ?
                    { ...food, num: food.num+1 } : food ), //更新数量
                    count: state.count+1,//更新数量
                    total:  ((state.total*100 + action.data.dish_price*100)/100).toFixed(2)//更新价格
                }
            } else {
                return {
                    foods:[{//新增菜品
                        dish_id: action.data.dish_id,
                        dish_name: action.data.dish_name,
                        num:1,
                        dish_price: action.data.dish_price,
                        dish_photo: action.data.dish_photo
                    },
                    ...state.foods
                ],
                count: state.count+1,//更新数量
                total: ((state.total*100 + action.data.dish_price*100)/100).toFixed(2),//更新价格
                }
            }
        //从购物车删除菜品
        case types.DELETE_FOOD:
            return {
                foods:state.foods.filter( food =>
                food.dish_id!==action.data.dish_id
            ),
            count: state.count-action.data.num,
            total: ((state.total*100 - action.data.dish_price*100)/100).toFixed(2)
        }
        //清空购物车
        case types.CLEAR_CART:
            return {
                foods:[],
                count:0,
                total:0
            }
        //数量增加
        case types.ADD_NUM:
            return {
                foods: state.foods.map(food =>
                food.dish_id === action.dish_id ?
                { ...food, num: food.num+1 } : food ),
                count: state.count+1,
                total: ((state.total*100+action.dish_price*100)/100).toFixed(2)
            }
        //数量减少
        case types.CUT_NUM:
            if(state.foods.some(food => food.dish_id === action.dish_id&&food.num>1 )){
                return {
                    foods: state.foods.map(food =>
                    food.dish_id === action.dish_id ?
                    { ...food, num: food.num-1 } : food ),
                    count: state.count-1,
                    total:  ((state.total*100-action.dish_price*100)/100).toFixed(2)
                }
            }else {
                return state
            }
        case types.UPDATE_SUM:
            return {
                foods: [...state.foods],
                total: (state.total*100)/100
            }
        default:
            return state
    }
}
function toFixed(num, s) {
    var times = Math.pow(10, s)
    var des = num * times + 0.5
    des = parseInt(des, 10) / times
    return des + ''
}
