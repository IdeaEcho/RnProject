'use strict';
import {combineReducers} from 'redux';
import cart from './CartReducer';
import login from './LoginReducer';
import register from './RegisterReducer';
import foods from './FoodsReducer';
import menu from './MenuReducer';
import order from './OrderReducer';

const rootReducer = combineReducers({
    login,
    register,
    foods,
    cart,
    menu,
    order
})
export default rootReducer;
