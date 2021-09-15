// import * as tf from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-react-native';
import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { noInternetConnected } from 'app/store/global';
import { Navigation } from './Navigation';
import NetInfo, { NetInfoSubscription } from '@react-native-community/netinfo';
import { Loader, NoInternet } from 'app/Component';
import { Container } from 'native-base';
import ThemLoader from './Component/ThemLoader';
import splash from 'react-native-splash-screen';
import { Settings } from 'react-native-fbsdk-next';
import { useRef } from 'react';
//import appsFlyer from 'react-native-appsflyer';

const BACKEND_TO_USE = 'rn-webgl' //'rn-webgl';

// tf.device_util.isMobile = () => true
// tf.device_util.isBrowser = () => false

/*var onInstallConversionDataCanceller = appsFlyer.onInstallConversionData(
  (res) => {
    if (JSON.parse(res.data.is_first_launch) == true) {
      if (res.data.af_status === 'Non-organic') {
        var media_source = res.data.media_source;
        var campaign = res.data.campaign;
        console.log('This is first launch and a Non-Organic install. Media source: ' + media_source + ' Campaign: ' + campaign);
      } else if (res.data.af_status === 'Organic') {
        console.log('This is first launch and a Organic Install');
      }
    } else {
      console.log('This is not first launch');
    }
  },
);*/

/*var onAppOpenAttributionCanceller = appsFlyer.onAppOpenAttribution((res) => {
  console.log(res);
});*/

/*appsFlyer.initSdk(
  {
    devKey: 'ZogMJCCM2Qks7hFsEecrce',
    isDebug: false,
    appId: '1571241758',
  },
  (result) => {
    console.log(result);
  },
  (error) => {
    console.error(error);
  }
);*/

const Containers = (props) => {

  const _subscription = useRef(NetInfoSubscription | null)

  const [isConnected, setIsConnected] = useState(true)

  useEffect(() => {
    Settings.initializeSDK()
    splash.hide();
  }, [])

  // useEffect(() => {

  // }, [])

  useEffect(() => {
    _subscription.current = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected)
      props.noInternetConnected(state.isConnected);
    });

    return () => {
      _subscription.current()
    }
  }, [])

  /*useEffect(() => {
    return () => {
      // Optionaly remove listeners for deep link data if you no longer need them after componentWillUnmount
      if (onInstallConversionDataCanceller) {
        onInstallConversionDataCanceller();
        console.log('unregister onInstallConversionDataCanceller');
        onInstallConversionDataCanceller = null;
      }
      if (onAppOpenAttributionCanceller) {
        onAppOpenAttributionCanceller();
        console.log('unregister onAppOpenAttributionCanceller');
        onAppOpenAttributionCanceller = null;
      }
    };
  });*/

  return (
    <Container>
      <Navigation />
      <NoInternet
        isInternetConnected={!props.isInternetConnected}
        onRetry={() => {
          props.noInternetConnected(true);
        }}
      />
      <Loader loading={props.globalLoding} />
      {/* <ThemLoader /> */}
    </Container>
  );
}

const mapActionCreators = { noInternetConnected };

const mapStateToProps = (state) => {
  return {
    isInternetConnected: state.global.isInternetConnected,
    globalLoding: state.global.loading,
  };
};

export default connect(mapStateToProps, mapActionCreators)(Containers);
