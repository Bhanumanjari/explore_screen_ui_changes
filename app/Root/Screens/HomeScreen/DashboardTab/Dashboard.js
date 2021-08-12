import React, {Component} from 'react'
import {notificaiton} from "app/assets";
import {MainHeader} from "app/Component";
import {SesstionKey} from "../../../../Constants";
import {Container, Content, Text} from "native-base";
import {getProfile} from "../../../../store/login";
import {connect} from "react-redux";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    async componentDidMount() {        
        this.props.getProfile(JSON.parse(data));
    }

    render() {
        return (
            <Container>
                <MainHeader bodyContent={'Dashboard'} rightIcon={notificaiton} optionMenu={true}
                            onMenuItemPress={async (id) => {                               
                                // const resetAction = StackActions.reset({
                                //     index: 0,
                                //     actions: [NavigationActions.navigate({routeName: 'LoginScreen'})],
                                // });
                                // this.props.navigation.dispatch(resetAction);
                                this.props.navigation.navigate('LoginScreen')
                            }}/>
                <Content>
                    <Text style={{paddingLeft:50,paddingTop:50}}>Name         : {this.props.data?.firstname}</Text>
                    <Text style={{paddingLeft:50}}>Username : {this.props.data?.username}</Text>
                </Content>
            </Container>
        )
    }
}

const mapActionCreators = {
    getProfile
};

const mapStateToProps = state => {
    return {
        data: state.login.data
    };
};
export default connect(
    mapStateToProps,
    mapActionCreators
)(Dashboard);
