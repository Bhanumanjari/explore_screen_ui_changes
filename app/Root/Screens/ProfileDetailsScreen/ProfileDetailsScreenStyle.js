import { Dimensions, StyleSheet } from "react-native";
import { color, font } from 'app/Theme';
import { PixcelHeight, PixcelWidth } from '../../../Utils';
const wp = Dimensions.get('window').width;
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
    profileImgCont: {
        alignSelf: 'center',
        marginTop: PixcelWidth(25),
        marginBottom: PixcelWidth(40),
    },
    profileImg: {

        height: PixcelWidth(137),
        width: PixcelWidth(137),
        borderRadius: PixcelWidth(68.5),
        alignSelf: 'center',
        borderColor: '#FFF',
        borderWidth: 1,
        backgroundColor: color.primary_color_dark,
        justifyContent: 'center',
        alignItems: 'center'
        // resizeMode:'contain'
    },
    firstCharTxt: {
        fontFamily: font.MontserratBold,
        fontSize: PixcelWidth(30),
        color: color.txt_white,
    },
    openCameraCont: {
        //alignItems: 'flex-end',
        bottom: 0,
        right: 7,
        position: 'absolute',
        borderWidth: 1,
        backgroundColor: color.primary_color,
        borderColor: '#FFF',
        borderRadius: PixcelWidth(16),
        height: PixcelWidth(32),
        width: PixcelWidth(32),
        //alignItems:'center',
        justifyContent: 'center',
    },
    profileCloseBtn: {
        top: 0,
        right: 7,
        position: 'absolute',
        borderColor: '#FFF',
        justifyContent: 'center',
    },
    camImg: {
        alignSelf: 'center',
        height: PixcelWidth(16),
        width: PixcelWidth(16),
        tintColor: '#FFF'
    },
    profilecloseImg: {

    },
    inputCont: {
        //justifyContent: 'center',
        marginTop: PixcelWidth(25),
        alignItems: 'center',
        paddingHorizontal: PixcelWidth(25),
    },

    inputTxtCont: {
        marginTop: 15,
        marginHorizontal: 25,
        marginLeft: 25,
        backgroundColor: '#3E464A',
        borderColor: '#3E464A',
    },
    inputTxt: {
        //flex:1,
        marginLeft: 10,
        color: '#FFF',
        fontSize: 15,
        fontFamily: font.MontserratRegular
    },
    inputTxtImg: {
        height: PixcelWidth(18),
        width: PixcelWidth(18),
        marginLeft: PixcelWidth(20),
        tintColor: '#FFF'
    },

    footerCont: {
        borderColor: '#00000000',
        height: PixcelWidth(80),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.primary_color,
        // paddingHorizontal:PixcelWidth(35),

    },
    bottomCont: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
        justifyContent: 'space-between'
    },
    declineBtn: {
        //borderRadius:31,
        //paddingVertical:PixcelWidth(15),
        paddingHorizontal: 35,
        backgroundColor: '#1E282D'
    },
    declineBtnTxt: {
        color: color.txt_white,
        fontSize: PixcelWidth(15),
        marginVertical: PixcelWidth(18),
        //marginHorizontal:10,
        fontFamily: font.MontserratSemibold,
    },
    acceptBtn: {
        paddingHorizontal: 35,
        backgroundColor: color.btnPrimary_color
    },
    acceptBtnTxt: {
        fontSize: PixcelWidth(15),
        color: color.txt_white,
        fontFamily: font.MontserratSemibold
    },
    indicatorStyle: {
        marginRight: PixcelWidth(20),
    },
    errTxt: {
        marginTop: 7,
        marginHorizontal: 35,
        // textAlign:'center',
        color: 'red'
    }

});
export default styles;
