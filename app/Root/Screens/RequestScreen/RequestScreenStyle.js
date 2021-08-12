import {Dimensions, StyleSheet} from "react-native";
import { color,font } from 'app/Theme';
import {PixcelHeight, PixcelWidth} from '../../../Utils';
const wp = Dimensions.get('window').width;
const styles = StyleSheet.create({

    mainLayout : {
        backgroundColor : color.primary_color,
        paddingHorizontal:20,
        //alignItems:'center'
    },

    user:{
        flexDirection:'row',
        //justifyContent:'space-between',
        //alignItems: 'center',
        marginTop:PixcelWidth(21),
    },
    userImg:{
        height:PixcelWidth(168),
        width:PixcelWidth(116),
        borderRadius:PixcelWidth(15),
        //alignSelf:'center',
        resizeMode:'contain'
    },
    detailsCont:{
        marginLeft:PixcelWidth(21),
        flex: 1,
        justifyContent: 'space-between'
    },
    titleTxt:{
        fontSize:PixcelWidth(20),
        fontFamily:font.MontserratBold,
        color:color.txt_white,
    },

    numberCont:{
        marginTop:PixcelWidth(10),
        backgroundColor:'#202A2F',
        borderRadius:PixcelWidth(16),
        height:PixcelWidth(34),
        width:PixcelWidth(34),
        //alignItems:'center',
        justifyContent: 'center',
    },
    numberContTxt:{
        alignSelf: 'center',
        color:color.txt_white,
        fontSize: PixcelWidth(13),
        fontFamily: font.MontserratRegular,
    },
    rateCont:{
        flexDirection:'row',
        alignItems: 'center',
        marginBottom:PixcelWidth(8)
    },

    heartImg:{
        height:PixcelWidth(14),
        width:PixcelWidth(16),
        tintColor:'#FFF',
    },
    heartImgTxt:{
        marginLeft: PixcelWidth(10),
        fontSize:PixcelWidth(13),
        fontFamily:font.MontserratRegular,
        color:color.txt_white,
    },
    starImg:{
        marginLeft: PixcelWidth(31),
        height:PixcelWidth(17),
        width:PixcelWidth(17),
        tintColor:'#FFF',
    },
    starImgTxt:{
        marginLeft: PixcelWidth(10),
        fontSize:PixcelWidth(13),
        fontFamily:font.MontserratRegular,
        color:color.txt_white,
    },
});
export default styles;
