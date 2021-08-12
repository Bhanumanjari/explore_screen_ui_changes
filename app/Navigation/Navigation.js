import React, { Component } from 'react';
import { Text, View, StatusBar, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { Auth } from './StackNavigation';
import { color } from '../Theme';
import { isReadyRef, navigationRef } from '../Services/RootNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
  React.useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);
  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor={color.primary_color} />
      <SafeAreaProvider>
        <NavigationContainer
          ref={navigationRef}
          linking={linking}
          onReady={() => {
            isReadyRef.current = true;
          }}>
          <Auth />
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
}

export default Navigation;
