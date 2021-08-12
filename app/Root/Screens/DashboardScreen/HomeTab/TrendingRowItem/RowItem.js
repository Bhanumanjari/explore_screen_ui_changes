import React from 'react';
import { Image, ImageBackground, Pressable, View } from 'react-native';
import styles from './RowItemStyle';
import { clock, lock, movie, newHello } from 'app/assets';
import { TextView } from 'app/Component';
import { PixcelWidth } from 'app/Utils';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Text } from 'native-base';
import { SwapFace } from '../../../../../Component';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const RowItem = (props) => {
  const { item } = props;
  const navigation = useNavigation();
  const titles = item.title.split('-');
  // console.log(titles);
  return (
    <React.Fragment>
      <Pressable
        onPress={() => navigation.navigate('VideoDetailsScreen', { ...item })}
        style={{ flex: 1, borderRadius: 15 }}>
        <FastImage
          style={styles.flatlistImg}
          source={{
            uri: item.video?.thumbnail,
          }}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['#00000000', '#00000000', '#000000']}
            style={{ flex: 1 }}>
            <SwapFace
              containerStyle={{ alignSelf: 'flex-end', margin: PixcelWidth(10) }}
            />
            <TextView style={styles.flatlistImgTxt}>
              {`${(titles[0] && titles[0]?.trim()) || ''}` + '\n'}
            </TextView>
            <TextView style={styles.subText}>
              {(titles[1] && titles[1]?.trim()) || ''}
            </TextView>
            {/* <Image source={lock} style={styles.centerImage} /> */}
          </LinearGradient>
        </FastImage>
      </Pressable>
    </React.Fragment>
  );
};

export default RowItem;
