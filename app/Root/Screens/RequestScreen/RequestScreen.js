import React, { Component } from 'react';
import { Image, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Footer, Input, Item, Picker, Icon, Button } from 'native-base';
import styles from './RequestScreenStyle';
import { MainHeader, TextView } from 'app/Component';
import { newHello, req_user, star, heart, camera, phone, award } from '../../../assets';
//import ForyouRowItem from './ForyouRowItem';
import ReqRowItem from './ReqRowItem';
import { forgotPassword, loginUser } from 'app/store/login';
import { PixcelWidth } from "../../../Utils";

const data = [
    { id: 4, title: "You fanning as Elle Fanning fun" },
    { id: 8, title: "You fanning as Elle Fanning fun" },
    { id: 8, title: "You fanning as Elle Fanning fun" },
    { id: 8, title: "You fanning as Elle Fanning fun" },
    { id: 8, title: "You fanning as Elle Fanning fun" },
    { id: 8, title: "You fanning as Elle Fanning fun" },

]

class RequestScreen extends Component {
    state = {
        isReqViewed: false,
        requests: []
    }
    componentDidMount = () => {
        
    }

    render() {
        return (
            <Container>
                <MainHeader
                    title={'Hellos'}
                    onBackPress={() => {
                        this.props.navigation.goBack();
                    }} />

                <Content style={styles.mainLayout}>
                    <FlatList
                        data={data}
                        style={{ marginTop: 8 }}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <ReqRowItem />
                        )}
                        keyExtractor={item => item.id}
                    />
                </Content>
            </Container>
        );
    }
}

const mapActionCreators = { loginUser, forgotPassword };

const mapStateToProps = (state) => {
    return {
        loading: state.login.loading,
    };
};
export default connect(mapStateToProps, mapActionCreators)(RequestScreen);
