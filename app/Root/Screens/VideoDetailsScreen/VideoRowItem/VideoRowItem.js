import React from 'react';
import {Image, ImageBackground, View} from 'react-native';
import styles from './VideoRowItemStyle';
import {user_profile} from 'app/assets'
import {TextView} from 'app/Component';
import {PixcelWidth} from 'app/Utils';
import LinearGradient from 'react-native-linear-gradient';
import {Button, Text} from 'native-base';

const RowItem = props => {


    const {item} = props;
    return (
        <View style={styles.addImgCont}>
            <Image
                source={user_profile}
                style={styles.userImg}
            />
        </View>
    );

};


export default RowItem;
