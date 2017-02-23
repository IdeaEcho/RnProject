'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import BarcodeScanner from 'react-native-barcodescanner';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Vibration,
  View
} from 'react-native';

// @connect(state => ({
//   state: state.counter
// }))
class Scan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      barcode: '',
      cameraType: 'back',
      text: 'Scan Barcode',
      torchMode: 'off',
      type: '',
    };
  }

  barcodeReceived(e) {
    if (e.data !== this.state.barcode || e.type !== this.state.type) Vibration.vibrate();

    this.setState({
      barcode: e.data,
      text: `${e.data} (${e.type})`,
      type: e.type,
    });
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
