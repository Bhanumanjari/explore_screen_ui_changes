import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, ImageBackground, View } from 'react-native';
import { splash_bottom, splash_logo, splashBottomLayer } from 'app/assets';
import styles from './SplashScreenStyle';
import { getData } from '../../../Config/asyncStorage';
import { accessToken, guestData, isTermsSelected, userData } from '../../../Utils/storageKeys';
import {
  fetchUserProfile,
  getAccessToken,
  getProfile,
  setAccessToken,
  setProfile,
} from '../../../store/login';
import { delay } from '../../../Utils/globalFun';
import { setGuestProfile } from '../../../store/guest';
import splash from 'react-native-splash-screen';
import { fetchMe } from '../../../Services/homeServices';
import FastImage from 'react-native-fast-image';
import { TextView } from '../../../Component';
import { getForMeVideo, getTrendingVideo } from '../../../store/home';

class SplashScreen extends Component {
  componentDidMount() {
    // this.getSession();
  }

  getSession = () => {
    getData(userData)
      .then((res) => {
        if (res) {
          const userData = JSON.parse(res);
          console.log(userData);
          this.setToken(userData);
        } else {
          this.redirectToLogin();
        }
      })
      .catch((err) => {
        console.log(err);
        this.redirectToLogin();
      });
  };

  setToken = (userData) => {
    getData(accessToken)
      .then((token) => {
        if (token) {
          this.props.setProfile(userData);
          this.props.setAccessToken(token);
          // this.props.fetchUserProfile()
          fetchMe().then(res => {
            if (res) {
              this.setSession(userData);
            }
          })
        } else {
          this.redirectToLogin();
        }
      })
      .catch((err) => {
        console.log(err);
        this.redirectToLogin();
      });
  };

  redirectToLogin = async () => {
    await delay(1000);
    getData(isTermsSelected).then(res => {
      console.log("res<><><><><>", res)
      if (res && res === 'true') {
        this.resetTo('LoginScreen')
        // this.props.navigation.reset({
        //   index: 0,
        //   routes: [{ name: 'LoginScreen' }],
        // });
      } else {
        this.resetTo('TermsScreen')
        // this.props.navigation.reset({
        //   index: 0,
        //   routes: [{ name: 'TermsScreen' }],
        // });
      }
    }).catch(err => {
      this.resetTo('TermsScreen')
      // this.props.navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'TermsScreen' }],
      // });
    })
  };

  resetTo = (screenName, params = {}) => {
    this.props.navigation.reset({
      index: 0,
      routes: [{ name: screenName, params }],
    });
  }

  setGuestSession = (userData) => {
    console.log("userData", userData)
    this.props.setGuestProfile(userData);
    this.navigate(userData);
  };

  navigate = async (userData) => {
    await delay(1000);
    if (!userData.faces || userData.faces.length < 1) {
      this.props.navigation.reset({
        index: 0,
        routes: [
          {
            name: 'TermsScreen',
          },
        ],
      });
    } else if (!userData.preferences || userData.preferences.length < 1) {
      this.props.navigation.reset({
        index: 0,
        routes: [
          {
            name: 'PrefrenceScreen',
            params: {
              initial: true,
            },
          },
        ],
      });
    } else {
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'DashboardScreen' }],
      });
    }
  };

  setSession = async (userData) => {
    await delay(1000);
    // if (!userData.isEmailVerified) {
    //   this.props.navigation.reset({
    //     index: 0,
    //     routes: [
    //       {
    //         name: 'VerifyEmail',
    //         params: {
    //           ...userData,
    //           isReset: true,
    //         },
    //       },
    //     ],
    //   });
    // } else 
    // if (!userData.isPhoneVerified) {
    //   this.props.navigation.reset({
    //     index: 0,
    //     routes: [
    //       {
    //         name: 'VerifyPhoneNumber',
    //         params: {
    //           ...userData,
    //           isReset: true,
    //         },
    //       },
    //     ],
    //   });
    // } else {
    if (!userData.faces || userData.faces.length < 1) {
      this.props.navigation.reset({
        index: 0,
        routes: [{
          name: 'PhotoClickScreen', params: {
            initial: true
          }
        }],
      });
    } else if (!userData.languages || userData.languages.length < 1) {
      this.props.navigation.reset({
        index: 0,
        routes: [{
          name: 'LanguageScreen',
          params: {
            initial: true,
          },
        }],
      });
    } else {
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'DashboardScreen' }],
      });
    }
    // }
  };

  render() {
    return (
      <View style={styles.container1}>
        <FastImage style={styles.logo} source={splash_logo} resizeMode={FastImage.resizeMode.contain} />
        <TextView style={styles.logoTxt}>HELLOS</TextView>
        <FastImage style={styles.imageLayer} source={splashBottomLayer} resizeMode={"stretch"}>
          <FastImage style={styles.imageStyle} source={splash_bottom} resizeMode={FastImage.resizeMode.stretch} />
        </FastImage>
      </View>
    );
  }
}

const mapActionCreators = { setProfile, setAccessToken, setGuestProfile, fetchUserProfile, getTrendingVideo, getForMeVideo };
const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, mapActionCreators)(SplashScreen);
