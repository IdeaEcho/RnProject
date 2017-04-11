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
var cell_w = Dimensions.get('window').width;
var styles = StyleSheet.create({
    input_box:{
        borderColor:'#1c2c3b',
        borderRadius:15,
        flexDirection:'row',
        height:45,
        width:260,
        alignItems:'center',
        marginTop:20,
        borderWidth: 1
    },
    textInput:{
        padding: 7,
        height: 45,
        lineHeight: 45,
        alignItems:'center',
        fontSize: 15,
        textAlign: 'left',
        textAlignVertical:'center',
        flex:1
    },
    textInput_icon:{
        width:19,
        height:18,
        marginLeft:13
    },
    btn:{
        width:260,
        height:40,
        marginTop:20,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
        borderWidth: 1,
        borderColor: '#ff7e5e'
    }
})

module.exports = styles;
