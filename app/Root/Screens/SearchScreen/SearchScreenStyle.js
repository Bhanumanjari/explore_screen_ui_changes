import {Dimensions, StyleSheet} from "react-native";
import { color,font } from 'app/Theme';
import {PixcelHeight, PixcelWidth} from 'app/Utils';
const wp = Dimensions.get('window').width;
const styles = StyleSheet.create({

    mainLayout : {
        backgroundColor : color.primary_color,
        paddingHorizontal:20,
        //alignItems:'center'
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
    filterIcon:{height: 30, width: 30, resizeMode: 'contain'},

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
    serchTab:{
        marginTop:PixcelWidth(15),
        flexDirection:'row'
    },
    serchTabTxt:{
        fontSize:PixcelWidth(13),
        fontFamily:font.MontserratBold,
        alignSelf:'center',

    },
    subHeader:{
        marginTop:PixcelWidth(30),
      flexDirection:'row',
      justifyContent:'space-between',
        textAlign:'center',
        //paddingHorizontal: '20%',
    },
    selSubHeaderTxt:{
      fontFamily:font.MontserratBold,
        fontSize:PixcelWidth(13),
        //backgroundColor:'red',
        paddingHorizontal: '20%',
        letterSpacing: 1,
        borderBottomWidth:2,
        borderColor: '#FFF',
        color:color.txt_white,
        paddingBottom:10,
    },
    subHeaderTxt:{
        fontFamily:font.MontserratRegular,
        fontSize:PixcelWidth(13),
        color:color.txt_white,
        borderBottomWidth:1,
        borderColor: '#FFFFFF20',
        letterSpacing: 1,
        paddingHorizontal: '20%',
        //paddingBottom:10,
    },
    titleTxt:{
        marginTop:PixcelWidth(20),
        fontSize:PixcelWidth(15),
        letterSpacing:1,
        fontFamily:font.MontserratSemibold,
        color:color.txt_white,
    },
    serchBtnCont: {
        //padding:PixcelWidth(20),
        marginTop:PixcelWidth(20),
        flexDirection:'row',
        //paddingHorizontal:'6%',
    },
    publicBtn:{
        alignItems:'center',
        borderColor:'#FFF',
        borderWidth:1,
        marginRight: PixcelWidth(14),
        paddingVertical:PixcelWidth(9),
        borderRadius: PixcelWidth(31),
    },
    publicBtnTxt:{
        color:color.txt_white,
        fontFamily:font.MontserratSemibold,
        fontSize:PixcelWidth(15),
        marginHorizontal: PixcelWidth(22)
    },

    heartImg:{
        height:PixcelWidth(14),
        width:PixcelWidth(16),
        tintColor:'#FFF',
    },

});
export default styles;
