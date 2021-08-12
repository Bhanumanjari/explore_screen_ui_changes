import React from 'react';
import { FlatList, Dimensions, View } from 'react-native';
import { Circle, Rect } from 'react-native-svg';
import ContentLoader from 'rn-content-loader';
import { deviceWidth, PixcelWidth } from '../Utils';
import { SqaureLoader } from './HomeLoaders';
const wp = Dimensions.get('window').width;
const numOfItems = [1, 2, 3, 4, 5];

export function LikeSaveVideoLoader() {
  return (
    <FlatList
      data={numOfItems}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      renderItem={() => (
        <SqaureLoader height={PixcelWidth(168)} width={deviceWidth - 40} />
      )}
    />
  );
}

export function UserProfileListLoader() {
  return (
    <FlatList
      data={numOfItems.concat(numOfItems)}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      renderItem={() => (
        <SqaureLoader height={PixcelWidth(80)} width={deviceWidth - 40} />
      )}
    />
  );
}

export function UserProfileDetailLoader() {
  return (
    <View style={{
      alignSelf: 'center',
    }}>
      <ContentLoader width={deviceWidth}
        height={200}>
        <Circle
          r={PixcelWidth(50)}
          cx={(deviceWidth / 2) - PixcelWidth(0)}
          cy={PixcelWidth(100)}
        />
        <Rect rx={20} ry={20} height={20} width={100} />
        <Rect rx={20} ry={20} height={20} width={100} />
      </ContentLoader>
    </View>
  )
}

export function PreferenceLoader() {
  return <FlatList
    scrollEnabled={false}
    numColumns={2}
    data={numOfItems.concat(numOfItems).concat(numOfItems)}
    showsVerticalScrollIndicator={false}
    renderItem={() => <SqaureLoader height={wp / 4.7} width={wp / 2 - 30} />}
  />
}

export function LanguageLoader() {
  return <FlatList
    scrollEnabled={false}
    numColumns={2}
    data={numOfItems.concat(numOfItems).concat(numOfItems)}
    showsVerticalScrollIndicator={false}
    renderItem={() => <SqaureLoader height={wp / 4.7} width={wp / 2 - 30} />}
  />
}