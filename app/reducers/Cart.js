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
    total:10
}
export default function cart(state = initialState, action){
    switch (action.type) {
        //加入购物车
        case types.ADD_FOOD:
            if(state.foods.some(food => food.id==action.data.id)){
                return {
                    foods: state.foods.map(food =>
                    food.id === action.data.id ?
                    { ...food, num: food.num+1 } : food ),
                    total: state.total + action.data.price
                }
            } else {
                return {
                    foods:[{
                        id: action.data.id,
                        name: action.data.name,
                        num:1,
                        price: action.data.price,
                        picture: action.data.picture
                    },
                    ...state.foods
                ],
                total: state.total + action.data.price }
            }
        //从购物车删除菜品
        case types.DELETE_FOOD:
            return {
                foods:state.foods.filter( food =>
                food.id!==action.id
            ),
            total:0
        }
        //清空购物车
        case types.CLEAR_CART:
            return {
                foods:[],
                total:0
            }
        case types.ADD_NUM:
            return {
                foods: state.foods.map(food =>
                food.id === action.id ?
                { ...food, num: food.num+1 } : food ),
                total: state.total+parseFloat(action.price)
            }
        case types.CUT_NUM:
            if(state.foods.some(food => food.id === action.id&&food.num>1 )){
                return {
                    foods: state.foods.map(food =>
                    food.id === action.id ?
                    { ...food, num: food.num-1 } : food ),
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
