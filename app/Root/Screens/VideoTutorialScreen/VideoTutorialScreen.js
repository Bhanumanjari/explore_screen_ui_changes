import React, { Component, useContext } from 'react';
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




class VideoTutorial extends React.Component{

    static contextType = AuthContext
    constructor(props){
      super(props) ;
      this.video = React.createRef(null) ;
    }
    state = {
      status: {},
    }
    //const video = React.useRef(null);
    //const [status, setStatus] = React.useState({});

    checkAvailibility = (name) => {
          this.props.checkUserNameAvaibility({
              username: name
          })
    }
    
    pressed = () => {
      console.log("pressed and registering guest user")
      const length = Math.floor(Math.random()*4) + 4 ;
      let randomuser = makeid(12) ;
      randomuser = "USER_" + randomuser ;
      let deviceId = getUniqueId() ;
      let password = deviceId ;
      console.log("random user name = ",randomuser) ;
      this.registerAccount({username:randomuser,password: password}) ;

      
    }
    pressed2 = () => {
      this.props.navigation.push('SignupScreen') ;
    }
    registerAccount = ({username,password}) => {
      console.log("in register account") ;
      
      this.props.signupGuest(
        { username: username, password: password },
        {
          onSuccess: () => {
            
            console.log("succesfully registered") ;
            this.context.setInitialRouteName("LanguageScreen")
            this.context.setIsSignIn(true)
            analytics().logSignUp({
              method: "guest"
            })
          },
          onError: () => {
            //this.props.stopLoading();
          },
        },
      );
    };


  
  render(){
    return (
      
      <SafeAreaView style={styles.container1} >
      

          <Video 
            ref = {this.video}
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
            onPlaybackStatusUpdate = { status => this.setState({status: status}) }
          />
          <TouchableOpacity 

            style={{

                marginTop: 65,
                marginBottom: 20,

                height: 40,
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
            onPress={ this.pressed }
            //onPress={ ()=>{ this.props.navigation.push('LoginScreen') } }
            
             
          >
            
            <Text
              style={{
                color: color.txt_white,
                fontFamily: font.MontserratSemibold,
                fontSize: 20
              }}
            > Get Started </Text>
            
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginBottom: 5,
                height: 40,
                borderRadius: 25,
                width: 0.8*Dimensions.get('window').width,
                
                backgroundColor: color.btnPrimary_color,
                alignItems: 'center',
                justifyContent: 'center',
                elevation:1,
                
                
              }}
              onPress={()=> {this.props.navigation.navigate('SignupScreen',{
                component:{
                  options:{
                    animations:{
                      push:{
                        waitForRender: true
                      }
                    }
                  }
                }
              }) }}
            >

            
            
            <Text
              style={{
                color: color.txt_white,
                fontFamily: font.MontserratSemibold,
                fontSize: 20,
                
              }}
            > Create account or Login </Text>
            
            </TouchableOpacity>



        
      
      </SafeAreaView>
    );
  }
  
}

const mapActionCreators = { checkUserNameAvaibility, setUserNameAvaibilityLoader, saveUserNameAvaibility, signupGuest };

const mapStateToProps = (state) => {
    return {
        userNameAvaibility: state.profile.userNameAvaibility,
        isUserNameValidating: state.profile.isUserNameValidating,
        userNameErrorMessage: state.profile.userNameErrorMessage,
    };
};


export default connect(mapStateToProps,mapActionCreators)(VideoTutorial) ;
