/**
 * 购物车列表Reducers
 */
'use strict';
import * as types from '../common/ActionTypes'

const initialState = [
    {
        id: 1,
        name: 'Use Redux',
        num:1,
        price: 10,
        picture: ''
    }
]
export default function cart(state = initialState, action){
    switch (action.type) {
        //加入购物车
        case types.ADD_FOOD:
            if(state.some(food => food.id==action.data.id)){
                return state.map(food =>
                    food.id === action.data.id ?
                    { ...food, num: food.num+1 } : food )
            } else {
                return [
                    {
                        id: action.data.id,
                        name: action.data.name,
                        num:1,
                        price: action.data.price,
                        picture: action.data.picture
                    },
                    ...state
                ]
            }
        //从购物车删除菜品
        case types.DELETE_FOOD:
            return state.filter( food =>
                food.id!==action.id
            )
        //清空购物车
        case types.CLEAR_CART:
            return []
        case types.ADD_NUM:
            return state.map(food =>
                food.id === action.id ?
                { ...food, num: food.num+1 } : food )
        case types.CUT_NUM:
            return state.map(food =>
                food.id === action.id&&food.num>1 ?
                { ...food, num: food.num-1 } : food )
        case types.UPDATE_SUM:
            return state
        default:
            return state
    }
}
