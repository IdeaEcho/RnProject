import React, { Component, PropTypes } from 'react'
import {
  Dimensions,
  Image,
  Text,
  View,
  ListView,
  TouchableOpacity,
  StyleSheet,
  InteractionManager
} from 'react-native'
import Header from '../components/Header'
import PureListView from '../components/PureListView'
import { toastShort } from '../utils/ToastUtil'
import FoodDetails from './FoodDetails'
// import Merchants from './Merchants'
import Loading from '../components/Loading_DD'
import LoadingView from '../components/LoadingView'
import NoneItem from '../components/NoneItem'

import { connect } from 'react-redux'
import {
    fetchFoodsAction,
    changeCategoryAction,
    addToCartAction
} from '../actions/FoodsAction'

const {height,width} = Dimensions.get('window')

let defaultColor = '#f5f5f5'  //默认颜色
let selectedColor = '#fff'  //选中颜色

class Menu extends Component {
    constructor(props) {
        super(props)
        this.onPressItemLeft=this.onPressItemLeft.bind(this)
        this.onPressItemRight=this.onPressItemRight.bind(this)
        this.renderItemLeft = this.renderItemLeft.bind(this)
        this.renderItemRight=this.renderItemRight.bind(this)
        this.addFood=this.addFood.bind(this)
        this.collectAction=this.collectAction.bind(this)
        this.renderBottom=this.renderBottom.bind(this)
        //ListView.DataSource:从原始输入数据中抽取数据来创建ListViewDataSource对象
        this.state={
         dataSource: new ListView.DataSource({
           getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
           getSectionHeaderData: (dataBlob, sid) => dataBlob[sid],
           rowHasChanged: (row1, row2) => row1 !== row2,
           sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        })
        }
    }

    componentWillMount() {
        const {dispatch} = this.props
        storage.load({
          key: 'foodsinfo',
          autoSync: true,
          syncInBackground: true,
        }).then(ret => {
            // toastShort(JSON.parse(ret.foods))
            //开始加载商品列表数据
            dispatch(fetchFoodsAction(JSON.parse(ret.foods),ret.table))
        })
    }

    collectAction(){
        toastShort('点击收藏按钮...')
    }

    //加入购物车
    addFood(data) {
        this.props.addFoodAction(data)
    }
    /**
    * 渲染分割线
    */
    _renderSeparatorView(sectionID, rowID, adjacentRowHighlighted) {
        return (
      <Image key={`${sectionID}-${rowID}`} style={styles.separator}  source={require('../imgs/order/ic_order_heng.png')}/>
    )
    }
    //点击列表每一项响应按钮
    onPressItemLeft(data){
      const {foods,dispatch} = this.props
      dispatch(changeCategoryAction(data))
      var distance = 0
      //开始计算滑动的距离
      //1.首先计算出当前点击了左侧列表的第几项
      var index = foods.left_items.indexOf(data)
      //2.根据index索引计算高度
      for ( var i = 0;i <index;i++){
         distance += 25 + 84 * foods.right_items[foods.left_items[i]].length
      }

      this.refs['goodLv'].scrollTo({x:0,y:distance,animated:true})
    }
    //点击右侧列表每一项相应按钮
    onPressItemRight(data){
       const {navigator} = this.props
       InteractionManager.runAfterInteractions(() => {
            navigator.push({
              component: FoodDetails,
              name: 'FoodDetails',
              })
        })
    }

    //进行渲染左侧列表数据-商品分类
    renderContentLeft(dataSource) {
        return (
          <ListView
            initialListSize={1}
            dataSource={dataSource}
            renderRow={this.renderItemLeft}
            style={{flex:1}}
            onEndReachedThreshold={10}
            enableEmptySections={true}
            showsVerticalScrollIndicator={false}
            renderSeparator={this._renderSeparatorView}
          />
        )
    }
    //渲染右侧商品列表(带有section)
    renderContentRight(dataSource) {
        const {foods} = this.props
        return (
          <ListView
            ref={'goodLv'}
            initialListSize={foods.data_length}
            dataSource={dataSource}
            renderRow={this.renderItemRight}
            style={{flex:1}}
            showsVerticalScrollIndicator={false}
            renderSectionHeader={this._renderSectionHeader}
          />
        )
    }

  _renderSectionHeader(sectionData, sectionID){
     return(
        <View key={sectionID} style={{backgroundColor:'#fff',height:25,justifyContent:'center'}}>
             <Text style={{marginLeft:8,fontSize:11}}>{sectionID}</Text>
        </View>
     )
  }

