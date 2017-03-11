'use strict';
/**
 * 进行定义请求Action类型
 */
 // 登陆
export const PERFORM_LOGIN_ACTION = 'PERFORM_LOGIN_ACTION'
export const RECEIVE_LOGIN_ACTION = 'RECEIVE_LOGIN_ACTION'
// 注册
export const PERFORM_REGISTER_ACTION = 'PERFORM_REGISTER_ACTION'
export const RECEIVE_REGISTER_ACTION = 'RECEIVE_REGISTER_ACTION'

// 获取菜单
export const PERFORM_MENU_ACTION = 'PERFORM_MENU_ACTION'
export const RECEIVE_MENU_ACTION = 'RECEIVE_MENU_ACTION'

//商家详情-商品列表相关的逻辑处理
export const FETCH_GOOS_ACTION = "FETCH_GOOS_ACTION"  //获取商品列表中
export const RECEIVE_GOODS_ACTION = "RECEIVE_GOODS_ACTION"  //获取到商品列表
export const CHANGE_CATEGORY_ACTION = "CHANGE_CATEGORY_ACTION" //切换列表，显示对应商品列表

//商品列表与购物车相关逻辑
export const ADD_FOOD = 'ADD_FOOD'
export const DELETE_FOOD = 'DELETE_FOOD'
export const CLEAR_CART = 'CLEAR_CART'
export const ADD_NUM = 'ADD_NUM'
export const CUT_NUM = 'CUT_NUM'
export const UPDATE_SUM = 'UPDATE_SUM'
