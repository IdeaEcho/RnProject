'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import Button from '../components/Button'

class UserPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username:'',
            level:'',
            sweet: 0,
            acid: 0,
            hot: 0,
            salty: 0,
            bitter: 0,
        };
    }
    loginPressHandler = () => {
        alert('你按下了按钮');
    };
    render() {
        const { state, actions } = this.props;
        return (
            <View style={styles.container}>
                <View>
                    <Text>个人信息</Text>
                </View>
                <View>
                    <Text>口味分析</Text>
                </View>
                <Button text="登陆"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        height: 40,
        width: 100,
        borderRadius: 5,
        justifyContent: 'center',
        overflow: 'hidden',
    },
    buttonText: {
        textAlign:'center',
        color: 'white',
    },
    container: {
        flex: 1,
  }
});

export default UserPage;
