'use strict';
import {combineReducers} from 'redux';
import counter from './counter';
import login from './LoginReducer';

const rootReducer = combineReducers({
    login,
    counter
})
export default rootReducer;
