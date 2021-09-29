import React, { Component } from 'react';
import { ActivityIndicator, Image, TextInput, TouchableOpacity, View, Text, Platform, } from 'react-native';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import styles from './SignupScreenStyle';
import { MainHeader, TextView } from 'app/Component';
import { award, g49 } from '../../../assets';

import { forgotPassword, loginUser } from 'app/store/login';
import { checkUserName } from '../../../Services/authApiServices';
import { debounce } from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
import { showBottomToast } from '../../../Utils';
import { checkUserNameAvaibility, saveUserNameAvaibility, setUserNameAvaibilityLoader } from '../../../store/profile';
import { validateUserName } from '../../../Utils/globalFun';
import { getUniqueId, getManufacturer } from 'react-native-device-info';
import { signup } from '../../../store/signUp/actions';
import { bindActionCreators } from 'redux';
import { apiLoadingStart, apiLoadingStop } from '../../../store/global/actions';
import AuthContext from '../../../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from '../../../Theme';
import { font } from 'app/Theme';
import analytics from '@react-native-firebase/analytics';
//let deviceId = getUniqueId() ;

import { signupGuest } from '../../../store/signUp/actions'
import BackButton from '../../../Component/BackButton';

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
  


class SignupScreen extends Component {

    static contextType = AuthContext
    state = {
        userName: "",
        guest: false,
        //password: deviceId,
        //error: false,
        //errorMessage: ""
    }

    checkAvailibility = debounce(() => {
        // checkUserName({ username: this.state.userName }).then(res => {
        //     if (res) {
        //         this.setState({
        //             error: false,
        //             errorMessage: ''
        //         })
        //     }
        // }).catch(err => {
        //     console.log(err)
        //     this.setState({
        //         error: true,
        //         errorMessage: this.state.userName === "" ? "" : `${this.state.userName} username is already taken.`
        //     })
        // })
        if (this.state.userName !== '') {
            this.props.checkUserNameAvaibility({
                username: this.state.userName
            })
        }
    }, 500)

    componentDidMount = ()=>{
        try{
            let guestTry = this.props.user.isGuest ;
            if(guestTry!=undefined){
                this.setState({
                    guest: true
                })
            }else{
                this.setState({
                    guest: false
                })
            }
        }catch{

        }
        this.setHeader() ;
    }

    componentWillUnmount = () => {
        this.props.saveUserNameAvaibility(true)
        this.props.setUserNameAvaibilityLoader(false)
    }

