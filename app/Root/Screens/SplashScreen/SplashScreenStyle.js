import { StyleSheet } from 'react-native';
import { color } from 'app/Theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    imageStyle: {
        height: wp("65%"),
        width: wp("100%"),
    },
    imageLayer: {
        height: hp('46%'),
        width: wp("100%"),
        position: 'absolute',
        justifyContent: 'flex-end',
        bottom: 0,
    },
    
        container1: {
            backgroundColor: color.primary_color,
            flex: 1,
            flexDirection: 'column',
            //maxHeight: Dimensions.get('window').height,
            alignItems: 'center',
            justifyContent: 'flex-end'
        },
    
    logo: {
        marginTop: '35%',
        width: 120,
        height: 120,
    },
    logoTxt: {
        marginTop: 20,
        fontWeight: 'bold',
        letterSpacing: 5,
        textAlign: 'center',
        color: "#fff"
    }
});
export default styles;

