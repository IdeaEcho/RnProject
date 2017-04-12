/**
 * 头部
 */
'use strict';
import React, {Component, PropTypes} from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';

export default class TasteLevel extends Component {
    renderItemImage(type, i) {
        var item
        if ( type == 'acid') {
            item = <Image key={type+i} source={require('../imgs/taste/acid.png')}  style={styles.item_image} />
        } else if( type == 'sweet') {
            item =<Image key={type+i} source={require('../imgs/taste/sweet.png')}  style={styles.item_image} />
        } else if( type == 'hot') {
            item =<Image key={type+i} source={require( '../imgs/taste/hot.png')}  style={styles.item_image} />
        } else {
            item =<Image key={type+i} source={require( '../imgs/taste/salty.png')}  style={styles.item_image} />
        }
        return item
    };
    renderItemTaste(type , level) {
        var dom = [];
        for( var i = 0; i < level; i++ ) {
            dom.push(this.renderItemImage(type,i))
        }
        return dom;
    }
    // this.renderItemTaste(type, level)
    render() {
        const { type, level } = this.props
        return (
            <View style={styles.box}>
                {this.renderItemTaste(type, level)}
            </View>
        )
    }
}

const styles=StyleSheet.create({
    box: {
        flexDirection:'row'
    },
    item_image: {
        marginTop:0,
        width:25,
        height:25
    }
});
