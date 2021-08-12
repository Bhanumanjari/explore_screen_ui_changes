import React from 'react';
import { Image, ImageBackground, Pressable, View } from 'react-native';
import styles from './ReqRowItemStyle';
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
import { find, findIndex } from 'lodash';
import { SvgXml } from 'react-native-svg';
import { heartSvg, startSvg } from '../../../../assets/Svg/svgFiles';
import { color } from '../../../../Theme';

const RowItem = ({ item, index, onPress, isNeedToShowRequest = false, isNeedToShowRequestStatus = false }) => {
  const titles = item.title.split('-');
  const { _id } = useSelector(state => state.login.data)
  let requestStatus = {}
  if (isNeedToShowRequestStatus && item.requested)
    requestStatus = find(item.requested, (request) => request.userId._id === _id)

  const getStatusColor = (status) => {
    let color = ''
    switch (status) {
      case "APPROVED":
        color = 'green'
        break;
      case "PENDING":
        color = 'orange'
        break;
      case "REJECTED":
        color = 'red'
        break;
      default:
        break;
    }
    return color
  }

  return (
    <Pressable
      style={styles.user}
      onPress={() => {
        onPress(item, index, requestStatus);
      }}>
      <FastImage
        source={{
          uri: item.video?.thumbnail,
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
          {isNeedToShowRequest && <View style={styles.numberCont}>
            <TextView style={styles.numberContTxt}>{item.requested.length}</TextView>
            {!item.isRequestViewed && <View style={styles.unseenDot} />}
          </View>}
          {isNeedToShowRequestStatus && <View style={styles.statusContainer}>
            <TextView style={[styles.statusText, {
              color: getStatusColor(requestStatus.status)
            }]}>{requestStatus.status}</TextView>
          </View>}
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
          {/* <Image source={star} style={styles.starImg} /> */}
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
