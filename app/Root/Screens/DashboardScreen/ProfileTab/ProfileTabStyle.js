import { StyleSheet } from 'react-native';
import { color, font } from 'app/Theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { PixcelHeight, PixcelWidth } from '../../../../Utils';
const styles = StyleSheet.create({
    mainLayout: {
        backgroundColor: color.primary_color,
        paddingVertical: 20
    },
    settingImg: {
        height: PixcelWidth(30),
        width: PixcelWidth(30),
        //resizeMode:'contain',
        marginTop: PixcelWidth(10),
        right: 7,
        position: 'absolute',
    },
    userHeader: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 20,
        justifyContent: 'space-between'
    },
    menuImage: {
        marginHorizontal: 10,
        marginVertical: 15,
        width:24,
        transform:[{
            rotate : "90deg"
        }]
    },
    profileImg: {
        height: PixcelWidth(79),
        width: PixcelWidth(79),
        borderRadius: PixcelWidth(40),
        borderColor: '#FFF',
        borderWidth: 1,
        backgroundColor: color.primary_color_dark,
        justifyContent: 'center',
        alignItems: 'center'
    },
    firstCharTxt: {
        fontFamily: font.MontserratBold,
        fontSize: PixcelWidth(25),
        color: color.txt_white,
    },
    userCont: {
        marginLeft: PixcelWidth(25),
        //justifyContent: 'center',
    },
    userTitleTxt: {
        fontFamily: font.MontserratSemibold,
        fontSize: PixcelWidth(20),
        color: color.txt_white,
    },
    userSubTitleTxt: {
        marginTop: PixcelWidth(9),
        fontFamily: font.MontserratRegular,
        fontSize: PixcelWidth(13),
        color: color.txt_white,
    },
    editImg: {
        height: PixcelWidth(20),
        width: PixcelWidth(20),
        marginRight: PixcelWidth(7),
        // right:5,
        marginTop: PixcelWidth(20),
        // position:'absolute',
    },
    userImgCont: {
        flexDirection: 'row',
        marginTop: PixcelWidth(20),
        paddingVertical: 15,
        backgroundColor: color.secondary_color,
        borderRadius: PixcelWidth(20),
        alignItems: 'center',
        marginHorizontal: 20,
    },
    addImgCont: {
        backgroundColor: '#262E33',
        height: PixcelWidth(61),
        width: PixcelWidth(61),
        borderRadius: PixcelWidth(30),
        justifyContent: 'center',
        marginLeft: PixcelWidth(15),
        overflow: 'hidden',
        //alignItems: 'center',
    },
    plusImg: {
        height: PixcelWidth(24),
        width: PixcelWidth(24),
        alignSelf: 'center'
    },
    userImg: {
        //alignSelf:'center',
        height: PixcelWidth(61),
        width: PixcelWidth(61),
    },
    titleTxt: {
        marginTop: PixcelWidth(30),
        marginHorizontal: 20,
        fontFamily: font.MontserratSemibold,
        fontSize: PixcelWidth(15),
        letterSpacing: 1,
        color: color.txt_white,
    },
    reqCont: {
        marginTop: PixcelWidth(15),
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    receiveCont: {
        flexDirection: 'row',
        backgroundColor: color.secondary_color,
        width: '47%',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: PixcelWidth(20),
        alignItems: 'center',
    },
    receiveContTxt: {
        fontFamily: font.MontserratRegular,
        fontSize: PixcelWidth(13),
        letterSpacing: 1,
        color: color.txt_white,
    },
    requestPending: {
        backgroundColor: '#262E33',
        height: PixcelWidth(52),
        width: PixcelWidth(52),
        borderRadius: PixcelWidth(26),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: PixcelWidth(15),
    },
    requestPendingNo: {
        fontFamily: font.MontserratRegular,
        fontSize: PixcelWidth(15),
        letterSpacing: 1,
        color: color.txt_white,
    },
    themeCont: {
        marginTop: PixcelWidth(30),
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selThemeBtnCont: {
        backgroundColor: '#000000',
        height: PixcelWidth(28),
        width: PixcelWidth(49),
        borderRadius: PixcelWidth(30),
        justifyContent: 'center',
    },
    selBtn: {
        height: PixcelWidth(22),
        width: PixcelWidth(22),
        borderRadius: PixcelWidth(11),
        backgroundColor: '#FFF',
        alignSelf: 'flex-end',
        marginRight: 4,
    },
    subtitleTxt: {
        // marginTop: PixcelWidth(30),
        fontFamily: font.MontserratRegular,
        fontSize: PixcelWidth(14),
        letterSpacing: 1,
        color: color.txt_white,
    },
    line: {
        borderWidth: 0.5,
        borderColor: color.secondary_color,
        marginVertical: PixcelWidth(25),

    },
    counterContainer: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginTop: 15
        // flex: 1
    },
    subCounterContainer: {
        backgroundColor: color.primary_color,//"#2D363A", //
        flex: 0.5,
        flexDirection: 'row',
        marginHorizontal: 7,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,

        elevation: 5,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { height: 0, width: 0, },
        shadowOpacity: 1,
        shadowRadius: 5,
        margin: 3,
        borderRadius: PixcelWidth(20)
    },
    counterTitleTxt: {
        fontSize: PixcelWidth(13),
        color: color.txt_white
    },
    counterTxt: {
        padding: PixcelWidth(20),
        fontSize: PixcelWidth(13),
        color: color.txt_white,
    },
    counterView: {
        backgroundColor: color.primary_color_dark,
        borderRadius: 20
    },
    unseenDot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        position: 'absolute',
        backgroundColor: '#FF5A29',
        top: 0,
        right: 0
    },
    videoListContainer: {
        flex: 1,
        paddingBottom: 70
    },
    labelTxt: {
        fontWeight: '600',
        color: color.txt_white,
        lineHeight: PixcelWidth(18),
        fontSize: PixcelWidth(15),
        marginHorizontal: 15
    },
    listContainer: {
        marginHorizontal: 7,
        marginVertical: 10
    },
    divider: {
        height: 2,
        backgroundColor: 'rgba(255,255,255,0.05)',
        marginVertical: PixcelWidth(30)
    },
});
export default styles;
