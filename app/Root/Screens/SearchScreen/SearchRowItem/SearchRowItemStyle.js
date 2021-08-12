import {StyleSheet} from 'react-native';
import {color, font} from 'app/Theme';
import {PixcelWidth} from 'app/Utils';
const styles = StyleSheet.create({
    centerImage: {
        height: PixcelWidth(18),
        width: PixcelWidth(18),
        position: 'absolute',
        right: 20, bottom: 20,
    },

    categoryCont:{
        //flexDirection:'row',
        alignItems: 'center',
        marginTop:PixcelWidth(15),
        marginRight:PixcelWidth(10),
        height:PixcelWidth(137),
        width:PixcelWidth(84),
        borderRadius: PixcelWidth(42),
        backgroundColor:'#3E464A',
    },
    cateImgCont:{
        //flex:1,
        margin:10,
        borderWidth:1,
        borderColor:'#FFF',
         height:PixcelWidth(68),
         width:PixcelWidth(68),
        borderRadius: PixcelWidth(34),
        justifyContent:'center',
    },
    cateImg:{
        height:PixcelWidth(32),
        width:PixcelWidth(32),
        alignSelf:'center',
    },
    cateTxt:{
        //fontsize:PixcelWidth(12),
        textAlign: 'center',

        color:color.txt_white,
        fontFamily:font.MontserratSemibold
    },

});
export default styles;
