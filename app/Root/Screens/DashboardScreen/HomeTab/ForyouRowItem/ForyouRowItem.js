import React from 'react';
import { Image, ImageBackground, Pressable, View } from 'react-native';
import styles from './ForyouRowItemStyle';
import { newHello } from 'app/assets';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'

const RowItem = ({ item, onVideoSelect }) => {
    const navigation = useNavigation()
    return (
        <Pressable onPress={() => {
            navigation.navigate('VideoDetailsScreen', { ...item })
            
        }}>

            <View style={{ flex: 1, borderRadius: 15 }}>
                <FastImage style={styles.flatlistImg}
                    source={{
                        uri:item.video?.thumbnail
                    }}
                    >
                </FastImage>

            </View>

        </Pressable>
    );

};


export default RowItem;
