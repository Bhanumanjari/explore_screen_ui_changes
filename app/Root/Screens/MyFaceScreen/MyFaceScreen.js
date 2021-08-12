import React, {Component} from 'react';
import {Image, TextInput, TouchableOpacity, View, ImageBackground, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Footer,Header, Input, Item, Picker, Icon, Button,Left,Right} from 'native-base';
import styles from './MyFaceScreenStyle';
import {MainHeader, TextView} from 'app/Component';
import {req_user, backArrow, menu_dot, insta,fb,gmail, plus, chat, whatsapp} from 'app/assets';

import {PixcelWidth} from 'app/Utils';
import RawItem from "../DashboardScreen/ProfileTab/ProfileRowItem";
import LinearGradient from "react-native-linear-gradient";
const data = [
    {id: 1},
    {id: 2, accepted: true},
    {id: 3},
];
class MyFaceScreen extends Component {
    render() {
        return (
            <Container>
                {/*<MainHeader title={'New Hello'}*/}
                {/*            onBackPress={() => {*/}
                {/*                this.props.navigation.goBack();*/}
                {/*            }}/>*/}
                {/*<Content style={styles.mainLayout}>*/}
                    <ImageBackground
                        source={req_user}
                        style={styles.newHelloImg}>
                        <LinearGradient
                            start={{x: 0, y:0}} end={{x: 0, y: 1.2}}
                                        colors={['#00000000','#00000000', '#000000']}
                                        style={{flex: 1}}>
                        <Header style={styles.headerCont}>
                            <Left>
                                <Image
                                    source={backArrow}
                                    style={styles.headerImg}
                                    />
                            </Left>
                            <Right>
                                <Image
                                    source={menu_dot}
                                    style={styles.headerImg}
                                />
                            </Right>
                        </Header>
                        <View style={styles.btnCont}>
                            <View style={styles.publicBtn}>
                                <TextView style={styles.publicBtnTxt}>SHARE</TextView>
                            </View>
                            <View style={styles.privateBtn}>
                                <TextView style={styles.privateBtnTxt}>SAVE</TextView>
                            </View>
                        </View>

                            {/*<View style={styles.shareBtnCont}>*/}
                            {/*    <TextView style={styles.shareBtnContTxt}>Share to Social Media</TextView>*/}
                            {/*    <TouchableOpacity style={styles.socialCont}>*/}
                            {/*        <Image*/}
                            {/*            source={chat}*/}
                            {/*            style={styles.socialImg}*/}
                            {/*            />*/}
                            {/*        <Image*/}
                            {/*            source={insta}*/}
                            {/*            style={styles.socialImg}*/}
                            {/*        />*/}
                            {/*        <Image*/}
                            {/*            source={fb}*/}
                            {/*            style={styles.socialImg}*/}
                            {/*        />*/}
                            {/*        <Image*/}
                            {/*            source={whatsapp}*/}
                            {/*            style={styles.socialImg}*/}
                            {/*        />*/}
                            {/*        <Image*/}
                            {/*            source={gmail}*/}
                            {/*            style={styles.socialImg}*/}
                            {/*        />*/}
                            {/*    </TouchableOpacity>*/}
                            {/*    <View style={styles.line}></View>*/}
                            {/*    <TextView style={styles.shareBtnContTxt}>Share to Feed</TextView>*/}
                            {/*    <View style={styles.BtnCont}>*/}
                            {/*        <View style={styles.publicBtn1}>*/}
                            {/*            <TextView style={styles.publicBtnTxt1}>Public</TextView>*/}
                            {/*        </View>*/}
                            {/*        <View style={styles.privateBtn1}>*/}
                            {/*            <TextView style={styles.privateBtnTxt1}>Private</TextView>*/}
                            {/*        </View>*/}
                            {/*    </View>*/}
                            {/*</View>*/}

                        </LinearGradient>
                    </ImageBackground>
                {/*</Content>*/}
                <Footer style={styles.footerCont}>
                        <FlatList
                            data={data}
                            //style={{marginTop: 15}}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item}) => (
                                <RawItem item={item}/>
                            )}
                            keyExtractor={item => item.id}
                        />
                        <TouchableOpacity style={styles.addImgCont}>
                            <Image
                                source={plus}
                                style={styles.plusImg}
                            />
                        </TouchableOpacity>
                </Footer>
            </Container>
        );
    }
}

const mapActionCreators = {};

const mapStateToProps = (state) => {
    return {
        loading: state.login.loading,
    };
};
export default connect(mapStateToProps, mapActionCreators)(MyFaceScreen);
