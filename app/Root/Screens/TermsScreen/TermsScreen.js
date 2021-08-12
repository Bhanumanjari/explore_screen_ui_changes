import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  ActivityIndicator,
  BackHandler,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import styles from './TermsScreenStyle';
import { TextView, Hbutton, MainHeader } from 'app/Component';
import { home, explore, video, smile } from '../../../assets';

import { forgotPassword, loginUser } from 'app/store/login';
import { WebView } from 'react-native-webview';
import { setGuestProfile } from '../../../store/guest';
import RNExitApp from 'react-native-exit-app';
import { StackActions } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { saveData } from '../../../Config/asyncStorage';
import { isFirstTimeOpen, isTermsSelected } from '../../../Utils/storageKeys';
import { TERMS_CONDITION } from '../../../Utils/constant';
import { requestTrackingPermission } from 'react-native-tracking-transparency';

class TermsScreen extends Component {

  componentDidMount = async () => {
    if(Platform.OS === 'ios'){
      const trackingStatus = await requestTrackingPermission();
    }
  }

  acceptTerms = async () => {
    await saveData('true', isTermsSelected)
    this.props.navigation.dispatch(
      StackActions.replace('InfoScreen', {
        initial: true,
      }),
    );
  };

  render() {
    return (
      <Container>
        <MainHeader title={'Terms & Conditions'} />
        <View style={styles.mainLayout}>
          <View style={styles.subtxtCont}>
            <WebView
              showsVerticalScrollIndicator={false}
              source={{ uri: TERMS_CONDITION }}
              style={styles.termsView}
              startInLoadingState={true}
              renderLoading={() => (
                <View style={styles.webViewLoader}>
                  <View style={styles.loaderContainer}>
                    <FastImage
                      style={styles.loaderImage}
                      source={require('./../../../assets/animated-loader.gif')}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </View>
                </View>
              )}
            />
          </View>
          <View style={styles.bottom}>
            <View style={styles.line}></View>
            <View style={styles.bottomCont}>
              <Pressable
                onPress={() => {
                  this.props.navigation.goBack();
                }}
                style={styles.declineBtn}>
                <TextView
                  onPress={async () => {
                    await saveData('false', isTermsSelected)
                    RNExitApp.exitApp();
                  }}
                  style={styles.declineBtnTxt}>
                  DECLINE
                </TextView>
              </Pressable>
              <TouchableOpacity
                style={styles.acceptBtn}
                onPress={() => {
                  this.acceptTerms();
                }}>
                <TextView style={styles.acceptBtnTxt}>ACCEPT</TextView>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Container>
    );
  }
}

const mapActionCreators = (dispatch) => ({
  setGuest: (data) => dispatch(setGuestProfile(data)),
});

const mapStateToProps = (state) => {
  return {
    loading: state.login.loading,
  };
};
export default connect(mapStateToProps, mapActionCreators)(TermsScreen);
