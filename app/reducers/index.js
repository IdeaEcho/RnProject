'use strict';
import {combineReducers} from 'redux';
import cart from './Cart';
import login from './LoginReducer';
import register from './RegisterReducer';
import foods from './Foods';
import menu from './MenuReducer';

const rootReducer = combineReducers({
    login,
    register,
    foods,
    cart,
    menu
})
export default rootReducer;
