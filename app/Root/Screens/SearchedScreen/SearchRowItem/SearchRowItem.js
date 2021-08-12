import React from 'react';
import { Image, ImageBackground, Pressable, View } from 'react-native';
import styles from './SearchRowItemStyle';
import {
  star,
  heart,
  heartFill,
  starFill
} from '../../../../assets';
import { TextView } from 'app/Component';
import { PixcelWidth } from 'app/Utils';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Text } from 'native-base';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { SvgXml } from 'react-native-svg';
import { startSvg } from '../../../../assets/Svg/svgFiles';
import { findIndex } from 'lodash';
import { color } from '../../../../Theme';

const RowItem = ({ item, index, onPress = () => { } }) => {
  const categoryList = useSelector(state => state.home.categoryList)
  const { _id } = useSelector(state => state.login.data)
  const titles = item.title.split('-');
  const getCategoryNameById = (id) => {
    let obj = {}
    for (const category of categoryList) {
      if (category._id === id) {
        obj = category
        break;
      }
    }
    return obj
  }

  return (
    <Pressable
      onPress={() => {
        onPress(item, index);
      }}
      style={styles.user}>
      <FastImage
        source={{
          uri: item.video.thumbnail,
        }}
        style={styles.userImg}
      />
      <View style={styles.detailsCont}>
        <View>
          <TextView numberOfLines={1} style={styles.titleTxt}>
            {titles[0]?.trim() || ''}
          </TextView>
          <TextView numberOfLines={1} style={styles.subTitleTxt}>
            {titles[1]?.trim() || ''}
          </TextView>
          <Button rounded success style={styles.acceptBtn}>
            <TextView style={styles.acceptBtnTxt}>
              {getCategoryNameById(item.categoryId)?.name || ''}
            </TextView>
          </Button>
        </View>
        <View style={styles.rateCont}>
          {
            findIndex(item.liked, { userId: _id }) > -1 ? (
              <FastImage
                style={styles.heartImg}
                source={heartFill}
                tintColor={color.heart_color}
                resizeMode={FastImage.resizeMode.contain}
              />
            ) : (
                <FastImage
                  style={styles.heartImg}
                  source={heart}
                  tintColor={color.txt_white}
                  resizeMode={FastImage.resizeMode.contain}
                />
              )
          }
          <TextView style={styles.starImgTxt}>{item.liked.length}</TextView>
          {
            findIndex(item.saved, { userId: _id }) > -1 ? (
              <FastImage
                style={styles.starImg}
                source={starFill}
                tintColor={color.start_color}
                resizeMode={FastImage.resizeMode.contain}
              />
            ) : (
                <FastImage
                  style={styles.starImg}
                  source={star}
                  tintColor={color.txt_white}
                  resizeMode={FastImage.resizeMode.contain}
                />
              )
          }
          <TextView style={styles.heartImgTxt}>{item.saved.length}</TextView>
        </View>
      </View>
    </Pressable>
  );
};

export default RowItem;
