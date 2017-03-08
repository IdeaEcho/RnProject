/**
 * 用户登录Action操作
 */
'use strict'

import {InteractionManager}  from 'react-native'
import * as types from '../common/ActionTypes'
import FetchHttpClient, {form,header } from 'fetch-http-client'
import {HOST,REGISTER_ACTION} from  '../common/Request'
import { toastShort } from '../utils/ToastUtil'
import Storage from 'react-native-storage'
import base64url from 'base64-url'
import Home from '../containers/home'
const client = new FetchHttpClient(HOST)

export function performRegisterAction(data, navigator){
    return dispatch => {
        dispatch(performRegister())
        client.addMiddleware(form())
        // Add Logging
        client.addMiddleware(request => response => {
            console.log(request, response)
        })
        client.post(REGISTER_ACTION,{
            form: { data: base64url.encode(data)}
        }).then(response => {
            // toastShort(base64url.decode(response._bodyText))
            return base64url.decode(response._bodyText)//解码
        }).then((result)=> {
            result = JSON.parse(result)//字符串转json
            dispatch(receiveRegisterResult(result))
            // toastShort(result.returnCode)
            if(result.returnCode === '200'){
                // console.log(result)
                toastShort('注册成功')
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
            } else if (result.returnCode === '300') {
                toastShort('该手机号已被注册')
            } else if (result.returnCode === '400') {
                toastShort('数据不符合规范')
            }
        }).catch((error) => {
            // console.log(error)
            toastShort(error+'网络发生错误,请重试!')
        })
     }
}

function performRegister() {
        return {
            type: types.PERFORM_REGISTER_ACTION,
        }
}

function receiveRegisterResult(result){
        return {
            type: types.RECEIVE_REGISTER_ACTION,
            data: result
        }
}
