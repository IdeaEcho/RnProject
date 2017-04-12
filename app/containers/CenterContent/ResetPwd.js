'use strict';
import React, {Component} from 'react';
import{
    View,
    Text,
    BackAndroid,
    TouchableOpacity,
    Image,
    StyleSheet,
    InteractionManager,
    TextInput,
} from 'react-native';

import { NaviGoBack } from '../../utils/CommonUtils';
import Header from '../../components/Header';
import ShortLineTwo from '../../components/ShortLineTwo';
import formStyle from '../../styles/form'
import commonStyle from '../../styles/common'

var username = '';
var password = '';
var repassword = '';
var verifyCode = '';
class ResetPwd extends Component {
  constructor(props) {
      super(props);
      this.buttonBackAction=this.buttonBackAction.bind(this);
      this.queryVerifyCode=this.queryVerifyCode.bind(this);
      this.resetSuccesAction=this.resetSuccesAction.bind(this);
      this.buttonChangeState=this.buttonChangeState.bind(this);
}
  //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }
  buttonChangeState(position){

  }
  queryVerifyCode(){

  }
  resetSuccesAction(){

  }
  render() {
        return (
             <View style={commonStyle.container}>
                <Header title='重置密码' hasBack={true} backAction={()=>{this.buttonBackAction()}} />
                <View style={{backgroundColor:'white',marginTop:13}}>
                    <View style={formStyle.input_box}>
                          <TextInput
                            style={formStyle.textInput}
                            placeholder="请输入手机号码"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            numberOfLines={1}
                            ref={'username'}
                            multiline={true}
                            autoFocus={true}
                            onChangeText={(text) => {
                               username = text;
                            }} />
                    </View>
                    <View style={formStyle.input_box}>
                          <TextInput
                            style={formStyle.textInput}
                            placeholder="请输入原密码"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            numberOfLines={1}
                            ref={'password'}
                            multiline={true}
                            autoFocus={true}
                            onChangeText={(text) => {
                               verifyCode = text;
                            }} />
                    </View>
                    <View style={formStyle.input_box}>
                          <TextInput
                            style={formStyle.textInput}
                            placeholder="请输入新密码(6位以上字符)"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            numberOfLines={1}
                            ref={'newpassword'}
                            multiline={true}
                            autoFocus={true}
                            onChangeText={(text) => {
                               password = text;
                            }} />
                    </View>
                    <View style={formStyle.input_box}>
                          <TextInput
                            style={formStyle.textInput}
                            placeholder="请再输入一遍密码"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            numberOfLines={1}
                            ref={'repassword'}
                            multiline={true}
                            autoFocus={true}
                            onChangeText={(text) => {
                               repassword = text;
                            }}
                           />
                    </View>
                </View>
                <TouchableOpacity onPress={() => {this.resetSuccesAction()}} style={formStyle.btn}>
                    <Text style={{color:'#ff7e5e'}}>完成</Text>
                </TouchableOpacity>
             </View>
        );
    }
}
const styles=StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1,
        alignItems: 'center'
    },
    item_layout:{
        backgroundColor: 'white',
        height: 45,
        justifyContent: 'center'
    },
    btn:{
        width:300,
        height:40,
        marginTop:20,
        borderRadius:5,
        justifyContent:'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ff7e5e'
    }
});
export default ResetPwd;
