/**
 * 购物车列表Reducers
 */
'use strict';
import * as types from '../common/ActionTypes'

const initialState = [
    {
        id: 1,
        name: 'Use Redux',
        price: 10,
        picture: ''
    }
]
export default function cart(state = initialState, action){
    switch (action.type) {
        //加入购物车
        case types.ADD_FOOD:
            return [
                {
                    id: action.data.id,
                    name: action.data.name,
                    price: action.data.price,
                    picture: action.data.picture
                },
                ...state
            ]
        case types.DELETE_FOOD:
            return state.filter(food =>
                food.id!==action.id
            )
        case  types.CLEAR_CART:
            return []
        default:
            return state
    }
}
