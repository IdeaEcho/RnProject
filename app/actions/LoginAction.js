/**
 * 用户登录Action操作
 */
'use strict'

import {InteractionManager}  from 'react-native'
import * as types from '../common/ActionTypes'
import FetchHttpClient, { json,form,header } from 'fetch-http-client'
import {HOST,LOGIN_ACTION} from  '../common/Request'
import { toastShort } from '../utils/ToastUtil'
import Storage from 'react-native-storage'
import base64url from 'base64-url'
import Home from '../containers/home'
const client = new FetchHttpClient(HOST)

export function performLoginAction(data, navigator){
    return dispatch => {
        dispatch(performLogin())
        client.addMiddleware(form())
        // Add Logging
        client.addMiddleware(request => response => {
          console.log(request, response)
        })
        client.post(LOGIN_ACTION,{
            form: { data: base64url.encode(data)}
        }).then(response => {
            return base64url.decode(response._bodyText)
        }).then((result)=> {
            result = JSON.parse(result)
            dispatch(receiveLoginResult(result))
            if(result.returnCode === '200'){
                console.log(result)
                toastShort('登录成功')
                storage.save({
                    key: 'userinfo',  // 注意:请不要在key中使用_下划线符号!
                    rawData: {
                    phone: result.phone,
                    nickname: result.nickname
                },
                // 如果不指定过期时间，则会使用defaultExpires参数
                // 如果设为null，则永不过期
                expires: 1000 * 3600
                })
                InteractionManager.runAfterInteractions(() => {
                    navigator.push({
                        component: Home,
                        name: '首页',
                        nickname: result.nickname
                    })
                })
            }else{
             toastShort(result.msg)
            }
            }).catch((error) => {
            // console.log(error)
            toastShort(error+'网络发生错误,请重试!')
            })
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
