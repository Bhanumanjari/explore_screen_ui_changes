import { StyleSheet } from 'react-native';
import { color, font } from 'app/Theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { FontSize, PixcelWidth } from '../../../Utils';

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: color._0F9DEC,
    width: 300,
    marginVertical: 15,
  },
  mainLayout: {
    backgroundColor: color.primary_color,
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
    overflow: 'scroll'
  },
  infoImg: {
    alignSelf: 'center',
    marginTop: PixcelWidth(30),
    height: hp("45%"),
    width: wp("90%"),
  },
  mainTxtCont: {
    marginTop: '10%',
  },
  mainTxt: {
    fontFamily: font.MontserratBold,
    fontSize: FontSize.Medium,
    color: '#FFF',
    textAlign: 'center',
  },
  subTxtCont: {
    alignItems: 'center',
    marginTop: '8%',
  },
  subTxt: {
    color: '#FFF',
    fontSize: FontSize.Small,
    fontFamily: font.MontserratRegular,
  },
  btnCont: {
    marginTop: '10%',
    borderRadius: 30,
    backgroundColor: color.btnPrimary_color,
  },
  btnTxt: {
    fontSize: FontSize.Small,
    fontFamily: font.MontserratSemibold,
    //letterSpacing:2,
    marginVertical: 15,
    marginHorizontal: 30,
    alignSelf: 'center',
    color: '#FFFFFF',
  },
  bottom: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
    backgroundColor: '#20292D',
    padding: 15,
  },
  bottomCont: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  memberBtn: {
    marginLeft: 14,
  },
  memberBtnText: {
    color: color.txt_white,
    fontSize: 15,
    fontFamily: font.MontserratSemibold,
  },
  loginBtn: {
    borderRadius: 25,
    borderWidth: 1,
    //height: 45,
    ///width: 100,
    //alignSelf: 'center',
    //justifyContent: 'center',
    //alignItems: 'center',
    borderColor: '#FFF',
  },
  loginBtnText: {
    letterSpacing: 2,
    //marginVertical: 8,
    marginHorizontal: 5,
    padding: 10,
    fontSize: 15,
    fontFamily: font.MontserratSemibold,
    color: color.txt_white,
  },
});
export default styles;
