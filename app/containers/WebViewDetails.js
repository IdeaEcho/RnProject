/**
 * 加载网页信息
 */
'use strict';
import React, {Component} from 'react';
import{
    View,
    Text,
    Dimensions,
    StyleSheet,
    Image,
    TouchableOpacity,
    WebView,
} from 'react-native';
import { NaviGoBack } from '../utils/CommonUtils'
import LoadingView from '../components/LoadingView'
import Header from '../components/Header'

let canGoBack = false;

class WebViewDetails extends Component {

  constructor(props) {
    super(props);
    this.buttonBackAction=this.buttonBackAction.bind(this);
  }

   //返回
  buttonBackAction(){
    if (canGoBack) {
      this.webview.goBack();
      return true;
    }
    return NaviGoBack(this.props.navigator);
  }
  onNavigationStateChange(navState) {
    canGoBack = navState.canGoBack;
  }

  renderLoading() {
    return <LoadingView />;
  }

   render() {
    return (
        <View style={{flex:1,backgroundColor:'white'}}>
          <Header title='网页页面' hasBack={true} backAction={()=>{this.buttonBackAction()}}/>
          <WebView
          ref={(ref) => { this.webview = ref; }}
          source={{uri: 'https://www.baidu.com/'}}
          automaticallyAdjustContentInsets={false}
          style={{ flex: 1 }}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          scalesPageToFit
          decelerationRate="normal"
          onShouldStartLoadWithRequest={() => {
            const shouldStartLoad = true;
            return shouldStartLoad;
          }}
          onNavigationStateChange={this.onNavigationStateChange}
          renderLoading={this.renderLoading}
        />
      </View>
    );
  }
}

export default WebViewDetails;
