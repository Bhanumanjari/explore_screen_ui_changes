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
    titleTxt: {
        marginLeft: PixcelWidth(20),
        fontSize: 16,
        fontFamily: font.MontserratBold,
        //letterSpacing: 2,
        color: color.txt_white,

    },
    line2: {
        flex: 1,
        marginTop: 15,
        borderWidth: 1,
        //width:'100%',
        borderColor: color.txt_white,
    },
    line: {
        flex: 3,
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
        color: '#FFFFFF50',
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
        textAlign: 'center',
        flex: 1,
        margin: 5,
        fontFamily: font.MontserratRegular,
        padding: 10,
        fontSize: FontSize.Large,
        color: '#FFF'
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
        marginVertical: 14,
        //letterSpacing: 2,
        fontSize: 15,
        fontFamily: font.MontserratSemibold,
        marginHorizontal: 30,
        color: color.txt_white
    },
    resendCodeTxt: {
        marginTop: 40,
        // textDecorationLine: 'underline',
        color: color.txt_white,
        fontSize: 15,
        fontFamily: font.MontserratRegular
    },

});
export default styles;
