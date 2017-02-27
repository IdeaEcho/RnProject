'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import BarcodeScanner from 'react-native-barcodescanner';

import {
  AppRegistry,
  StyleSheet,
  Text,
  Vibration,
  View,
  InteractionManager
} from 'react-native';
import Url from '../utils/Url';
import Menu from './menu';
// @connect(state => ({
//   state: state.counter
// }))
class Scan extends Component {
  constructor(props) {
    super(props);
    var url = 'http://eat.ichancer.cn/index.php/orderinterface/getmenu.html?token=a44f8138457ecb9e87daa34bd8501cb5&id=1'
    var text = Url.getUrlParam(url, 'token');
    this.state = {
      barcode: '',
      cameraType: 'back',
      text: text,
      torchMode: 'off',
      type: '',
    };
  }

  barcodeReceived(e) {
    if (e.data !== this.state.barcode || e.type !== this.state.type) Vibration.vibrate();


    // this.setState({
    //   barcode: e.data,
    //   text: `${e.data} (${e.type})`,
    //   type: e.type,
    // });
    // const {navigator} = this.props;
    //  InteractionManager.runAfterInteractions(() => {
    //       navigator.push({
    //         component: Menu,
    //         name: 'Menu',
    //         data: data
    //       });
    //     });
  }


  render() {
    const { state, actions } = this.props;
    return (
        <View style={styles.container}>
          <BarcodeScanner
            onBarCodeRead={this.barcodeReceived.bind(this)}
            style={{ flex: 1 }}
            torchMode={this.state.torchMode}
            cameraType={this.state.cameraType}
          />
          <View style={styles.statusBar}>
            <Text style={styles.statusBarText}>{this.state.text}</Text>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBarText: {
    fontSize: 20,
  },
});

export default Scan;
