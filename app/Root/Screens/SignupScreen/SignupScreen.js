import React, { Component } from 'react';
import { ActivityIndicator, Image, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import styles from './SignupScreenStyle';
import { MainHeader, TextView } from 'app/Component';
import { award, g49 } from '../../../assets';

import { forgotPassword, loginUser } from 'app/store/login';
import { checkUserName } from '../../../Services/authApiServices';
import { debounce } from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
import { showBottomToast } from '../../../Utils';
import { checkUserNameAvaibility, saveUserNameAvaibility, setUserNameAvaibilityLoader } from '../../../store/profile';
import { validateUserName } from '../../../Utils/globalFun';
class SignupScreen extends Component {

    state = {
        userName: "",
        error: false,
        errorMessage: ""
    }

    checkAvailibility = debounce(() => {
        // checkUserName({ username: this.state.userName }).then(res => {
        //     if (res) {
        //         this.setState({
        //             error: false,
        //             errorMessage: ''
        //         })
        //     }
        // }).catch(err => {
        //     console.log(err)
        //     this.setState({
        //         error: true,
        //         errorMessage: this.state.userName === "" ? "" : `${this.state.userName} username is already taken.`
        //     })
        // })
        if (this.state.userName !== '') {
            this.props.checkUserNameAvaibility({
                username: this.state.userName
            })
        }
    }, 500)

    componentWillUnmount = () => {
        this.props.saveUserNameAvaibility(true)
        this.props.setUserNameAvaibilityLoader(false)
    }

    onGo = () => {
        if (this.state.userName === "") {
            showBottomToast("Username is not allowed to be empty")
            return
        }

        if (!validateUserName(this.state.userName)) {
            showBottomToast("Username you entered is not valid")
            return
        }

        if (!this.props.userNameAvaibility) {
            showBottomToast('Username is already taken')
            return
        }

        if (this.props.isUserNameValidating) {
            showBottomToast('Please wait we are validating username')
            return
        }

        this.props.navigation.navigate('SignupMoreDetails', {
            userName: this.state.userName
        });
    }

    render() {
        return (
            <KeyboardAwareScrollView style={styles.container}>
                <View>
                    <MainHeader title={'Register to Hellos'} />
                    <View style={styles.mainLayout}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.line, { borderColor: '#4F45BC', width: 10 }]}></View>
                            <View style={styles.line2}></View>
                        </View>
                        <Image style={styles.users} source={g49} />

                        <View style={styles.bottomCont}>
                            <TextView style={styles.subTxt}>Select an unique Hellos username</TextView>
                            <View style={styles.inputCont}>
                                <View style={styles.inputTxtCont}>
                                    <Image source={award}
                                        style={styles.awardImg} />
                                    <TextInput
                                        style={styles.inputTxt}
                                        placeholder="Username"
                                        placeholderTextColor="#FFFFFF50"
                                        value={this.state.userName}
                                        onChangeText={(text) => {
                                            this.setState({
                                                userName: text.trim()
                                            }, () => {
                                                if (this.state.userName !== "")
                                                    this.checkAvailibility()
                                            })
                                        }}
                                        onEndEditing={() => {
                                            this.checkAvailibility && this.checkAvailibility.flush()
                                        }}
                                        maxLength={15}
                                        autoCapitalize={"none"}
                                    />
                                    <ActivityIndicator
                                        style={styles.userNameLoader}
                                        animating={this.props.isUserNameValidating}
                                    />
                                </View>
                            </View>
                            {/* <TextView style={styles.hintTxt}>{this.state.errorMessage}</TextView> */}
                            {!this.props.userNameAvaibility && this.state.userName !== '' && <TextView style={styles.hintTxt}>{`${this.props.userNameErrorMessage}`}</TextView>}
                            <TouchableOpacity style={styles.acceptBtn}
                                onPress={() => {
                                    this.onGo()
                                }}
                            >
                                <TextView style={styles.acceptBtnTxt}>GO</TextView>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const mapActionCreators = { checkUserNameAvaibility, setUserNameAvaibilityLoader, saveUserNameAvaibility };

const mapStateToProps = (state) => {
    return {
        userNameAvaibility: state.profile.userNameAvaibility,
        isUserNameValidating: state.profile.isUserNameValidating,
        userNameErrorMessage: state.profile.userNameErrorMessage,
    };
};
export default connect(mapStateToProps, mapActionCreators)(SignupScreen);
