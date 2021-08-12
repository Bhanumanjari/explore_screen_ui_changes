import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { color, font } from "../../../Theme";
import { PixcelWidth } from "../../../Utils";

const wp = Dimensions.get('window').width;

const styles = StyleSheet.create({
    mainLayout: {
        backgroundColor: color.primary_color,
        flex: 1,
    },
    titleTxt: {
        paddingHorizontal: 20,
        marginTop: 15,
        fontSize: widthPercentageToDP("4.5%"),
        color: color.txt_white,
        textAlign: 'center'
    },
    flatlistImgCont: {
        // flex: 1,
        margin: 5,
        width: (wp / 2) - 25,
        height: wp / 4.5,
        // alignItems: 'center',
        padding: 12,
        paddingLeft: 15,
        justifyContent: 'center',
        borderRadius: 15,
        borderColor: color.txt_white,
        borderWidth: 1.5
    },
    flatlistCont: {
        backgroundColor: color.primary_color,
        paddingHorizontal: 15,
        paddingTop: PixcelWidth(10)
    },
    languageTxt: {
        fontFamily: font.MontserratBold,
        color: color.txt_white,
        fontSize: widthPercentageToDP('5%')
    },
    regionalTxt: {
        color: color.txt_white,
        fontSize: widthPercentageToDP('4.5%'),
        marginTop: 5
    },
    checkImageStyle: {
        position: 'absolute',
        top: 7,
        right: 7
    },
    footerCont: {
        height: wp / 6,
        alignItems: 'center',
        backgroundColor: '#20292D',
        borderTopWidth: 1,
        borderTopColor: 'grey',
        paddingHorizontal: 25,
    },
    bottom: {
        width: '100%',
    },
    bottomCont: {
        backgroundColor: '#20292D',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backBtn: {
        //marginLeft:14,
    },
    backBtnTxt: {
        color: color.txt_white,
        fontSize: 15,
        fontFamily: font.MontserratSemibold,
    },
    doneBtn: {
        borderRadius: 25,
        backgroundColor: color.btnPrimary_color,
    },
    doneBtnTxt: {
        marginVertical: 12,
        marginHorizontal: 35,
        fontSize: 15,
        color: color.txt_white,
        fontFamily: font.MontserratSemibold,
    },
})

export default styles