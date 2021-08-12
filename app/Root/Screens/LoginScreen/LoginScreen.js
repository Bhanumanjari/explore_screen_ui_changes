import { Image, Platform, Pressable, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Container, Content, Footer } from 'native-base';
import styles from './LoginScreenStyle';
import { TextView, Hbutton } from 'app/Component';
import { award, eye, eyeclose, loginImg } from '../../../assets';
import { forgotPassword, loginUser } from 'app/store/login';
import { infoImg } from '../../../assets';
import { color } from '../../../Theme';
import { validateEmail } from '../../../Utils/globalFun';
import { showBottomToast } from '../../../Utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AuthContext from '../../../context/AuthContext';
import { requestTrackingPermission } from 'react-native-tracking-transparency';

class LoginScreen extends Component {

    static contextType = AuthContext
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            phoneNumber: '',
            password: "",
            isPasswordVisible: false
        };
    }

    componentDidMount = async () => {
        if(Platform.OS === 'ios'){
            const trackingStatus = await requestTrackingPermission();
        }
    }

    login = () => {

        // if (this.state.email === '') {
        //     showBottomToast("Email is required")
        //     return
        // }
        if (this.state.phoneNumber === '') {
            showBottomToast("Mobile number is required")
            return
        }

        // if (!validateEmail(this.state.email)) {
        //     showBottomToast("Invalid username/email")
        //     return
        // }

        if (this.state.password === "") {
            showBottomToast("Password is required")
            return
        }

        this.props.loginUser({
            phoneNumber: this.state.phoneNumber,
            countryCode: "+91",
            password: this.state.password
        }, {
            onSuccess: (userData) => {
                // if (!userData.isEmailVerified) {
                //     this.props.navigation.navigate('VerifyEmail')
                // }
                // else
                // if (!userData.isPhoneVerified) {
                //     this.props.navigation.navigate('VerifyPhoneNumber')
                // } else {
                this.context.setIsSignIn(true)
                // this.props.navigation.reset({
                //     index: 0,
                //     routes: [{ name: 'DashboardScreen' }],
                // });
                // }
            },
            onError: () => {

            }
        })
    }

    render() {
        return (
            <Container>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: color.primary_color, }}>
                    <View style={styles.mainLayout}>
                        <TextView style={styles.subTxt}>Here to Get</TextView>
                        <TextView style={styles.titleTxt}>Welcomed!</TextView>
                        <Image
                            source={loginImg}
                            resizeMode={'contain'}
                            style={styles.infoImg}
                        />
                        {/*<View style={styles.line}></View>*/}
                        <View style={styles.inputTxtCont}>
                            <TextInput
                                style={styles.inputTxt}
                                placeholder="Enter mobile no."
                                placeholderTextColor="#FFFFFF50"
                                onChangeText={(text) => {
                                    this.setState({
                                        phoneNumber: text.trim()
                                    })
                                }}
                                maxLength={10}
                                keyboardType='phone-pad'
                                autoCapitalize={"none"}
                            />
                        </View>
                        <View style={styles.inputTxtCont}>
                            <TextInput
                                style={styles.inputTxt}
                                placeholder="Password"
                                placeholderTextColor="#FFFFFF50"
                                value={this.state.password}
                                onChangeText={(text) => {
                                    this.setState({
                                        password: text.trim()
                                    })
                                }}
                                secureTextEntry={!this.state.isPasswordVisible}
                                autoCapitalize={"none"}
                            />
                            <Pressable onPress={() => {
                                this.setState({
                                    isPasswordVisible: !this.state.isPasswordVisible
                                })
                            }}>
                                <Image
                                    style={styles.eyeIcon}
                                    source={this.state.isPasswordVisible ? eyeclose : eye}
                                />
                            </Pressable>
                        </View>
                        <TouchableOpacity style={styles.acceptBtn}
                            onPress={() => {
                                this.login()
                            }}
                        >
                            <TextView style={styles.acceptBtnTxt}>LOGIN</TextView>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ marginBottom: 50 }}
                            onPress={() => this.props.navigation.navigate('ForgotPassword')}
                        >
                            <TextView style={styles.forgotTxt}>Forgot Password?</TextView>
                        </TouchableOpacity>

                    </View>
                </KeyboardAwareScrollView>
                <Footer style={{ backgroundColor: '#20292D', }}>
                    <View style={styles.bottom}>
                        <View style={styles.bottomCont}>
                            <View style={styles.declineBtn}>
                                <TextView style={styles.declineBtnTxt}>New Here? </TextView>
                            </View>
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('InfoScreen')
                            }} style={styles.joinBtn}

                            >
                                <TextView style={styles.joinBtnTxt}>JOIN HELLOS</TextView>
                            </TouchableOpacity>
                        </View>
                    </View>

                </Footer>
            </Container>
        );
    }
}

const mapActionCreators = { loginUser, forgotPassword };

const mapStateToProps = (state) => {
    return {
        loading: state.login.loading,
    };
};
export default connect(mapStateToProps, mapActionCreators)(LoginScreen);
