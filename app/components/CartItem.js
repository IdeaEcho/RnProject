import React, { Component, PropTypes } from 'react'
import{
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export default class CartItem extends Component {
    static propTypes = {
        food: PropTypes.object.isRequired,
        deleteFoodAction: PropTypes.func.isRequired
    }
    renderItemImage(data) {
        if(!data.picture){
         return (
             <Image source={require('../imgs/ic_center_icon.png')} style={styles.item_image} />
           )
       } else {
         return (
             <Image source={{uri:data.picture}} style={styles.item_image} />
           )
       }
    }
    render() {
        const { food } = this.props
        return (
            <View style={styles.item}>
                {this.renderItemImage(food)}
                <View style={styles.item_content}>
                    <Text style={styles.item_title}>{food.name}</Text>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <TouchableOpacity onPress={this.props.deleteFoodAction}>
                            <Text style={styles.item_btn}>删除</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.props.cutNumAction} style={{width:15,height:15,marginRight:10}} >
                            <Image source={require('../imgs/store/cut.png')}
                            style={{width:15,height:15}} />
                        </TouchableOpacity>
                        <Text style={styles.item_btn}>{food.num}</Text>
                        <TouchableOpacity onPress={this.props.addNumAction} style={{width:15,height:15}} >
                            <Image source={require('../imgs/store/addnum.png')}
                            style={{width:15,height:15}} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{justifyContent:'flex-end'}}>
                <Text style={{fontSize:15,marginRight:10,marginBottom:25}}>¥{food.price*food.num}</Text>
                </View>
            </View>
        )
    }
}
    const styles=StyleSheet.create({
        item:{
            backgroundColor:'white',
            flexDirection:'row'
        },
        item_image:{
            width:50,
            height:50,
            margin:10,
            borderRadius:5
        },
        item_content:{
            flex:1,
            marginTop:10,
            marginBottom:10
        },
        item_title:{
            marginRight:8,
            color:'black'
        },
        item_btn: {
            marginRight:10,
            fontSize:11,
            color:'#aaa'
        }
    });
