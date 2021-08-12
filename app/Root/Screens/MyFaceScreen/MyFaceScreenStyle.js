import {Dimensions, StyleSheet} from "react-native";
import { color,font } from 'app/Theme';
import {PixcelHeight, PixcelWidth} from 'app/Utils';
const wp = Dimensions.get('window').width;
const styles = StyleSheet.create({

    mainLayout : {
        flex:1,
        backgroundColor : color.primary_color,
        //paddingHorizontal:20,
        //alignItems:'center'
    },
    imgCont:{
        marginTop:PixcelWidth(15),
    },
    newHelloImg:{
        flex:1,
        //marginTop:PixcelWidth(20),
        //alignSelf:'center',
        resizeMode:'contain'
    },
    headerCont:{
      //backgroundColor:'transparent',
        backgroundColor:'transparent',
        elevation:0,
       // opacity: 0.5
        marginHorizontal:PixcelWidth(10),
        marginTop:PixcelWidth(20),
    },
    headerImg:{
       margin:10,
    },
    userCont:{
        padding:PixcelWidth(20),
        width:'50%',
        bottom:10,
        position:'absolute'
    },
    userNameTxt:{
        fontSize:15,
        fontFamily:font.MontserratRegular,
        color:color.txt_white,
    },
    userTxt:{
        marginTop:PixcelWidth(16),
        fontSize:PixcelWidth(20),
        fontFamily:font.MontserratBold,
        color:color.txt_white,
    },
   btnCont: {
       padding:PixcelWidth(20),
       width:'100%',
       flexDirection:'row',
       paddingHorizontal:'6%',
       justifyContent:'space-between',
       alignItems:'center',
       bottom:10,
       position:'absolute'
    },
    publicBtn:{
        alignItems:'center',
        borderColor:'#FFF',
        borderWidth:1,
        paddingHorizontal:PixcelWidth(35),
        paddingVertical:PixcelWidth(10),
        borderRadius: PixcelWidth(31),
    },
    publicBtnTxt:{
        color:color.txt_white,
        fontFamily:font.MontserratSemibold,
        fontSize:PixcelWidth(15),
        marginHorizontal: PixcelWidth(15)
    },
    privateBtn:{
        backgroundColor:color.btnPrimary_color,
        alignItems:'center',
        paddingHorizontal:PixcelWidth(35),
        paddingVertical:PixcelWidth(10),
        borderRadius: PixcelWidth(31),
    },
    privateBtnTxt:{
        color:color.txt_white,
        fontFamily:font.MontserratSemibold,
        fontSize:PixcelWidth(15),
        marginHorizontal: PixcelWidth(15)
    },

    footerCont:{
        borderTopWidth: 0,
        height:PixcelWidth(100),
        alignItems:'center',
        flexDirection: 'row',
        marginHorizontal:15,
        backgroundColor:color.primary_color,
    },
    userImgCont:{
        flexDirection: 'row',
        //marginTop:PixcelWidth(20),
        paddingHorizontal:15,
        //backgroundColor: color.secondary_color,
        //borderRadius:PixcelWidth(20),
        alignItems:'center',
    },
    addImgCont:{
        backgroundColor:'#262E33',
        height:PixcelWidth(61),
        width:PixcelWidth(61),
        borderRadius: PixcelWidth(30),
        justifyContent: 'center',
        //marginLeft: PixcelWidth(15),
        overflow:'hidden',
        //alignItems: 'center',
    },
    plusImg:{
        height:PixcelWidth(24),
        width:PixcelWidth(24),
        alignSelf:'center'
    },

    shareBtnCont: {
        //padding:PixcelWidth(20),
        //paddingHorizontal:'6%',
        borderTopRightRadius:PixcelWidth(25),
        borderTopLeftRadius:PixcelWidth(25),
        backgroundColor:color.secondary_color,

    },
    shareBtnContTxt:{
        marginTop:PixcelWidth(25),
        fontFamily:font.MontserratSemibold,
        letterSpacing:1,
        fontSize:PixcelWidth(15),
        color:color.txt_white,
        paddingHorizontal:PixcelWidth(20),
    },
    line:{
        borderWidth: 1,
        //marginVertical:PixcelWidth(30),
        borderColor: color.primary_color,
    },
    socialCont:{
        marginTop:PixcelWidth(22),
        flexDirection:'row',
        margin:PixcelWidth(20),
        justifyContent:'space-between',
    },
    socialImg:{
        height:PixcelWidth(61),
        width:PixcelWidth(61),
        borderRadius:PixcelWidth(31),
    },
    BtnCont: {
        padding:PixcelWidth(25),
        paddingHorizontal:PixcelWidth(20),
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        //backgroundColor:color.primary_color,
    },
    publicBtn1:{
        alignItems:'center',
        backgroundColor:color.primary_color,
        paddingHorizontal:PixcelWidth(35),
        paddingVertical:PixcelWidth(10),
        borderRadius: PixcelWidth(31),
    },
    publicBtnTxt1:{
        color:color.txt_white,
        fontFamily:font.MontserratRegular,
        letterSpacing: 1,
        fontSize:PixcelWidth(15),
        marginHorizontal: PixcelWidth(15)
    },
    privateBtn1:{
        backgroundColor:color.primary_color,
        alignItems:'center',
        paddingHorizontal:PixcelWidth(35),
        paddingVertical:PixcelWidth(10),
        borderRadius: PixcelWidth(31),
    },
    privateBtnTxt1:{
        color:color.txt_white,
        letterSpacing: 1,
        fontFamily:font.MontserratRegular,
        fontSize:PixcelWidth(15),
        marginHorizontal: PixcelWidth(15)
    },

});
export default styles;
