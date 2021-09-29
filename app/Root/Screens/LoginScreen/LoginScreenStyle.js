import { Dimensions, StyleSheet } from 'react-native';
import { color, font } from 'app/Theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { PixcelWidth } from '../../../Utils';

const styles = StyleSheet.create({
    mainLayout: {
        backgroundColor: color.primary_color,
        flex: 1,
        //paddingHorizontal:20,
    },
    titleTxt: {
        fontSize: PixcelWidth(30),
        marginTop: '10%',
        marginLeft: 10,
        //marginLeft: 20,
        fontFamily: font.MontserratBold,
        //letterSpacing:2,
        alignItems:'center',
        justifyContent:'center',
        color: color.txt_white,
        //paddingHorizontal:20,
    },
    subTxt: {
        marginTop: '15%',
        marginLeft: 20,
        color: color.txt_white,
        fontSize: PixcelWidth(22),
        fontFamily: font.MontserratBold,
        //letterSpacing:2,
    },
    infoImg: {
        alignSelf: 'center',
        //marginTop:'10%',
        height: 0.5*Dimensions.get('window').width,
        width: 0.5*Dimensions.get('window').width,
        //height: PixcelWidth(200),
        //width: PixcelWidth(200),
    },
    line: {
        borderWidth: 0.5,
        //width:'100%',
        borderColor: color.txt_white,
    },
    inputTxtCont: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3E464A',
        borderRadius: 30,
        marginHorizontal: 25,
    },
    inputTxt: {
        flex: 1,
        margin: 5,
        marginLeft: 12,
        fontFamily: font.MontserratRegular,
        //backgroundColor:'#FFF',
        fontSize: 16,
        color: '#FFF',
        padding: 10,
    },
    acceptBtn: {
        marginTop: '10%',
        borderRadius: 25,
        marginHorizontal: '35%',
        backgroundColor: color.btnPrimary_color,
        shadowColor: 'black',
        shadowRadius: 10,
        elevation: 1
    },
    acceptBtnTxt: {
        marginVertical: 14,
        alignSelf: 'center',
        fontSize: 15,
        //letterSpacing: 2,
        fontFamily: font.MontserratSemibold,
        //marginHorizontal:30,
        color: 'white',
    },
    forgotTxt: {
        alignSelf: 'center',
        fontFamily: font.MontserratRegular,
        marginTop: 15,
        fontSize: PixcelWidth(13),
        color: '#FFFFFF50',
    },
    bottom: {

        // bottom: 0,
        // position: 'absolute',
        width: '100%',
        backgroundColor: '#20292D',
        padding: 15,
    },
    bottomCont: {

        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    declineBtn: {
        marginLeft: 14,
    },
    declineBtnTxt: {
        color: color.txt_white,
        fontSize: 15,
        fontFamily: font.MontserratSemibold,
    },
    joinBtn: {
        borderRadius: 25,
        borderWidth: 1,
        width: 0.8*Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#FFF',
    },
    joinBtnTxt: {
        letterSpacing: 2,
        //marginVertical: 12,
        //marginHorizontal: 5,
        padding: 10,
        fontSize: 15,
        fontFamily: font.MontserratSemibold,
        alignItems: 'center',
        justifyContent:'center',
        color: 'white',
        textShadowColor: 'black',
        textShadowRadius: 30
    },
    eyeIcon: {
        height: PixcelWidth(26),
        width: PixcelWidth(26),
        tintColor: color.txt_white,
        marginRight: PixcelWidth(12)
    }
});
export default styles;
