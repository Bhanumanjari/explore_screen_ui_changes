import React, { Component } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header } from 'native-base';
import styles from './SignupScreen3Style';
import { TextView, Hbutton, EditTextView, MainHeader } from 'app/Component';
import { home, award, video, smile, backArrow, phone } from '../../../assets';

import { forgotPassword, loginUser } from 'app/store/login';
import { color } from '../../../Theme';
import { PixcelHeight, PixcelWidth, showBottomToast } from '../../../Utils';
import { updateProfileAction } from '../../../store/profile/actions';

class PhoneNumber extends Component {
    state = {
        phoneNumber: this.props.user?.phoneNumber
    }

    componentDidMount = () => {
    }

    onProceed = () => {
        if (this.state.phoneNumber === "") {
            // alert("Phone number must not be empty")
            showBottomToast("Phone number must not be empty")
            return
        }
        let formData = new FormData()
        formData.append("phoneNumber", this.state.phoneNumber)
        formData.append("countryCode", "+91")
        this.props.updateProfileAction(formData, {
            onSuccess: () => {
                // this.props.navigation.goBack();
                this.props.navigation.navigate('VerifyPhoneNumber', { ...this.props.route?.params, phoneNumber: this.state.phoneNumber })
            },
            onError: () => {

            }
        })
    }

    render() {
        return (
            <Container>
                <MainHeader title={'Phone Number'}
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
                        <View style={[styles.line2, { borderColor: '#4F45BC', width: 10 }]}></View>
                    </View>

                    <View style={{ marginTop: 30, alignItems: 'center' }}>
                        <TextView style={styles.subTxt}>We need to verify your phone number too</TextView>
                        <View style={styles.inputCont}>
                            <View style={styles.inputTxtCont}>
                                <Image source={phone}
                                    style={styles.awardImg} />
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


                            <TouchableOpacity style={styles.acceptBtn}
                                onPress={() => {
                                    this.onProceed()
                                }}
                            >
                                <TextView style={styles.acceptBtnTxt}>PROCEED</TextView>
                            </TouchableOpacity>

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

const mapActionCreators = { loginUser, forgotPassword, updateProfileAction };

const mapStateToProps = (state) => {
    return {
        loading: state.login.loading,
        user: state.login.data
    };
};
export default connect(mapStateToProps, mapActionCreators)(PhoneNumber);
