/**
 * 提交订单Reducers
 */
'use strict';
import * as types from '../common/ActionTypes';

const initialState = {
    loading : false,
    data:''
}

export function order(state = initialState, action){
    switch (action.type) {
        case types.PERFORM_ORDER_ACTION:
                  return Object.assign({}, state, {
                      loading: true
                  });
        case types.RECEIVE_ORDER_ACTION:
                  return Object.assign({}, state, {
                       loading: false,
                       data: action.result
                  });
        default:
            return state;
    }
}

export function orderhistory(state = initialState, action){
    switch (action.type) {
        case types.PERFORM_ORDER_HISTORY_ACTION:
                  return Object.assign({}, state, {
                      loading: true
                  });
        case types.RECEIVE_ORDER_HISTORY_ACTION:
                  return Object.assign({}, state, {
                       loading: false,
                       order_list: action.order_list
                  });
        default:
            return state;
    }
}
