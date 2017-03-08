'use strict';
import {combineReducers} from 'redux';
import cart from './Cart';
import login from './LoginReducer';
import register from './RegisterReducer';
import goods from './Goods';

const rootReducer = combineReducers({
    login,
    register,
    goods,
    cart
})
export default rootReducer;
