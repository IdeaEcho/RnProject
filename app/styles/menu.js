'use strict';
/**
 * @class
 * @desc login register
 * */
import {
  StyleSheet,
  PixelRatio,
  Dimensions,
} from 'react-native';
const {height,width} = Dimensions.get('window')
const PARALLAX_HEADER_HEIGHT = 80
const STICKY_HEADER_HEIGHT = 45

var styles = StyleSheet.create({
    topbar: {
        flexDirection:'row',
        marginLeft:15,
        alignItems:'center',
        height: PARALLAX_HEADER_HEIGHT
    },
    //分割线
    separator: {
        marginLeft:8
    },
    store_name: {
        color:'#2c2c2c',
        width:width-150,
        fontSize:16
    },
    store_icon: {
        width:22,
        height:22,
        marginRight:6
    },
    store_table: {
        color:'#2c2c2c',
        fontSize:13,
        marginLeft:4
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

module.exports = styles;
