import React from "react"
import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { TextView } from ".";
import { color } from "../Theme";
import { PixcelWidth } from "../Utils";

export function EmptyList({ image = '', message, textStyle = {}, imageStyle = {} }) {
    return (
        <View style={styles.container}>
            {
                !!image && <FastImage
                    style={{ ...styles.imageStyle, ...imageStyle }}
                    source={image}
                    resizeMode={FastImage.resizeMode.contain}
                />
            }
            <TextView style={{ ...styles.messageTxt, ...textStyle }}>{message}</TextView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    messageTxt: {
        color: color.txt_white,
        textAlign: 'center',
        alignSelf: 'center',
        margin: PixcelWidth(20),
    },
    imageStyle: {
        height: hp("23%"),
        width: wp("65%"),
        alignSelf: 'center',
        marginTop: hp("14%"),
    }
})