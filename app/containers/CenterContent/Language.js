/**
 * 多语言切换
 */
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
import LanguageItem from '../../components/LanguageItem';

class Language extends Component {
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
  itemButtonAction(position){
      if(position === 0){

      }else if(position === 1){

      }
  }
  render() {
        return (
             <View style={{backgroundColor:'#f5f5f5',flex:1}}>
                <Header title='语言切换' hasBack={true} backAction={()=>{this.buttonBackAction()}} />
                <LanguageItem title="简体中文(Simple Chinease)"
                              onPress={()=>{this.itemButtonAction(0)}}
                              selected={true}
                              style={{marginTop:10}}
                              />
                <ShortLine/>
                <LanguageItem title="英文(Enligsh)" onPress={()=>{this.itemButtonAction(1)}} selected={false}/>

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
});
export default Language;
