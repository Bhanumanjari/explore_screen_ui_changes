import { Dimensions, StyleSheet } from 'react-native';
import { color, font } from 'app/Theme';
import { FontSize, PixcelHeight, PixcelWidth } from '../../../Utils';
const wp = Dimensions.get('window').width;
const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: color.primary_color,
    // paddingHorizontal: 20,
    flex: 1,
    //alignItems:'center'
  },
  header: {
    backgroundColor: color.primary_color,
    borderBottomColor: color.primary_color,
  },
  find: {
    flex: 0.8,
    justifyContent: 'center',
    alignSelf: 'center',
    height: 25,
    width: 25,
  },
  findIcon: { height: 30, width: 30, resizeMode: 'contain' },
  filter: {
    marginTop: 8,
    marginRight: 8,
    alignSelf: 'center',
    height: 25,
    width: 25,
  },
  filterIcon: { height: 30, width: 30, resizeMode: 'contain' },

  inputTxtCont: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    backgroundColor: '#3E464A',
    borderRadius: 30,
    marginHorizontal: 15,
  },
  inputTxt: {
    flex: 4,
    fontFamily: font.MontserratRegular,

    marginLeft: 15,
    fontSize: 15,
    color: '#FFF',
  },
  serchTab: {
    marginTop: PixcelWidth(15),
    flexDirection: 'row',
  },
  serchTabTxt: {
    fontSize: PixcelWidth(13),
    fontFamily: font.MontserratBold,
    alignSelf: 'center',
  },
  user: {
    flexDirection: 'row',
    //justifyContent:'space-between',
    //alignItems: 'center',
    marginTop: PixcelWidth(21),
  },
  userImg: {
    height: PixcelWidth(168),
    width: PixcelWidth(116),
    borderRadius: PixcelWidth(15),
    //alignSelf:'center',
    resizeMode: 'contain',
  },
  detailsCont: {
    marginLeft: PixcelWidth(21),
    flex: 1,
    justifyContent: 'space-between',
  },
  titleTxt: {
    fontSize: PixcelWidth(20),
    fontFamily: font.MontserratBold,
    color: color.txt_white,
  },

  numberCont: {
    marginTop: PixcelWidth(10),
    backgroundColor: '#202A2F',
    borderRadius: PixcelWidth(16),
    height: PixcelWidth(34),
    width: PixcelWidth(34),
    //alignItems:'center',
    justifyContent: 'center',
  },
  numberContTxt: {
    alignSelf: 'center',
    color: color.txt_white,
    fontSize: PixcelWidth(13),
    fontFamily: font.MontserratRegular,
  },
  rateCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: PixcelWidth(8),
  },

  heartImg: {
    height: PixcelWidth(14),
    width: PixcelWidth(16),
    tintColor: '#FFF',
  },
  heartImgTxt: {
    marginLeft: PixcelWidth(10),
    fontSize: PixcelWidth(13),
    fontFamily: font.MontserratRegular,
    color: color.txt_white,
  },
  starImg: {
    marginLeft: PixcelWidth(31),
    height: PixcelWidth(17),
    width: PixcelWidth(17),
    tintColor: '#FFF',
  },
  starImgTxt: {
    marginLeft: PixcelWidth(10),
    fontSize: PixcelWidth(13),
    fontFamily: font.MontserratRegular,
    color: color.txt_white,
  },
  searchTitleTxt: {
    fontSize: FontSize.Small,
    fontFamily: font.MontserratRegular,
    color: color.txt_white,
    fontWeight: '600'
  },
  filterContainer: {
    marginVertical: PixcelWidth(20),
    // marginHorizontal: 20
  },
  tagContainer: {
    backgroundColor: color.primary_color_dark,
    marginRight: PixcelWidth(7),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: color.txt_white,
    paddingHorizontal: PixcelWidth(7),
    marginVertical: PixcelWidth(7)
  },
  tagTxt: {
    color: color.txt_white,
    padding: PixcelWidth(7)
  },
  searchContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: PixcelWidth(10)
  },
  flatlistCont: {
    backgroundColor: color.primary_color,
  },
});
export default styles;
