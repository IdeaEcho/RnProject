'use strict';
import React, {Component} from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    Image,
    InteractionManager,
    Dimensions,
    StyleSheet,
    ToastAndroid,
} from 'react-native';

import Setting from './CenterContent/Setting';
import More from './CenterContent/More';
import Login from './CenterContent/Login';
import Header from '../components/Header';
import CenterItem from '../components/CenterItem';
import ImageButton from '../components/ImageButton';
import ModifyInformation from './CenterContent/ModifyInformation';
import Charge from './CenterContent/Charge';
import FeedBack from './CenterContent/FeedBack';
import Storage from 'react-native-storage';

var {height,width} =  Dimensions.get('window');

class User extends Component {
    constructor(props) {
        super(props);
        this.settingButtonAction=this.settingButtonAction.bind(this);
        this.itemActionIndex=this.itemActionIndex.bind(this);
        this.itemModifyAction=this.itemModifyAction.bind(this);
        this.loginButtonActiom=this.loginButtonActiom.bind(this);
        this.state = {
            nickname:'未登陆',
            level: '',
            sweet: 0,
            acid: 0,
            hot: 0,
            salty: 0,
            bitter: 0,
        };
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
          // 如果找到数据，则在then方法中返回
          // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
          // 你只能在then这个方法内继续处理ret数据
          // 而不能在then以外处理
          // 也没有办法“变成”同步返回
          // 你也可以使用“看似”同步的async/await语法
          this.setState({ nickname: ret.nickname });
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
    //设置按钮
    settingButtonAction(){
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
        navigator.push({
          component: Setting,
          name: 'Setting'
        });
      });
    }
    //登录
    loginButtonActiom(){
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
              component: Login,
              name: 'Login'
            });
          });
    }
    //判断当前点击了那个按钮
    itemActionIndex(position){
        const {navigator} = this.props;
        if(position === 1){

        }else if(position === 2){
           InteractionManager.runAfterInteractions(() => {
            navigator.push({
              component: Charge,
              name: 'Charge'
            });
          });

        }else if(position === 3){

        }else if(position === 4){
            InteractionManager.runAfterInteractions(() => {
                  navigator.push({
                     component: FeedBack,
                     name: 'FeedBack'
                  });
            })
        }else if(position === 5){
          InteractionManager.runAfterInteractions(() => {
            navigator.push({
              component: More,
              name: 'More'
              });
            });
      }
    }
    //编辑按钮
    itemModifyAction(){
       const {navigator} = this.props;
       InteractionManager.runAfterInteractions(() => {
            navigator.push({
              component: ModifyInformation,
              name: 'ModifyInformation'
              });
            });
    }

    render() {
        return (
            <View style={styles.container}>
               <View style={{backgroundColor:'white'}}>
                   <View style={{flexDirection:'row',height:100}}>
                      <TouchableOpacity onPress={() => {this.loginButtonActiom()}} >
                          <Image  style={{width:70,height:70,marginLeft:10,marginTop:15}} source={require('../imgs/ic_center_icon.png')}/>
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
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#f5f5f5',
        flex:1
    },
    topbar_bg:{
        height:48,
        backgroundColor:'#ff7e5e',
        flexDirection:'row'
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
        marginRight:10,
        marginTop:40
    }
});

export default User;
