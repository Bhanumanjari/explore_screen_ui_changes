import React, {Component} from "react";
import {connect} from "react-redux";
import {Container} from "native-base";
import {MainHeader} from "app/Component";
import {notificaiton} from 'app/assets'

class Setting extends Component {
    render() {
        return (
            <Container>
                <MainHeader  bodyContent={'Settings'} rightIcon={notificaiton}/>

            </Container>


        );
    }
}

const mapActionCreators = {};

export default connect(
    null,
    mapActionCreators
)(Setting);
