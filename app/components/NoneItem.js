import React, { Component, PropTypes } from 'react'
import{
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

export default class NoneItem extends Component {
    render() {
        const { food } = this.props
        return (
            <View style={{justifyContent:'center',alignItems:'center',height:400}}>
                     <Image source={require('../imgs/order/none.png')} style={styles.none_icon}/>
                     <Text style={styles.none_text}>这里空空如也。</Text>
            </View>
        )
    }
}
    const styles=StyleSheet.create({
        none_icon:{
            height:75,
            width:80,
            justifyContent:'center',
            alignItems:'center'
        },
        none_text: {
            color:'#ccc',
            fontSize:15,
            marginTop:15,
            marginLeft:15
        },
    });
