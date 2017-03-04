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
        food: PropTypes.object.isRequired
    }
    renderItemImage(data){
        if(true){
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
                {this.renderItemImage()}
                <View style={styles.item_content}>
                    <Text style={styles.item_title}>{food.name}</Text>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <TouchableOpacity>
                            <Text style={styles.item_btn}>删除</Text>
                        </TouchableOpacity>
                        <Text style={styles.item_btn}>数量</Text>
                        <TouchableOpacity style={{width:15,height:15}} >
                            <Image source={require('../imgs/store/ic_store_add.png')}
                            style={{width:15,height:15}} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{justifyContent:'flex-end'}}>
                <Text style={{fontSize:15,marginRight:10,marginBottom:25}}>¥{food.price}</Text>
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
