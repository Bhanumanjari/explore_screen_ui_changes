import { StyleSheet } from "react-native";
import { color } from 'app/Theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    btnStyle : {
        backgroundColor : color._0F9DEC,
        width : 300,
        marginVertical : 15
    },
    mainLayout : {
        alignItems : 'center',
        justifyContent : 'center',
        // backgroundColor : 'yellow',
        flex : 1
    }
});
export default styles;
