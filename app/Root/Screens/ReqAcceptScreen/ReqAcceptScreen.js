import React, { Component } from 'react';
import { Image, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Footer, Input, Item, Picker, Icon, Button } from 'native-base';
import styles from './ReqAcceptScreenStyle';
import { MainHeader, TextView } from 'app/Component';
import { lock, close, user_profile, usericon, camera, phone, award } from '../../../assets';
import RawItem from './ReqAcceptRowItem';
import { forgotPassword, loginUser } from 'app/store/login';
import { PixcelWidth } from '../../../Utils';
import { changeRequestStatus, markRequestView } from '../../../store/video';
import { fetchUserProfile } from '../../../store/login';
import { apiLoadingStart, apiLoadingStop } from '../../../store/global/actions';

const data = [
    { id: 1 },
    { id: 2, accepted: true },
    { id: 3 },
    { id: 4 },
];

class ReqAcceptScreen extends Component {

    state = {
        isReqViewed: false,
        requests: [],
        isRequestViewed: false
    }

    componentDidMount = () => {
        const { item } = this.props.route.params
        this.setState({
            requests: item.requested
        })
        this.props.markRequestView({
            videoId: item._id
        }, (res) => {
            if (res) {
                this.setState({
                    isRequestViewed: true
                })
                // this.props.fetchUserProfile()
            }
        })
    }

    onReqResponse = (data) => {
        const { item } = this.props.route.params
        let newData = {
            data: {
                status: data.type
            },
            videoId: item._id,
            requestId: data.item._id
        }
        this.props.apiLoadingStart()
        this.props.changeRequestStatus(newData, this.onReqSuccess(data))
    }

    onReqSuccess = (data) => (res) => {
        this.props.apiLoadingStop()
        if (res) {
            this.state.requests[data.index]['status'] = data.type
            this.setState({
                requests: this.state.requests
            })
        }
    }

    componentWillUnmount = () => {
        const { item, index, onReqView = () => { } } = this.props.route.params
        const { isRequestViewed } = this.state
        onReqView({ ...item, isRequestViewed }, index)

    }

    render() {
        return (
            <Container>
                <MainHeader
                    title={'Requests'}
                    onBackPress={() => {
                        this.props.navigation.goBack();
                    }} />

                <Content style={styles.mainLayout}>
                    <FlatList
                        data={this.state.requests}
                        style={{ marginTop: 15 }}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        renderItem={(item) => (
                            <RawItem {...item} onReqResponse={this.onReqResponse} />
                        )}
                        keyExtractor={item => item._id}
                    />
                </Content>
            </Container>
        );
    }
}

const mapActionCreators = {
    markRequestView,
    fetchUserProfile,
    changeRequestStatus,
    apiLoadingStart,
    apiLoadingStop
};

const mapStateToProps = (state) => {
    return {

    };
};
export default connect(mapStateToProps, mapActionCreators)(ReqAcceptScreen);
