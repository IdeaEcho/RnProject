'use strict';
import {combineReducers} from 'redux';
import cart from './Cart';
import login from './LoginReducer';
import goods from './Goods';

const rootReducer = combineReducers({
    login,
    goods,
    cart
})
export default rootReducer;
