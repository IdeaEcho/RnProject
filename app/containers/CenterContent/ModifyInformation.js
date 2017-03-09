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
    ScrollView,
} from 'react-native';

import { NaviGoBack } from '../../utils/CommonUtils';
import Header from '../../components/Header';
import ShortLineTwo from '../../components/ShortLineTwo';

class ModifyInformation extends Component {
  constructor(props) {
      super(props);
      this.buttonBackAction=this.buttonBackAction.bind(this);
      this.informationSave=this.informationSave.bind(this);
      this.modifyIcon=this.modifyIcon.bind(this);
      this.state = {
          phone:'',
          nickname:''
      }
  }
  componentDidMount(){
      // 读取
      storage.load({
        key: 'userinfo',
        autoSync: true,// autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
        // syncInBackground(默认为true)意味着如果数据过期，
        // 在调用sync方法的同时先返回已经过期的数据。
        // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
        syncInBackground: true,
      }).then(ret => {
        this.setState({ phone: ret.phone,nickname: ret.nickname });
      }).catch(err => {
        //如果没有找到数据且没有sync方法，
        //或者有其他异常，则在catch中返回
        console.warn(err.message);
        switch (err.name) {
            case 'NotFoundError':
                // TODO;
                break;
            case 'ExpiredError':
                // TODO
                break;
        }
      })
  }
  //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }
  //信息保存
  informationSave(){

  }
  //修改头像
  modifyIcon(){

  }
  render() {
        return (
             <View style={{backgroundColor:'#f5f5f5',flex:1}}>
                 <Header title='个人信息' hasBack={true} backAction={()=>{this.buttonBackAction()}}
                 hasRight={true} right='保存' rightAction={()=>{this.informationSave()}} />
                <ScrollView style={{flex:1}}>
                <View style={{marginTop:13,backgroundColor:'white'}}>
                     <TouchableOpacity onPress={()=>{this.modifyIcon()}} style={{height:45}}>
                            <View style={{flexDirection:'row',height:45,alignItems:'center',flex:1}}>
                                 <Image source={require('../../imgs/modify/ic_modify_icon.png')}
                                        style={{width:18,height:18,marginLeft:13}}/>
                                 <Text style={{fontSize:12,color:'#777',marginLeft:8}}>头像</Text>
                                 <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',height:45}}>
                                        <Image source={require('../../imgs/modify/ic_modify_arrow.png')}
                                        style={{width:12,height:15,flexDirection:'row',marginRight:13}}/>
                                 </View>
                            </View>
                    </TouchableOpacity>
                    <ShortLineTwo/>
                    <View style={{flexDirection:'row',height:45,alignItems:'center',flex:1}}>
                                 <Image source={require('../../imgs/modify/ic_modify_name.png')}
                                        style={{width:18,height:18,marginLeft:13}}/>
                                 <Text style={{fontSize:12,color:'#777',marginLeft:8}}>姓名</Text>
                                 <TextInput
                                        style={styles.textInput}
                                        placeholderTextColor="#aaaaaa"
                                        underlineColorAndroid="transparent"
                                        numberOfLines={1}
                                        ref={'nickname'}
                                        defaultValue={this.state.nickname}
                                        multiline={true}
                                        onChangeText={(text) => {
                                            nickname = text;
                                            }}
                                />
                            </View>
                    <ShortLineTwo/>
                    <View style={{flexDirection:'row',height:45,alignItems:'center',flex:1}}>
                                 <Image source={require('../../imgs/modify/ic_modify_email.png')}
                                        style={{width:18,height:18,marginLeft:13}}/>
                                 <Text style={{fontSize:12,color:'#777',marginLeft:8}}>邮箱</Text>
                                 <TextInput
                                        style={styles.textInput}
                                        placeholderTextColor="#aaaaaa"
                                        underlineColorAndroid="transparent"
                                        numberOfLines={1}
                                        ref={'email'}
                                        multiline={true}
                                        onChangeText={(text) => {
                                            email = text;
                                            }}
                                />
                            </View>
                    <ShortLineTwo/>
                    <View style={{flexDirection:'row',height:45,alignItems:'center',flex:1}}>
                                 <Image source={require('../../imgs/modify/ic_modify_infor.png')}
                                        style={{width:18,height:18,marginLeft:13}}/>
                                 <Text style={{fontSize:12,color:'#777',marginLeft:8}}>简介</Text>
                                 <TextInput
                                        style={styles.textInput}
                                        placeholderTextColor="#aaaaaa"
                                        underlineColorAndroid="transparent"
                                        numberOfLines={1}
                                        ref={'infor'}
                                        multiline={true}
                                        onChangeText={(text) => {
                                            infor = text;
                                            }}
                                />
                            </View>
                </View>
                <Text style={{marginLeft:13,marginTop:13,color:'#777',fontSize:13}}>私人信息</Text>
                <View style={{marginTop:13,backgroundColor:'white'}}>
                      <View style={{flexDirection:'row',height:45,alignItems:'center',flex:1}}>
                                 <Image source={require('../../imgs/modify/ic_modify_tel.png')}
                                        style={{width:18,height:18,marginLeft:13}}/>
                                 <Text style={{fontSize:12,color:'#777',marginLeft:8}}>电话</Text>
                                 <TextInput
                                        style={styles.textInput}
                                        placeholderTextColor="#aaaaaa"
                                        underlineColorAndroid="transparent"
                                        numberOfLines={1}
                                        ref={'tel'}
                                        multiline={true}
                                        defaultValue={this.state.phone}
                                        onChangeText={(text) => {
                                            tel = text;
                                            }}
                                />
                            </View>
                    <ShortLineTwo/>
                    <View style={{flexDirection:'row',height:45,alignItems:'center',flex:1}}>
                                 <Image source={require('../../imgs/modify/ic_modify_gender.png')}
                                        style={{width:18,height:18,marginLeft:13}}/>
                                 <Text style={{fontSize:12,color:'#777',marginLeft:8}}>性别</Text>
                                 <TextInput
                                        style={styles.textInput}
                                        placeholderTextColor="#aaaaaa"
                                        underlineColorAndroid="transparent"
                                        numberOfLines={1}
                                        ref={'gender'}
                                        multiline={true}
                                        onChangeText={(text) => {
                                            gender = text;
                                            }}
                                />
                            </View>
                </View>
                <Text style={{marginLeft:13,marginTop:13,color:'#777',fontSize:13}}>账号关联</Text>
                <View style={{marginTop:13,backgroundColor:'white'}}>
                      <View style={{flexDirection:'row',height:45,alignItems:'center',flex:1}}>
                                 <Image source={require('../../imgs/modify/ic_modify_qq.png')}
                                        style={{width:18,height:18,marginLeft:13}}/>
                                 <Text style={{fontSize:14,color:'#777',marginLeft:8,flex:1}}>QQ:88888888</Text>
                                 <TouchableOpacity style={{width:40,height:40,justifyContent:'center',alignItems:'center'}}>
                                       <Text style={{fontSize:12,color:'#777'}}>解绑</Text>
                                 </TouchableOpacity>
                      </View>
                    <ShortLineTwo/>
                    <View style={{flexDirection:'row',height:45,alignItems:'center',flex:1}}>
                               <Image source={require('../../imgs/modify/ic_modify_weixin.png')}
                                        style={{width:18,height:18,marginLeft:13}}/>
                               <Text style={{fontSize:14,color:'#777',marginLeft:8,flex:1}}>微信:45667777</Text>
                               <TouchableOpacity style={{width:40,height:40,justifyContent:'center',alignItems:'center'}}>
                                       <Text style={{fontSize:12,color:'#777'}}>解绑</Text>
                              </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
             </View>
        );
    }
}
const styles=StyleSheet.create({
    item_layout:{
        backgroundColor:'white',
        height:45,
        justifyContent:'center'
    },
    textInput:{
        marginTop:8,
        marginLeft:10,
        height:38,
        fontSize: 15,
        textAlign: 'left',
        textAlignVertical:'center',
        flex:1
    }
});
export default ModifyInformation;
