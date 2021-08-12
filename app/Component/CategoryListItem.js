import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { TextView } from '.';
import { heart, lock, newHello } from '../assets';
import { color, font } from '../Theme';
import { PixcelWidth } from '../Utils';
import { SwapFace } from './SwapFace';

export const CategoryListItem = ({ item, index }) => {
  const navigation = useNavigation();
  const titles = item.title.split('-');
  return (
    <Pressable
      onPress={() => navigation.navigate('VideoDetailsScreen', { ...item })}
      style={{
        flex: 1, borderRadius: 15,
      }}>
      <FastImage
        style={styles.flatlistImg}
        source={{
          uri: item.video?.thumbnail,
        }}
        resizeMode={FastImage.resizeMode.cover}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={['#00000000', '#00000000', '#000000']}
          style={{ flex: 1 }}>
          <SwapFace containerStyle={styles.userSwapContainer} />
          <TextView style={styles.flatlistImgTxt}>
            {`${(titles[0] && titles[0]?.trim()) || ''}` + '\n'}
          </TextView>
          <TextView style={styles.subText}>
            {(titles[1] && titles[1]?.trim()) || ''}
          </TextView>
          {/* <Image
            resizeMode="contain"
            source={heart}
            style={styles.centerImage}
          /> */}
        </LinearGradient>
      </FastImage>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  flatlistImg: {
    overflow: 'hidden',
    borderRadius: 15,
    flex: 1,
    height: PixcelWidth(400),
    // width: PixcelWidth(253),
    margin: 10,
  },
  flatlistCont: {
    paddingVertical: 15,
    backgroundColor: color.primary_color,
    paddingHorizontal: 15,
  },
  flatlistImgTxt: {
    // width: '80%',
    color: color.txt_white,
    fontSize: PixcelWidth(15),
    fontFamily: font.MontserratBold,
    fontWeight: '700',
    position: 'absolute',
    bottom: 10,
    padding: 10,
  },
  subText: {
    // width: '80%',
    color: color.txt_white,
    fontSize: PixcelWidth(12),
    // fontFamily: font.MontserratBold,
    // fontWeight: '700',
    position: 'absolute',
    bottom: 10,
    padding: 10,
  },
  centerImage: {
    height: PixcelWidth(20),
    width: PixcelWidth(20),
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  userSwapContainer: {
    alignSelf: 'flex-end',
    margin: PixcelWidth(10),
  },
});
