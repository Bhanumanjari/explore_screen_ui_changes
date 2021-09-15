import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
// import {createBottomTabNavigator, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import DashboardTab from '../Root/Screens/HomeScreen/DashboardTab';
import RewardTab from '../Root/Screens/HomeScreen/Tab2';
import ScanQRTab from '../Root/Screens/HomeScreen/Tab3';

import SettingTab from '../Root/Screens/HomeScreen/Tab4';
import { HBottomTabBar } from 'app/Component'
import {
  iconDashboard,
  iconProfilefooter,
  iconReward,
  iconScanner,
  iconSettings,
} from 'app/assets';
// import {color} from 'app/Theme';
// import cs from 'app/CommonStyle';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const TabNavigation = () => {
  const Tab = createBottomTabNavigator({
    animationEnabled: true,

  });
  return (
    <Tab.Navigator
      // tabBar = {(props) => <HBottomTabBar {...props} />}
      
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          //   let iconName;
          //   let iconColor;
          //   let iconType;
          let tabTitle = 'Test';
          let imgSource;
          if (route.name === 'DashboardTab') {
            imgSource = iconDashboard;
          } else if (route.name === 'RewardTab') {
            imgSource = iconSettings;
          } else if (route.name === 'ScanQRTab') {
            imgSource = iconSettings;
          } else if (route.name === 'SettingTab') {
            imgSource = iconSettings;
          }
          // You can return any component that you like here!
          return (
            <>
              {/* <Icon
                type={iconType}
                name={iconName}
                // size={size}
                style={{color: iconColor}}
              />
              <Text style={{color: iconColor, fontWeight: '900'}}>
                {tabTitle}
              </Text> */}
              {focused ? (
                <View
                  style={{
                    backgroundColor: 'gray',
                    flexDirection: 'row',
                    padding: 10,
                    borderRadius: 30,
                  }}>
                  <Image
                    style={[
                      focused ? styles.selectedIcon : styles.unSelectedIcon,
                      {marginRight: 10},
                    ]}
                    source={imgSource}
                  />
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: '900',
                      display: focused ? 'flex' : 'none',
                    }}>
                    {tabTitle}
                  </Text>
                </View>
              ) : (
                <>
                  <Image
                    style={[
                      focused ? styles.selectedIcon : styles.unSelectedIcon,
                      {marginRight: 10},
                    ]}
                    source={imgSource}
                  />
                  <Text
                    style={{
                      color: '#000',
                      fontWeight: '900',
                      display: focused ? 'flex' : 'none',
                    }}>
                    {tabTitle}
                  </Text>
                </>
              )}
            </>
          );
        },
      })}
      tabBarOptions={{
        style: {
          // bottom: 20,
          // position: 'absolute',
          // width: '90%',
          // padding: 15,
          // backgroundColor: '#fff',
          // height: 70,
          // borderRadius: 40,
          height: hp(7.5),
          borderRadius: 40,
          
          backgroundColor: 'yellow',
          width: wp(94),
          alignSelf: 'center',
          //   marginBottom : 15,
          bottom: 17,
          position: 'absolute',
          left: 10,
          right: 10,
          paddingHorizontal : 15,
          paddingVertical : 15
        },
        tabStyle: { backgroundColor : '#fff',borderRadius: 40},
        // activeTintColor: Colors.primaryColor,
        inactiveTintColor: 'gray',
        showLabel: false,
      }}>
      <Tab.Screen name="DashboardTab" component={DashboardTab} />
      <Tab.Screen name="RewardTab" component={RewardTab} />
      <Tab.Screen name="ScanQRTab" component={ScanQRTab} />
      <Tab.Screen name="SettingTab" component={SettingTab} />
    </Tab.Navigator>
  );
};


const styles = StyleSheet.create({
  selectedIcon:{height: 30, width: 30, resizeMode: 'contain',tintColor:'#000'},
  unSelectedIcon:{height: 30, width: 30, resizeMode: 'contain',tintColor:'gray'},
  selectedIcon2:{height: 40, width: 40, resizeMode: 'contain'},
  unSelectedIcon2:{height: 40, width: 40, resizeMode: 'contain',tintColor:'gray'}
});
