/**
 * 用户登录Action操作
 */
'use strict'

import {InteractionManager}  from 'react-native'
import * as types from '../common/ActionTypes'
import FetchHttpClient, { json,form,header } from 'fetch-http-client'
import {HOST, ORDER_ACTION,ORDER_HISTORY_ACTION} from  '../common/Request'
import { toastShort } from '../utils/ToastUtil'
import Storage from 'react-native-storage'
import Home from '../containers/home'
import OrderResult from '../containers/OrderResult'
const client = new FetchHttpClient(HOST)

//获取当前订单
export function performOrderAction(data, navigator) {
    return dispatch => {
        dispatch(performOrder())
        client.addMiddleware(form())
        // Add Logging
        client.addMiddleware(request => response => {
          console.log(request, response)
        })
        client.post(ORDER_ACTION,{
            form: { data: data }
        }).then(response => {
            // toastShort(JSON.stringify(response._bodyText))
            return JSON.parse(response._bodyText)
        }).then((result)=> {
                dispatch(receiveOrderResult(result))
                if(result.returnCode === '200'){
                    console.log(result)
                    storage.save({
                        key: 'orderinfo',  // 注意:请不要在key中使用_下划线符号!
                        rawData: {
                        data: result
                    },
                    // 如果不指定过期时间，则会使用defaultExpires参数
                    // 如果设为null，则永不过期
                    expires: 1000 * 3600
                    })
                    InteractionManager.runAfterInteractions(() => {
                    navigator.push({
                      component: OrderResult,
                      name: '订单结果',
                      order: result
                       })
                    })
                }else{
                    toastShort(result)
                }
            }).catch((error) => {
                // console.log(error)
                toastShort('网络发生错误,请重试!')
            })
     }
}

export function performOrderHistoryAction(data) {
    return dispatch => {
        dispatch(performOrderHistory())
        client.addMiddleware(form())
        // Add Logging
        client.addMiddleware(request => response => {
          console.log(request, response)
        })
        client.post(ORDER_HISTORY_ACTION,{
            form: { data: data }
        }).then(response => {
            return JSON.parse(response._bodyText)
        }).then((result)=> {
                if(result.returnCode === '200'){
                    dispatch(receiveOrderHistoryResult(result.order_list))
                } else if(result.returnCode === '300'){
                    dispatch(receiveOrderHistoryResult())
                } else {
                    toastShort(result)
                }
            }).catch((error) => {
                // console.log(error)
                toastShort('网络发生错误,请重试!')
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
function performOrderHistory() {
        return {
            type: types.PERFORM_ORDER_HISTORY_ACTION,
        }
}
function receiveOrderHistoryResult(result=[]){
        return {
            type: types.RECEIVE_ORDER_HISTORY_ACTION,
            order_list: result
        }
}
