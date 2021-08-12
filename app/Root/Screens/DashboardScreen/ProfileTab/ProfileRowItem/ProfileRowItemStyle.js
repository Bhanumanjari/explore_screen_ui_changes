import {StyleSheet} from 'react-native';
import {color, font} from 'app/Theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {PixcelWidth} from '../../../../../Utils';
const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: color.primary_color,
    paddingHorizontal: 20,
    //alignItems:'center'
  },
  addImgCont: {
    backgroundColor: '#262E33',
    height: PixcelWidth(61),
    width: PixcelWidth(61),
    borderRadius: PixcelWidth(31),
    justifyContent: 'center',
    marginLeft: PixcelWidth(15),
    alignSelf: 'center',
  },
  disableImg: {
    backgroundColor: '#80808050',
    height: PixcelWidth(61),
    width: PixcelWidth(61),
    borderRadius: PixcelWidth(31),
    justifyContent: 'center',
    marginLeft: PixcelWidth(15),
    alignSelf: 'center',
    position:'absolute'
  },
  userImg: {
    //alignSelf:'center',
    height: PixcelWidth(61),
    width: PixcelWidth(61),
    borderRadius: PixcelWidth(31),
  },
  selectedImgCont: {
    backgroundColor: '#262E33',
    height: PixcelWidth(71),
    width: PixcelWidth(71),
    borderRadius: PixcelWidth(36),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: PixcelWidth(15),
    borderWidth: PixcelWidth(2),
    borderColor: color.btnPrimary_color,
  },
  closeIconContainer: {
    position: 'absolute',
    top: 0,
    right: -5,
    zIndex: 9999,
  },
  closeIcon: {
    height: PixcelWidth(20),
    width: PixcelWidth(20),
  },
});
export default styles;
