import React, { Component } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header } from 'native-base';
import styles from './ForgotPasswordScreen1Style';
import { TextView, Hbutton, EditTextView, MainHeader } from 'app/Component';
import { home, backArrow, video, smile } from '../../../assets';

import { forgotPassword, loginUser } from 'app/store/login';
import { color } from '../../../Theme';
import { PixcelHeight, PixcelWidth, showBottomToast, showToast } from '../../../Utils';
import { forgotPasswordSendOtp, verifyOtp } from '../../../Services/authApiServices';
import { apiLoadingStart, apiLoadingStop } from '../../../store/global/actions';
import { bindActionCreators } from 'redux';
import { TextInputMask } from 'react-native-masked-text'
import { secondsToTime } from '../../../Utils/globalFun';

class ForgotPasswordScreen1 extends Component {
    timeCounter = null
    state = {
        code: "",
        counter: 60
    }

    componentDidMount = () => {
        this.setTimer()
    }

    sendOtp = () => {
        const data = this.props.route?.params ?? {}
        this.props.startLoading()
        forgotPasswordSendOtp(data).then(res => {
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

    componentWillUnmount = () => {
        this.timeCounter && clearInterval(this.timeCounter)
    }

    resetPassword = () => {
        let code = this.otpInput.getRawValue()
        code = code.split(" - ").join("")
        const data = this.props.route?.params ?? {}
        if (code === "") {
            showBottomToast("Code is not allowed to be empty")
            return
        }
        this.props.startLoading()
        verifyOtp({
            code: code,
            ...data,
            type: "FORGOT_PASSWORD"
        }).then(res => {
            this.props.stopLoading()
            this.timeCounter && clearInterval(this.timeCounter)
            this.props.navigation.navigate('ResetPasswordScreen', { ...res });
        }).catch(err => {
            this.props.stopLoading()
            console.log(err)
        })
    }

    render() {
        return (
            <Container>
                <MainHeader title={'OTP'}
                    onBackPress={() => {
                        this.props.navigation.goBack();
                    }} />


                <View style={styles.mainLayout}>



                    <View style={{ marginTop: 30, alignItems: 'center' }}>
                        <TextView style={styles.subTxt}>We have sent OTP to your mobile number.</TextView>
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

                            <TouchableOpacity style={styles.acceptBtn} onPress={() => {
                                this.resetPassword()
                            }}>
                                <TextView style={styles.acceptBtnTxt}>RESET PASSWORD</TextView>
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
                    </View>
                </View>
            </Container>
        );
    }
}

const mapActionCreators = (dispatch) => ({
    startLoading: bindActionCreators(apiLoadingStart, dispatch), stopLoading: bindActionCreators(apiLoadingStop, dispatch)
});

const mapStateToProps = (state) => {
    return {
        loading: state.login.loading,
    };
};
export default connect(mapStateToProps, mapActionCreators)(ForgotPasswordScreen1);
