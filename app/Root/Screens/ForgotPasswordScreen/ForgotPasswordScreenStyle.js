import { StyleSheet } from "react-native";
import { color, font } from 'app/Theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontSize, PixcelWidth } from '../../../Utils';

const styles = StyleSheet.create({

    mainLayout: {
        backgroundColor: color.primary_color,
        flex: 1,
        paddingHorizontal: 20,
    },
    mainHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '10%',
    },
    backArrowImg: {
        height: 18,
        width: 10.5,
    },
    titleTxt: {
        marginLeft: PixcelWidth(20),
        fontSize: 16,
        fontFamily: font.MontserratBold,
        //letterSpacing: 2,
        color: color.txt_white,
    },
    line: {
        marginTop: 15,
        borderWidth: 1,
        //width:'100%',
        borderColor: color.txt_white,
    },
    bottomCont: {
        //marginTop:500,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subTxt: {
        marginTop: 15,
        color: color.txt_white,
        fontSize: FontSize.Regular,
        fontFamily: font.MontserratRegular
    },
    subTxt1: {
        marginTop: 18,
        color: "#FFFFFF50",
        fontSize: FontSize.Small,
    },
    awardImg: {
        height: 22,
        width: 22,
        margin: 10,
        marginLeft: 25,
    },
    inputCont: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputTxtCont: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3E464A',
        borderRadius: 30,
        //paddingVertical: 15,
        marginHorizontal: 25,
    },
    inputTxt: {
        flex: 1,
        margin: 5,
        //backgroundColor:'#FFF',
        padding: 12,
        fontSize: 16,
        fontFamily: font.MontserratRegular,
        color: color.txt_white
    },
    hintTxt: {
        marginTop: 15,
        color: 'red',
        fontSize: 15,
    },
    acceptBtn: {
        marginTop: '10%',
        borderRadius: 30,
        backgroundColor: color.btnPrimary_color,
        margin: 3,

        elevation: 3,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 0.8,
        shadowOffset: { height: 0, width: 0 }
    },
    acceptBtnTxt: {
        //margin:30,
        marginVertical: 18,
        //letterSpacing: 2,
        fontSize: 15,
        fontFamily: font.MontserratSemibold,
        marginHorizontal: 30,
        color: color.txt_white
    },
    resendCodeTxt: {
        marginTop: 35,
        textDecorationLine: 'underline',
        color: color.txt_white,
        fontSize: 15,
    },

});
export default styles;
