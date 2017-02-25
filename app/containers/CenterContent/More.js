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
import ShortLine from '../../components/ShortLine';
import ShareToFriend from './ShareToFriend';

class More extends Component {
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
        InteractionManager.runAfterInteractions(() => {
        navigator.push({
          component: ShareToFriend,
          name: 'ShareToFriend'
        });
      });
      }
  }
  render() {
        return (
             <View style={{backgroundColor:'white',flex:1}}>
                <Header title='更多' hasBack={true} backAction={() => {this.buttonBackAction()}} />
                <View style={styles.top_layout}>
                    <Image source={require('../../imgs/logo@108.png')} style={{width:108,height:108,borderRadius:20}}/>
                    <Text style={{fontSize:15,marginTop:10}}>夹虾米V1.0</Text>
                </View>
                <TouchableOpacity style={styles.item_layout} onPress={()=>{this.itemButtonAction(0)}}>
                    <Text style={{marginLeft:10}}>检查更新</Text>
                </TouchableOpacity>
                <ShortLine/>
                <TouchableOpacity style={styles.item_layout} onPress={()=>{this.itemButtonAction(1)}}>
                    <Text style={{marginLeft:10}}>分享给好友</Text>
                </TouchableOpacity>
             </View>
        );
    }
}

const styles=StyleSheet.create({
    top_layout:{
        height:226,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f5f5f5'
    },
    item_layout:{
        backgroundColor:'white',
        height:45,
        justifyContent:'center'
    }
});
export default More;
