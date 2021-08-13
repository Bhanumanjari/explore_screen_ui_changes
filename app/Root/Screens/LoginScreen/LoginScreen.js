import { Image, Keyboard, Platform, Pressable, TextInput, TouchableOpacity, View } from 'react-native';
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
import CountryCodeModal from '../../../Component/CountryCodeModal';
import { ScrollView } from 'react-native-gesture-handler';
import analytics from '@react-native-firebase/analytics';
import CountryPicker from 'react-native-country-picker-modal'

class LoginScreen extends Component {

    static contextType = AuthContext
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            phoneNumber: '',
            password: "",
            countryCode: "+91",
            countryFlag: "IN",
            isPasswordVisible: false,
            showCountryCodeModal: false,
            isKeyboardOpen: false
        };
    }

    componentDidMount = async () => {
        if (Platform.OS === 'ios') {
            const trackingStatus = await requestTrackingPermission();
        }
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    _keyboardDidShow = () => {
        this.setState({
            isKeyboardOpen: true
        })
    }

    _keyboardDidHide = () => {
        this.setState({
            isKeyboardOpen: false
        })
    }

    componentWillUnmount = () => {
        this.keyboardDidShowListener && this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener && this.keyboardDidHideListener.remove();
    }

    login = () => {

        if (this.state.phoneNumber === '') {
            showBottomToast("Mobile number is required")
            return
        }

        if (this.state.password === "") {
            showBottomToast("Password is required")
            return
        }

        console.log(this.state.phoneNumber, this.state.countryCode, this.state.password)
        this.props.loginUser({
            phoneNumber: this.state.phoneNumber,
            countryCode: this.state.countryCode,
            password: this.state.password
        }, {
            onSuccess: (_) => {
                this.context.setIsSignIn(true)
                analytics().logLogin({
                    method: "phone"
                })
            },
            onError: () => {

            }
        })
    }

    onSelect = (country) => {
        console.log(country)
        this.setState({
            countryFlag: country.cca2,
            countryCode: "+" + country.callingCode[0]
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <KeyboardAwareScrollView enableOnAndroid showsVerticalScrollIndicator={false} style={{ backgroundColor: color.primary_color, flex: 1 }}>
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
                            <View style={{ marginLeft: 20 }} >
                                {/* <TextView style={{ color: "white" }}>{this.state.countryFlag}</TextView> */}
                                <CountryPicker
                                    {...{
                                        countryCode: this.state.countryFlag,
                                        withFilter: true,
                                        withFlag: true,
                                        withCountryNameButton: false,
                                        withCallingCode: true,
                                        onSelect: this.onSelect,
                                    }}
                                />
                            </View>
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
                {/* <Footer style={{ backgroundColor: '#20292D', }}> */}

                {/* </Footer> */}
                {!this.state.isKeyboardOpen ? <View style={styles.bottom}>
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
                </View> : null}


                {/* <CountryCodeModal visible={this.state.showCountryCodeModal} toggle={() => {
                    this.setState({
                        showCountryCodeModal: !this.state.showCountryCodeModal
                    })
                }}
                    onSelectCountryCode={(country) => {
                        this.setState({
                            countryCode: country.code,
                            countryFlag: country.flag,
                        })
                    }}
                /> */}


            </View>
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
