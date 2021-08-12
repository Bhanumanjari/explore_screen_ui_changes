import {View} from "react-native";
import {connect} from "react-redux";
import React, {Component} from "react";
import { Container } from "native-base";
import styles from "./SendEmailScreenStyle";
import { TextView,Hbutton} from "app/Component";
import {forgotPassword, loginUser} from 'app/store/login'

class SendEmailScreen extends Component {
    constructor(props) {
        super(props);        
    }


    render() {
        return (
            <Container>
            <View style = {styles.mainLayout}>
            <TextView>SendEmail Screen</TextView>
                <Hbutton onPress = {() => this.props.navigation.navigate('MainScreen')} rounded btnText = 'Back' style = {styles.btnStyle}  />
                </View>
            </Container>
        );
    }
}

const mapActionCreators = {loginUser, forgotPassword};

const mapStateToProps = state => {
    return {
        loading: state.login.loading
    };
};
export default connect(
    mapStateToProps,
    mapActionCreators
)(SendEmailScreen);
