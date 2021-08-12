import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import styles from './SearchRowItemStyle';
import {smily} from 'app/assets';
import {TextView} from 'app/Component';

const RowItem = props => {


    const {item} = props;
    return (
        <TouchableOpacity style={styles.categoryCont}>
            <View style={styles.cateImgCont}>
                    <Image
                        source={smily}
                        style={styles.cateImg}
                    />
            </View>
            <TextView numberOfLines={1} style={styles.cateTxt}>Comedy</TextView>
        </TouchableOpacity>
    );

};


export default RowItem;
