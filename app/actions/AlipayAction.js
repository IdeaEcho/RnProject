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
import Alipay from 'react-native-yunpeng-alipay'
const APP_ID='2017031006160319'
const APP_PRIVATE_KEY='MIIEowIBAAKCAQEAwGn7uvUbWShdyaRS0ko8NgrqLo4buDUj++FALpjP/JbMxhK3fGddoVxvOd27rlPp0+slLlOpS7tCi6UPZTM62aii0oNZ0JRNVEVVIoMTdq8eX41iniWpqsNXJKeOqZ40GOio73l9ChPIfj6xbFhGEDNcPwSl3eFl7Yje/kpKPXW7GRRLy8CizwVpgZyZlzrYK2bd4GVFUmgj1rPCib+gWZ6jTeEmIaAwWRMfTJBKHful8yG6J7rNtw8fDSsbQw7nZHRN5frFCTesW83C+swpBAylcPWqAEcn82FJl/7xR9mkoepJrjw6zToO+H+yDlr6lMn5agFR8eL+pgzpus05nQIDAQABAoIBAQCnISera81Wcw6L4DSkPiDwnChvSbZgGaBo322dS9SUxPOXNJi18R7N0vk1nRixQmf/T+daxwZtJnmVzEiEEayTdLwA+GCiIL7ObO6W7J2SYGeUfb1kOriV/9iImRX81NLRs/1RDQiEIUzsA06fGkm5NrNwdXwRLwAXA+UVobe8iy1OqdlLGX2Bi7tpFCo4cq/b5rSim8CxSrGbkoFXcGakMXut7oQnzAUsonG9Z/c7Xmqge3SOkVrvSS/34VJj4Z1Ep3JNcUXaULkTxdEAW48Kcda5C8tcrMPAYSgUnFhm5y3/3KwYBj5Bd7m32qctaw0mltvG0Nt+xUwyHAXLX7UhAoGBAOrCmG/iG81hIcgp7LhCBb9ZTYhjlqBfRmvGCAVdGMXO8TKK54Jol+7AkH7a5AiHXiqo/Bp0+2WoC95/LmVPhJDB6WbJSMc089FABg2edkw5AVaHGfiwvkjy1DFgkY7K/rBa9oARQsnRrYGCvRT5XuWowj2H3FxGRQ233z99CrP1AoGBANHSlhrE/j0dgrixS2h7mHABE/5QPkVoXbYctrU4HuL5xkB13cCaH2F0f7OwIEVMBu9oCN1JWlzDcAhQIvijekmVQBRYSfLgP1NUFt9pp0bpijQVhMUcCGPmsWcI1uWNKMln2tngUCiVmU0YIMLd3dzjoScC5znW+95guWRJT44JAoGAXhvkP/XEb3Cguj0USEkvRKXoDuTdXSzUbh/U11GavLFYv4ovhHepcGyBgFj/UOvzM+bKKVD79qSHHYqebr6RxfX2Ot417qWrmBayVoNPqP6xKp6+KpOvtE6kAadUsolt0ASnDG/e9ki35VMjuWS+RhKAy2nLTLJevEEZnbnisIECgYBVlbw8dxXs/9iOVWMY3zEynn31Qe3kicmPuu6bxKR0mMVRDcLCCRu7uLVOKg0/tt8tUBYtjPoa1G0iNu3M1YHP+d0Fb23ab7Xk22vo/UOKHUCONijN7b1OYo8CJAzj3UxBuub98A1CQKMjWzAhzDXvH7pgG0MNyK876eA1E+IrYQKBgHJHj/dnooOQkzV8A3BZpL8S3X1S4rLe1N0OXlIZwI/G0zGxUO0ztbto1k9NlVcB7KIBUjym5LaW39DezoU1ExDH5q7ZHB2f0hfl+yjMouWQfed8EsnOxL86myFrGB1rq3dKvAmTI5+yN58gMXqvmJ8Rm2ubwBBt+stQUonatnXW'
const FORMAT = 'json'
const CHARSET ='UTF-8'
const ALIPAY_PUBLIC_KEY='MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAk7NcTOvfrvy5Nv1/IHMVPTgDSuG6xt5QgtxGAAA2sPIr7M2Z+lspmzEgGzvfJVKc0ZNM4BBIZHfi45eEQoiJceyoaGj74Vqm4gFN3DYrU06x6UErq9gAhgrayeXab4hKoqFRpHoDIBVcIpxppjOFxOoUMqsCV3gYxtUKAG6IOtZrZ0cDdWKowu+kvJkFyONfaJRZEmX7vZ2Hk+B6z/HXUYHwNwqef0t/oBm+AwPuywAjzQ7UcdA+kUciLWIqXk5p2aDjhCWymOkjodYCBVeB/PxmdctRwrDEy+dvMRRL72QdYB5JJcTwkAgrrVszPYONv/xtd+6qZXrfPqRihogrdQIDAQAB'
const SIGN_TYPE = 'RSA2'
const client = new FetchHttpClient(HOST)
// const alipayClient = new DefaultAlipayClient(
//     ALIPAY_URL,
//     APP_ID,
//     APP_PRIVATE_KEY,
//     FORMAT,
//     CHARSET,
//     ALIPAY_PUBLIC_KEY,
//     SIGN_TYPE
//   );

export function AlipayAction(data){
    return dispatch => {
        client.addMiddleware(form())
        // Add Logging
        client.addMiddleware(request => response => {
          console.log(request, response)
        })
        client.post(HOST,{
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
