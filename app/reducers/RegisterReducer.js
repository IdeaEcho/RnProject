/**
 * 用户注册Reducers
 */
'use strict';
import * as types from '../common/ActionTypes';

const initialState = {
    loading : false,
    data:''
}

export default function register(state = initialState, action){
    switch (action.type) {
        case types.PERFORM_REGISTER_ACTION:
                  return Object.assign({}, state, {
                      loading: true
                  });
        case types.RECEIVE_REGISTER_ACTION:
                  return Object.assign({}, state, {
                       loading: false,
                       data: action.result
                  });
        default:
            return state;
    }
}
