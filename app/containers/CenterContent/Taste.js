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
import NoneItem from '../../components/NoneItem'
import { toastShort } from '../../utils/ToastUtil'
import Echarts from 'native-echarts'

var acid = 0;
var sweet = 0;
var hot = 0;
var salty = 0;
class Taste extends Component {
  constructor(props) {
      super(props)
      this.buttonBackAction=this.buttonBackAction.bind(this)
      this.itemButtonAction=this.itemButtonAction.bind(this)
  }
  componentDidMount() {
      // 读取
      storage.load({
        key: 'userinfo',
        autoSync: true,
        syncInBackground: true,
      }).then(ret => {
          acid = ret.acid
          sweet = ret.sweet
          hot = ret.hot
          salty = ret.salty
      }).catch(err => {
        //console.warn(err.message)
        toastShort("您还没有口味数据哦")
      })
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
        // let data = [{
        //     "acid": acid,
        //     "sweet": sweet,
        //     "hot": hot,
        //     "salty": salty
        // }]
        const optionBar = {
            tooltip: {},
            xAxis: {
              data: ["酸","甜","辣","咸"]
            },
            yAxis: {},
            color:['rgb(251,100,58)'],
            series: [{
              name: '口味指数',
              type: 'bar',
              data: [acid, sweet, hot, salty]
            }]
        };
        const optionPie = {
            tooltip : {},
            visualMap: {
                show: false,
                min: 0,
                max: 100,
                inRange: {
                    colorLightness: [0, 1.6]
                }
            },
            series : [
                {
                    name:'口味分析',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
                    data:[
                        {value:acid, name:'甜'},
                        {value:sweet, name:'辣'},
                        {value:hot, name:'咸'},
                        {value:salty, name:'酸'}
                    ].sort(function (a, b) { return a.value - b.value}),
                    roseType: 'angle',
                    label: {
                        normal: {
                            textStyle: {
                                color: 'rgba(251,100,58, 0.8)'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(251,100,58, 0.8)'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#B8D3E4',
                        }
                    },
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        }
        return (
             <View style={{backgroundColor:'white',flex:1}}>
                <Header title='我的口味' hasBack={true} backAction={() => {this.buttonBackAction()}} />
                {acid!=0 || sweet!=0 || salty!=0 || hot!=0 &&<View style={styles.top_layout}>
                    <Echarts
                     option={optionBar}
                     height={300}
                     />
                </View>}
                {acid!=0 || sweet!=0 || salty!=0 || hot!=0 &&<View style={styles.top_layout}>
                    <Echarts
                     option={optionPie}
                     height={300}
                     />
                </View>}
                {acid==0 && sweet==0 && salty==0 && hot==0 && <NoneItem />}
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
    },
})
export default Taste
