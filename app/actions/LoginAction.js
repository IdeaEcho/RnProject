/**
 * 用户登录Action操作
 */
'use strict';

import * as types from '../common/ActionTypes';
import FetchHttpClient, { json,header } from 'fetch-http-client';
import {HOST,LOGIN_ACTION} from  '../common/Request';
import { toastShort } from '../utils/ToastUtil';
import base64url from 'base64-url';
const client = new FetchHttpClient(HOST);

export function performLoginAction(data){
    return dispatch => {
        dispatch(performLogin());
        client.addMiddleware(json());
        // Add Logging
        client.addMiddleware(request => response => {
          console.log(request, response);
        });
        client.post(LOGIN_ACTION,{
            data: base64url.encode(data)
        }).then(response => {
            console.log(base64url.decode(response));
            return base64url.decode(response);
        }).then((result)=> {
         dispatch(receiveLoginResult(result));
         if(result.returnCode === '200'){
             //登录成功..
             toastShort('登录成功');
         }else{
             toastShort(result.msg);
         }
        }).catch((error) => {
            toastShort(error+'网络发生错误,请重试!')
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
