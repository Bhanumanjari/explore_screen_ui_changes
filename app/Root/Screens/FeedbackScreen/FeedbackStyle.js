import { StyleSheet } from "react-native";
import { color, font } from "../../../Theme";
import { PixcelWidth } from "../../../Utils";
import commonStyle from './../../../CommonStyle'

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.primary_color,
        flex: 1
    },
    header: {
        flexDirection: 'row',
        backgroundColor: color.primary_color,
        borderBottomColor: color.primary_color,
    },
    titleTxt: {
        alignSelf: 'center',
        fontSize: PixcelWidth(22),
        fontFamily: font.MontserratBold,
        color: color.txt_white,
    },
    feedbackInput: {
        height: 100,
        width: "90%",
        fontFamily: font.MontserratRegular,
        color: color.txt_white,
        borderColor: "#ffffff50",
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'center',
        textAlignVertical: "top",
        padding: 10,
        marginTop: 40
    },
    sendBtn: {
        alignSelf: 'center',
        width:"50%",
        maxWidth:200,
        backgroundColor: color.btnPrimary_color,
        marginHorizontal: PixcelWidth(15),
        borderRadius: 20,
        borderWidth: 2,
        borderColor: color.btnPrimary_color,
        marginTop:20,

        ...commonStyle.shadow,
        marginVertical: 2,
        shadowColor: 'rgba(0,0,0,0.2)',
    },
    sendBtnTxt: {
        fontSize: PixcelWidth(15),
        fontWeight: '600',
        color: color.txt_white,
        paddingVertical: 10,
        textAlign: 'center',
    }
})

export default styles