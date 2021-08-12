import {StyleSheet} from "react-native";

import {color, font} from 'app/Theme';
import {PixcelWidth} from '../../Utils';

const styles = StyleSheet.create({
    headerStyle: {
        flexShrink:0,
        backgroundColor: color._018CCA,
    },
    headerBody: {
        alignItems: "center",
        flex: 1,
        color:'white'
    },
    headerLeft: {
        flex: 1
    },
    headerRight: {
        flex: 1,
        flexDirection: "row"
    },
    headerLeftSide: {
        width: 35,
        height: 35,
        tintColor: 'white',
        resizeMode: "contain",
    },
    headerRightSide: {
        width: 24,
        height: 24,
        tintColor: 'white',
        resizeMode: "contain"
    },
    headerBodyImage: {
        width: 100,
        height: 35,
        resizeMode: "contain"
    },
    headerBodyContent: {
        fontSize: 18,
        color: 'white',
        fontWeight: "bold"
    },
    nextButtonText: {
        fontSize: 18,
        color: color.black,
        fontWeight: "bold"
    },
    leftButton:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftButtonWhite:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    prevButtonText: {
        fontSize: 18,
        color: color.black,
    },isTimestyle:{
        padding: 5,
        flexDirection: 'row',
        backgroundColor: color._EC6BAE,
        alignItems: 'center',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        marginRight:-10
    },
    backArrowImg:{
        height: 18,
        width: 10.5,
        marginRight:PixcelWidth(20),

    }, titleTxt:{

        fontSize: PixcelWidth(22),
        fontFamily:font.MontserratBold,
        color: color.txt_white,

    },
});

export default styles;
