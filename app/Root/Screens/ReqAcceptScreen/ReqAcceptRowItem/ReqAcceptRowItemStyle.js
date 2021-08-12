import { StyleSheet } from 'react-native';
import { color, font } from 'app/Theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { PixcelWidth } from '../../../.././Utils';
const styles = StyleSheet.create({
    mainLayout: {
        backgroundColor: color.primary_color,
        paddingHorizontal: 20,
        //alignItems:'center'
    },
    titleTxt: {
        marginLeft: PixcelWidth(20),
        fontSize: PixcelWidth(22),
        fontFamily: font.MontserratBold,
        color: color.txt_white,

    },
    user: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        // marginTop: PixcelWidth(25),
        borderColor: '#FFFFFF10',
        borderBottomWidth: 1,
        paddingVertical: wp("5%"),
        flex: 1
    },
    userDetailsCont: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
        // marginBottom: PixcelWidth(25),
    },
    userImg: {
        height: PixcelWidth(56),
        width: PixcelWidth(56),
        borderRadius: PixcelWidth(28),
        borderColor: '#FFF',
        borderWidth: 1,
        backgroundColor: color.primary_color_dark,
        justifyContent: 'center',
        alignItems: 'center'
    },
    userTxt: {
        fontSize: PixcelWidth(15),
        marginLeft: PixcelWidth(20),
        fontFamily: font.MontserratRegular,
        color: color.txt_white,
    },
    reqCont: {
        flexDirection: 'row',
        alignItems: 'center',
        // flex: 1,
        // marginBottom: PixcelWidth(25),
    },
    acceptBtn: {
        paddingHorizontal: PixcelWidth(28),
        borderWidth: 1,
        borderColor: '#FFF',
        backgroundColor: color.primary_color,
        marginHorizontal: 10
    },
    acceptBtnTxt: {
        fontSize: PixcelWidth(15),
        color: color.txt_white,
        fontFamily: font.MontserratRegular
    },
    closeBtn: {
        // marginLeft: PixcelWidth(12),
        height: PixcelWidth(33),
        width: PixcelWidth(33),
    },
    acceptBtnBlue: {
        paddingHorizontal: PixcelWidth(28),
        backgroundColor: color.btnPrimary_color,
        marginHorizontal: 10
    },
    firstCharTxt: {
        fontFamily: font.MontserratBold,
        fontSize: PixcelWidth(25),
        color: color.txt_white,
    },
});
export default styles;
