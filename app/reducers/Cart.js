/**
 * 购物车列表Reducers
 */
'use strict';
import * as types from '../common/ActionTypes'

const initialState = {
    foods:[{
        id: 1,
        name: 'Use Redux',
        num:1,
        price: 10,
        picture: ''
    }],
    count:1,
    total:10
}
export default function cart(state = initialState, action){
    switch (action.type) {
        //加入购物车
        case types.ADD_FOOD:
            if(state.foods.some(food => food.id==action.data.dishes_id)){ //如果购物车已有相同id菜品
                return {
                    foods: state.foods.map(food =>
                    food.id === action.data.dishes_id ?
                    { ...food, num: food.num+1 } : food ), //更新数量
                    count: state.count+1,//更新数量
                    total: state.total + action.data.dishes_price//更新价格
                }
            } else {
                return {
                    foods:[{//新增菜品
                        id: action.data.dishes_id,
                        name: action.data.dishes_name,
                        num:1,
                        price: action.data.dishes_price,
                        picture: action.data.dishes_photos
                    },
                    ...state.foods
                ],
                count: state.count+1,//更新数量
                total: state.total + action.data.dishes_price,//更新价格
                }
            }
        //从购物车删除菜品
        case types.DELETE_FOOD:
            return {
                foods:state.foods.filter( food =>
                food.id!==action.data.id
            ),
            count: state.count-action.data.num,
            total:state.total-action.data.price*action.data.num
        }
        //清空购物车
        case types.CLEAR_CART:
            return {
                foods:[],
                total:0
            }
        //数量增加
        case types.ADD_NUM:
            return {
                foods: state.foods.map(food =>
                food.id === action.id ?
                { ...food, num: food.num+1 } : food ),
                count: state.count+1,
                total: state.total+parseFloat(action.price)
            }
        //数量减少
        case types.CUT_NUM:
            if(state.foods.some(food => food.id === action.id&&food.num>1 )){
                return {
                    foods: state.foods.map(food =>
                    food.id === action.id ?
                    { ...food, num: food.num-1 } : food ),
                    count: state.count-1,
                    total: state.total-parseFloat(action.price)
                }
            }else {
                return state
            }
        case types.UPDATE_SUM:
            return {
                foods: [...state.foods],
                total: state.total
            }
        default:
            return state
    }
}
