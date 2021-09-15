import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { Auth } from './StackNavigation';
import { color } from '../Theme';
import { isReadyRef, navigationRef } from '../Services/RootNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import analytics from '@react-native-firebase/analytics';
import { useCallback } from 'react';
import { AppEventsLogger } from 'react-native-fbsdk-next';
import App from '..';

const config = {
  initialRouteName: 'Home',
  screens: {
    VideoDetailsScreen: "hello/:_id"
  },
};

const linking = {
  prefixes: ['helloface://', "https://helloface.ai"],
  async getInitialURL() {

    const url = await Linking.getInitialURL();
    // alert(url)
    if (url != null) {
      return url;
    }

  },
  subscribe(listener) {
    const onReceiveURL = ({ url }) => listener(url);

    Linking.addEventListener('url', onReceiveURL);

    return () => {
      // Clean up the event listener
      Linking.removeEventListener('url', onReceiveURL);
    };
  },
  config,
};


function Navigation() {

  const routeNameRef = React.useRef();

  React.useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  React.useEffect(() => {
    changeNavigationColor()
  }, [])

  const changeNavigationColor = async () => {
    await changeNavigationBarColor('#181C1E');
  }

  return (
    <>
    
      <SafeAreaProvider>
       <StatusBar style="light" />
        <NavigationContainer
          ref={navigationRef}
          linking={linking}
          onReady={() => {
            isReadyRef.current = true;
          }}
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName = navigationRef.current.getCurrentRoute().name;

            
            if (previousRouteName !== currentRouteName) {
              await analytics().logScreenView({
                screen_name: currentRouteName,
                screen_class: currentRouteName,
              });
              AppEventsLogger.logEvent('Screen View',{
                screen_name: currentRouteName,
                screen_class: currentRouteName,
              })
              
            }
            routeNameRef.current = currentRouteName;
          }}
          
        >
          <Auth />
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
}

export default Navigation;
