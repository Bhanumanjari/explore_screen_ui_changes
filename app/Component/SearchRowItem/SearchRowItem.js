import React from 'react';
import { Image, Pressable, View } from 'react-native';
import styles from './SearchRowItemStyle';
import { smily } from 'app/assets';
import { TextView } from 'app/Component';
import FastImage from 'react-native-fast-image';
import { color } from '../../Theme';

const RowItem = ({ item, index, onCategorySelect = () => { }, selectedCategoryIndex = -1 }) => {
  const isSelected = selectedCategoryIndex === index
  return (
    <Pressable
      onPress={() => {
        onCategorySelect(item, index);
      }}
      style={{
        ...styles.categoryCont, borderWidth: isSelected ? 1 : undefined,
        borderColor: isSelected ? color.txt_white : undefined
      }}>
      <View style={styles.cateImgCont}>
        <FastImage
          source={{
            uri: item.icon,
          }}
          style={styles.cateImg}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <TextView numberOfLines={1} style={styles.cateTxt}>
        {item.name}
      </TextView>
    </Pressable>
  );
};

export default RowItem;
