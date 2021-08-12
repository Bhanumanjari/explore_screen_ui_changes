import React from "react"
import { View, StyleSheet, Pressable } from "react-native"
import FastImage from "react-native-fast-image"
import LinearGradient from "react-native-linear-gradient"
import { heart, shareIcon, req_user } from "../../../assets"
import { TextView } from "../../../Component"
import { color } from "../../../Theme"
import { deviceWidth, PixcelWidth } from "../../../Utils"

function HellosListItem({ item, index, onItemPress, onItemLongPress = () => {} }) {
    return (
        <Pressable onPress={() => {
            onItemPress(item, index)
        }}
        onLongPress={() => {
            onItemLongPress(item, index)
        }}
        >
            <FastImage
                style={styles.coverImage}
                source={{
                    uri: item.video.thumbnail
                }}
            >
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    colors={['#00000000', '#00000000', '#000000']}
                    style={{ flex: 1 }}
                >
                    <View style={styles.counterContainer}>
                        <View style={styles.subCounter}>
                            <FastImage
                                style={styles.heartImg}
                                tintColor={color.txt_white}
                                source={heart}
                            />
                            <TextView style={styles.counterValue}>{item.liked.length}</TextView>
                        </View>
                        <View style={styles.subCounter}>
                            <FastImage
                                style={styles.heartImg}
                                tintColor={color.txt_white}
                                source={shareIcon}
                            />
                            <TextView style={styles.counterValue}>{item.shared.length}</TextView>
                        </View>
                    </View>
                </LinearGradient>
            </FastImage>
        </Pressable>
    )
}

export default HellosListItem

const styles = StyleSheet.create({
    coverImage: {
        overflow: 'hidden',
        borderRadius: 15,
        height: PixcelWidth(270),
        width: (deviceWidth - 47) / 2,
        margin: 8,
    },
    heartImg: {
        height: PixcelWidth(14),
        width: PixcelWidth(16)
    },
    subCounter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    counterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 15,
        right: 0,
        left: 0,
    },
    counterValue: {
        fontSize: PixcelWidth(13),
        color: color.txt_white,
        marginHorizontal: 10,
    }
})