  //渲染每一项的数据
    renderItemLeft(data) {
        const {foods} = this.props
        if(data === foods.selectedItem){
          return (
              <View style={{backgroundColor:selectedColor}}>
                    <TouchableOpacity onPress={()=>{this.onPressItemLeft(data)}}>
                          <View style={{flexDirection:'row',alignItems:'center',height:55,flex:1}}>
                                <Text style={{marginLeft:8,marginRight:8,flex:1}}>{data}</Text>
                          </View>
                    </TouchableOpacity>
             </View>
          )
        }else{
          return (
              <View style={{backgroundColor:defaultColor}}>
                    <TouchableOpacity onPress={()=>{this.onPressItemLeft(data)}}>
                          <View style={{flexDirection:'row',alignItems:'center',height:55,flex:1}}>
                                <Text style={{marginLeft:8,marginRight:8,flex:1}}>{data}</Text>
                          </View>
                    </TouchableOpacity>
             </View>
          )
        }
    }

    renderItemImage(data){
     if(!data.dish_photo){
       return (
            <Image source={require('../imgs/logo_with_bg.png')} style={styles.item_image} />
         )
     } else {
       return (
           <Image source={{uri:data.dish_photo}} style={styles.item_image} />
         )
     }
    }
    //渲染每一项的数据
    renderItemRight(data) {
        return (
          <TouchableOpacity onPress={()=>{this.onPressItemRight(data)}}>
               <View style={{backgroundColor:'white',flexDirection:'row'}}>
                    {this.renderItemImage(data)}
                    <View style={styles.item_content}>
                         <Text style={styles.item_title}>{data.dish_name}</Text>
                         <View style={{flexDirection:'row',marginTop:5}}>
                                <Text style={styles.item_des}>月售{data.dish_sales}</Text>
                                <Text style={styles.item_des}>评分{data.dish_grade}</Text>
                         </View>
                         <Text style={styles.item_price}>¥{data.dish_price}</Text>
                    </View>
                    <View style={styles.item_btn}>
                         <TouchableOpacity style={styles.btn_add} onPress={()=>{this.addFood(data)}}>
                              <Image source={require('../imgs/store/addfood.png')}
                                     style={{width:20,height:20}}/>
                         </TouchableOpacity>
                    </View>
               </View>
          </TouchableOpacity>
        )
    }
    //渲染商家基本信息布局
    renderStoreBaisc(){
     const { foods } = this.props
     return (
        <TouchableOpacity >
            <View style={styles.topbar}>
                <Image source={foods.store_info.avatar ? {uri:foods.store_info.avatar} : require('../imgs/default.png')}
                    style={{width:58,height:58,borderRadius:29,marginRight:20}}/>
                <Text style={{color:'#2c2c2c',width:width-150,fontSize:16}}>{foods.store_info.store_name ? foods.store_info.store_name :'请扫码获取菜单'}</Text>
                <View style={{alignItems:'flex-end',marginRight:15}}>
                     <Image source={require('../imgs/store/table.png')}
                            style={{width:22,height:22,marginRight:6}}
                 />
                 <Text style={{color:'#2c2c2c',fontSize:13,marginLeft:4}}>第{foods.store_info.table ? foods.store_info.table : 0}桌</Text>
                </View>
            </View>
        <Image source={require('../imgs/order/ic_order_heng.png')}/>
        </TouchableOpacity>
     )
    }

    renderBottom(){
        const {foods} = this.props
        if (foods.loading) {
              return <LoadingView />
        }
        if(foods.left_items==undefined||foods.right_items==undefined) {
            return <NoneItem />
        }else {
            return (
                <View style={{flexDirection:'row',flex:1}}>
                        <View style={{flex:1}}>
                            {
                              this.renderContentLeft(this.state.dataSource.cloneWithRows(
                                 foods.left_items === undefined ? [] : foods.left_items))
                            }
                        </View>
                       <View style={{flex:3}}>
                            {this.renderContentRight(this.state.dataSource.cloneWithRowsAndSections(
                                 foods.right_items === undefined ? [] : foods.right_items,foods.left_items))}
                       </View>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={{flex:1}}>
                <View>
                    {this.renderStoreBaisc()}
                </View>
                    {this.renderBottom()}
            </View>
        )
    }
}

const PARALLAX_HEADER_HEIGHT = 80
const STICKY_HEADER_HEIGHT = 45

const styles = StyleSheet.create({
    topbar: {
        flexDirection:'row',
        marginLeft:15,
        alignItems:'center',
        height: PARALLAX_HEADER_HEIGHT
    },
    separator: {
        marginLeft:8
    },
    separatorGood: {
        height: 1,
        backgroundColor: '#eee'
    },
    item_content: {
        flex:1,
        marginTop:10,
        marginBottom:10
    },
    item_btn:{
        justifyContent:'flex-end'
    },
    item_image: {
        width:60,
        height:60,
        margin:10,
        borderRadius:5
    },
    item_title:{
        marginRight:8,
        color:'black'
    },
    item_des:{
        marginRight:10,
        fontSize:11,
        color:'#aaa'
    },
    item_price:{
        color:'red',
        fontSize:15,
        marginTop:5
    },
    btn_add:{
        width:30,
        height:30,
        marginRight:10,
        marginBottom:10
    }
})

function mapStateToProps(state) {
  const { foods, cart } = state
  return {
    foods,
    cart
  }
}
export default connect(
    mapStateToProps
)(Menu)
