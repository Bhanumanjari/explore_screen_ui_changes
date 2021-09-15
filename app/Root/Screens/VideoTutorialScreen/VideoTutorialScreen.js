import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, ImageBackground, View, Text, Dimensions } from 'react-native';
import styles from './VideoTutorialScreenStyles';
import { delay } from '../../../Utils/globalFun';
import splash from 'react-native-splash-screen';
import FastImage from 'react-native-fast-image';
import { TextView } from '../../../Component';
import { Video, AVPlaybackStatus } from 'expo-av';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationHelpersContext } from '@react-navigation/core';
import { color } from 'app/Theme'
import { font } from '../../../Theme';
import { SafeAreaView } from 'react-native-safe-area-context';

function VideoTutorial({navigation}){

    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
  
    return (
      
      <SafeAreaView style={styles.container1} >
      

          <Video 
            ref = {video}
            style ={{
                //margin:4,
                //padding: 10,
                height: 0.8*Dimensions.get('window').height,
                width: 0.8*Dimensions.get('window').width,
                borderRadius: 20,
                borderStyle: 'solid',
                borderWidth: 5,
                borderColor: color.btnPrimary_color,
                //position: 'absolute',
                position: 'relative',
                top: 50,
                elevation: 8
                
                
            }}
            //source ={  require('../../../assets/videoTutorial.mp4') }
            source={{
                uri: 'https://hellofacetemporarybucket.s3.ap-south-1.amazonaws.com/VideoTutorial.mp4',
              }}
            shouldPlay
            //resizeMode ={ 'contain'}
            resizeMode = { 'contain' }
            isLooping
            onPlaybackStatusUpdate = { status => setStatus(()=>status) }
          />
          <TouchableOpacity 

            style={{

                marginTop: 80,
                marginBottom: 15,

                height: 50,
                width: 0.8*Dimensions.get('window').width,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: color.btnPrimary_color,
                //backgroundColor: 'red',
                
                
                //marginTop: 0.8*Dimensions.get('window').height+50,
                elevation: 1

                //top: 0.8*Dimensions.get('window').height 
            }}
            
            onPress={ ()=>{ navigation.push('LoginScreen') } }
             
          >
            
            <Text
              style={{
                color: color.txt_white,
                fontFamily: font.MontserratSemibold,
                fontSize: 20
              }}
            > Get Started </Text>
            
            </TouchableOpacity>


        
      
      </SafeAreaView>
    );
  
}


export default VideoTutorial ;
/*

<FastImage style={styles.logo} source={splash_logo} resizeMode={FastImage.resizeMode.contain} />
        <TextView style={styles.logoTxt}>HELLOS</TextView>
        <FastImage style={styles.imageLayer} source={splashBottomLayer} resizeMode={"stretch"}>
          <FastImage style={styles.imageStyle} source={splash_bottom} resizeMode={FastImage.resizeMode.stretch} />
        </FastImage>

*/