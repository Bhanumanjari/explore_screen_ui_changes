import React from 'react';
import { ImageBackground, StyleSheet, View, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { req_user, swap } from '../assets';
import { color } from '../Theme';
import { PixcelWidth } from '../Utils';

export const SwapFace = ({ containerStyle = {} }) => {
  const faces = useSelector((state) => state.login.data.faces);
  let firstFace = '';
  if (faces && faces.length > 0) {
    firstFace = faces[0].original || faces[0].uri;
  }
  // console.log(firstFace);
  return (
    <View style={{ ...containerStyle }}>
      <FastImage
        style={style.userImage}
        source={{
          uri: firstFace,
        }}
      />
      <View style={style.swapMainContainer}>
        <View style={style.swapContainer}>
          <Image style={style.swapImage} source={swap} />
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  userImage: {
    height: PixcelWidth(60),
    width: PixcelWidth(60),
    borderRadius: PixcelWidth(30),
    justifyContent: 'center',
    backgroundColor: color.primary_color
  },
  swapContainer: {
    backgroundColor: color.txt_white,
    height: PixcelWidth(24),
    width: PixcelWidth(24),
    borderRadius: PixcelWidth(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  swapMainContainer: {
    position: 'absolute',
    left: PixcelWidth(-11),
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  swapImage: {
    height: PixcelWidth(16),
    width: PixcelWidth(16),
  },
});
