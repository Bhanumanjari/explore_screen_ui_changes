import {StyleSheet} from "react-native";
import {color} from 'app/Theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { font } from "../../Theme";
import { FontSize } from "../../Utils";

const styles = StyleSheet.create({

    imageStyle:{
        height: 200,
        width:350,
        resizeMode: 'contain',
        marginBottom:40
    },
    mainView:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:color.primary_color
    },
    innerView:{
        marginLeft:wp('5%'),
        marginRight:wp('5%'),
        paddingTop:20,
        paddingBottom:20,
        paddingLeft:30,
        paddingRight:30,
        alignItems:'center',
        justifyContent: 'center',
    },
    headerMsg:{
        padding:5,
        textAlign:'center',
        fontWeight:'bold'
    },
    bodyMsg:{
        padding:5,
        textAlign:'center',
        color:color.txt_white,
        marginTop:10,
        fontFamily:font.MontserratRegular,
        fontSize:FontSize.Small
    },
    buttonStyle:{
        backgroundColor:color.btnPrimary_color,
        borderRadius:25,
        margin:30,

        elevation:3,
        shadowColor:"rgba(0,0,0,0.2)",
        shadowOpacity:0.8,
        shadowOffset:{height:0,width:0}
    },
    buttonTextStyle:{
        color:"white",
        paddingVertical:15,
        width:120,
        textAlign:'center',
        textTransform:"uppercase"
    },
    oppsImageTextStyle:{
        height: 20,
        alignSelf:'center',
        resizeMode: 'contain',
    }
});
export default styles;