    onGo = () => {
        //this.registerGuest() ;
        //this.registerAccount({username:"Hellotestagain",password:'123456'}) ;
        //return ;

        if (this.state.userName === "") {
            showBottomToast("Username is not allowed to be empty")
            return
        }

        if (!validateUserName(this.state.userName)) {
            showBottomToast("Username you entered is not valid")
            return
        }

        if (!this.props.userNameAvaibility) {
            showBottomToast('Username is already taken')
            return
        }

        if (this.props.isUserNameValidating) {
            showBottomToast('Please wait we are validating username')
            return
        }
        //this.registerAccount();

        this.props.navigation.navigate('SignupMoreDetails', {
            userName: this.state.userName
        });
    }
    registerGuest = () =>{
      let length = Math.floor(Math.random()*4) + 4 ;  
      let randomuser = makeid(12) ;
      randomuser = "USER_" + randomuser ;
      let deviceId = getUniqueId() ;
      let password = deviceId ;
      console.log("random user name = ",randomuser) ;
      this.registerAccount({username:randomuser,password: password}) ;


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
              //this.props.navigation.replace('LanguageScreen') ;
              this.props.navigation.reset({
                  routes: [{name: "LanguageScreen"}]
              })
            },
            onError: () => {
              //this.props.stopLoading();
            },
          },
        );
      };

      setHeader = () => {
        this.props.navigation.setOptions({
          headerShown: true,
          headerTransparent: true,
          title: "",
          /*title: "Register" ,
          headerTitleStyle: {
            fontFamily: font.MontserratBold,
            fontSize: 22,
            color: 'white',
            alignItems: 'flex-start',  
            justifyContent: 'flex-start',
            fontWeight: 'bold',
            transform : [{
              translateX: -100
            }] ,
          },*/
          headerRight: ()=>{
              return(
                (this.state.guest === false)?
                <TouchableOpacity
                style = {{
                    height: 30,
                    width: 75,
                    borderRadius: 25,
                    backgroundColor: color.btnPrimary_color,
                    marginRight: 10,
                    marginTop: 15,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress = {()=>{this.registerGuest();}}
            >                         
                <Text
                    style = {{
                        fontSize: 20,
                        color: 'white',
                        fontWeight: 'bold'    
                    }}
                >
                    Skip
                    </Text>
            </TouchableOpacity>:null
                
              )

          },
          headerLeft: ()=> <BackButton/>

        }
        );


    }
      
  
    

    render() {
        return (
            
            <KeyboardAwareScrollView style={styles.container}>
                <View>
                    {
                        <View
                            style={{
                                marginTop: 40 ,
                                marginLeft: 50,
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start'
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 22,
                                    color: 'white',
                                    fontFamily: font.MontserratBold,
                                }}
                            >
                                Register 
                            </Text>
                        </View>
                    }
                   
                    <View style={styles.mainLayout}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.line, { borderColor: '#4F45BC', width: 10 }]}></View>
                            <View style={styles.line2}></View>
                        </View>
                        <Image style={styles.users} source={g49} />

                        <View style={styles.bottomCont}>
                            <TextView style={styles.subTxt}>Please Enter a unique Hellos Username</TextView>
                            <View style={styles.inputCont}>
                                <View style={styles.inputTxtCont}>
                                    <Image source={award}
                                        style={styles.awardImg} />
                                    <TextInput
                                        style={styles.inputTxt}
                                        placeholder="Username"
                                        placeholderTextColor="#FFFFFF50"
                                        value={this.state.userName}
                                        onChangeText={(text) => {
                                            this.setState({
                                                userName: text.trim()
                                            }, () => {
                                                if (this.state.userName !== "")
                                                    this.checkAvailibility()
                                            })
                                        }}
                                        onEndEditing={() => {
                                            this.checkAvailibility && this.checkAvailibility.flush()
                                        }}
                                        maxLength={15}
                                        autoCapitalize={"none"}
                                    />
                                    <ActivityIndicator
                                        style={styles.userNameLoader}
                                        animating={this.props.isUserNameValidating}
                                    />
                                </View>
                            </View>
                            {/* <TextView style={styles.hintTxt}>{this.state.errorMessage}</TextView> */}
                            {!this.props.userNameAvaibility && this.state.userName !== '' && <TextView style={styles.hintTxt}>{`${this.props.userNameErrorMessage}`}</TextView>}
                            <TouchableOpacity style={styles.acceptBtn}
                                onPress={() => {
                                    this.onGo()
                                }}
                            >
                                <TextView style={styles.acceptBtnTxt}>GO</TextView>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                
                {
                /*<View
                    style={{
                        position:'absolute',
                        bottom: 10,
                        right: 50
                    }}
                >
                    <TouchableOpacity
                    >
                        
                        <TextView
                            style = {{
                                color: 'white',
                            }}
                        >
                            { 'skip>>' }
                        </TextView>
                    </TouchableOpacity>
                </View>*/
                }
                <View>
                    <View
                        style = {{
                            flex: 1,
                            flexDirection: 'row',
                            padding: 5,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                    <Text
                        style = {{
                            color: 'white',
                            fontSize: 20
                        }}
                    >
                        Already a member ?
                    </Text>
                    <TouchableOpacity
                      style = {{
                          marginLeft: 5
                      }}
                      onPress={()=>{this.props.navigation.navigate('LoginScreen')}}
                    >
                        
                        <Text
                            style ={{
                                color: '#19FF7D',
                                //color: '#FF00FF',
                                
                                fontWeight: 'bold',
                                fontSize: 20,
                                textDecorationLine : 'underline'


                            }}
                        >
                            Login
                        </Text>
                    </TouchableOpacity>
                    </View>
                </View>
                
            </KeyboardAwareScrollView>
            
            
        );
    }
}

/*const mapActionCreators = (dispatch)=> ({ checkUserNameAvaibility, setUserNameAvaibilityLoader, saveUserNameAvaibility,
    //startLoading: bindActionCreators(apiLoadingStart, dispatch),
    //stopLoading: bindActionCreators(apiLoadingStop, dispatch),
    //signup: bindActionCreators(signup, dispatch),
});

const mapStateToProps = (state) => {
    return {
        userNameAvaibility: state.profile.userNameAvaibility,
        isUserNameValidating: state.profile.isUserNameValidating,
        userNameErrorMessage: state.profile.userNameErrorMessage,
        //loading: state.login.loading,
        //login: state.login.data,
    };
};*/

const mapActionCreators = { checkUserNameAvaibility, setUserNameAvaibilityLoader, saveUserNameAvaibility, signup, signupGuest };

const mapStateToProps = (state) => {
    return {
        userNameAvaibility: state.profile.userNameAvaibility,
        isUserNameValidating: state.profile.isUserNameValidating,
        userNameErrorMessage: state.profile.userNameErrorMessage,
        user: state.login.data,
    };
};
export default connect(mapStateToProps, mapActionCreators)(SignupScreen);
