import { Dimensions, StyleSheet } from 'react-native';
import { color, font } from 'app/Theme';
import { PixcelHeight, PixcelWidth } from 'app/Utils';
import { FontSize } from '../../../Utils';
import commonStyle from './../../../CommonStyle'

const wp = Dimensions.get('window').width;
const styles = StyleSheet.create({
  mainLayout: {
    flex: 1,
    backgroundColor: color.primary_color,
    //paddingHorizontal:20,
    //alignItems:'center'
  },
  imgCont: {
    marginTop: PixcelWidth(15),
  },
  newHelloImg: {
    flex: 1,
    //marginTop:PixcelWidth(20),
    //alignSelf:'center',
    resizeMode: 'contain',
  },
  headerCont: {
    //backgroundColor:'transparent',
    backgroundColor: 'transparent',
    elevation: 0,
    // opacity: 0.5
    marginHorizontal: PixcelWidth(10),
    marginTop: PixcelWidth(20),
    borderBottomColor: '#0000',
  },
  headerImg: {
    marginHorizontal: 20,
    marginVertical: 15
  },
  menuImage: {
    marginHorizontal: 10,
    marginVertical: 15,
    width: 24,
    transform: [{
      rotate: "90deg"
    }]
  },
  userCont: {
    padding: PixcelWidth(20),
    width: '80%',
    bottom: 10,
    position: 'absolute',
  },
  userNameTxt: {
    fontSize: 15,
    fontFamily: font.MontserratSemibold,
    color: color.txt_white,
  },
  userTxt: {
    marginTop: PixcelWidth(16),
    fontSize: PixcelWidth(18),
    fontFamily: font.MontserratSemibold,
    color: color.txt_white,
  },
  subTitleTxt: {
    marginTop: PixcelWidth(3),
    fontSize: PixcelWidth(12),
    // fontFamily: font.MontserratSemibold,
    color: color.txt_white,
  },
  btnCont: {
    padding: PixcelWidth(20),
    //width:'50%',
    bottom: 10,
    right: 0,
    position: 'absolute',
  },
  starBtnCont: {
    height: PixcelWidth(60),
    width: PixcelWidth(60),
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: PixcelWidth(30),
    marginTop: PixcelWidth(25),
  },
  shareImg: {
    tintColor: "#000"
  },
  starImg: {
    height: PixcelWidth(28),
    width: PixcelWidth(28),
    tintColor: '#263238',
  },
  heartImg: {
    height: PixcelWidth(21),
    width: PixcelWidth(23),
    tintColor: '#263238',
  },

  footerCont: {
    alignItems: 'center',
    backgroundColor: color.primary_color_dark,
  },
  faceContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 20
  },
  userImgCont: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  addImgCont: {
    backgroundColor: '#262E33',
    height: PixcelWidth(61),
    width: PixcelWidth(61),
    borderRadius: PixcelWidth(30),
    justifyContent: 'center',
    //marginLeft: PixcelWidth(15),
    overflow: 'hidden',
    //alignItems: 'center',
  },
  plusImg: {
    height: PixcelWidth(24),
    width: PixcelWidth(24),
    alignSelf: 'center',
  },
  videoContainer: {
     height:"100%",
     width:"100%",
    // flex:1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  thumbnailImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  btnContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-between',
  },
  shareBtn: {
    flex: 0.5,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 20,
    marginVertical: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: PixcelWidth(15),
    ...commonStyle.shadow,
    marginVertical: 2,
    shadowColor: 'rgba(0,0,0,0.2)',
  },
  saveBtn: {
    flex: 0.5,
    alignSelf: 'center',
    backgroundColor: color.btnPrimary_color,
    marginHorizontal: PixcelWidth(15),
    borderRadius: 20,
    borderWidth: 2,
    borderColor: color.btnPrimary_color,

    ...commonStyle.shadow,
    marginVertical: 2,
    shadowColor: 'rgba(0,0,0,0.2)',
  },
  shareBtnTxt: {
    fontSize: PixcelWidth(15),
    fontWeight: '600',
    color: color.txt_white,
    paddingVertical: 10,
    textAlign: 'center',
  },
  saveBtnTxt: {
    fontSize: PixcelWidth(15),
    fontWeight: '600',
    color: color.txt_white,
    paddingVertical: 10,
    textAlign: 'center',
  },
  badgeContainer: {
    backgroundColor: '#DA9F29',
    borderRadius: PixcelWidth(50),
    position: 'absolute',
    top: PixcelWidth(-10),
    right: PixcelWidth(-7),
  },
  badgeText: {
    color: color.txt_white,
    fontSize: FontSize.Small,
    fontWeight: '500',
    paddingHorizontal: PixcelWidth(10),
    paddingVertical: PixcelWidth(3),
  },
  videoInnerContainer: { flex: 1, backgroundColor: color._000000 },
  exploreImg: {
    tintColor: '#fff',
    marginRight: 10,
    height: PixcelWidth(20),
    width: PixcelWidth(20),
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#0d0908",
    alignItems: 'center'
  },
  loaderImag: {
    height: 160,
    width: 160,
  },
  progressTxt: {
    color: color.txt_white,
    fontFamily: font.MontserratSemibold,
    marginTop: 25,
    fontSize: 16
  },
  playPauseBtn: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    top: 0,
    right: 0,
    left: 0
  },
  playPauseBtnContainer: {
    height: wp,
    width: wp,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPauseBtnImg: {
    height: 40,
    width: 40,
    tintColor: "white",
  },
  cancelBtn: {
    backgroundColor: color.btnPrimary_color,
    paddingHorizontal: 7,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 50,
    width: 120
  },
  cancelBtnTxt: {
    color: color.txt_white,
    fontFamily: font.MontserratSemibold,
    fontSize: 16,
    textAlign: 'center',
  },
  swapBtn: {
    backgroundColor: color.btnPrimary_color,
    width: "90%",
    borderRadius: 20,
    paddingVertical: 12,
    marginVertical: 20,
    marginHorizontal: 10
  },
  swapBtnTxt: {
    color: color.txt_white,
    textAlign: "center",
    fontFamily: font.MontserratSemibold,
    fontSize: 16,
    textTransform: 'uppercase'
  }
});
export default styles;
