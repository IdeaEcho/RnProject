'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

export default class Button extends Component {
    constructor(props) {
        super(props);
    }
    loginPressHandler = () => {
        alert('你按下了按钮');
    };
    render() {
        //解构
        const { text } = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onPress}
                    disabled={disabled}
                >
                <Text style={styles.buttonText}>
                {text}
                </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        height: 40,
        width: 100,
        borderRadius: 5,
        borderColor: '#fff',
        borderWidth: 2,
        backgroundColor: '#f6af9d',
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
