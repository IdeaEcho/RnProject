/**
 * 获取菜单Reducers
 */
'use strict';
import * as types from '../common/ActionTypes';

const initialState = {
    loading : false,
    data:''
}

export default function menu(state = initialState, action) {
    switch (action.type) {
        case types.PERFORM_MENU_ACTION:
                  return Object.assign({}, state, {
                      loading: true
                  });
        case types.RECEIVE_MENU_ACTION:
                  return Object.assign({}, state, {
                       loading: false,
                       data: action.result
                  });
        default:
            return state;
    }
}
