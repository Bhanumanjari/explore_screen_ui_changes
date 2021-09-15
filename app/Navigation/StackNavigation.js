import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../Root/Screens/SplashScreen';
import LoginScreen from '../Root/Screens/LoginScreen';
import RegisterScreen from '../Root/Screens/RegisterScreen';
import MainScreen from '../Root/Screens/MainScreen/MainScreen';
import OtpScreen from '../Root/Screens/OtpScreen/OtpScreen';
import ForgotPasswordScreen from '../Root/Screens/ForgotPasswordScreen/ForgotPasswordScreen';
import SendEmailScreen from '../Root/Screens/SendEmailScreen/SendEmailScreen';
import InfoScreen from '../Root/Screens/InfoScreen/InfoScreen';
import TermsScreen from '../Root/Screens/TermsScreen/TermsScreen';
import SignupScreen from '../Root/Screens/SignupScreen/SignupScreen';
import SignupMoreDetails from '../Root/Screens/SignupMoreDetails/SignupMoreDetails';
import SignupScreen2 from '../Root/Screens/SignupScreen2/SignupScreen2';
import SignupScreen3 from '../Root/Screens/SignupScreen3/SignupScreen3';
import SignupScreen4 from '../Root/Screens/SignupScreen4/SignupScreen4';
import PrefrenceScreen from '../Root/Screens/PrefrenceScreen';
import ForgotPasswordScreen1 from '../Root/Screens/ForgotPasswordScreen1/ForgotPasswordScreen1';
import ProfileDetailsScreen from '../Root/Screens/ProfileDetailsScreen/ProfileDetailsScreen';
import ReqAcceptScreen from '../Root/Screens/ReqAcceptScreen/ReqAcceptScreen';
import RequestScreen from '../Root/Screens/RequestScreen/RequestScreen';
import SearchedScreen from '../Root/Screens/SearchedScreen/SearchedScreen';
import SearchedUserScreen from '../Root/Screens/SearchedUserScreen/SearchedUserScreen';
import { TabNavigation } from './TabNavigation';
import { DashboardTab } from '../Root/Screens/DashboardScreen/DashboardScreen';
import PhotoClick from '../Root/Screens/PhotoClickScreen/PhotoClick';
import ResetPasswordScreen from './../Root/Screens/ResetPasswordScreen'
import Language from '../Root/Screens/Language/Language';
import { createContext } from 'react';
import { useMemo } from 'react';
import { getData } from '../Config/asyncStorage';
import { useDispatch } from 'react-redux';
import { setAccessToken, setProfile } from '../store/login';
import { fetchMe } from '../Services/homeServices';
import { accessToken, isTermsSelected, userData } from '../Utils/storageKeys';
import { delay } from '../Utils/globalFun';
import AuthContext from '../context/AuthContext';
import WebViewComponent from '../Root/Screens/WebView/WebView';
import { getForMeVideo, getTrendingVideo } from '../store/home';
import { getAppConfig } from '../store/global';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import { enableScreens } from 'react-native-screens';
import VideoTutorial from '../Root/Screens/VideoTutorialScreen/VideoTutorialScreen' ;


enableScreens();

//const Stack = createSharedElementStackNavigator() ;

const Stack = createStackNavigator( );

export const Auth = () => {

    const dispatch = useDispatch()
    const [isSignIn, setIsSignIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [initialRouteName, setInitialRouteName] = useState(undefined)

    useEffect(() => {
        dispatch(getAppConfig())
    }, [])

    useEffect(() => {
        getSession()
    }, [])

    const getSession = () => {
        getData(userData)
            .then((res) => {
                if (res) {
                    const userData = JSON.parse(res);
                    setToken(userData);
                } else {
                    redirectToVideoTutorial();
                    //redirectToLogin();
                }
            })
            .catch((err) => {
                console.log(err);
                redirectToVideoTutorial();
                //redirectToLogin();
            });
    };

    const setToken = (userData) => {
        getData(accessToken)
            .then((token) => {
                if (token) {
                    dispatch(setProfile(userData))
                    dispatch(setAccessToken(token))
                    setSession(userData);
                    // fetchMe().then(res => {
                    //     if (res) {
                    //     }
                    // })
                } else {
                    //redirectToVideoTutorial();
                    redirectToLogin();
                }
            })
            .catch((err) => {
                console.log(err);
                redirectToLogin();
            });
    };

    const redirectToVideoTutorial = async ()=>{
        setInitialRouteName("VideoTutorialScreen") ;
        await delay(1000) ;
        setIsLoading(false) ;
    };

    const redirectToLogin = async () => {
        // getData(isTermsSelected).then(res => {
        //     if (res && res === 'true') {
        //         setInitialRouteName("LoginScreen")
        //     } else {
        //         setInitialRouteName('TermsScreen')
        //     }
        // }).catch(err => {
        //     setInitialRouteName('TermsScreen')
        // }).finally(async () => {
        //     await delay(1000);
        //     setIsLoading(false)
        // })
        await delay(1000);
        setIsLoading(false)
    };

    const setSession = async (userData) => {
        if (!userData.faces || userData.faces.length < 1) {
            setInitialRouteName("PhotoClickScreen")
        } else if (!userData.languages || userData.languages.length < 1) {
            setInitialRouteName("LanguageScreen")
        } else {
            setInitialRouteName("Home")
        }

        setIsSignIn(true)
        dispatch(getForMeVideo('?forme=true'))
        dispatch(getTrendingVideo('?isTrending=true'))
        await delay(1000);
        setIsLoading(false)
    };

    const authValue = useMemo(() => ({
        setIsSignIn,
        setInitialRouteName,
        isSignIn,
        initialRouteName
    }))

    if (isLoading) {
        //return <VideoTutorial />
        return <SplashScreen />
    }

   
    // console.log("Auth:::::::", isSignIn)
    return (
        <AuthContext.Provider value={authValue}>

            {!isSignIn ? <Stack.Navigator
                // initialRouteName={initialRouteName}
                screenOptions={{
                    headerShown: false,
                    presentation: 'card',
                    animationEnabled: true,
                    cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid
                    
                }}
                
                
            >
                <Stack.Screen name="VideoTutorialScreen" component={VideoTutorial} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="InfoScreen" component={InfoScreen} />
                <Stack.Screen name="TermsScreen" component={TermsScreen} />
                <Stack.Screen name="SignupScreen" component={SignupScreen} />
                <Stack.Screen name="ForgotPassword1" component={ForgotPasswordScreen1} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                <Stack.Screen name="VerifyPhoneNumber" component={SignupScreen4} />
                <Stack.Screen name="PhoneNumber" component={SignupScreen3} />
                <Stack.Screen name="VerifyEmail" component={SignupScreen2} />
                <Stack.Screen name="SignupMoreDetails" component={SignupMoreDetails} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="OtpScreen" component={OtpScreen} />
                <Stack.Screen name="SendEmail" component={SendEmailScreen} />
                <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
                <Stack.Screen
                    name="WebViewComponentScreen"
                    component={WebViewComponent}
                />
            </Stack.Navigator> :
                <DashboardTab />
            }


        </AuthContext.Provider>
    );
};

