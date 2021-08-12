import { StyleSheet } from 'react-native';
import { color, font } from 'app/Theme';
import { PixcelWidth } from '../../../../Utils';

const styles = StyleSheet.create({
    flatlistImg: {
        overflow: 'hidden',
        borderRadius: 15,
        height: 250,
        width: PixcelWidth(173),
        margin: 10
    },
    flatlistCont: {
        flex: 1,
        backgroundColor: color.primary_color,

    },
    flatlistImgTxt: {
        width: '80%',
        color: '#FFFFFF',
        fontSize: PixcelWidth(12),
        fontFamily: font.MontserratBold,
        fontWeight: '700',
        position: 'absolute',
        bottom: 10,
        padding: 10
    },
    reviewTitle: {
        width: '50%',
        color: '#FFFFFF',
        fontSize: PixcelWidth(12),
        fontFamily: font.MontserratBold,
        fontWeight: '700',
    },
    titleTxt: {
        // marginLeft: 20,
        alignSelf: 'center',
        fontSize: PixcelWidth(22),
        fontFamily: font.MontserratBold,
        color: color.txt_white,
    },
    acceptBtnTxt: {
        fontSize: PixcelWidth(12),
        // fontFamily: font.MontserratSemibold,
        paddingHorizontal: PixcelWidth(25),
        color: color.txt_white,
    },
    createBtn: {
        marginRight: PixcelWidth(5),
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
        paddingHorizontal: 20
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
        // marginRight: 8,
        alignSelf: 'center',
    },
    filterIcon: { height: 30, width: 30, resizeMode: 'contain' },


});
export default styles;
