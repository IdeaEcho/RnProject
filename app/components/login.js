import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import HttpUtil from '../utils/HttpUtil';
const styles = StyleSheet.create({
button: {
    width: 100,
    height: 30,
    padding: 10,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3
},

});

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username :  '',
        password : ''
    }
  }

  render() {
    const { username, password} = this.props;

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TextInput
            style={{height: 40}}
            placeholder="手机号"
            onChangeText={(username) => this.setState({username})}
          />
          <TextInput
            style={{height: 40}}
            placeholder="密码"
            onChangeText={(password) => this.setState({password})}
          />
          <TouchableOpacity onPress={this.onPressCallback} style={styles.button}>
            <Text>登录</Text>
          </TouchableOpacity>
      </View>
    );
  }

  onPressCallback = () => {
    let formData = new FormData();
    formData.append("phone",this.state.username);
    formData.append("password",this.state.password);
    let url = "index.php/cuinterface/login.html";
    HttpUtil.request(url, 'post', formData)
  };
}
