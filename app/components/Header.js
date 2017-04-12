/**
 * 头部
 */
'use strict';
import React, {PropTypes} from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
const Header = ({ title, hasBack, hasRight, backAction, rightAction, right }) => (
    <View style={styles.topbar_bg}>
        {hasBack &&
            <TouchableOpacity
                onPress={backAction}
                style={styles.topbar_left_item}>
            <Image
              style={styles.topbar_back_btn}
              source={require('../imgs/ic_center_back.png')}
            />
            </TouchableOpacity>
        }
        {!hasBack &&
            <View style={{width:48,height:48}}/>
        }
        <View style={styles.topbar_center_bg}>
           <Text style={styles.topbar_center_tv}>{title}</Text>
        </View>
        {hasRight &&
            <TouchableOpacity
                onPress={rightAction}
                style={styles.topbar_right_item}>
               <Text style={styles.topbar_right_tv}>{right}</Text>
            </TouchableOpacity>
        }
        {!hasRight &&
        <View style={{width:48,height:48}}/>
        }
    </View>
);
const styles=StyleSheet.create({
    topbar_bg:{
        height:48,
        backgroundColor:'#55798f',
        flexDirection:'row'
    },
    topbar_left_item:{
        width:48,
        height:48,
        alignItems:'center',
        justifyContent:'center'
    },
    topbar_back_btn:{
        width:20,
        height:20,
    },
    topbar_center_bg:{
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
    topbar_right_tv:{
        fontSize:15,
        color:'white',
        alignSelf:'center'
    },
});
export default Header;
