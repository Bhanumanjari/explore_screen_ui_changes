import React, { Component, useContext } from 'react';
import { connect } from 'react-redux';
import { Image, ImageBackground, View, Text, Dimensions } from 'react-native';
import styles from './SplashScreenStyle';
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
import { signupGuest } from '../../../store/signUp/actions';
import { checkUserNameAvaibility, saveUserNameAvaibility, setUserNameAvaibilityLoader } from '../../../store/profile';
import { validateUserName } from '../../../Utils/globalFun';
import { debounce } from 'lodash';
import AuthContext from '../../../context/AuthContext';
import analytics from '@react-native-firebase/analytics';


//import Randomstring from 'randomstring';
import { getUniqueId, getManufacturer } from 'react-native-device-info';



//let deviceId = getUniqueId() ;
//console.log("unique/id = ", deviceId) ;


function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}




class SplashScreen extends React.Component{
  constructor(props){
    super(props) ;
    this.video = React.createRef(null) ;
  }
  state = {
    status: {},
  }
    
  
  render(){
    return (
      
      <SafeAreaView style={styles.container1} >
      

          <Video 
            ref = {this.video}
            style ={{
                //margin:4,
                //padding: 10,
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
                //borderRadius: 20,
                //borderStyle: 'solid',
                //borderWidth: 5,
                //borderColor: color.btnPrimary_color,
                //position: 'absolute',
                //position: 'relative',
                //top: 50,
                //elevation: 8
                
                
            }}
            //source ={  require('../../../assets/videoTutorial.mp4') }
            source={require('../../../assets/splashGif.mp4')}
            shouldPlay
            //resizeMode ={ 'contain'}
            resizeMode = { 'cover' }
            isLooping
            onPlaybackStatusUpdate = { status => this.setState({status: status}) }
          />
         
        
      
      </SafeAreaView>
    );
  }
  
}


export default SplashScreen ;
