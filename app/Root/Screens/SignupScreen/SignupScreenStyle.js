import { StyleSheet } from 'react-native';
import { color, font } from 'app/Theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { PixcelHeight, PixcelWidth } from '../../../Utils';

const styles = StyleSheet.create({

    container: {
        backgroundColor: color.primary_color,
        flex: 1
    },
    mainLayout: {
        backgroundColor: color.primary_color,
        flex: 1,
        paddingHorizontal: 20,
    },
    titleTxt: {
        marginLeft: PixcelWidth(37),
        fontSize: PixcelWidth(22),
        fontFamily: font.MontserratBold,
        //letterSpacing: 2,
        color: color.txt_white,
        marginTop: PixcelHeight(66),
    },
    line2: {
        flex: 3,
        marginTop: 15,
        borderWidth: 1,
        //width:'100%',
        borderColor: color.txt_white,
    },
    line: {
        flex: 1,
        marginTop: PixcelWidth(15),
        borderWidth: 1,
        //width:'100%',
        borderColor: color.txt_white,
    },
    bottomCont: {
        marginTop: PixcelWidth(20),
        justifyContent: 'center',
        alignItems: 'center',
    },
    subTxt: {
        marginTop: 15,
        fontFamily: font.MontserratRegular,
        color: color.txt_white,
        fontSize: 15,
    },
    awardImg: {
        height: 22,
        width: 22,
        margin: 10,
        marginLeft: 20,
    },
    inputCont: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    inputTxtCont: {
        height: PixcelWidth(55),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3E464A',
        borderRadius: 30,

    },
    inputTxt: {
        flex: 1,
        margin: 5,
        fontFamily: font.MontserratRegular,
        fontSize: 16,
        color: '#FFF'
    },
    hintTxt: {
        marginTop: 15,
        color: '#E8505B',
        fontSize: 15,
        fontFamily: font.MontserratRegular,
    },
    acceptBtn: {
        paddingHorizontal: PixcelWidth(10),
        marginTop: 25,
        borderRadius: 25,
        backgroundColor: color.btnPrimary_color,
    },
    acceptBtnTxt: {
        marginVertical: 14,
        fontSize: 12,
        //letterSpacing: 2,
        fontFamily: font.MontserratSemibold,
        marginHorizontal: 20,
        color: color.txt_white,
    },
    users: {
        height: PixcelHeight(520),
        width: PixcelHeight(520),
        alignSelf: 'center',
        marginTop: PixcelWidth(50),
    },
    userNameLoader: {
        marginRight: PixcelWidth(20)
    }

});
export default styles;
