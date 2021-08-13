import React, { Component } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header } from 'native-base';
import styles from './SignupScreen4Style';
import { TextView, MainHeader } from 'app/Component';
import {
  showBottomToast,
} from '../../../Utils';
import { fetchOtp, signUp, verifyOtp } from '../../../Services/authApiServices';
import { signup } from '../../../store/signUp/actions';
import { bindActionCreators } from 'redux';
import { setProfile } from '../../../store/login';
import { apiLoadingStart, apiLoadingStop } from '../../../store/global/actions';
import { cloneDeep } from 'lodash';
import { TextInputMask } from 'react-native-masked-text';
import { secondsToTime } from '../../../Utils/globalFun';
import AuthContext from '../../../context/AuthContext';
import analytics from '@react-native-firebase/analytics';

class VerifyPhoneNumber extends Component {
  static contextType = AuthContext
  timeCounter = null
  state = {
    code: '',
    counter: 60
  };
  componentDidMount = () => {
    this.sendOtp();
  };

  sendOtp = () => {
    const { phoneNumber, countryCode } = this.props.route.params;
    this.props.startLoading();
    fetchOtp({
      phoneNumber,
      countryCode,
      type: 'PHONE_VERIFICATION',
    })
      .then((res) => {
        // console.log(res)
        showBottomToast('OTP sent successfully');
        this.setTimer()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.props.stopLoading();
      });
  };

  setTimer = () => {
    this.timeCounter && clearInterval(this.timeCounter)
    this.setState({
      counter: 60
    }, () => {
      this.timeCounter = setInterval(() => {
        // console.log(this.state.counter)
        if (this.state.counter > 0) {
          this.setState({
            counter: this.state.counter - 1
          })
        } else {
          clearInterval(this.timeCounter)
        }
      }, 1000);
    })
  }

  onDone = () => {
    let code = this.otpInput.getRawValue();
    code = code.split(' - ').join('');
    const { phoneNumber, countryCode } = this.props.route.params;
    if (this.state.code === '') {
      // alert("Please enter valid otp")
      showBottomToast('Please enter valid otp');
      return;
    }
    console.log({
      code: code,
      phoneNumber,
      countryCode,
      type: 'PHONE_VERIFICATION',
    })
    this.props.startLoading();
    verifyOtp({
      code: code,
      phoneNumber,
      countryCode,
      type: 'PHONE_VERIFICATION',
    })
      .then((res) => {
        this.timeCounter && clearInterval(this.timeCounter)
        this.registerAccount()
      })
      .catch((err) => {
        this.props.stopLoading();
        console.log(err);
      });
  };

  resetScreen = (name, params = {}) => {
    this.props.navigation.reset({
      index: 0,
      routes: [
        {
          name,
          params
        },
      ],
    });
  }

  registerAccount = () => {
    const {
      phoneNumber,
      userName,
      password,
      countryCode
    } = this.props.route.params;
    this.props.signup(
      { username: userName, phoneNumber, countryCode, password },
      {
        onSuccess: () => {
          this.props.stopLoading();
          this.context.setInitialRouteName("LanguageScreen")
          this.context.setIsSignIn(true)
          analytics().logSignUp({
            method: "phone"
          })
          // this.props.navigation.navigate('LanguageScreen', {
          //   initial: true
          // })
          // this.resetScreen('LanguageScreen', {
          //   initial: true
          // })
        },
        onError: () => {
          this.props.stopLoading();
        },
      },
    );
  };

  componentWillUnmount = () => {
    this.timeCounter && clearInterval(this.timeCounter)
  }

  render() {
    return (
      <Container>
        <MainHeader
          title={'Verify Phone Number'}
          onBackPress={() => {
            this.props.navigation.goBack();
          }}
        />

        <View style={styles.mainLayout}>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={[styles.line, { borderColor: '#4F45BC', width: 10 }]}></View>
            <View
              style={[styles.line, { borderColor: '#4F45BC', width: 10 }]}></View>
          </View>

          <View style={{ marginTop: 30, alignItems: 'center' }}>
            <TextView style={styles.subTxt}>
              Please enter verification code sent to your phone.
            </TextView>
            <View style={styles.inputCont}>
              <View style={styles.inputTxtCont}>
                <TextInputMask
                  type={'custom'}
                  style={styles.inputTxt}
                  options={{
                    mask: '99 - 99 - 99',
                  }}
                  placeholder="    -            -            -    "
                  placeholderTextColor="#FFFFFF50"
                  keyboardType="number-pad"
                  value={this.state.code}
                  onChangeText={(text) => {
                    this.setState({
                      code: text.trim(),
                    });
                  }}
                  ref={(ref) => (this.otpInput = ref)}
                />
              </View>

              <TouchableOpacity
                style={styles.acceptBtn}
                onPress={() => {
                  this.onDone();
                }}>
                <TextView style={styles.acceptBtnTxt}>DONE & ENTER</TextView>
              </TouchableOpacity>
              {
                this.state.counter > 0 ? (
                  <TextView style={[styles.resendCodeTxt]}>{`Remaining time:    ${secondsToTime(this.state.counter)} sec`}</TextView>
                ) : (
                  <TextView onPress={() => {
                    this.sendOtp()
                  }} style={[styles.resendCodeTxt, { textDecorationLine: 'underline' }]}>RESEND
                                CODE</TextView>
                )
              }
            </View>
            {/*<View style={styles.acceptBtn}>*/}
            {/*    <TextView style={styles.acceptBtnTxt}>GO</TextView>*/}
            {/*</View>*/}
          </View>
        </View>
      </Container>
    );
  }
}

const mapActionCreators = (dispatch) => ({
  startLoading: bindActionCreators(apiLoadingStart, dispatch),
  stopLoading: bindActionCreators(apiLoadingStop, dispatch),
  signup: bindActionCreators(signup, dispatch),
  setLoginData: (data) => {
    dispatch(setProfile(data));
  },
});

const mapStateToProps = (state) => {
  return {
    loading: state.login.loading,
    login: state.login.data,
  };
};

export default connect(mapStateToProps, mapActionCreators)(VerifyPhoneNumber);
