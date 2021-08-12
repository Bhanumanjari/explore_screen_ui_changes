import {StyleSheet} from 'react-native';
import {color, font} from 'app/Theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {PixcelHeight, PixcelWidth} from '../../../Utils';

const styles = StyleSheet.create({
  mainLayout: {
    //alignItems : 'center',
    backgroundColor: color.primary_color,
    flex: 1,
    //padding:20,
  },
  titleTxt: {
    fontSize: 16,
    //letterSpacing: 2,
    fontFamily: font.MontserratBold,
    color: color.txt_white,
    paddingHorizontal: 20,
    marginTop: '10%',
    //marginTop: PixcelHeight(66),
  },
  subtxtCont: {
    paddingHorizontal: 20,
    marginBottom: 100,
    flex: 1,
  },
  termsView: {
    marginTop: 20,
    backgroundColor: 'transparent',
  },
  webViewLoader: {
    backgroundColor: color.primary_color,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  loaderImage: {
    height: PixcelWidth(40),
    width: PixcelWidth(60),
    marginBottom: 10,
  },
  loaderContainer: {
    height: PixcelWidth(80),
    width: PixcelWidth(80),
    borderRadius: PixcelWidth(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  subTxt: {
    marginTop: 15,
    fontFamily: font.MontserratRegular,
    color: color.txt_white,
    fontSize: 15,
  },
  line: {
    borderWidth: 0.5,
    //width:'100%',
    borderColor: color.txt_white,
  },
  bottom: {
    bottom: 10,
    position: 'absolute',
    width: '100%',
    //padding:15,
  },
  bottomCont: {
    //marginTop: 15,
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  declineBtn: {},
  declineBtnTxt: {
    color: color.txt_white,
    fontSize: 15,
    fontFamily: font.MontserratSemibold,
  },
  acceptBtn: {
    borderRadius: 25,
    backgroundColor: color.btnPrimary_color,
  },
  acceptBtnTxt: {
    marginVertical: 12,
    marginHorizontal: 25,
    fontSize: 15,
    color: color.txt_white,
    fontFamily: font.MontserratSemibold,
  },
});
export default styles;
