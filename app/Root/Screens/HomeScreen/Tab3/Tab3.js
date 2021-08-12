import React, {Component} from "react";
import {connect} from "react-redux";
import {Container} from "native-base";
import {MainHeader} from "app/Component";
import {left, notificaiton} from 'app/assets'

class Tab3 extends Component {

    render() {
        return (
            <Container>
                <MainHeader leftIcon={left} bodyContent={'Tab 2'} rightIcon={notificaiton}
                            backAction={() => {
                                this.props.navigation.goBack()
                            }}
                />

            </Container>


        );
    }
}

const mapActionCreators = {};

export default connect(
    null,
    mapActionCreators
)(Tab3);
