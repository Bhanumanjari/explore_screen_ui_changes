import { StyleSheet, Dimensions } from 'react-native';
import { color, font } from 'app/Theme';
import { PixcelWidth } from '../../../Utils';

const wp = Dimensions.get('window').width;
const styles = StyleSheet.create({

    mainLayout: {
        backgroundColor: color.primary_color,
        flex: 1,
        //paddingHorizontal:20,
    },
    header: {
        alignItems: 'center',
        backgroundColor: color.primary_color,
        justifyContent: 'flex-start',
        padding: 10,
    },
    titleTxt: {
        fontSize: 22,
        fontFamily: font.MontserratBold,
        letterSpacing: 2,
        color: color.txt_white,
        paddingHorizontal: 15,
        marginTop: '2%',
    },
    flatlistCont: {
        backgroundColor: color.primary_color,
        paddingHorizontal: 15,
        paddingTop:PixcelWidth(10)
    },
    flatlistImgCont: {
        flex: 1,
        margin: 5,
        width: wp / 2,
        height: wp / 4.5,
    },
    flatlistImg: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: wp / 2 - 30,
        height: wp / 4.7,
    },
    flatlistImgTxt: {
        color: '#FFFFFF',
        fontSize: PixcelWidth(13),
        fontFamily: font.MontserratBold,
    },
    line: {
        marginTop: '10%',
        borderWidth: 0.5,
        width: '100%',
        borderColor: 'grey',
    },
    footerCont: {
        //height:70,
        height: wp / 6,
        alignItems: 'center', backgroundColor: '#20292D',
        borderTopWidth: 1,
        borderTopColor: 'grey',
        //paddingVertical:10,
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
    declineBtn: {
        //marginLeft:14,
    },
    declineBtnTxt: {
        color: color.txt_white,
        fontSize: 15,
        fontFamily: font.MontserratSemibold,
    },
    acceptBtn: {
        borderRadius: 25,
        backgroundColor: color.btnPrimary_color,
    },
    acceptBtnTxt: {
        marginVertical: 12,
        marginHorizontal: 35,
        fontSize: 15,
        color: color.txt_white,
        fontFamily: font.MontserratSemibold,
    },
    checkImageStyle:{
        position:'absolute',
        top:7,
        right:7
    }
});
export default styles;
