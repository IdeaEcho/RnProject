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
import Chart from 'react-native-chart'

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
        const data = [
            [0, 3],
            [3, 5],
            [5, 7],
            [7, 9],
        ];
        return (
             <View style={{backgroundColor:'white',flex:1}}>
                <Header title='我的口味' hasBack={true} backAction={() => {this.buttonBackAction()}} />
                <View style={styles.top_layout}>
                    <Chart
                        style={styles.chart}
                        data={data}
                        sliceColors={['#53da72','#5e84ff','#55798f','#ff7e5e']}
                        showDataPoint={true}
                        showAxis={false}
                        type="pie"
                     />
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
        height:226,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f5f5f5'
    },
    item_layout:{
        backgroundColor:'white',
        height:45,
        justifyContent:'center'
    },
    chart: {
        width: 300,
        height: 100,
    },
})
export default Taste
