import React, { Component } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Toast } from 'native-base';
import styles from './SignupScreen2Style';
import { TextView, Hbutton, EditTextView, MainHeader } from 'app/Component';
import { home, award, video, smile, backArrow } from '../../../assets';

import { forgotPassword, loginUser } from 'app/store/login';
import { color } from '../../../Theme';
import { PixcelHeight, PixcelWidth, showBottomToast, showToast } from '../../../Utils';
import { fetchOtp, verifyOtp } from './../../../Services/authApiServices'
import { bindActionCreators } from 'redux';
import { apiLoadingStart, apiLoadingStop } from '../../../store/global/actions';
import { setProfile } from '../../../store/login/actions';
import { cloneDeep } from 'lodash';
import { TextInputMask } from 'react-native-masked-text'
import { secondsToTime } from '../../../Utils/globalFun';

class VerifyEmail extends Component {
    timeCounter = null
    state = {
        code: "",
        counter: 60
    }

    componentDidMount = () => {
        this.sendOtp()
    }

    sendOtp = () => {
        const { email } = this.props.route.params
        this.props.startLoading()
        fetchOtp({
            email,
            type: "EMAIL_VERIFICATION"
        }).then(res => {
            // console.log(res)
            showBottomToast("OTP sent successfully")
            this.setTimer()
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            this.props.stopLoading()
        })
    }

    setTimer = () => {
        this.timeCounter && clearInterval(this.timeCounter)
        this.setState({
            counter: 60
        }, () => {
            this.timeCounter = setInterval(() => {
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
        let code = this.otpInput.getRawValue()
        code = code.split(" - ").join("")
        const { email } = this.props.route.params
        if (this.state.code === "") {
            // alert("Please enter valid otp")
            showBottomToast("Please enter valid otp")
            return
        }
        this.props.startLoading()
        verifyOtp({
            code: code,
            email,
            type: "EMAIL_VERIFICATION"
        }).then(res => {
            this.props.stopLoading()
            let userData = cloneDeep(this.props.login)
            this.props.setLoginData({ ...userData, isEmailVerified: true })
            this.timeCounter && clearInterval(this.timeCounter)
            this.props.navigation.navigate('PhoneNumber')
        }).catch(err => {
            this.props.stopLoading()
            console.log(err)
        })
    }

    componentWillUnmount = () => {
        this.timeCounter && clearInterval(this.timeCounter)
    }

    render() {
        return (
            <Container>
                <MainHeader title={'Verify Email'}
                    onBackPress={() => {
                        if (this.props.route?.params?.isReset) {
                            return
                        } else {
                            this.props.navigation.goBack();
                        }
                    }} />

                <View style={styles.mainLayout}>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={[styles.line, { borderColor: '#4F45BC', width: 10 }]}></View>
                        <View style={styles.line2}></View>
                    </View>

                    <View style={{ marginTop: 30, alignItems: 'center' }}>
                        <TextView style={styles.subTxt}>Please enter verification code sent to your email.</TextView>
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
                                            code: text.trim()
                                        })
                                    }}
                                    ref={(ref) => this.otpInput = ref}
                                />
                            </View>

                            <TouchableOpacity style={styles.acceptBtn}
                                onPress={() => {
                                    this.onDone()
                                }}
                            >
                                <TextView style={styles.acceptBtnTxt}>DONE</TextView>
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
    startLoading: bindActionCreators(apiLoadingStart, dispatch), stopLoading: bindActionCreators(apiLoadingStop, dispatch), setLoginData: (data) => {
        dispatch(setProfile(data))
    }
});

const mapStateToProps = (state) => {
    return {
        loading: state.login.loading,
        login: state.login.data
    };
};
export default connect(mapStateToProps, mapActionCreators)(VerifyEmail);
