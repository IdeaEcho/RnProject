'use strict';

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Vibration,
  View,
  InteractionManager
} from 'react-native';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import BarcodeScanner from 'react-native-barcodescanner';
import Url from '../utils/Url';//获取url参数
import Menu from './menu';
import { toastShort } from '../utils/ToastUtil'
import { performMenuAction } from '../actions/MenuAction'
import Loading from '../components/Loading_DD'

class Scan extends Component {
  constructor(props) {
    super(props);
    let tokenjson = {
        access_token : 'dec9373769b94787'
    }
    let table =1
    const {navigator, dispatch} = this.props
    let tokenstr = JSON.stringify(tokenjson)
    dispatch(performMenuAction(tokenstr, table, navigator))

    this.state = {
      barcode: '',
      cameraType: 'back',
      token: '',
      table:'',
      torchMode: 'off',
    };
  }

    barcodeReceived(e) {
        const {navigator,dispatch} = this.props
        if (e.data !== this.state.barcode || e.type !== this.state.type) Vibration.vibrate();
        let token = Url.getUrlParam(e.data, 'token')
        let table = Url.getUrlParam(e.data, 'table')
        if(token != null) {
            this.setState({
              barcode: e.data,
              token: token,
              table: table,
            });
            let tokenjson = {
                access_token :  'dec9373769b94787'
            }
            let tokenstr = JSON.stringify(tokenjson)
            dispatch(performMenuAction(tokenstr, table, navigator))
        }
    }


  render() {
    const { menu, state, actions } = this.props;
    return (
        <View style={styles.container}>
          <BarcodeScanner
            onBarCodeRead={this.barcodeReceived.bind(this)}
            style={{ flex: 1 }}
            torchMode={this.state.torchMode}
            cameraType={this.state.cameraType}
          />
          <View style={styles.statusBar}>
            <Text style={styles.statusBarText}>{menu.data}</Text>
          </View>
          <Loading visible={menu.loading} />
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
})

function mapStateToProps(state) {
  const { menu } = state
  //返回一个新的menu作为Component的Props
  return {
    menu
  }
}

export default connect(mapStateToProps)(Scan)
