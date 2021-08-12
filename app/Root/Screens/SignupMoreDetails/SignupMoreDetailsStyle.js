import { StyleSheet } from "react-native";
import { color,font } from 'app/Theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {PixcelHeight, PixcelWidth} from '../../../Utils';

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:color.primary_color
    },
    mainLayout : {
        backgroundColor : color.primary_color,
        flex : 1,
        paddingHorizontal:20,
    },
    titleTxt:{
        marginLeft:PixcelWidth(20),
        fontSize: PixcelWidth(22),
        fontFamily:font.MontserratBold,
        color: color.txt_white,

    },
    line2: {
        flex:1,
        marginTop: 15,
        borderWidth: 1,
        //width:'100%',
        borderColor: color.txt_white,
    },
    line: {
        flex:2,
        marginTop: 15,
        borderWidth: 1,
        //width:'100%',
        borderColor: color.txt_white,
    },
    bottomCont:{
        //marginTop:500,
        justifyContent:'center',
        alignItems:'center',
    },
    subTxt:{
        marginTop:15,
        color:color.txt_white,
        fontSize: 15,
    },
    awardImg:{
        height:15,
        width: 15,
        margin:10,
        marginLeft:20,
        resizeMode:'contain'
    },
    inputCont: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    inputTxtCont: {
        height:PixcelWidth(55),
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#3E464A',
        borderRadius: 30 ,

        marginHorizontal:25,
    },
    inputTxt:{
        flex:1,
        margin:5,
        color:'#FFF',
        fontSize:16,
        fontFamily: font.MontserratRegular
    },
    hintTxt:{
        marginTop:15,
        color:'red',
        fontSize: 15,
    },
    acceptBtn:{
        marginTop:'10%',
        borderRadius:30,
        backgroundColor: color.btnPrimary_color
    },
    acceptBtnTxt:{
        marginVertical:14,
        //letterSpacing: 2,
        fontSize:15,
        fontFamily:font.MontserratSemibold,
        marginHorizontal:20,
        color:color.txt_white
    },
    backArrowImg:{
        height: 18,
        width: 10.5,

    },
    eyeIcon:{
        height:PixcelWidth(26),
        width:PixcelWidth(26),
        tintColor:color.txt_white,
        marginRight:PixcelWidth(12)
    }

});
export default styles;
