import React from 'react';
import { View, FlatList } from "react-native";
import ContentLoader from "rn-content-loader";
import Svg, { Rect } from 'react-native-svg';
import { color } from '../Theme';
import { deviceWidth, PixcelHeight, PixcelWidth } from '../Utils';
const rawData = [[1, 2, 3], [[1, 2], [3]], [1, 2, 3]]
export function ExploreListLoader() {
    return <FlatList
        data={rawData}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        renderItem={(item) => <ExploreList {...item} />}
    />
}

function ExploreList({ item, index }) {
    if (index % 2 === 0) {
        return (
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                flex: 1,
            }}>
                {
                    item.map((subItem, i) => {
                        return (
                            <ExploreListItem />
                        )
                    })
                }
            </View>
        )
    } else {
        return (
            <View style={{
                flexDirection: 'row'
            }}>
                {
                    item.map((data1, i) => {
                        return <View key={i}>
                            {
                                data1.map((subItem, i1) => {
                                    return (
                                        <ExploreListItem scale={i === 1} />
                                    )
                                })
                            }
                        </View>
                    })
                }
            </View>
        )
    }
}

function ExploreListItem({
    scale = false
}) {
    const itemWidth = ((deviceWidth - PixcelWidth(24)) / (3 / (scale ? 2 : 1))) - 12
    const itemHeight = scale ? 400 + PixcelHeight(80) : 200
    return (
        <ContentLoader
            width={itemWidth + 10}
            height={itemHeight + 10}
            primaryColor={color.shimmer_effect_color}
            secondaryColor={color.secondary_color}>
            <Rect rx={'20'} ry={'20'} x={10} y={10} height={itemHeight} width={itemWidth} />
        </ContentLoader>
    )
}