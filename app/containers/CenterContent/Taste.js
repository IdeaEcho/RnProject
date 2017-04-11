'use strict'
import React, {Component} from 'react'
import{
    View,
    Text,
    BackAndroid,
    TouchableOpacity,
    Image,
    StyleSheet,
    InteractionManager,
} from 'react-native'
import { NaviGoBack } from '../../utils/CommonUtils'
import Header from '../../components/Header'
import ShortLine from '../../components/ShortLine'
import { Radar } from 'react-native-pathjs-charts'

class Taste extends Component {
  constructor(props) {
      super(props)
      this.buttonBackAction=this.buttonBackAction.bind(this)
      this.itemButtonAction=this.itemButtonAction.bind(this)
  }
  //返回
  buttonBackAction(){
      const {navigator} = this.props
      return NaviGoBack(navigator)
  }
  //按钮点击
  itemButtonAction(position){
      const {navigator} = this.props
      if(position === 0){
      }
  }
  render() {
        let data = [{
            "acid": 10,
            "sweet": 20,
            "hot": 3,
            "salty": 40
        }]

        let options = {
            width: 300,
            height: 300,
            margin: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
            },
            r: 120,
            max: 100,
            fill: "#2980B9",
            stroke: "#2980B9",
            animate: {
            type: 'oneByOne',
            duration: 200
            },
            label: {
            fontFamily: 'Arial',
            fontSize: 14,
            fontWeight: true,
            fill: '#34495E'
            }
        }
        return (
             <View style={{backgroundColor:'white',flex:1}}>
                <Header title='我的口味' hasBack={true} backAction={() => {this.buttonBackAction()}} />
                <View style={styles.top_layout}>
                    <Radar data={data} options={options} />
                </View>
                <TouchableOpacity style={styles.item_layout} onPress={()=>{this.itemButtonAction(0)}}>
                    <Text style={{marginLeft:10}}>检查更新</Text>
                </TouchableOpacity>
                <ShortLine/>
             </View>
        )
    }
}

const styles=StyleSheet.create({
    top_layout:{
        height:300,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f5f5f5'
    },
    item_layout:{
        backgroundColor:'white',
        height:45,
        justifyContent:'center'
    }
})
export default Taste
