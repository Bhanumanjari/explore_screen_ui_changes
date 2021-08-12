import React, {Component} from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';
import {PixcelWidth} from '../../Utils';

const Loader = (props) => {
  const {loading} = props;
  return (
    <Modal visible={loading} transparent={true}>
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.50)',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: PixcelWidth(80),
            width: PixcelWidth(80),
            borderRadius: PixcelWidth(40),
            alignItems:'center',
            justifyContent:'center',
            backgroundColor: 'white',
          }}>
          <FastImage
            style={{
              height: PixcelWidth(40),
              width: PixcelWidth(60),
              marginBottom: 10,
            }}
            source={require('./../../assets/animated-loader.gif')}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({});
export default Loader;
