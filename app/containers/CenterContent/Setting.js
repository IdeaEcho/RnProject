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
} from 'react-native';

import { NaviGoBack } from '../../utils/CommonUtils';
import Header from '../../components/Header';
import SettingItem from '../../components/SettingItem';
import ShortLine from '../../components/ShortLine';
import Language from './Language';
import About from './About';
import ResetPwd from  './ResetPwd';
import Storage from 'react-native-storage'

class Setting extends Component {
  constructor(props) {
      super(props);
      this.buttonBackAction=this.buttonBackAction.bind(this);
      this.itemButtonAction=this.itemButtonAction.bind(this);
  }
  //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }
  //按钮点击
  itemButtonAction(position){
      const {navigator} = this.props;
      if(position === 0){

      }else if(position === 1){
        //注销登陆
        storage.remove({
            key: 'userinfo'
        });
      }else if(position === 2){
        InteractionManager.runAfterInteractions(() => {
           navigator.push({
              component: ResetPwd,
              name: 'ResetPwd'
           });
        });
      }else if(position === 3){
        InteractionManager.runAfterInteractions(() => {
           navigator.push({
              component: Language,
              name: 'Language'
           });
        });
      }else if(position === 5){

      }else if(position === 6){

      }else if(position === 7){

      }else if(position === 8){
          InteractionManager.runAfterInteractions(() => {
           navigator.push({
              component: About,
              name: 'About'
           });
        });
      }
  }
  render() {
        return (
             <View style={{backgroundColor:'#f5f5f5',flex:1}}>
                <Header title='设置' hasBack={true} backAction={()=>{this.buttonBackAction()}} />
                <View style={{flexDirection:'column',flex:1,marginTop:10}}>
                    <SettingItem title="更改密码" onPress={()=>{this.itemButtonAction(2)}}/>
                    <ShortLine/>
                    <SettingItem title="语言" onPress={()=>{this.itemButtonAction(3)}}/>
                    <ShortLine/>
                    <SettingItem title="评分" onPress={()=>{this.itemButtonAction(5)}}/>
                    <ShortLine/>
                    <SettingItem title="隐私策略" onPress={()=>{this.itemButtonAction(6)}}/>
                    <ShortLine/>
                    <SettingItem title="条款" onPress={()=>{this.itemButtonAction(7)}}/>
                    <ShortLine/>
                    <SettingItem title="关于我们" onPress={()=>{this.itemButtonAction(8)}}/>
                    <View style={{flex:1,justifyContent:'flex-end'}}>
                        <TouchableOpacity style={styles.item_layout} onPress={()=>{this.itemButtonAction(0)}}>
                            <Text style={{marginLeft:10}}>清空缓存</Text>
                        </TouchableOpacity>
                        <ShortLine/>
                        <TouchableOpacity style={styles.item_layout} onPress={()=>{this.itemButtonAction(1)}}>
                            <Text style={{marginLeft:10}}>注销登录</Text>
                        </TouchableOpacity>
                    </View>
                </View>
             </View>
        );
    }
}
const styles=StyleSheet.create({
    item_layout:{
        backgroundColor:'white',
        height:48,
        justifyContent:'center'
    }
});
export default Setting;
