import { FlatList } from "react-native";
import React from 'react'
import { SqaureLoader } from "./HomeLoaders";
import { deviceWidth, PixcelWidth } from "../Utils";
import ContentLoader from "rn-content-loader";
import { Circle, Rect } from "react-native-svg";
import { color } from "../Theme";
const rawData = [1, 2, 3, 1, 2, 3, 1, 2, 3]

export function MyHellosLoader() {
    return <FlatList
        data={rawData}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        renderItem={() => <SqaureLoader height={PixcelWidth(270)} width={(deviceWidth - 60) / 2} />}
    />
}

export function MyHellosDetailsLoader({ height, width }) {
    return (
        <>
            <ContentLoader width={width} height={height}>
                <Circle x={deviceWidth - 80} y={height - 80} cx="30" cy="30" r="30" />
                <Circle x={deviceWidth - 80} y={height - 160} cx="30" cy="30" r="30" />
                <Rect x="20" y={height - 60} rx="4" ry="4" width="100" height="13" />
                <Rect x="20" y={height - 40} rx="4" ry="4" width="50" height="8" />
            </ContentLoader>
        </>
    )
}

export function MyFacesLoader() {
    return <FlatList
        data={rawData}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        renderItem={() => <FaceCircleItem radius={PixcelWidth(30)} />}
    />
}

function FaceCircleItem({ radius }) {
    return <ContentLoader
        width={radius * 2 + 20}
        primaryColor={color.shimmer_effect_color}
        secondaryColor={color.secondary_color}>
        <Circle
            x={20}
            y={20}
            cx={radius}
            cy={radius}
            r={radius}

        />
    </ContentLoader>
}