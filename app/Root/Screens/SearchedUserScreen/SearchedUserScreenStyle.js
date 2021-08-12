import { Dimensions, StyleSheet } from "react-native";
import { color, font } from 'app/Theme';
import { FontSize, PixcelHeight, PixcelWidth } from '../../../Utils';
const wp = Dimensions.get('window').width;
const styles = StyleSheet.create({

    mainLayout: {
        backgroundColor: color.primary_color,
        // paddingHorizontal: 20,
        //alignItems:'center'
    },
    container: {
        backgroundColor: color.primary_color,
    },
    titleTxt: {
        marginLeft: PixcelWidth(20),
        fontSize: PixcelWidth(22),
        fontFamily: font.MontserratBold,
        color: color.txt_white,

    },
    user: {
        alignItems: 'center',
        marginTop: PixcelWidth(25),
        borderColor: '#FFFFFF10',
        borderBottomWidth: 1,
    },
    userDetailsCont: {
        alignItems: 'center',
        marginBottom: PixcelWidth(25),
    },
    userImg: {
        height: PixcelWidth(56),
        width: PixcelWidth(56),
        //alignSelf:'center',
        resizeMode: 'contain'
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
        marginBottom: PixcelWidth(25),
    },
    acceptBtn: {
        paddingHorizontal: PixcelWidth(30),
        borderWidth: 1,
        borderColor: '#FFF',
        backgroundColor: color.primary_color
    },
    acceptBtnTxt: {
        fontSize: PixcelWidth(15),
        color: color.txt_white,
        fontFamily: font.MontserratRegular
    },
    closeBtn: {
        marginLeft: PixcelWidth(12),
        height: PixcelWidth(33),
        width: PixcelWidth(33),
    },
    acceptBtnBlue: {
        paddingHorizontal: 25,
        backgroundColor: color.btnPrimary_color
    },
    filterContainer: {
        marginVertical: PixcelWidth(20),
        // marginHorizontal: 20
    },
    tagContainer: {
        backgroundColor: color.primary_color_dark,
        marginRight: PixcelWidth(7),
        borderRadius: 20,
        borderWidth: 1,
        borderColor: color.txt_white,
        paddingHorizontal: PixcelWidth(7),
        marginVertical: PixcelWidth(7)
    },
    tagTxt: {
        color: color.txt_white,
        padding: PixcelWidth(7)
    },
    searchContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: PixcelWidth(10)
    },
    flatlistCont: {
        backgroundColor: color.primary_color,
    },
    searchTitleTxt: {
        fontSize: FontSize.Small,
        fontFamily: font.MontserratRegular,
        color: color.txt_white,
        fontWeight: '600'
    },
});
export default styles;
