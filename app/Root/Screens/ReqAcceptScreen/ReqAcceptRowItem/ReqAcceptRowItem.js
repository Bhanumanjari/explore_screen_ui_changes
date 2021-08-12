import React from 'react';
import { Image, ImageBackground, Pressable, View } from 'react-native';
import styles from './ReqAcceptRowItemStyle';
import { newHello, user_profile, usericon, camera, phone, award, close } from '../../../../assets';
import { TextView } from 'app/Component';
import { PixcelWidth } from 'app/Utils';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Text } from 'native-base';

const RowItem = props => {


    const { item, index, onReqResponse } = props;

    return (
        <View style={styles.user}>
            <View style={styles.userDetailsCont}>
                {item.userId.profileImage?.thumbnail ? <Image
                    source={{
                        uri: item.userId.profileImage.thumbnail
                    }}
                    style={styles.userImg}
                /> : <View
                    style={styles.userImg}
                >
                        <TextView style={styles.firstCharTxt}>{item.userId?.name?.charAt(0).toUpperCase() ?? 'H'}</TextView>
                    </View>}
                <TextView style={styles.userTxt}>{item.userId.name}</TextView>
            </View>
            <View style={styles.reqCont}>
                {item.status === "APPROVED" && <Button rounded success
                    style={styles.acceptBtnBlue}
                >
                    <TextView style={styles.acceptBtnTxt}>Accepted</TextView>
                </Button>
                }
                {item.status === "PENDING" && <Button rounded success
                    onPress={() => {
                        onReqResponse({ item, index, type: "APPROVED" })
                    }}
                    style={styles.acceptBtn}>
                    <TextView style={styles.acceptBtnTxt}>Accept</TextView>
                </Button>}
                {item.status === "REJECTED" && <Button rounded success
                    disabled={true}
                    style={[styles.acceptBtn, {
                        borderColor: 'red'
                    }]}>
                    <TextView style={[styles.acceptBtnTxt, {
                        color: 'red'
                    }]}>Rejected</TextView>
                </Button>}

                {item.status === "PENDING" && <Pressable onPress={() => {
                    onReqResponse({ item, index, type: "REJECTED" })
                }}>

                    <Image
                        source={close}
                        style={styles.closeBtn}
                    />
                </Pressable>}
            </View>
        </View>
    );

};


export default RowItem;
