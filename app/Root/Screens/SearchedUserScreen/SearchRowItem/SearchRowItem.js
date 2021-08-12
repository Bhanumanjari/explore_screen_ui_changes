import React from 'react';
import { Image, Pressable, ImageBackground, View } from 'react-native';
import styles from './SearchRowItemStyle';
import { newHello, user_profile, usericon, camera, phone, award, close } from '../../../../assets';
import { TextView } from 'app/Component';
import { PixcelWidth } from 'app/Utils';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Text } from 'native-base';
import FastImage from 'react-native-fast-image';

const RowItem = ({ item, index, onItemPress }) => {
    const fullName = item.name === "" ? item?.username?.charAt(0).toUpperCase() : item.name
    return (
        <Pressable onPress={() => onItemPress(item, index)} style={styles.user}>
            {item.profileImage?.thumbnail ? <FastImage
                source={{
                    uri: item.profileImage.thumbnail
                }}
                style={styles.profileImg}
            /> :
                <View
                    style={styles.profileImg}
                >
                    <TextView style={styles.firstCharTxt}>{item?.username?.charAt(0).toUpperCase() ?? 'H'}</TextView>
                </View>
            }
            <View style={styles.userDetailsCont}>
                <TextView style={styles.userTitleTxt}>{fullName}</TextView>
                <TextView style={styles.userSubTxt}>{"@" + item.username}</TextView>
            </View>

        </Pressable>
    );

};


export default RowItem;
