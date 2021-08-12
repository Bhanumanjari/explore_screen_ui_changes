import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { color, font } from "../../../Theme";
import { FontSize, PixcelWidth } from "../../../Utils";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.primary_color
    },
    headerImg: {
        marginHorizontal: 20,
        marginVertical: 15
    },
    menuImage: {
        marginHorizontal: 10,
        marginVertical: 15,
        width:24,
        transform:[{
            rotate : "90deg"
        }]
    },
    bottomContainer: {
        height: 100
    },
    videoContainer: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: 'center',
        alignItems: 'center'
    },
    loaderImag: {
        height: 200,
        width: 200,
    }
})

export default styles