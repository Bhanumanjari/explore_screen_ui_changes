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
        marginTop: '10%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    backArrowImg: {
        height: 18,
        width: 10.5,
    },
    titleTxt: {
        marginLeft: PixcelWidth(20),
        fontSize: 16,
        fontFamily: font.MontserratBold,
        letterSpacing: 2,
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
        fontSize: 15,
        fontFamily: font.MontserratRegular
    },
    awardImg: {
        height: 22,
        width: 22,
        margin: 10,
        marginLeft: 20,
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
        padding: 10,
        fontSize: FontSize.Large,
        textAlign: 'center',
        color: color.txt_white
        //color:'#FFF'
    },
    hintTxt: {
        marginTop: 15,
        color: 'red',
        fontSize: 15,
    },
    acceptBtn: {
        marginTop: '10%',
        borderRadius: 30,
        backgroundColor: color.btnPrimary_color
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
        fontFamily: font.MontserratRegular,
        // textDecorationLine: 'underline',
        color: color.txt_white,
        fontSize: 15,
    },

});
export default styles;
