import React, {Component} from 'react';
import {View} from 'react-native';
import styles from './MainScreenStyle';
import {EditTextView, TextView, Hbutton } from 'app/Component';
import {Button, Container, Content, Footer, Spinner, Text} from 'native-base';
import {HImagePicker} from '../../../Utils';


class MainScreen extends Component {
  callImagePicker = () => {
    console.log('callImagePicker');
    HImagePicker((res) => {
      console.log('callback', res);
    });
  };

  render() {
    return (
      <Container>
        <View style={styles.mainLayout}>
          <Hbutton
            onPress={() => this.props.navigation.navigate('LoginScreen')}
            rounded
            btnText="Login"
            style={styles.btnStyle}
          />
          <Hbutton
            onPress={() => this.props.navigation.navigate('RegisterScreen')}
            rounded
            btnText="Register"
            style={styles.btnStyle}
          />
          <Hbutton
            onPress={() => this.props.navigation.navigate('OtpScreen')}
            rounded
            btnText="Otp"
            style={styles.btnStyle}
          />
          <Hbutton
            onPress={() => this.props.navigation.navigate('ForgotPassword')}
            rounded
            btnText="Forgot Password"
            style={styles.btnStyle}
          />
          <Hbutton
            onPress={() => this.props.navigation.navigate('SendEmail')}
            rounded
            btnText="Send Email"
            style={styles.btnStyle}
          />
          <Hbutton
            onPress={() => this.props.navigation.navigate('Profile')}
            rounded
            btnText="Profile"
            style={styles.btnStyle}
          />
           <Hbutton
            onPress={() => this.props.navigation.navigate('HomeTab')}
            rounded
            btnText="Home"
            style={styles.btnStyle}
          />
        </View>
      </Container>
    );
  }
}

export default MainScreen;
