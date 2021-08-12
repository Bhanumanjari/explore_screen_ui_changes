import { StyleSheet } from 'react-native';
import { color, font } from 'app/Theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { deviceWidth, PixcelWidth } from '../../../../../Utils';

const styles = StyleSheet.create({
    centerImage: {
        height: PixcelWidth(18),
        width: PixcelWidth(18),
        position: 'absolute',
        right: 20, bottom: 20,
    },
    flatlistImg: {
        overflow: 'hidden',
        borderRadius: 15,
        height: PixcelWidth(270),
        width: (deviceWidth - 40) / 2,
        // width: PixcelWidth(173),
        // alignSelf: 'center',
        margin: 10,
    },
    flatlistCont: {
        paddingVertical: 15,
        backgroundColor: color.primary_color,
        paddingHorizontal: 15,
    },
    titleContainer:{
        width: '80%',
        position: 'absolute',
        bottom: 10,
        paddingHorizontal: 10,
    },
    flatlistImgTxt: {
        // width: '80%',
        color: color.txt_white,
        fontSize: PixcelWidth(15),
        fontFamily: font.MontserratBold,
        fontWeight: '700',
    },
    subText: {
        // width: '80%',
        color: color.txt_white,
        fontSize: PixcelWidth(12),
        fontFamily: font.MontserraMedium,
        // fontWeight: '700',
    },
    reviewTitle: {
        // width: '50%',
        color: '#FFFFFF',
        fontSize: PixcelWidth(12),
        fontFamily: font.MontserratBold,
        fontWeight: '700',
    },
    titleTxt: {
        marginLeft: 20,
        alignSelf: 'center',
        fontSize: PixcelWidth(22),
        fontFamily: font.MontserratBold,
        color: color.txt_white,
    },
    acceptBtnTxt: {
        paddingHorizontal: 10,
        //letterSpacing: 2,
        fontSize: PixcelWidth(15),
        fontFamily: font.MontserratSemibold,
        color: color.txt_white,
    },
    createBtn: {
        paddingHorizontal: 10,
        marginRight: PixcelWidth(20),
        backgroundColor: color.secondary,
        color: '#ffffff',
    },
    inputTxtCont: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        backgroundColor: '#3E464A',
        borderRadius: 30,
        marginHorizontal: 15,
    },
    inputTxt: {
        flex: 4,
        fontFamily: font.MontserratRegular,

        marginLeft: 15,
        fontSize: 15,
        color: '#FFF',

    },

    mainLayout: {

        backgroundColor: color.primary_color,
        padding: 15,
    },
    bottomTab: {
        flexDirection: 'row',
        bottom: 40,
        position: 'absolute',
        padding: 15,
        paddingRight: 40,
        width: '90%',
        borderRadius: 35,
        alignItems: 'center',
        backgroundColor: '#FFF',
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: color.primary_color,
        borderBottomColor: color.primary_color,
    },
    find: {
        flex: 0.8,
        justifyContent: 'center',
        alignSelf: 'center',
        height: 25,
        width: 25,
    },
    findIcon: { height: 30, width: 30, resizeMode: 'contain' },
    filter: {
        marginRight: 8,
        alignSelf: 'center', height: 25, width: 25,
    },
    filterIcon: { height: 30, width: 30, resizeMode: 'contain' },
    pendingView: {
        position: 'absolute',
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    clockIcon: {
        height: PixcelWidth(33),
        width: PixcelWidth(33),
        marginBottom: PixcelWidth(15),
    },
    statusBtn: {
        borderColor: 'white',
        paddingHorizontal: 0,
        alignSelf: 'center',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    statusBtnTxt: {
        color: color.txt_white,
        fontSize: wp('3.2%'),
        textAlign: 'center'
    }


});
export default styles;
