import { useNavigation, StackActions } from "@react-navigation/native";

import React from "react";
import { Pressable } from "react-native";
import FastImage from "react-native-fast-image";
import { backArrow } from "../assets";
import { PixcelWidth } from "../Utils";
function BackButton({ onBackPress }) {
    const navigation = useNavigation()
    return (
        <>
            <Pressable
                style={{
                    paddingVertical: 7,
                }}
                onPress={() => {
                    if (onBackPress) {
                        onBackPress()
                    } else {
                        //navigation.goBack()
                        navigation.dispatch(StackActions.pop(1)) ;
                    }
                }}>
                <FastImage
                    source={backArrow}
                    style={{
                        height: 20,
                        width: 12,
                        marginHorizontal: PixcelWidth(20),
                    }}
                />
            </Pressable>
        </>
    )
}

export default BackButton