import React from "react";
import {StyleSheet} from "react-native";
import {color} from "../Theme";

const styles = StyleSheet.create({
        shadow: {
            shadowRadius: 1,
            shadowOpacity: 0.5,
            shadowColor: "#919191",
            shadowOffset: {
                width: 0,
                height: 1
            },
            elevation: 2
        },
        lines: {
            width: '100%',
            height: 0.5,
            backgroundColor: color._e8e8e8
        },
    }
);

export default styles;
