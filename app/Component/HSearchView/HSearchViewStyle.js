import {StyleSheet} from "react-native";
import {color} from "app/Theme";


const styles = StyleSheet.create({
    cardView: {
        padding: 5,
        margin: 15,
        backgroundColor: color._f2f2f2,
        elevation: 2,
        height:50,
        borderRadius: 25
    },

    searchButton: {
        width: 24,
        resizeMode: 'contain',
        margin: 5,
        alignSelf:'center'
    },
    searchTextView: {
        width: "92%",
        padding: 10,
        color:'black'
    }
});

export default styles;
