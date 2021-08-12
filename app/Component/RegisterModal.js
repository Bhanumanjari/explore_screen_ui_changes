import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Modal, StyleSheet, View, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TextView} from '.';
import {close as closeImageBtn, warning} from '../assets';
import {color} from '../Theme';
import {FontSize, PixcelWidth} from '../Utils';

function RegisterModal({visible, close}) {
  const navigation = useNavigation();
  const register = () => {
    close();
    navigation.navigate('SignupScreen');
  };

  return (
    <>
      <Modal visible={visible} style={{}} transparent>
        <View style={styles.modal}>
          <View style={styles.subContainer}>
            <Pressable style={{alignSelf: 'flex-end'}} onPress={close}>
              <FastImage
                style={styles.closeIcon}
                source={closeImageBtn}
                resizeMode={FastImage.resizeMode.contain}
              />
            </Pressable>
            <FastImage
              style={styles.warningIcon}
              source={warning}
              resizeMode={FastImage.resizeMode.contain}
            />
            <TextView style={styles.oppsTxt}>Opps!</TextView>
            <TextView style={styles.shareTxt}>
              You have exceeded the limit of face swapping!
            </TextView>

            <TextView style={styles.shareTxt}>
              Please register to continue..
            </TextView>

            <View style={styles.btnContainer}>
              <Pressable onPress={register} style={styles.publicBtn}>
                <TextView style={styles.btntnTxt}>REGISTER</TextView>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  subContainer: {
    backgroundColor: color.primary_color_dark,
    paddingHorizontal: PixcelWidth(15),
    borderTopRightRadius: PixcelWidth(25),
    borderTopLeftRadius: PixcelWidth(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareTxt: {
    fontWeight: '600',
    color: color.txt_white,
    fontSize: FontSize.Small,
    marginVertical: PixcelWidth(5),
    textAlign: 'center',
  },
  socialView: {
    marginRight: PixcelWidth(15),
  },
  socialIcon: {
    height: PixcelWidth(61),
    width: PixcelWidth(61),
  },
  horizontalLine: {
    height: PixcelWidth(1),
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginVertical: PixcelWidth(5),
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginVertical: PixcelWidth(20),
  },
  publicBtn: {
    flex: 0.5,
    alignSelf: 'center',
    borderColor: '#fff',
    borderRadius: 20,
    marginHorizontal: PixcelWidth(5),
    backgroundColor: color.btnPrimary_color,

    elevation: 1,
    marginVertical: 2,
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0.8,
  },
  btntnTxt: {
    fontSize: PixcelWidth(15),
    color: color.txt_white,
    paddingVertical: 10,
    textAlign: 'center',
  },
  closeIcon: {
    height: PixcelWidth(26),
    width: PixcelWidth(26),
    alignSelf: 'flex-end',
    marginHorizontal: PixcelWidth(12),
    marginVertical: PixcelWidth(18),
  },
  oppsTxt: {
    fontSize: PixcelWidth(20),
    fontWeight: '600',
    color: color.txt_white,
    textAlign: 'center',
  },
  warningIcon: {
    height: PixcelWidth(52),
    width: PixcelWidth(52),
    marginVertical: PixcelWidth(18),
  },
});
export default RegisterModal;
