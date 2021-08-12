import { StyleSheet } from 'react-native';
import { color, font } from 'app/Theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { FontSize, PixcelWidth } from '../../../../Utils';

const styles = StyleSheet.create({
  listtitle: {
    marginLeft: PixcelWidth(25),
    marginTop: PixcelWidth(15),
    marginBottom: PixcelWidth(5),
    fontFamily: font.MontserratSemibold,
    color: 'white',
    fontSize: PixcelWidth(15),
  },
  subContainer: {
    backgroundColor: color.primary_color,
    marginTop: PixcelWidth(15),
  },
  flatlistCont: {
    backgroundColor: color.primary_color,
  },
  inputTxtCont: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // marginTop: 20,
    backgroundColor: '#3E464A',
    borderRadius: 30,
    marginHorizontal: 15,
    height: PixcelWidth(51),
  },
  inputTxt: {
    flex: 4,
    fontFamily: font.MontserratRegular,

    marginLeft: 15,
    fontSize: 15,
    color: '#FFF',
  },
  searchHereText: {
    fontFamily: font.MontserratRegular,
    marginHorizontal: PixcelWidth(20),
    fontSize: PixcelWidth(15),
    color: color.secondary,
  },
  mainLayout: {
    backgroundColor: color.primary_color,
    padding: 15,
  },
  bottomTab: {
    flexDirection: 'row',
    bottom: 40,
    position: 'absolute',
    padding: 15,
    paddingRight: 40,
    width: '90%',
    borderRadius: 35,
    alignItems: 'center',
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: color.primary_color,
    borderBottomColor: color.primary_color,
  },
  find: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: PixcelWidth(15),
  },
  findIcon: { height: 30, width: 30, resizeMode: 'contain' },
  filter: {
    // marginTop: 8,
    marginRight: 15,
    alignSelf: 'center',
  },
  filterIcon: { height: 30, width: 30, resizeMode: 'contain' },
  searchContainer: {
    flex: 1,
    justifyContent: 'center',
    // marginHorizontal: 15
  },
});
export default styles;
