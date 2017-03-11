/**
 * 用户获取菜单
 */
'use strict'

import {InteractionManager}  from 'react-native'
import * as types from '../common/ActionTypes'
import FetchHttpClient, {form,header } from 'fetch-http-client'
import {HOST,MENU_ACTION} from  '../common/Request'
import { toastShort } from '../utils/ToastUtil'
import Storage from 'react-native-storage'
const client = new FetchHttpClient(HOST)

export function performMenuAction(token, navigator){
    return dispatch => {
        dispatch(performMenu())
        client.addMiddleware(form())
        // Add Logging
        client.addMiddleware(request => response => {
          console.log(request, response)
        })
        client.post(MENU_ACTION,{
            form: { data: token }
        }).then(response => {
            return response._bodyInit
        }).then((result)=> {
            console.log(JSON.stringify(result));
            toastShort(JSON.stringify(result))
            dispatch(receiveMenuResult(result))
            if(result){
                // toastShort('获取菜单成功')
                storage.save({
                    key: 'menuinfo',
                    rawData: {
                        menu: result
                    },
                    expires: 1000 * 3600 //null永不过期
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

function performMenu() {
        return {
            type: types.PERFORM_MENU_ACTION,
        }
}

function receiveMenuResult(result){
        return {
            type: types.RECEIVE_MENU_ACTION,
            data: result
        }
}
