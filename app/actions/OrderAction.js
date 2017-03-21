/**
 * 用户登录Action操作
 */
'use strict'

import {InteractionManager}  from 'react-native'
import * as types from '../common/ActionTypes'
import FetchHttpClient, { json,form,header } from 'fetch-http-client'
import {HOST, ORDER_ACTION} from  '../common/Request'
import { toastShort } from '../utils/ToastUtil'
import Storage from 'react-native-storage'
import Home from '../containers/home'
const client = new FetchHttpClient(HOST)

export function performOrderAction(info, cart, navigator) {
    return dispatch => {
        dispatch(performOrder())
        client.addMiddleware(form())
        // Add Logging
        client.addMiddleware(request => response => {
          console.log(request, response)
        })
        client.post(ORDER_ACTION,{
            form: { data: info}
        }).then(response => {
            toastShort(JSON.stringify(response._bodyText))
            return response._bodyInit
        }).then((result)=> {
            dispatch(receiveOrderResult(result))
            if(result.returnCode === '200'){
                console.log(result)
                storage.save({
                    key: 'orderinfo',  // 注意:请不要在key中使用_下划线符号!
                    rawData: {
                    data: result.phone
                },
                // 如果不指定过期时间，则会使用defaultExpires参数
                // 如果设为null，则永不过期
                expires: 1000 * 3600
                })
                InteractionManager.runAfterInteractions(() => {
                navigator.push({
                  component: OrderResult,
                  name: '订单结果',
                  order: cart
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

function performOrder() {
        return {
            type: types.PERFORM_ORDER_ACTION,
        }
}

function receiveOrderResult(result){
        return {
            type: types.RECEIVE_ORDER_ACTION,
            data: result
        }
}
