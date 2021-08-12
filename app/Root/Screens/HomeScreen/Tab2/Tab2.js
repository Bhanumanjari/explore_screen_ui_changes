import React, {Component} from "react";
import {connect} from "react-redux";
import {Container, Content} from "native-base";
import {MainHeader} from "app/Component";
import {notificaiton} from 'app/assets'
import {View, Text} from "react-native";

class Tab2 extends Component {
    render() {
        return (
            <Container>
                <MainHeader bodyContent={'TAB 2'} rightIcon={notificaiton}/>
                <View>
                </View>
            </Container>


        );
    }
}

const mapActionCreators = {};

export default connect(
    null,
    mapActionCreators
)(Tab2);
