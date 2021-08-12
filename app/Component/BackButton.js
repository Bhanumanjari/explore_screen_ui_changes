import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable } from "react-native";
import FastImage from "react-native-fast-image";
import { backArrow } from "../assets";
import { PixcelWidth } from "../Utils";
function BackButton({ onBackPress }) {
    const navigation = useNavigation()
    return (
        <>
            <Pressable onPress={() => {
                if (onBackPress) {
                    onBackPress()
                } else {
                    navigation.goBack()
                }
            }}>
                <FastImage
                    source={backArrow}
                    style={{
                        height: 18,
                        width: 10.5,
                        marginHorizontal: PixcelWidth(20),
                    }}
                />
            </Pressable>
        </>
    )
}

export default BackButton