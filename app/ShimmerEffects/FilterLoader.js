import React from 'react';
import { View } from "react-native-animatable";
import ContentLoader from "rn-content-loader";
import Svg, { Circle, Rect, Ellipse } from 'react-native-svg';
import { color } from '../Theme';
import { deviceWidth, PixcelWidth } from '../Utils';

const numOfItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export function SearchTagLoader() {
    return (
        <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginVertical: PixcelWidth(10)
        }}>
            {
                numOfItems.map((_, index) => {
                    return (
                        <TagLoader key={index} />
                    )
                })
            }
        </View>
    )

}

export function TagLoader({
    height = 40,
    width = (deviceWidth - 80) / 4
}) {
    return (
        <ContentLoader
            width={width + 10}
            height={height + 10}
            primaryColor={color.shimmer_effect_color}
            secondaryColor={color.secondary_color}>
            <Rect rx={'20'} ry={'20'} x={10} y={10} height={height} width={width} />
        </ContentLoader>
    )
}