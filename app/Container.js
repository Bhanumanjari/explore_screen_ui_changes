// import * as tf from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { noInternetConnected } from 'app/store/global';
import { Navigation } from './Navigation';
import NetInfo, { NetInfoSubscription } from '@react-native-community/netinfo';
import { Loader, NoInternet } from 'app/Component';
import { Container } from 'native-base';
import ThemLoader from './Component/ThemLoader';
import splash from 'react-native-splash-screen';
import { Settings } from 'react-native-fbsdk-next';

const BACKEND_TO_USE = 'rn-webgl' //'rn-webgl';

// tf.device_util.isMobile = () => true
// tf.device_util.isBrowser = () => false

class Containers extends Component {
  // _subscription: NetInfoSubscription | null = null;
  // constructor(props){
  //     super(props)
  //     this._subscription =  NetInfoSubscription | null
  // }

  constructor(props) {
    super(props);
    this.state = {
      isConnected: true,
    };
    this._subscription = NetInfoSubscription | null;
  }

  async componentDidMount() {
    // await tf.setBackend(BACKEND_TO_USE);
    // await tf.ready()
    Settings.initializeSDK()
    splash.hide();
    this._subscription = NetInfo.addEventListener((state) => {
      this.setState({
        isConnected: state.isConnected,
      });
      this.props.noInternetConnected(state.isConnected);
    });
  }

  componentWillUnmount() {
    this._subscription && this._subscription();
  }

  render() {
    return (
      <Container>
        <Navigation />
        <NoInternet
          isInternetConnected={!this.props.isInternetConnected}
          onRetry={() => {
            // alert("onRetry Pressed")
            this.props.noInternetConnected(true);
          }}
        />
        <Loader loading={this.props.globalLoding} />
        {/* <ThemLoader /> */}
      </Container>
    );
  }
}

const mapActionCreators = { noInternetConnected };

const mapStateToProps = (state) => {
  return {
    isInternetConnected: state.global.isInternetConnected,
    globalLoding: state.global.loading,
  };
};

export default connect(mapStateToProps, mapActionCreators)(Containers);
