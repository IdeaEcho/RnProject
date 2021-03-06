/**
 * 推荐页
 */
'use strict'
import React, {Component} from 'react'
import{
    View,
    Text,
    Dimensions,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    InteractionManager,
    Platform,
} from 'react-native'
import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager'
import Scan from './scan'
import ShortLine from '../components/ShortLine'
import StoreDetail from './StoreDetail'
import WebViewDetails from './WebViewDetails'
import {STORE_DATA} from '../common/VirtualData'
import { performMenuAction } from '../actions/MenuAction'
import { connect } from 'react-redux'
import { toastShort } from '../utils/ToastUtil'

var {height, width} = Dimensions.get('window')
var item_width = (width-1)/2

const BANNER_IMGS = [
    require('../imgs/home/1.jpg'),
    require('../imgs/home/2.jpg'),
    require('../imgs/home/3.jpg'),
    require('../imgs/home/4.jpg')
]
const CENTER_IMGS = [
    require('../imgs/home/img_1.png'),
    require('../imgs/home/img_2.png'),
    require('../imgs/home/img_3.png'),
    require('../imgs/home/img_4.png'),
    require('../imgs/home/img_5.png'),
    require('../imgs/home/img_6.png'),
    require('../imgs/home/img_7.png'),
    require('../imgs/home/img_8.png')
]
class Index extends Component {
    constructor(props) {
        super(props)
        this.centerItemAction=this.centerItemAction.bind(this)
        this.topItemAction=this.topItemAction.bind(this)
        this.recomdStoreAction = this.recomdStoreAction.bind(this)
    }
  centerItemAction(position){
      const {navigator} = this.props
      InteractionManager.runAfterInteractions(() => {
            navigator.push({
              component: WebViewDetails,
              name: 'WebViewDetails',
            })
      })
  }
  recomdStoreAction(position){
      const {navigator, dispatch} = this.props
      let token = eval(STORE_DATA.data[position]).accesstoken
      let tokenjson = {
          access_token :  token
      }
      let tokenstr = JSON.stringify(tokenjson)
      dispatch(performMenuAction(tokenstr, 0, navigator))
  }
  topItemAction(position){
      const { navigator } = this.props
      if(position === 0){
          InteractionManager.runAfterInteractions(() => {
            navigator.push({
              component: Scan,
              name: 'Scan'
              })
            })
      }
  }
  _renderDotIndicator() {
        return <PagerDotIndicator pageCount={4} />
  }
  render() {
        return (
           <View style={{backgroundColor:'#f5f5f5',flex:1}}>
              <View style={styles.topbar_bg}>
                <View style={styles.topbar_left_item}>
                    <Image style={styles.topbar_btn} source={require('../imgs/logo_with_bg.png')} />
                </View>
                <View style={styles.topbar_center_bg}>
                   <Text style={styles.topbar_center_tv}>夹虾米</Text>
                </View>
                <TouchableOpacity style={styles.topbar_right_item} onPress={()=>{this.topItemAction(0)}}>
                     <Image source={require('../imgs/scan.png')}
                       style={styles.topbar_btn}/>
                </TouchableOpacity>
              </View>
              <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
              <IndicatorViewPager
                    style={{height:140}}
                    indicator={this._renderDotIndicator()}
                     >
                    <View><Image style={{resizeMode:'contain'}} source={BANNER_IMGS[0]}/></View>
                    <View><Image style={{resizeMode:'contain'}} source={BANNER_IMGS[1]}/></View>
                    <View><Image style={{resizeMode:'contain'}} source={BANNER_IMGS[2]}/></View>
                    <View><Image style={{resizeMode:'contain'}} source={BANNER_IMGS[3]}/></View>
             </IndicatorViewPager>

             <View style={{marginTop:8}}>
                <View style={{flexDirection:'row',backgroundColor:'white',paddingTop:10,paddingBottom:10}}>
                 <View style={{flex:1,marginLeft:8}}>
                       <TouchableOpacity onPress={()=>{this.centerItemAction(0)}}>
                       <Image source={CENTER_IMGS[0]} style={{width:80,height:100}}>
                            <View style={styles.center_item_wrap}>
                                  <Text style={styles.center_item_tv}>餐厅</Text>
                            </View>
                       </Image>
                       </TouchableOpacity>
                 </View>
                 <View style={{flex:1}}>
                       <TouchableOpacity onPress={()=>{this.centerItemAction(1)}}>
                       <Image source={CENTER_IMGS[1]} style={{width:80,height:100}}>
                            <View style={styles.center_item_wrap}>
                                  <Text style={styles.center_item_tv}>奶茶</Text>
                            </View>
                       </Image>
                       </TouchableOpacity>
                 </View>
                 <View style={{flex:1}}>
                       <TouchableOpacity onPress={()=>{this.centerItemAction(2)}}>
                       <Image source={CENTER_IMGS[2]} style={{width:80,height:100}}>
                            <View style={styles.center_item_wrap}>
                                  <Text style={styles.center_item_tv}>奶茶甜品</Text>
                            </View>
                       </Image>
                       </TouchableOpacity>
                 </View>
                 <View style={{flex:1}}>
                       <TouchableOpacity onPress={()=>{this.centerItemAction(3)}}>
                       <Image source={CENTER_IMGS[3]} style={{width:80,height:100}}>
                            <View style={styles.center_item_wrap}>
                                  <Text style={styles.center_item_tv}>新品推荐</Text>
                            </View>
                       </Image>
                       </TouchableOpacity>
                 </View>
                </View>
             </View>
             <View style={{marginTop:8,backgroundColor:'white'}}>
                  <View style={{height:40,justifyContent:'center',alignItems:'center'}}><Text>推荐活动</Text></View>
                  <View style={{flexDirection:'row',height:70}}>
                        <TouchableOpacity onPress={()=>{this.centerItemAction(0)}}>
                        <View style={{flexDirection:'row',width:item_width,marginTop:5}}>
                              <Image source={CENTER_IMGS[4]} style={styles.four_item_img}/>
                              <View style={{marginLeft:10}}>
                                  <Text>每日优惠</Text>
                                  <Text style={{color:'#999',fontSize:13,marginTop:5}}>优惠早知道</Text>
                              </View>

                        </View>
                        </TouchableOpacity>
                        <Image source={require('../imgs/home/ic_home_shu.png')} style={{height:60,marginTop:10}}/>
                        <TouchableOpacity onPress={()=>{this.centerItemAction(1)}}>
                        <View style={{flexDirection:'row',width:item_width,marginTop:8}}>
                              <Image source={CENTER_IMGS[5]} style={styles.four_item_img}/>
                              <View style={{marginLeft:10}}>
                                  <Text>充值返现</Text>
                                  <Text style={{color:'#999',fontSize:13,marginTop:5}}>充100送50</Text>
                              </View>

                        </View>
                        </TouchableOpacity>
                  </View>
                  <ShortLine/>
                  <View style={{flexDirection:'row',height:70}}>
                        <View style={{flexDirection:'row',width:item_width,marginTop:3}}>
                              <Image source={CENTER_IMGS[6]} style={styles.four_item_img}/>
                              <View style={{marginLeft:10,marginTop:8}}>
                                  <Text>评论送积分</Text>
                                  <Text style={{color:'#999',fontSize:13,marginTop:5}}>评价免费拿积分</Text>
                              </View>
                        </View>
                        <Image source={require('../imgs/home/ic_home_shu.png')} style={{height:60}}/>
                        <View style={{flexDirection:'row',width:item_width,marginTop:8}}>
                              <Image source={CENTER_IMGS[7]} style={styles.four_item_img}/>
                              <View style={{marginLeft:10}}>
                                  <Text>夹虾米</Text>
                                  <Text style={{color:'#999',fontSize:13,marginTop:5}}>注册夹虾米</Text>
                              </View>
                        </View>
                  </View>
                </View>

                <View style={{marginTop:8,backgroundColor:'white'}}>
                     <View style={{height:40,justifyContent:'center',alignItems:'center'}}><Text>推荐商家</Text></View>
                     <View style={{flexDirection:'row'}}>
                           <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                               <TouchableOpacity onPress={()=>{this.recomdStoreAction(0)}}>
                                  <Image source={require('../imgs/home/img1.png')} style={{width:105,height:105}}/>
                                  <View style={{marginTop:8,justifyContent:'center',alignItems:'center'}}>
                                        <Text>夹虾米</Text>
                                  </View>
                               </TouchableOpacity>
                           </View>
                           <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                               <TouchableOpacity onPress={()=>{this.recomdStoreAction(1)}}>
                                  <Image source={require('../imgs/home/img2.jpg')} style={{width:105,height:105}}/>
                                  <View style={{marginTop:8,justifyContent:'center',alignItems:'center'}}>
                                        <Text>鯔·只有</Text>
                                  </View>
                               </TouchableOpacity>
                           </View>
                           <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                               <TouchableOpacity onPress={()=>{this.recomdStoreAction(2)}}>
                                  <Image source={require('../imgs/home/img3.jpg')} style={{width:105,height:105}}/>
                                  <View style={{marginTop:8,justifyContent:'center',alignItems:'center'}}>
                                        <Text>轰咖咖</Text>
                                  </View>
                               </TouchableOpacity>
                           </View>
                     </View>
                </View>
              </ScrollView>
           </View>
        )
    }
}
const styles=StyleSheet.create({
    topbar_bg:{
        height:Platform.OS=='ios'?52:48,
        paddingTop:Platform.OS=='ios'?10:0,
        backgroundColor:'#55798f',
        flexDirection:'row'
    },
    topbar_left_item:{
        width:48,
        height:48,
        alignItems:'center',
        justifyContent:'center'
    },
    topbar_btn:{
        width:25,
        height:25,
        marginLeft:8,
        marginRight:8,
        alignItems:'center'
    },
    topbar_center_bg:{
        paddingTop:Platform.OS=='ios'?7:0,
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    topbar_center_tv:{
        fontSize:18,
        color:'white',
        alignSelf:'center'
    },
    topbar_right_item:{
        width:48,
        height:48,
        alignItems:'center',
        justifyContent:'center'
    },
    center_item_wrap:{
        alignSelf:'center',
        alignItems:'center',
        flex:1,
        justifyContent:'flex-end'
    },
    center_item_tv:{
        fontSize:14,
        marginBottom:8,
        backgroundColor:'#00000000'
    },
    four_item_img:{
        width:66,
        height:47,
        marginLeft:10
    }
})
function mapStateToProps(state) {
  const { foods } = state
  return {
    foods
  }
}
export default connect(
    mapStateToProps
)(Index)
