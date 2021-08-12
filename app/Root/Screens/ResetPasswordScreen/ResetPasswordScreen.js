import { Image, Pressable, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Container, Header } from 'native-base';
import { TextView, Hbutton, MainHeader } from 'app/Component';
import { forgotPassword, loginUser } from 'app/store/login';
import { award, backArrow, eye, eyeclose, phone } from '../../../assets';
import { color, font } from '../../../Theme';
import { PixcelHeight, PixcelWidth, showBottomToast, showToast } from '../../../Utils';
import { forgotPasswordSendOtp, resetPassword } from "./../../../Services/authApiServices"
import { apiLoadingStart, apiLoadingStop } from '../../../store/global/actions';
import { bindActionCreators } from 'redux';
import { StackActions } from '@react-navigation/native';

class ResetPasswordScreen extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        password: "",
        newPassword: "",
        isPasswordVisible: false,
        isConfirmPasswordVisible: false,
    }

    onDone = () => {
        if (this.state.password === '' || (6 > this.state.password.length || this.state.password.length > 15)) {
            showBottomToast("Password must not be empty and length should be minimum 6 and maximum 15 character long")
            return
        }
        if (this.state.password !== this.state.newPassword) {
            showBottomToast("Password not match")
            return
        }
        this.reset()
    }

    reset = () => {
        const token = this.props.route?.params?.accessToken
        this.props.startLoading()
        resetPassword({
            password: this.state.password
        }, token).then(res => {
            this.props.stopLoading()
            showBottomToast("Your password is successfully reset")
            this.props.navigation.dispatch(StackActions.pop(3));
        }).catch(err => {
            this.props.stopLoading()
            console.log(err)
        })
    }

    render() {
        return (
            <Container>

                <MainHeader title={'Reset Password'}
                    onBackPress={() => {
                        this.props.navigation.goBack();
                    }} />

                <View style={styles.mainLayout}>
                    <View style={styles.inputTxtCont}>
                        <TextInput
                            style={styles.inputTxt}
                            placeholder="New Password"
                            placeholderTextColor="#FFFFFF50"
                            value={this.state.password}
                            maxLength={10}
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
                    <View style={styles.inputTxtCont}>
                        <TextInput
                            style={styles.inputTxt}
                            placeholder="Confirm New Password"
                            placeholderTextColor="#FFFFFF50"
                            value={this.state.newPassword}
                            maxLength={10}
                            onChangeText={(text) => {
                                this.setState({
                                    newPassword: text.trim()
                                })
                            }}
                            secureTextEntry={!this.state.isConfirmPasswordVisible}
                            autoCapitalize={"none"}
                        />
                        <Pressable onPress={() => {
                            this.setState({
                                isConfirmPasswordVisible: !this.state.isConfirmPasswordVisible
                            })
                        }}>
                            <Image
                                style={styles.eyeIcon}
                                source={this.state.isConfirmPasswordVisible ? eyeclose : eye}
                            />
                        </Pressable>
                    </View>

                    <TouchableOpacity style={styles.doneBtn}
                        onPress={() => {
                            this.onDone()
                        }}>
                        <TextView style={styles.doneBtnTxt}>DONE</TextView>
                    </TouchableOpacity>

                </View>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    mainLayout: {
        backgroundColor: color.primary_color,
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    inputTxtCont: {
        marginTop: PixcelWidth(22),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3E464A',
        borderRadius: 30,
        marginHorizontal: 25,
    },
    inputTxt: {
        flex: 1,
        margin: 5,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        fontFamily: font.MontserratRegular,
        color: color.txt_white
    },
    doneBtn: {
        marginTop: '10%',
        borderRadius: 30,
        backgroundColor: color.btnPrimary_color,
        margin: 3,
        alignSelf: 'center',

        elevation: 3,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 0.8,
        shadowOffset: { height: 0, width: 0 }
    },
    doneBtnTxt: {
        //margin:30,
        marginVertical: 16,
        //letterSpacing: 2,
        fontSize: 15,
        fontFamily: font.MontserratSemibold,
        marginHorizontal: 30,
        color: color.txt_white,
        paddingHorizontal: 10
    },
    eyeIcon: {
        height: PixcelWidth(26),
        width: PixcelWidth(26),
        tintColor: color.txt_white,
        marginRight: PixcelWidth(12)
    }
})

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
)(ResetPasswordScreen);
