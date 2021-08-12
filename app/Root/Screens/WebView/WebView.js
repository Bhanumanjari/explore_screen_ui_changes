import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  ActivityIndicator,
  BackHandler,
  StyleSheet,
} from 'react-native';
import {Container} from 'native-base';
import {TextView, Hbutton, MainHeader} from 'app/Component';
import {WebView} from 'react-native-webview';
import {color, font} from '../../../Theme';
import FastImage from 'react-native-fast-image';
import {PixcelWidth} from '../../../Utils';

const WebViewComponent = (props) => {
  const {title, url} = props.route?.params;
  return (
    <Container>
      <MainHeader
        title={title}
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={styles.mainLayout}>
        <View style={styles.subtxtCont}>
          <WebView
            showsVerticalScrollIndicator={false}
            source={{uri: url}}
            mediaPlaybackRequiresUserAction={true}
            style={styles.termsView}
            startInLoadingState={true}
            renderLoading={() => (
              <View style={styles.webViewLoader}>
                <View style={styles.loaderContainer}>
                  <FastImage
                    style={styles.loaderImage}
                    source={require('./../../../assets/animated-loader.gif')}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: color.primary_color,
    flex: 1,
  },
  titleTxt: {
    fontSize: 16,
    fontFamily: font.MontserratBold,
    color: color.txt_white,
    paddingHorizontal: 20,
    marginTop: '10%',
  },
  subtxtCont: {
    paddingHorizontal: 20,
    marginBottom: 30,
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
});

export default WebViewComponent;
