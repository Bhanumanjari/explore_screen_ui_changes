import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Container, Footer } from 'native-base';
import styles from './InfoScreenStyle';
import { TextView, Hbutton } from 'app/Component';
import { infoImg } from '../../../assets';
import { forgotPassword, loginUser } from 'app/store/login';
import { StackActions } from '@react-navigation/native';
import { setGuestProfile } from '../../../store/guest';

class InfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  loginAsGuest = () => {
    this.props.setGuest({
      isGuest: true,
    });
    this.props.navigation.dispatch(
      StackActions.replace('PhotoClickScreen', {
        initial: true,
      }),
    );
  };

  render() {
    return (
      <Container>
        <ScrollView scrollEnabled contentContainerStyle={styles.mainLayout} bounces={true}>
          <Image
            source={infoImg}
            resizeMode={'contain'}
            style={styles.infoImg}
          />
          <View style={styles.mainTxtCont}>
            <TextView style={styles.mainTxt}>Spin fantasy around </TextView>
            <TextView style={styles.mainTxt}>with one tap</TextView>
          </View>
          <View style={styles.subTxtCont}>
            <TextView style={styles.subTxt}>
              Best face swapping video app.
            </TextView>
            <TextView style={styles.subTxt}> Be social. Be found!</TextView>
          </View>
          <TouchableOpacity
            style={styles.btnCont}
            onPress={() => this.props.navigation.navigate('SignupScreen')}>
            <TextView style={styles.btnTxt}>CREATE NEW ACCOUNT</TextView>
          </TouchableOpacity>
        </ScrollView>
        <Footer style={{ backgroundColor: '#20292D' }}>
          <View style={styles.bottom}>
            <View style={styles.bottomCont}>
              <View style={styles.memberBtn}>
                <TextView
                  style={styles.memberBtnText}>
                  {'Already member?'}
                </TextView>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('LoginScreen');
                }}
                style={styles.loginBtn}>
                <TextView style={styles.loginBtnText}>LOGIN</TextView>
              </TouchableOpacity>
            </View>
          </View>
        </Footer>
      </Container>
    );
  }
}

const mapActionCreators = (dispatch) => ({
  // setGuest: (data) => dispatch(setGuestProfile(data)),
});

const mapStateToProps = (state) => {
  return {
  };
};
export default connect(mapStateToProps, mapActionCreators)(InfoScreen);
