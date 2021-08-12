import {StyleSheet} from 'react-native';
import {color, font} from 'app/Theme';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {PixcelWidth} from '../../../../../Utils';
const styles = StyleSheet.create({
    mainLayout : {
        backgroundColor : color.primary_color,
        paddingHorizontal:20,
        //alignItems:'center'
    },
    addImgCont:{
        backgroundColor:'#262E33',
        height:PixcelWidth(61),
        width:PixcelWidth(61),
        borderRadius: PixcelWidth(30),
        justifyContent: 'center',
        marginLeft: PixcelWidth(15),
        overflow:'hidden',
        //alignItems: 'center',
    },
    userImg:{
        //alignSelf:'center',
        height:PixcelWidth(61),
        width:PixcelWidth(61),
    },
});
export default styles;
