'use strict';
import React, {Component} from 'react';
import { connect } from 'react-redux'
import{
    View,
    Text,
    BackAndroid,
    TouchableOpacity,
    Image,
    StyleSheet,
    InteractionManager,
    TextInput,
    Platform,
    ToastAndroid,
} from 'react-native';

import { NaviGoBack } from '../../utils/CommonUtils';
import Header from '../../components/Header';
import ShortLineTwo from '../../components/ShortLineTwo';
import Loading from '../../components/Loading';
import {NativeModules} from 'react-native';
import { toastShort } from '../../utils/ToastUtil'
import { performRegisterAction } from '../../actions/RegisterAction'
let phone = '18959386006';
let password = '123123';
class Register extends Component {
  constructor(props) {
      super(props);
      this.buttonBackAction=this.buttonBackAction.bind(this);
      this.buttonChangeState=this.buttonChangeState.bind(this);
      this.registerAction=this.registerAction.bind(this);
}
  //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }
  buttonChangeState(){

  }
    isPhoneValid(phone){
        let regExp =new RegExp( "^[1]([3][0-9]{1}|56|59|58|88|80|89)[0-9]{8}$")
        return regExp.test(phone)//boolean
    }
    registerAction(){
    const {navigator,dispatch} = this.props
    //用户登录
    if(phone === ''){
        toastShort('手机号不能为空')
        return;
    }
    if(password === ''){
        toastShort('密码不能为空')
        return;
    }
    if(!this.isPhoneValid(phone)){
         toastShort('手机号错误')
        return
      }
    let data = {
       phone : phone,
       password : password
    }
    let string = JSON.stringify(data)
    dispatch(performRegisterAction(string, navigator))
    }
    render() {
    const {register} = this.props
    return (
         <View style={styles.container}>
            <Header title='注册' hasBack={true} backAction={() => {this.buttonBackAction()}} />
            <View style={{backgroundColor:'white',marginTop:13}}>
                <View style={{flexDirection:'row',height:45,alignItems:'center'}}>
                      <TextInput
                        style={styles.textInput}
                        placeholder="请输入手机号码"
                        placeholderTextColor="#aaaaaa"
                        underlineColorAndroid="transparent"
                        numberOfLines={1}
                        ref={'phone'}
                        multiline={true}
                        autoFocus={true}
                        onChangeText={(text) => {
                           phone = text;
                        }}
                  />
                </View>
                <ShortLineTwo/>
                <View style={{flexDirection:'row',height:45,alignItems:'center'}}>
                      <TextInput
                        style={styles.textInput}
                        placeholder="请输入密码(6位以上字符)"
                        placeholderTextColor="#aaaaaa"
                        underlineColorAndroid="transparent"
                        numberOfLines={1}
                        ref={'password'}
                        multiline={true}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                           password = text;
                        }}
                       />
                      <TouchableOpacity onPress={() => {this.buttonChangeState()}} style={{width:45,height:45,alignItems:'center',justifyContent:'center'}}>
                            <Image source={require('../../imgs/logre/ic_pwd_off.png')}
                                    style={{width:17,height:14,marginLeft:13}}/>
                      </TouchableOpacity>
                </View>
            </View>
            <Text style={{marginTop:13,marginLeft:13,fontSize:12,color:'#777'}}>注册则视为您已同意《夹虾米用户协议》</Text>
            <TouchableOpacity onPress={() => {this.registerAction()}}
                              style={styles.btn}>
                      <Text style={{color:'#ff7e5e'}}>注册</Text>
            </TouchableOpacity>
            <Loading visible={register.loading} />
         </View>
    );
    }
}
const styles=StyleSheet.create({
    container: {
        backgroundColor:'#f5f5f5',
        flex:1,
        alignItems:'center'
    },
    item_layout: {
        backgroundColor:'white',
        height:48,
        justifyContent:'center'
    },
    textInput: {
        marginTop:10,
        marginLeft:10,
        height:40,
        fontSize: 15,
        textAlign: 'left',
        textAlignVertical:'center',
        flex:1
    },
    btn: {
        width:300,
        height:40,
        marginTop:20,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
        borderWidth: 2,
        borderColor: '#ff7e5e'
    }
});

function mapStateToProps(state) {
  const { register } = state
  return {
    register
  }
}
export default connect(mapStateToProps)(Register)
