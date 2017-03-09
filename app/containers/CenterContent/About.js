/**
 * 关于我们
 */
'use strict';
import React from 'react';
import {
  Dimensions,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { NaviGoBack } from '../../utils/CommonUtils';
import Header from '../../components/Header';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.buttonBackAction=this.buttonBackAction.bind(this);
  }
    //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }
  render() {
    return (
       <View style={{backgroundColor:'#fff',flex:1}}>
        <Header title='问题报告' hasBack={true} backAction={()=>{this.buttonBackAction()}} />
          <View style={{alignItems:'center',marginTop:10}}>
             <Image source={require('../../imgs/logo@round.png')} style={{width:110,height:110}}/>
             <Text style={styles.text_version}>版本:V1.0</Text>
          </View>
          <View style={{alignItems:'center',marginTop:10}}>
            <Text style={{fontSize:15,color:'black'}}>RN!~</Text>
          </View>
          <View style={{marginBottom:10,flex:1}}>
             <View style={styles.text_right}>
               <View style={{flexDirection:'row'}}>
                  <Text>免责声明:所有内容均来自:</Text>
                  <Text style={{color:'#63B8FF'}}>夹虾米</Text>
               </View>
               <View>
                  <Text style={{color:'#63B8FF'}}>网址</Text>
               </View>
             </View>
          </View>
      </View>
    );
  }
}
let styles = StyleSheet.create({
   text_version:{
      color:'#ddd',
      marginTop:8
   },
   text_right:{
      alignSelf:'center',
      alignItems:'center',
      flex:1,
      justifyContent:'flex-end'
   }
});
export default About;
