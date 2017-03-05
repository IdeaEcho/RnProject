/**
 * 商品列表Action操作
 */
'use strict';

import * as types from '../common/ActionTypes';
import { STORE_DETAILS_DATA } from '../common/VirtualData';
import {formatStore,calculateGood,calculateLength,formatInfo} from '../utils/StoreFormat';

//添加到购物车
export const addFoodAction=(data) => ({ type: types.ADD_FOOD, data })
//从购物车删除
export const deleteFoodAction=(data) => ({ type: types.DELETE_FOOD, data })
//清空购物车
export const clearCartAction=() => ({ type: types.CLEAR_CART})
//数量+1
export const addNumAction=(id,price) => ({ type: types.ADD_NUM, id,price })
//数量-1
export const cutNumAction=(id,price) => ({ type: types.CUT_NUM, id,price })


//获取商品列表
export function fetchGoodsAction(){
     return dispatch => {
        dispatch(dispatchGoodsAction());
        var store_info = formatInfo(eval(STORE_DETAILS_DATA).data);
        var right_items = formatStore(eval(STORE_DETAILS_DATA).data);
        var left_items = Object.keys(right_items);
        var data_length = calculateLength(eval(STORE_DETAILS_DATA).data);
        dispatch(receiveGoodsAction(store_info,left_items,right_items,data_length));
     }
}

//点击切换商品类别
export function changeCategoryAction(data){
     return dispatch => {
        dispatch(changeDistanceAction(data));
     }
}

function dispatchGoodsAction() {
        return {
            type: types.FETCH_GOOS_ACTION,
        }
}
//获取到数据
function receiveGoodsAction(store_info,left_items,right_items,data_length){
        return {
            type: types.RECEIVE_GOODS_ACTION,
            store_info:store_info,
            left_items : left_items,
            right_items : right_items,
            selectedItem : left_items[0],
            data_length : data_length
        }
}

function changeDistanceAction(selectedItem){
        return {
            type : types.CHANGE_CATEGORY_ACTION,
            selectedItem : selectedItem
        }
}
