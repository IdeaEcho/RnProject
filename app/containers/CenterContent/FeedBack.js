/**
 * 问题报告-意见反馈
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
    TextInput,
} from 'react-native';

import { NaviGoBack } from '../../utils/CommonUtils';
import Header from '../../components/Header';
var content = '';
var contact = '';
class FeebBack extends Component {
  constructor(props) {
      super(props);
      this.buttonBackAction=this.buttonBackAction.bind(this);
      this.submiteFeedBack=this.submiteFeedBack.bind(this);
      this.selectFeedBack=this.selectFeedBack.bind(this);
      this._handleOnSelect=this._handleOnSelect.bind(this);
      this.state={
          selectData:"",
      }
  }

  _handleOnSelect (value) {
    this.setState({selectData:value})
  }

  //返回
  buttonBackAction(){
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }
  selectFeedBack(){

  }
  //提交反馈
  submiteFeedBack(){

  }
  render() {
        return (
             <View style={{backgroundColor:'#f5f5f5',flex:1}}>
             <Header title='问题报告' hasBack={true} backAction={()=>{this.buttonBackAction()}} />
                <View style={{backgroundColor:'white',marginTop:10}}>
                     <View style={styles.fd_content_style}>
                           <View style={{justifyContent:'center'}}><Text style={{marginLeft:10}}>问题类型</Text></View>
                           <View style={styles.top_style}>
                                <TouchableOpacity style={{marginRight:10}} onPress={()=>{this.selectFeedBack()}}>
                                    <View style={{flexDirection:'row'}}>
                                          <Text>新需求建议</Text>
                                          <Image source={require('../../imgs/ic_center_feedback_arrow_down.png')}
                                           style={styles.arrow_style}
                                            />
                                    </View>
                                 </TouchableOpacity>
                           </View>
                     </View>
                     <Image source={require('../../imgs/ic_large_bar.png')}/>
                     <TextInput
                            style={{ fontSize: 15, textAlignVertical: 'top' }}
                            placeholder="请写下您宝贵的意见或建议..."
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            numberOfLines={8}
                            ref={'content'}
                            multiline={true}
                            autoFocus={true}
                            onChangeText={(text) => {
                               content = text;
                            }}
                      />
                    <Image source={require('../../imgs/ic_large_bar.png')}/>
                    <View style={{flexDirection:'row',height:45,alignItems:'center'}}>
                          <Text style={{marginLeft:13}}>联系方式:</Text>
                          <TextInput
                            style={{height:40,fontSize: 15,textAlign: 'left',textAlignVertical:'center',flex:1}}
                            placeholder="必填"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            numberOfLines={1}
                            ref={'contact'}
                            multiline={true}
                            onChangeText={(text) => {
                               contact = text;
                            }}
                           />
                    </View>
                </View>
                <View style={styles.content_style}>
                    <TouchableOpacity  style={styles.btn} onPress={()=>{this.submiteFeedBack()}}>
                              <Text style={styles.btn_tv}>提交反馈</Text>
                    </TouchableOpacity>
                </View>
             </View>
        );
    }
}

const styles=StyleSheet.create({
    short_line:{
        marginLeft:10,
    },
    item_layout:{
        backgroundColor:'white',
        height:45,
        justifyContent:'center'
    },
    btn:{
        width:260,
        height:35,
        justifyContent:'center',
        backgroundColor:'#ff7e5e',
        borderRadius:5
    },
    btn_tv:{
        color:'white',
        alignSelf:'center',
        backgroundColor:'#00000000'
    },
    content_style:{
        alignItems:'center',
        marginTop:10,
    },
    arrow_style:{
        width:15,
        height:15,
        marginLeft:2,
        marginTop:2
    },
    top_style:{
        alignItems:'flex-end',
        flex:1,
        justifyContent:'center'
    },
    fd_content_style:{
        height:40,
        flexDirection:'row'
    }
});
export default FeebBack;
