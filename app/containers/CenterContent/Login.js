'use strict'
import React, {Component} from 'react'
import{
    View,
    Text,
    BackAndroid,
    TouchableOpacity,
    Image,
    InteractionManager,
    TextInput,
    Platform,
    ToastAndroid,
} from 'react-native'
//(Platform.OS === 'ios') ? '' : ''
import { NaviGoBack } from '../../utils/CommonUtils'
import Register from './Register'
import Header from '../../components/Header'
import ShortLineTwo from '../../components/ShortLineTwo'
import ResetPwd from  './ResetPwd'
import { toastShort } from '../../utils/ToastUtil'
import Loading from '../../components/Loading_DD'

import { connect } from 'react-redux'
import { performLoginAction } from '../../actions/LoginAction'
import formStyle from '../../styles/form'
import commonStyle from '../../styles/common'

var phone = '18959386000'
var password = '123123'

class Login extends Component {
    constructor(props) {
        super(props)
        this.buttonBackAction=this.buttonBackAction.bind(this)
        this.buttonRegisterOrLoginAction=this.buttonRegisterOrLoginAction.bind(this)
        this.findPwdAction=this.findPwdAction.bind(this)
        this.thirdPartLoginAction=this.thirdPartLoginAction.bind(this)
    }
  //返回
    buttonBackAction(){
        const {navigator} = this.props
        return NaviGoBack(navigator)
    }
    isPhoneValid(phone){
        var regExp =new RegExp( "^[1]([3][0-9]{1}|56|59|58|88|80|89)[0-9]{8}$")
        return regExp.test(phone)//boolean
    }
    //用户登录/注册
    buttonRegisterOrLoginAction(position){
        const {navigator, dispatch} = this.props
        if(position === 0){
            //用户登录
           if(phone === ''){
               toastShort('手机号不能为空')
               return
           }
           if(password === ''){
               toastShort('密码不能为空')
               return
           }
           if(!this.isPhoneValid(phone)){
               toastShort('手机号错误')
               return
           }
           var data = {
               phone : phone,
               password : password
           }
           var string = JSON.stringify(data)
           dispatch(performLoginAction(string,navigator))
        }else if(position === 1){
           //用户注册
           InteractionManager.runAfterInteractions(() => {
               navigator.push({
                   component: Register,
                   name: 'Register'
                })
            })
        }
    }
    findPwdAction(){
        const {navigator} = this.props
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
               component: ResetPwd,
               name: 'ResetPwd'
            })
        })
    }
    thirdPartLoginAction(position){

    }

    render() {
      const {login} = this.props
      return (
             <View style={commonStyle.container}>
                <Header title='登陆' right='注册' hasBack={true} hasRight={true}
                backAction={()=>{this.buttonBackAction()}}
                rightAction={() => {this.buttonRegisterOrLoginAction(1)}} />
                <View style={{alignItems:'center',marginTop:10}}>
                   <Image source={require('../../imgs/logo@round.png')} style={{width:90,height:90}}/>
                </View>
                    <View style={formStyle.input_box}>
                          <Image source={require('../../imgs/logre/tele.png')}
                                 style={formStyle.textInput_icon}/>
                          <TextInput
                            style={formStyle.textInput}
                            placeholder="手机"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            numberOfLines={1}
                            ref={'phone'}
                            multiline={true}
                            autoFocus={true}
                            onChangeText={(text) => {
                               phone = text
                            }}
                      />
                    </View>
                    <View style={formStyle.input_box}>
                          <Image source={require('../../imgs/logre/pwd.png')}
                                 style={formStyle.textInput_icon}/>
                          <TextInput
                            style={formStyle.textInput}
                            placeholder="密码"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            numberOfLines={1}
                            ref={'password'}
                            multiline={true}
                            secureTextEntry={true}
                            onChangeText={(text) => {
                               password = text
                            }}
                           />
                    </View>
                <TouchableOpacity onPress={() => {this.buttonRegisterOrLoginAction(0)}}  style={formStyle.btn}>
                          <Text style={{color:'#ff7e5e'}}>登录</Text>
                </TouchableOpacity>
                <View style={{alignItems:'flex-end',marginTop:13}}>
                    <TouchableOpacity onPress={()=>{this.findPwdAction()}} style={{marginRight:10}}>
                        <Text style={{fontSize:13,color:'#777'}}>找回密码</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop:20,alignItems:'center'}}>
                    <Text style={{fontSize:13,color:'#777'}}>第三方账号登录</Text>
                    <View style={{flexDirection:'row',marginTop:20}}>
                          <TouchableOpacity onPress={()=>{this.thirdPartLoginAction(0)}}>
                              <Image source={require('../../imgs/logre/ic_login_weixin.png')} style={{width:50,height:50}}/>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={()=>{this.thirdPartLoginAction(1)}} style={{marginLeft:15}}>
                              <Image source={require('../../imgs/logre/ic_login_qq.png')} style={{width:50,height:50}}/>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={()=>{this.thirdPartLoginAction(2)}} style={{marginLeft:15}}>
                              <Image source={require('../../imgs/logre/ic_login_fb.png')} style={{width:50,height:50}}/>
                          </TouchableOpacity>
                    </View>
                </View>
                <Loading visible={login.loading} />
             </View>
        )
    }
}

function mapStateToProps(state) {
  const { login } = state
  return {
    login
  }
}

export default connect(mapStateToProps)(Login)
