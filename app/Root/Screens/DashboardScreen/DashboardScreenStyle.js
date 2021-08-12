import {StyleSheet} from 'react-native';
import {color, font} from 'app/Theme';

const styles = StyleSheet.create({
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
        backgroundColor: color.primary_color, borderBottomColor: color.primary_color,
    },
    find: {
        flex: 0.8,
        justifyContent: 'center',
        alignSelf: 'center',
        height: 25,
        width: 25,
    },
    findIcon: {height: 30, width: 30, resizeMode: 'contain'},
    filter:{
        marginTop: 8,
        marginRight: 8,
        alignSelf: 'center', height: 25, width: 25,
    },
    filterIcon:{height: 30, width: 30, resizeMode: 'contain'}


});
export default styles;
