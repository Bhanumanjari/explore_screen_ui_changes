import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { TextView } from '.';
import { smileLoader } from '../assets';
import { color } from '../Theme';
import { PixcelHeight, PixcelWidth } from '../Utils';
import Modal from "react-native-modal"
import { Bar as ProgressBar } from 'react-native-progress';
import { useEffect } from 'react';
import { useState } from 'react';

function ThemLoader(props) {

  return (
    <>
      <Modal
        isVisible={props.visible}
        animationIn="fadeIn"
        animationOut="fadeOut"
        style={styles.modalContainer}>
        <View style={styles.modal}>
          <FastImage
            style={styles.loaderImag}
            source={smileLoader}
            resizeMode={FastImage.resizeMode.contain}
          // tintColor={"rgba(0, 0, 0, 0)"}
          />
          <TextView style={styles.cancelTxt} onPress={() => {
            props.cancelRequest()
          }}>Cancel</TextView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    // justifyContent: "flex-start",
    alignItems: 'center'
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  view: {
    width: wp("28%"),
    height: wp("28%"),
    borderRadius: wp("14%"),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelTxt: {
    fontSize: wp('5%'),
    color: color.txt_white,
    textAlign: 'center',
    textDecorationLine: 'underline',
    position: 'absolute',
    bottom: 50
  },
  loaderImag: {
    height: 200,
    width: 200,
  },
  progress: {
    alignSelf: 'center'
  }
});

export default ThemLoader
