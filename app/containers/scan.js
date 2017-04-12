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
import BarcodeScanner from 'react-native-barcode-scanner-universal';
import Url from '../utils/Url';//获取url参数
import Menu from './menu';
import { toastShort } from '../utils/ToastUtil'
import { NaviGoBack } from '../utils/CommonUtils'
import { performMenuAction } from '../actions/MenuAction'
import Header from '../components/Header'
import Loading from '../components/Loading_DD'

class Scan extends Component {
  constructor(props) {
    super(props);
    // let tokenjson = {
    //     access_token : 'dec9373769b94787'
    // }
    // let table =1
    // const {navigator, dispatch} = this.props
    // let tokenstr = JSON.stringify(tokenjson)
    // dispatch(performMenuAction(tokenstr, table, navigator))
    this.buttonBackAction=this.buttonBackAction.bind(this)
    this.state = {
            cameraType: 'back',
            torchMode: 'off',
            backing:true,
            barcode: '',
            token: '',
            table:'',
        };
    }
    //返回
    buttonBackAction(){
        const {navigator} = this.props
        return NaviGoBack(navigator)
    }
    componentDidMount() {
        this.timer = setTimeout(
            () => { this.setState({
              cameraType: 'back',
              torchMode: 'off',
              backing:false,
              barcode: '',
              token: '',
              table:'',
            }); },
            500
        );
    }
    /**
     * 图形卸载同时清除Timer相关事件
     */
    componentWillUnMount() {
       this.timer && clearTimeout(this.timer)
   }
    barcodeReceived(e) {
        const {navigator,dispatch} = this.props
        if (e.data !== this.state.barcode || e.type !== this.state.type) Vibration.vibrate();
        let token = Url.getUrlParam(e.data, 'token')
        let table = Url.getUrlParam(e.data, 'id')
        if(token != null) {
            this.setState({
              barcode: e.data,
              token: token,
              table: table,
              backing:true,
            });
            let tokenjson = {
                access_token :  token
            }
            let tokenstr = JSON.stringify(tokenjson)
            dispatch(performMenuAction(tokenstr, table, navigator))
        }
    }


    render() {
        const { menu, state, actions } = this.props;
        return (
            <View style={styles.camera}>
                <View style={styles.statusBar}>
                    <Header title='获取菜单' hasBack={true}
                    backAction={()=>{this.buttonBackAction()}} />
                </View>
                { this.state.backing ? <View style={{flex:1,backgroundColor:'rgba(0,0,0,0)'}}/> : <BarcodeScanner
                    onBarCodeRead={this.barcodeReceived.bind(this)}
                    style={styles.camera}
                    torchMode={this.state.torchMode}
                    cameraType={this.state.cameraType} />
                }
                <Loading visible={menu.loading} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    camera: {
        flex: 1
    },
    statusBar: {
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusBarText: {
        fontSize: 20,
    }
})

function mapStateToProps(state) {
  const { menu } = state
  //返回一个新的menu作为Component的Props
  return {
    menu
  }
}

export default connect(mapStateToProps)(Scan)
