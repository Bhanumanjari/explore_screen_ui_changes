import { StyleSheet } from "react-native";
import { color } from 'app/Theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { PixcelWidth } from "../../Utils";

const styles = StyleSheet.create({
    inputTxtCont: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3E464A',
        borderRadius: 30,
        marginHorizontal: 15,
    },
    inputTxt: {
        flex: 1,
        margin: 5,
        marginLeft: 5,
        fontSize: 15,
        color: '#FFF',
        padding: 10
    },
    btnStyle: {
        backgroundColor: color._0F9DEC,
        width: 300,
        marginVertical: 15
    },
    mainLayout: {
        alignItems: 'center',
        backgroundColor: color.primary_color,
        flex: 1,
        padding: 15,
    },
    bottomTab: {
        // alignSelf: 'center',
        // flex:1,
        flexDirection: 'row',
        // height:70,
        // bottom: 20,
        // position: 'absolute',
        // padding: 10,
        // paddingRight: 20,
        // width: '70%',
        // borderRadius: 35,
        // alignItems: 'center',
        backgroundColor: "#181C1E",
        // justifyContent: 'space-between'
    },
    homeTab: {
        flex:1,
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 35,
        // backgroundColor: color.primary_color
    },
    homeTabTxt: {
        marginLeft: 10,
        color: '#FFF'
    },
    selectImg: {
        height: PixcelWidth(24),
        width: PixcelWidth(24),
        marginTop: 7
        // marginLeft: 15

    },
    Img: {
        height: PixcelWidth(24),
        width: PixcelWidth(24),
        marginTop: 7
    },
    topIndicator: {
        height: 3,
        width:"100%",
        position:"absolute",
        top:0,
        borderRadius: 10,
        backgroundColor: "#fff"
    }

});
export default styles;
