import React from "react"
import { StyleSheet, View } from "react-native"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"
import { TextView } from "."
import { color, font } from "../Theme"

function HeaderTitle({title}){
    return (
        <View style={styles.container}>
            <TextView style={styles.titleTxt}>{title}</TextView>
        </View>
    )
}

export default HeaderTitle

const styles = StyleSheet.create({
    container : {
        paddingHorizontal: 20
    },
    titleTxt: {
        alignSelf: 'center',
        fontSize: wp('5.2%'),
        fontFamily: font.MontserratBold,
        color: color.txt_white,
    }
})