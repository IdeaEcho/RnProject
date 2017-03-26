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
let phone = ''
let password = ''
let repassword = ''
class Register extends Component {
  constructor(props) {
      super(props);
      this.buttonBackAction=this.buttonBackAction.bind(this);
      this.registerAction=this.registerAction.bind(this);
}
    //返回
    buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
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
            toastShort('请输入密码')
            return;
        }
        if(repassword === ''){
            toastShort('请重复输入密码')
            return;
        }
        if(password!=repassword){
            toastShort('两次输入密码不一致')
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
            <View style={{alignItems:'center',marginTop:10}}>
               <Image source={require('../../imgs/logo@round.png')} style={{width:90,height:90}}/>
            </View>
            <View style={styles.input_box}>
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
            <View style={styles.input_box}>
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
            </View>
            <View style={styles.input_box}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="请重复输入密码"
                    placeholderTextColor="#aaaaaa"
                    underlineColorAndroid="transparent"
                    numberOfLines={1}
                    ref={'repassword'}
                    multiline={true}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                       repassword = text;
                    }}
                   />
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
        backgroundColor:'#fff',
        flex:1,
        alignItems:'center'
    },
    item_layout: {
        backgroundColor:'white',
        height:48,
        justifyContent:'center'
    },
    input_box:{
        borderColor:'#1c2c3b',
        borderRadius:15,
        flexDirection:'row',
        height:45,
        width:260,
        alignItems:'center',
        marginTop:20,
        borderWidth: 1
    },
    textInput:{
        height:38,
        alignItems:'center',
        fontSize: 15,
        textAlign: 'left',
        textAlignVertical:'center',
        flex:1
    },
    textInput_icon:{
        width:19,
        height:18,
        marginLeft:13
    },
    btn:{
        width:260,
        height:40,
        marginTop:20,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
        borderWidth: 1,
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
