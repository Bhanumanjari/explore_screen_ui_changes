import { Image, Pressable, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Container, Header } from 'native-base';
import styles from './ForgotPasswordScreenStyle';
import { TextView, Hbutton, MainHeader } from 'app/Component';
import { forgotPassword, loginUser } from 'app/store/login';
import { award, backArrow, phone } from '../../../assets';
import { color } from '../../../Theme';
import { PixcelHeight, PixcelWidth, showBottomToast, showToast } from '../../../Utils';
import { forgotPasswordSendOtp } from "./../../../Services/authApiServices"
import { apiLoadingStart, apiLoadingStop } from '../../../store/global/actions';
import { bindActionCreators } from 'redux';
import FastImage from 'react-native-fast-image';
import CountryCodeModal from '../../../Component/CountryCodeModal';
import CountryPicker from 'react-native-country-picker-modal'

class ForgotPasswordScreen extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        phoneNumber: "",
        showCountryCodeModal: false,
        countryCode: "+91",
        countryFlag: "IN"
    }

    getOtp = () => {
        if (this.state.phoneNumber === "") {
            showBottomToast("Phone number must not be empty")
            return
        }
        this.sendOtp()
    }

    sendOtp = () => {
        this.props.startLoading()
        forgotPasswordSendOtp({
            phoneNumber: this.state.phoneNumber,
            countryCode: this.state.countryCode
        }).then(res => {
            this.props.stopLoading()
            showBottomToast("OTP sent successfully")
            this.props.navigation.navigate('ForgotPassword1', {
                phoneNumber: this.state.phoneNumber,
                countryCode: this.state.countryCode
            });
        }).catch(err => {
            this.props.stopLoading()
            console.log(err)
        })
    }

    onSelect = (country) => {
        this.setState({
            countryFlag: country.cca2,
            countryCode: "+" + country.callingCode[0]
        })
    }

    render() {
        return (
            <Container>

                <MainHeader title={'Forgot Password'}
                    onBackPress={() => {
                        this.props.navigation.goBack();
                    }} />

                <View style={styles.mainLayout}>
                    <View style={{ marginTop: 30, alignItems: 'center' }}>
                        <TextView style={styles.subTxt}>Enter your mobile number.</TextView>
                        <TextView style={styles.subTxt1}>We will send OTP to change your Password.</TextView>
                        <View style={styles.inputCont}>
                            <View style={styles.inputTxtCont}>
                                <Pressable style={{ marginLeft: 20, margin: 10 }} >
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
                                </Pressable>
                                {/* <FastImage source={phone}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={styles.awardImg} /> */}
                                <TextInput
                                    style={styles.inputTxt}
                                    placeholder="Phone Number"
                                    placeholderTextColor="#FFFFFF50"
                                    keyboardType="phone-pad"
                                    maxLength={10}
                                    onChangeText={(text) => {
                                        this.setState({
                                            phoneNumber: text.trim()
                                        })
                                    }}
                                />
                            </View>

                            <TouchableOpacity style={styles.acceptBtn}
                                onPress={() => {
                                    this.getOtp()
                                }}>
                                <TextView style={styles.acceptBtnTxt}>GET OTP</TextView>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                {/* <CountryCodeModal visible={this.state.showCountryCodeModal} toggle={() => {
                    this.setState({
                        showCountryCodeModal: !this.state.showCountryCodeModal
                    })
                }}
                    onSelectCountryCode={(country) => {
                        this.setState({
                            countryCode: country.code,
                            countryFlag: country.flag
                        })
                    }}
                /> */}
            </Container>
        );
    }
}

const mapActionCreators = (dispatch) => ({
    startLoading: bindActionCreators(apiLoadingStart, dispatch), stopLoading: bindActionCreators(apiLoadingStop, dispatch)
});

const mapStateToProps = state => {
    return {
        loading: state.login.loading,
    };
};
export default connect(
    mapStateToProps,
    mapActionCreators,
)(ForgotPasswordScreen);
