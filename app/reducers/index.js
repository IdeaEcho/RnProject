'use strict';
import {combineReducers} from 'redux';
import counter from './counter';
import login from './LoginReducer';
import goods from './Goods';

const rootReducer = combineReducers({
    login,
    goods,
    counter
})
export default rootReducer;
