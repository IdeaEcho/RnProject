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
import CenterItem from '../components/CenterItem';
import ImageButton from '../components/ImageButton';
import ModifyInformation from './CenterContent/ModifyInformation';
import Charge from './CenterContent/Charge';
import Prepaid from './CenterContent/Prepaid';

var {height,width} =  Dimensions.get('window');

class User extends Component {
    constructor(props) {
        super(props);
        this.settingButtonAction=this.settingButtonAction.bind(this);
        this.itemActionIndex=this.itemActionIndex.bind(this);
        this.itemModifyAction=this.itemModifyAction.bind(this);
        this.loginButtonActiom=this.loginButtonActiom.bind(this);
        this.state = {
            username:'',
            level:'',
            sweet: 0,
            acid: 0,
            hot: 0,
            salty: 0,
            bitter: 0,
        };
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
        if(position === 0){
           InteractionManager.runAfterInteractions(() => {
            navigator.push({
              component: Prepaid,
              name: 'Prepaid'
            });
          });
        }else if(position === 1){

        }else if(position === 2){
           InteractionManager.runAfterInteractions(() => {
            navigator.push({
              component: Charge,
              name: 'Charge'
            });
          });

        }else if(position === 3){

        }else if(position === 4){

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
            <View style={{flex:1,backgroundColor:'#f5f5f5'}}>
               <View style={{height:45,backgroundColor:'black',flexDirection:'row'}}>
                   <View style={{flex:1}}></View>
                   <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                      <Text style={{fontSize:18,color:'white',alignSelf:'center'}}>我的</Text>
                   </View>
                   <View style={{flex:1,justifyContent:'flex-end',alignItems:'center',flexDirection:'row'}}>
                   <TouchableOpacity onPress={() => {this.settingButtonAction()}} style={{marginRight:10,justifyContent:'center'}}>
                      <Image
                         style={{width:24,height:22}}
                         source={require('../imgs/ic_center_setting.png')}
                      />
                   </TouchableOpacity>
                   </View>
               </View>

               <View style={{backgroundColor:'white'}}>
                   <View style={{flexDirection:'row',height:100}}>
                      <TouchableOpacity onPress={() => {this.loginButtonActiom()}} >
                          <Image  style={{width:70,height:70,marginLeft:10,marginTop:15}} source={require('../imgs/ic_center_icon.png')}/>
                      </TouchableOpacity>
                      <View style={{flexDirection:'column',justifyContent:'center',marginLeft:10}}>
                         <Text>Julia Stone</Text>
                         <View style={{flexDirection:'row'}}>
                            <Text style={{color:'#ddd'}}>余额:</Text>
                            <Text style={{color:'#ddd'}}>¥2000</Text>
                         </View>
                      </View>

                      <View style={styles.modify_item}>
                         <ImageButton icon={require('../imgs/ic_center_modify.png')} title='编辑'
                            onPress={()=>{this.itemModifyAction()}}
                         />
                      </View>
                   </View>
               </View>

               <CenterItem
                  title='信用卡管理'
                  icon={require('../imgs/ic_center_card.png')}
                  onPress={()=>this.itemActionIndex(2)}/>
               <View style={[styles.top_line,styles.center_line]}></View>
               <CenterItem
                  title='收藏'
                  icon={require('../imgs/ic_center_collect.png')}
                  onPress={()=>this.itemActionIndex(3)}/>
               <View style={[styles.top_line,styles.center_line]}></View>
               <CenterItem
                  title='商家合作'
                  icon={require('../imgs/ic_center_hezuo.png')}
                  onPress={()=>this.itemActionIndex(4)}/>
               <View style={[styles.top_line,styles.center_line]}></View>

               <View style={[styles.top_line,{marginTop:10}]}></View>
               <CenterItem
                  title='更多'
                  icon={require('../imgs/ic_center_more.png')}
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
    container: {
        flex: 1,
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
        marginTop:15
    }
});

export default User;
