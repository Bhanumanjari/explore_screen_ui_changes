import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { color, font } from "../../../Theme";
import { FontSize, PixcelWidth } from "../../../Utils";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerImg: {
        marginHorizontal: 20,
        marginVertical: 15,
    },
    menuImage: {
        marginHorizontal: 10,
        marginVertical: 15,
        width: 24,
        transform: [{
            rotate: "90deg"
        }]
    },
    videoListContainer: {
        flex: 1
    },
    videoInnerContainer: { flex: 1, backgroundColor: color._000000 },
    videoContainer: {
        height: hp("100%"),
        width: wp("100%"),
        backgroundColor: "#000",
        // flex: 1
    },
    userCont: {
        padding: PixcelWidth(20),
        width: '80%',
        bottom: 10,
        position: 'absolute',
    },
    userNameTxt: {
        fontSize: 15,
        fontFamily: font.MontserratSemibold,
        color: color.txt_white,
    },
    userTxt: {
        marginTop: PixcelWidth(16),
        fontSize: PixcelWidth(18),
        fontFamily: font.MontserratSemibold,
        color: color.txt_white,
    },
    subTitleTxt: {
        marginTop: PixcelWidth(3),
        fontSize: PixcelWidth(12),
        color: color.txt_white,
    },
    btnCont: {
        padding: PixcelWidth(20),
        //width:'50%',
        bottom: 10,
        right: 0,
        position: 'absolute',
    },
    starBtnCont: {
        height: PixcelWidth(50),
        width: PixcelWidth(50),
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: PixcelWidth(30),
        marginTop: PixcelWidth(25),
    },
    starImg: {
        height: PixcelWidth(28),
        width: PixcelWidth(28),
        tintColor: '#263238',
    },
    heartImg: {
        height: PixcelWidth(21),
        width: PixcelWidth(23),
        tintColor: '#263238',
    },
    badgeContainer: {
        backgroundColor: '#DA9F29',
        borderRadius: PixcelWidth(50),
        position: 'absolute',
        top: PixcelWidth(-10),
        right: PixcelWidth(-7),
    },
    badgeText: {
        color: color.txt_white,
        fontSize: FontSize.Small,
        fontWeight: '500',
        paddingHorizontal: PixcelWidth(10),
        paddingVertical: PixcelWidth(3),
    },
    shareImg: {
        tintColor: "#000"
    },
    downloadImg: {
        height: PixcelWidth(21),
        width: PixcelWidth(23),
    },
    playPauseBtn: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        top: 0,
        right: 0,
        left: 0
    },
    playPauseBtnContainer: {
        height: wp('100%'),
        width: wp('100%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    playPauseBtnImg: {
        height: 40,
        width: 40,
        tintColor: "white",
    }
})

export default styles