import React, { Component } from 'react';
import {
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import styles from './SignupMoreDetailsStyle';
import { MainHeader, TextView } from 'app/Component';
import { eye, eyeclose, lock, mail, phone, usericon } from '../../../assets';

import { signup } from '../../../store/signUp/actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { showBottomToast } from '../../../Utils';
import { validatePhoneNumber } from '../../../Utils/globalFun';
import CountryCodeModal from '../../../Component/CountryCodeModal';

class SignupMoreDetails extends Component {
  state = {
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    countryCode: "+91",
    isPasswordVisible: false,
    isConfirmPasswordVisible: false,
    showCountryCodeModal: false
  };

  signUp = () => {
    const { phoneNumber } = this.state;

    if (!validatePhoneNumber(phoneNumber)) {
      showBottomToast("Phone number you entered is not valid")
      return
    }

    if (
      this.state.password === '' ||
      6 > this.state.password.length ||
      this.state.password.length > 15
    ) {
      showBottomToast(
        'Password must not be empty and length should be minimum 6 and maximum 15 characters long',
      );
      return;
    }

    if (this.state.password !== this.state.confirmPassword) {
      showBottomToast('Password not match');
      return;
    }

    // this.registerAccount();
    this.navigate();
  };

  registerAccount = () => {
    const { userName } = this.props.route.params;
    const { email, fullName, password, phoneNumber, countryCode } = this.state;
    // console.log(this.props.route.params)
    this.props.signup(
      { phoneNumber, countryCode, username: userName, password },
      {
        onSuccess: async (res) => {
          this.navigate(res);
        },
        onError: () => { },
      },
    );
  };

  navigate = (res) => {
    const { phoneNumber, fullName, password, countryCode } = this.state;
    const { userName } = this.props.route.params;
    this.props.navigation.navigate('VerifyPhoneNumber', { phoneNumber, fullName, userName, password, countryCode })
  };

  onChangeField = (text, type) => {
    this.setState({
      [type]: text.trim(),
    });
  };

  render() {
    return (
      <KeyboardAwareScrollView style={styles.container} bounces={false}>
        <MainHeader
          title={'More Detail'}
          onBackPress={() => {
            this.props.navigation.goBack();
          }}
        />
        <View style={styles.mainLayout}>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={[styles.line, { borderColor: '#4F45BC', width: 10 }]}></View>
            <View style={styles.line2}></View>
          </View>
          <View style={{ marginTop: 30 }}>
            <View style={styles.inputCont}>
              {/* <View style={styles.inputTxtCont}>
                <Image source={usericon} style={styles.awardImg} />
                <TextInput
                  style={styles.inputTxt}
                  placeholder="Full Name"
                  placeholderTextColor="#FFFFFF50"
                  onChangeText={(text) => {
                    this.onChangeField(text, 'fullName');
                  }}
                  autoCapitalize="none"
                  maxLength={40}
                />
              </View> */}
              {/* <View style={styles.inputTxtCont}>
                <Image source={mail} style={styles.awardImg} />
                <TextInput
                  style={styles.inputTxt}
                  placeholder="Email"
                  placeholderTextColor="#FFFFFF50"
                  onChangeText={(text) => {
                    this.onChangeField(text, 'email');
                  }}
                  autoCapitalize="none"
                />
              </View> */}
              {/* <View style={{
                flexDirection: "row",
                marginHorizontal:25,
              }}>
                <View style={{marginTop:10,alignContent:'center',justifyContent:'center',backgroundColor:"pink"}}>
                  <TextView>{"+91"}</TextView>
                </View> */}
              <View style={[styles.inputTxtCont]}>
                <Pressable style={{ marginLeft: 20, margin: 10 }} onPress={() => {
                  this.setState({
                    showCountryCodeModal: true
                  })
                }}>
                  <TextView style={{ color: "white" }}>{this.state.countryCode}</TextView>
                </Pressable>
                {/* <Image source={phone}
                    style={styles.awardImg} /> */}
                <TextInput
                  style={styles.inputTxt}
                  placeholder="Phone Number"
                  placeholderTextColor="#FFFFFF50"
                  value={this.state.phoneNumber}
                  onChangeText={(text) => {
                    this.setState({
                      phoneNumber: text.trim()
                    })
                  }}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
              </View>
              {/* </View> */}
              <View style={styles.inputTxtCont}>
                <Image source={lock} style={styles.awardImg} />
                <TextInput
                  style={styles.inputTxt}
                  placeholder="Password"
                  placeholderTextColor="#FFFFFF50"
                  value={this.state.password}
                  onChangeText={(text) => {
                    this.onChangeField(text, 'password');
                  }}
                  secureTextEntry={!this.state.isPasswordVisible}
                  autoCapitalize="none"
                />
                <Pressable
                  onPress={() => {
                    this.setState({
                      isPasswordVisible: !this.state.isPasswordVisible,
                    });
                  }}>
                  <Image
                    style={styles.eyeIcon}
                    source={this.state.isPasswordVisible ? eyeclose : eye}
                  />
                </Pressable>
              </View>
              <View style={styles.inputTxtCont}>
                <Image source={lock} style={styles.awardImg} />
                <TextInput
                  style={styles.inputTxt}
                  placeholder="Confirm Password"
                  placeholderTextColor="#FFFFFF50"
                  value={this.state.confirmPassword}
                  onChangeText={(text) => {
                    this.onChangeField(text, 'confirmPassword');
                  }}
                  secureTextEntry={!this.state.isConfirmPasswordVisible}
                  autoCapitalize="none"
                />
                <Pressable
                  onPress={() => {
                    this.setState({
                      isConfirmPasswordVisible: !this.state
                        .isConfirmPasswordVisible,
                    });
                  }}>
                  <Image
                    style={styles.eyeIcon}
                    source={
                      this.state.isConfirmPasswordVisible ? eyeclose : eye
                    }
                  />
                </Pressable>
              </View>
              <TouchableOpacity
                style={styles.acceptBtn}
                onPress={() => {
                  this.signUp();
                }}>
                <TextView style={styles.acceptBtnTxt}>PROCEED</TextView>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <CountryCodeModal visible={this.state.showCountryCodeModal} toggle={() => {
          this.setState({
            showCountryCodeModal: !this.state.showCountryCodeModal
          })
        }}
          onSelectCountryCode={(countryCode) => {
            this.setState({
              countryCode
            })
          }}
        />
      </KeyboardAwareScrollView>
    );
  }
}

const mapActionCreators = { signup };

const mapStateToProps = (state) => {
  return {
    loading: state.login.loading,
    user: state.login.data,
  };
};
export default connect(mapStateToProps, mapActionCreators)(SignupMoreDetails);
