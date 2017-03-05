/**
 * 用户登录Action操作
 */
'use strict';

import * as types from '../common/ActionTypes';
import FetchHttpClient, { form,header } from 'fetch-http-client';
import {HOST,LOGIN_ACTION} from  '../common/Request';
import { toastShort } from '../utils/ToastUtil';
import Base64 from 'base64-js';
const client = new FetchHttpClient(HOST);

export function performLoginAction(data){
    return dispatch => {
        dispatch(performLogin());
        client.addMiddleware(form());
        client.post(LOGIN_ACTION,{
            form: {data:  Base64.fromByteArray(data)} }
        ).then(response => {
            toastShort(Base64.toByteArray(response).json());
            return Base64.toByteArray(response).json();
        }).then((result)=>{
         dispatch(receiveLoginResult(result));
         if(result.returnCode === '200'){
             //登录成功..
             toastShort('登录成功');
         }else{
             toastShort(result.msg);
         }
        }).catch((error) => {
         toastShort('网络发生错误,请重试!')
        });
     }
}

function performLogin() {
        return {
            type: types.PERFORM_LOGIN_ACTION,
        }
}

function receiveLoginResult(result){
        return {
            type: types.RECEIVE_LOGIN_ACTION,
            data: result
        }
}
