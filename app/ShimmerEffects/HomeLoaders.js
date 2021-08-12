import React from 'react';
import ContentLoader from 'rn-content-loader';
import Svg, {Circle, Rect, Ellipse} from 'react-native-svg';
import {color} from '../Theme';
import {FlatList} from 'react-native';
import {deviceWidth, PixcelWidth} from '../Utils';

const numOfItems = [1, 2, 3, 4, 5];
export function TrendingLoader(props) {
  return (
    <FlatList
      data={numOfItems}
      showsHorizontalScrollIndicator={false}
      horizontal
      scrollEnabled={false}
      renderItem={() => (
        <SqaureLoader height={PixcelWidth(364)} width={PixcelWidth(253)} />
      )}
    />
  );
}

export function ForMeLoader(props) {
  return (
    <FlatList
      data={numOfItems}
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEnabled={false}
      renderItem={() => (
        <SqaureLoader height={PixcelWidth(183)} width={PixcelWidth(127)} />
      )}
    />
  );
}

export function CategoryVideoLoader(props) {
  return (
    <FlatList
      data={numOfItems}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      renderItem={() => (
        <SqaureLoader height={PixcelWidth(400)} width={deviceWidth - 40} />
      )}
    />
  );
}

export function CategoryLoader(props) {
  return (
    <FlatList
      data={numOfItems}
      horizontal={true}
      scrollEnabled={false}
      renderItem={() => (
        <EllipseLoader
          radius={PixcelWidth(42)}
          height={PixcelWidth(137)}
          width={PixcelWidth(84)}
        />
      )}
    />
  );
}

export function SqaureLoader({height = 200, width = 200}) {
  return (
    <ContentLoader
      width={width + 20}
      height={height + 20}
      primaryColor={color.shimmer_effect_color}
      secondaryColor={color.secondary_color}>
      <Rect rx={'10'} ry={'10'} x={20} y={20} height={height} width={width} />
    </ContentLoader>
  );
}

export function EllipseLoader({height = 200, width = 200, radius = 100}) {
  return (
    <ContentLoader
      width={width + 20}
      height={height + 20}
      primaryColor={color.shimmer_effect_color}
      secondaryColor={color.secondary_color}>
      <Rect
        x={'20'}
        y={'20'}
        height={height}
        width={width}
        rx={radius}
        ry={radius}
      />
    </ContentLoader>
  );
}

export function TextLoader({
  height = PixcelWidth(20),
  width = PixcelWidth(deviceWidth / 2),
}) {
  return (
    <ContentLoader
      width={width + 20}
      height={height + 20}
      primaryColor={color.shimmer_effect_color}
      secondaryColor={color.secondary_color}>
      <Rect x={'20'} y={'20'} height={height} width={width} rx={15} ry={15} />
    </ContentLoader>
  );
}
