/**
 * 商品列表Action操作
 */
'use strict'

import * as types from '../common/ActionTypes'
import { STORE_DETAILS_DATA,TAGS_DETAILS_DATA,FOODS_DETAILS_DATA } from '../common/VirtualData'
import {formatFood, calculateLength, formatInfo} from '../utils/StoreFormat'
import { toastShort } from '../utils/ToastUtil'
//添加到购物车
export const addFoodAction=(data) => ({ type: types.ADD_FOOD, data })
//从购物车删除
export const deleteFoodAction=(data) => ({ type: types.DELETE_FOOD, data })
//清空购物车
export const clearCartAction=() => ({ type: types.CLEAR_CART})
//数量+1
export const addNumAction=(dish_id,dish_price) => ({ type: types.ADD_NUM, dish_id, dish_price })
//数量-1
export const cutNumAction=(dish_id,dish_price) => ({ type: types.CUT_NUM, dish_id, dish_price })

//获取商品列表
export function fetchFoodsAction(foods,table){
     return dispatch => {
        dispatch(dispatchFoodsAction())
        var store_info = formatInfo(foods.store,table)
        toastShort(JSON.stringify(store_info))
        var right_items = formatFood(foods.tags, foods.dishes)
        var left_items = Object.keys(right_items)
        var data_length = calculateLength(foods.tags)
        dispatch(receiveFoodsAction(store_info,left_items,right_items,data_length))
     }
}

//点击切换商品类别
export function changeCategoryAction(data) {
     return dispatch => {
        dispatch(changeDistanceAction(data))
     }
}

function dispatchFoodsAction() {
        return {
            type: types.FETCH_FOODS_ACTION,
        }
}
//获取到数据
function receiveFoodsAction(store_info,left_items,right_items,data_length) {
        return {
            type: types.RECEIVE_FOODS_ACTION,
            store_info:store_info,
            left_items : left_items,
            right_items : right_items,
            selectedItem : left_items[0],
            data_length : data_length
        }
}

function changeDistanceAction(selectedItem) {
        return {
            type : types.CHANGE_CATEGORY_ACTION,
            selectedItem : selectedItem
        }
}
