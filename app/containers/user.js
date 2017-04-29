'use strict'
import React, {Component} from 'react'
import{
    View,
    Text,
    TouchableOpacity,
    Image,
    InteractionManager,
    Dimensions,
    StyleSheet,
    ToastAndroid,
} from 'react-native'
import {connect} from 'react-redux'
import Setting from './CenterContent/Setting'
import More from './CenterContent/More'
import Login from './CenterContent/Login'
import Header from '../components/Header'
import CenterItem from '../components/CenterItem'
import ImageButton from '../components/ImageButton'
import { toastShort } from '../utils/ToastUtil'
import ModifyInformation from './CenterContent/ModifyInformation'
import Charge from './CenterContent/Charge'
import FeedBack from './CenterContent/FeedBack'
import Taste from './CenterContent/Taste'
import Storage from 'react-native-storage'
import Order from './order'

import { performOrderHistoryAction } from '../actions/OrderAction'

var {height,width} =  Dimensions.get('window')

class User extends Component {
    constructor(props) {
        super(props)
        this.settingButtonAction=this.settingButtonAction.bind(this)
        this.itemActionIndex=this.itemActionIndex.bind(this)
        this.itemModifyAction=this.itemModifyAction.bind(this)
        this.loginButtonActiom=this.loginButtonActiom.bind(this)
        this.state = {
            nickname:'未登陆',
            level: '',
            sweet: 0,
            acid: 0,
            hot: 0,
            salty: 0
        }
    }
    getUserInfo() {
        // 读取
        storage.load({
          key: 'userinfo',
          autoSync: true,
          syncInBackground: true,
        }).then(ret => {
            this.setState({
                customer_id: ret.phone,
                nickname: ret.nickname
            })
        }).catch(err => {
            //console.warn(err.message)
            toastShort("请点击头像登录账号")
        })
    }
    componentDidMount() {
        this.getUserInfo()
    }
    //设置按钮
    settingButtonAction(){
        const {navigator} = this.props
        InteractionManager.runAfterInteractions(() => {
        navigator.push({
          component: Setting,
          name: 'Setting'
        })
      })
    }
    //登录
    loginButtonActiom(){
        const {navigator} = this.props
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
              component: Login,
              name: 'Login'
            })
          })
    }
    //判断当前点击了那个按钮
    itemActionIndex(position){
        const {navigator} = this.props
        if(position === 0) {
            InteractionManager.runAfterInteractions(() => {
            navigator.push({
              component: Taste,
              name: '我的口味'
               })
            })
        }
        else if(position === 1) {
            InteractionManager.runAfterInteractions(() => {
            navigator.push({
              component: Order,
              name: '历史订单'
               })
            })
        }else if(position === 2) {
           InteractionManager.runAfterInteractions(() => {
            navigator.push({
              component: Charge,
              name: 'Charge'
            })
          })

        }else if(position === 3) {

        }else if(position === 4) {
            InteractionManager.runAfterInteractions(() => {
                  navigator.push({
                     component: FeedBack,
                     name: 'FeedBack'
                  })
            })
        }else if(position === 5) {
          InteractionManager.runAfterInteractions(() => {
            navigator.push({
              component: More,
              name: 'More'
              })
            })
      }
    }
    //编辑按钮
    itemModifyAction(){
       const {navigator} = this.props
       InteractionManager.runAfterInteractions(() => {
            navigator.push({
              component: ModifyInformation,
              name: 'ModifyInformation'
              })
            })
    }

    render() {
        return (
            <View style={styles.container}>
               <Header title='我的' />
               <View style={{backgroundColor:'white'}}>
                   <View style={styles.topbar}>
                      <TouchableOpacity onPress={() => {this.loginButtonActiom()}} >
                          <Image  style={styles.avatar} source={require('../imgs/logo@round.png')}/>
                      </TouchableOpacity>
                      <View style={{flexDirection:'column',justifyContent:'center',marginLeft:10}}>
                         <Text>{this.state.nickname}</Text>
                         <View style={{flexDirection:'row'}}>
                            <Text style={{color:'#ddd'}}>余额:</Text>
                            <Text style={{color:'#ddd'}}>¥2000</Text>
                         </View>
                      </View>
                      <View style={styles.modify_item}>
                         <ImageButton icon={require('../imgs/btn_border.png')} title='编辑'
                            onPress={()=>{this.itemModifyAction()}}
                         />
                      </View>
                   </View>
               </View>
               <CenterItem
                  title='我的口味'
                  icon={require('../imgs/user_taste.png')}
                  onPress={()=>this.itemActionIndex(0)}/>
               <View style={[styles.top_line,styles.center_line]}></View>
               <CenterItem
                  title='我的订单'
                  icon={require('../imgs/tab_menu_press.png')}
                  onPress={()=>this.itemActionIndex(1)}/>
               <View style={[styles.top_line,styles.center_line]}></View>
               <CenterItem
                  title='信用卡管理'
                  icon={require('../imgs/user_card.png')}
                  onPress={()=>this.itemActionIndex(2)}/>
               <View style={[styles.top_line,styles.center_line]}></View>
               <CenterItem
                  title='收藏'
                  icon={require('../imgs/user_collect.png')}
                  onPress={()=>this.itemActionIndex(3)}/>
               <View style={[styles.top_line,styles.center_line]}></View>

               <CenterItem
                  title='报告问题'
                  icon={require('../imgs/user_feedback.png')}
                  onPress={()=>this.itemActionIndex(4)}/>
               <View style={[styles.top_line,styles.center_line]}></View>

               <CenterItem
                  title='设置'
                  icon={require('../imgs/user_setting.png')}
                  onPress={()=>this.settingButtonAction()}/>
               <View style={[styles.top_line,styles.center_line]}></View>

               <CenterItem
                  title='更多'
                  icon={require('../imgs/user_more.png')}
                  onPress={()=>this.itemActionIndex(5)}/>
               <View style={styles.top_line}></View>

               <TouchableOpacity style={{height:45,width:width,backgroundColor:'white',marginTop:10,justifyContent:'center',}}>
                   <Text style={{alignSelf:'center'}}>客服电话:18959386000</Text>
               </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#f5f5f5',
        flex:1
    },
    topbar: {
        flexDirection:'row',
        height:100
    },
    avatar: {
        width:70,
        height:70,
        marginLeft:10,
        marginTop:15
    },
    button: {
        height: 40,
        width: 100,
        borderRadius: 5,
        justifyContent: 'center',
        overflow: 'hidden',
    },
    buttonText: {
        textAlign:'center',
        color: 'white',
    },
    top_line:{
        height:1,
        backgroundColor:'#ccc'
    },
    center_line:{
        marginLeft:8,
        marginRight:8,
    },
    modify_item:{
        alignItems:'flex-end',
        flex:1,
        marginRight:20,
        marginTop:40
    }
})
function mapStateToProps(state) {
    const {nickname} = state
        return {
            nickname: nickname,
        }
}
export default connect(mapStateToProps)(User)
