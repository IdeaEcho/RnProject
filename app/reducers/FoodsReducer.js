/**
 * 商品列表Reducers
 */
'use strict';
import * as types from '../common/ActionTypes';

const initialState = {
    loading : false,
    store_info:{},
    left_items : [],
    right_items : [],
    data_length : 0,
    selectedItem : '',
}
export default function foods(state = initialState, action){
    switch (action.type) {
        //正在获取商品列表数据
        case types.FETCH_FOODS_ACTION:
                  return Object.assign({}, state, {
                      loading: true
                  });
        //获取到商品列表数据
        case types.RECEIVE_FOODS_ACTION:
                  return Object.assign({}, state, {
                       loading: false,
                       store_info: action.store_info,
                       left_items: action.left_items,
                       right_items: action.right_items,
                       selectedItem : action.selectedItem,
                       data_length : action.data_length
                  });
        //切换分类
        case types.CHANGE_CATEGORY_ACTION:
                  return Object.assign({},state,{
                       selectedItem : action.selectedItem
                  });
        default:
            return state;
    }
}
