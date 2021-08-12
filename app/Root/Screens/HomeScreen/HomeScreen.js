import React from 'react';
import {Image, View, Text } from 'react-native';
// import {createBottomTabNavigator, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import DashboardTab from './DashboardTab';
import RewardTab from './Tab2';
import ScanQRTab from './Tab3';

import SettingTab from './Tab4';
import {
  iconDashboard,
  iconProfilefooter,
  iconReward,
  iconScanner,
  iconSettings,
} from 'app/assets';
import {color} from 'app/Theme';
import styles from './HomeScreenStyle';
import cs from 'app/CommonStyle';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';



const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      // tabBar = {(props) => <CustomTabBar/>}
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
              {
                focused ? 
                (
                  <View style = {{backgroundColor : 'gray', flexDirection : 'row', padding : 10, borderRadius : 30}}>
              <Image
                style={[focused ? styles.selectedIcon : styles.unSelectedIcon, {marginRight : 10}]}
                source={imgSource}
              />
               <Text style={{color: '#000', fontWeight: '900', display : focused ? 'flex' : 'none'}}>
                {tabTitle}
              </Text>
              </View>
                )
                :
                (
                  <>
                  <Image
                style={[focused ? styles.selectedIcon : styles.unSelectedIcon, {marginRight : 10}]}
                source={imgSource}
              />
               <Text style={{color: '#000', fontWeight: '900', display : focused ? 'flex' : 'none'}}>
                {tabTitle}
              </Text>
                  </>
                )
              }
             
            </>
          );
        },
      })}
      tabBarOptions={{
        style: { bottom : 20, position : 'absolute', width : '90%', paddingVertical : 7, backgroundColor : '#fff', height : 70, borderRadius : 40},
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

export default TabNavigator;
