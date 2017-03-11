'use strict';
import {combineReducers} from 'redux';
import cart from './Cart';
import login from './LoginReducer';
import register from './RegisterReducer';
import goods from './Goods';
import menu from './MenuReducer';

const rootReducer = combineReducers({
    login,
    register,
    goods,
    cart,
    menu
})
export default rootReducer;
