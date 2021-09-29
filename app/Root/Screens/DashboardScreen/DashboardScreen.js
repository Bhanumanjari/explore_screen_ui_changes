import React, { Component } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Container, Header } from 'native-base';
import { HBottomTabBar } from 'app/Component';
import HomeTab from './HomeTab';
import ExploreTab from './ExploreTab';
import MyHelloTab from './MyHelloTab';
import ProfileTab from './ProfileTab';

import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SearchedScreen from '../SearchedScreen/SearchedScreen';
import SearchedUserScreen from '../SearchedUserScreen/SearchedUserScreen';
import { color, font } from '../../../Theme';
import { ExploreTabScreen } from './ExploreTab/ExploreTabScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PrefrenceScreen from '../PrefrenceScreen/PrefrenceScreen';
import WebViewComponent from '../WebView/WebView';
import { TextView } from '../../../Component';
import { View } from 'react-native-animatable';
import { Keyboard, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { Input } from 'native-base'
import FastImage from 'react-native-fast-image';
import { backArrow, filter, find } from '../../../assets';
import SavedVideoScreen from './../SavedVideoScreen/SavedVideoScreen';
import { useLayoutEffect } from 'react';
import { PixcelWidth } from '../../../Utils';
import { debounce } from 'lodash';
import { searchVideoByText } from './../../../store/home/actions'
import { fetchProfiles } from '../../../store/profile';
import { useState } from 'react';
import { setFilterStatus, setSearchQuery } from '../../../store/filter';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import UserProfileDetails from '../UserProfileDetails/UserProfileDetails';
import { createContext } from 'react';
import RequestSendVideoScreen from '../SavedVideoScreen/RequestSendVideoScreen';
import RequestReceivedScreen from '../SavedVideoScreen/RequestReceivedScreen';
import { useContext } from 'react';
import VideoDetailsScreen from '../VideoDetailsScreen';
import Language from '../Language/Language';
import VideoList from '../VideoList/VideoList';
import MyHellosDetails from '../MyHelloDetails/MyHellosDetails';
import AuthContext from '../../../context/AuthContext';
import PhotoClick from '../PhotoClickScreen/PhotoClick';
import ProfileDetailsScreen from '../ProfileDetailsScreen/ProfileDetailsScreen';
import { useDebouncedCallback } from 'use-debounce';
import Feedback from '../FeedbackScreen/Feedback';
import SwapVideoLoader from '../VideoDetailsScreen/SwapVideoLoader';
import SignupScreen from '../SignupScreen/SignupScreen';
import LoginScreen from '../LoginScreen/LoginScreen';
import SignupMoreDetails from '../SignupMoreDetails/SignupMoreDetails';
import SignupScreen4 from '../SignupScreen4/SignupScreen4';
import ForgotPasswordScreen from '../ForgotPasswordScreen/ForgotPasswordScreen';
import ForgotPasswordScreen1 from '../ForgotPasswordScreen1/ForgotPasswordScreen1';
import ResetPasswordScreen from '../ResetPasswordScreen/ResetPasswordScreen';
//import WebViewComponent from '../WebView/WebView';

const Tab = createMaterialTopTabNavigator();
// const BottomTab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();

const Stack = createStackNavigator();

export const SearchContex = createContext(null)
// {
//   type: 'search',
//   currentRoute: 'videoSearch',
//   setCurrentRoute: () => { }
// }
class DashboardScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedTab: 0,
    };
  }

  render() {
    return (
      <Container>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            animationEnabled: true
          }}>
          <Stack.Screen name="HomeTab" component={HomeTab} />
          <Stack.Screen name="ExploreTab" component={ExploreTabScreen} />
          <Stack.Screen name="MyHelloTab" component={MyHelloTab} />
          <Stack.Screen name="ProfileTab" component={ProfileTab} />
        </Stack.Navigator>
        <HBottomTabBar
          onTabSelect={(selectedTab) => {
            //this.setState({selectedTab: tabID});

            this.props.navigation.navigate(selectedTab);
          }}
        />
      </Container>
    );
  }
}

const ExploreBottomTab = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: color.primary_color
        }
      }}>
      <Stack.Screen options={{
      }} name="ExploreBottomTab" component={ExploreTabScreen} />
    </Stack.Navigator>
  );
};

const SearchStack1 = (props) => {

  console.log("SearchStack>>>")

  const dispatch = useDispatch()
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const [searchText, setSearchText] = useState('')
  const [currentRoute, setCurrentRoute] = useState('')
  const params = props.route.params

  const onFind = (isDebounced = false) => {
    if(!isDebounced){
      Keyboard.dismiss()
    }  
    dispatch(setFilterStatus(true))
    console.log("currentRoute", currentRoute)
    if (params && params.type === 'explore') {
      if (currentRoute === 'videoSearch') {
        if (props.searchQuery)
          dispatch(searchVideoByText(`?sortBy=popular&search=${props.searchQuery}`))
        else
          dispatch(searchVideoByText(`?sortBy=popular`))
      } else {
        dispatch(fetchProfiles(`?search=${props.searchQuery}`))
      }
    } else {
      if (currentRoute === 'videoSearch') {
        if (props.searchQuery)
          dispatch(searchVideoByText(`?search=${props.searchQuery}`))
        else
          dispatch(searchVideoByText())
      } else {
        dispatch(fetchProfiles(`?search=${props.searchQuery}`))
      }
    }
  }

  const onSearch = useDebouncedCallback(() => onFind(true),500)

  const onFilter = () => {
    dispatch(setFilterStatus(false))
  }

  useLayoutEffect(() => {
    console.log("HeaderSet")
    navigation.setOptions({
      header: () =>
        <View style={{
          backgroundColor: color.primary_color,
          paddingTop: insets.top,
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Pressable onPress={() => navigation.goBack()}>
            <FastImage
              style={styles.backButtonImg}
              source={backArrow}
              resizeMode={FastImage.resizeMode.contain}
            />
          </Pressable>
          <View style={styles.inputTxtCont}>
            <Input
              style={styles.inputTxt}
              placeholder="Search here"
              placeholderTextColor={color.secondary}
              defaultValue={props.searchQuery}
              onChangeText={(text) => {
                dispatch(setSearchQuery(text.trim()))
                onSearch()
              }}
              autoCapitalize='none'
              returnKeyType='search'
              onSubmitEditing={() => {
                onFind()
              }}
            />
            <TouchableOpacity onPress={onFind} style={styles.find}>
              <FastImage style={styles.findIcon}
                source={find} />
            </TouchableOpacity>
          </View>
          {
            props.isFilterApplied ?
              <TouchableOpacity onPress={onFilter} style={styles.filter}>
                <FastImage style={styles.filterIcon}
                  source={filter} resizeMode={FastImage.resizeMode.contain} />
              </TouchableOpacity>
              : null
          }
        </View>
    })
  }, [navigation, currentRoute, props.isFilterApplied, props.searchQuery])

  return (
    <SearchContex.Provider value={{
      type: props?.route?.params?.type ?? 'search',
      currentRoute: currentRoute,
      setCurrentRoute: setCurrentRoute
    }}>
      <Tab.Navigator
        tabBarOptions={{
          tabStyle: {
            // backgroundColor: color.primary_color,
          },
          style: {
            backgroundColor: color.primary_color,
          },
          labelStyle: {
            // color:color.txt_white,
            fontFamily: font.MontserratSemibold,
            textTransform: 'none',
          },
          indicatorStyle: {
            backgroundColor: color.txt_white,
            // height:10
          },
          activeTintColor: color.txt_white,
          inactiveTintColor: color.txt_white,
          pressColor: color.primary_color,
        }}>
        <Tab.Screen
          options={{
            tabBarLabel: 'Hellos',
          }}
          name="SearchedScreen"
          component={SearchedScreen}></Tab.Screen>
        <Tab.Screen
          options={{
            tabBarLabel: 'Profiles',
          }}
          name="SearchedUserScreen"
          component={SearchedUserScreen}></Tab.Screen>
      </Tab.Navigator>
    </SearchContex.Provider>
  );
};

const mapStateToProps1 = (state) => ({
  isFilterApplied: state.filter.isFilterApplied,
  searchQuery: state.filter.searchQuery,
})

const mapDispatchToProps1 = {

}

const SearchStack = connect(mapStateToProps1, mapDispatchToProps1)(SearchStack1)

const BottomTabNavigator = (props) => {
  return (
    <BottomTab.Navigator
      tabBarPosition='bottom'
      swipeEnabled={true}
      animationEnabled={true}
      tabBar={(props) => <HBottomTabBar {...props} />}
      tabBarOptions={{}}>
      <BottomTab.Screen
        name="HomeTab"
        component={HomeTabBottom}
        options={{
          tabBarLabel: 'HOME',
        }}
      />
      <BottomTab.Screen
        name="ExploreTab"
        component={ExploreBottomTab}
        options={{
          tabBarLabel: 'EXPLORE',
        }}
      />
      {/* <BottomTab.Screen
        name="MyHelloTab"
        component={MyHelloTabBottom}
        options={{
          tabBarLabel: 'HELLOS',
        }}
      /> */}
      <BottomTab.Screen
        name="ProfileTab"
        component={ProfileTabBottom}
        options={{
          tabBarLabel: 'PROFILE',
          
        }}
      />
    </BottomTab.Navigator>
  );
};

const HomeTabBottom = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        animationEnabled: true,
        headerStyle: {
          backgroundColor: color.primary_color
        }
      }}>
      <Stack.Screen name="HomeScreen" component={HomeTab} />
    </Stack.Navigator>
  );
};

const MyHelloTabBottom = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: color.primary_color
        }
      }}>
      <Stack.Screen name="MyHelloScreen" component={MyHelloTab} />
    </Stack.Navigator>
  );
};

const ProfileTabBottom = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProfileScreen" component={ProfileTab} />
    </Stack.Navigator>
  );
};

export const DashboardTab = (props) => {
  const authContext = useContext(AuthContext)
  // console.log("::::=>>>", authContext)
  return (
    
    <Stack.Navigator
      initialRouteName={authContext?.initialRouteName ?? undefined}
      //headerMode='screen'
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        transitionSpec:{
          open: { animation: 'timing', config:{ duration: 300 } },
          close: { animation: 'timing', config:{ duration: 300 } }
        },
        
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        cardOverlayEnabled: true,
        cardShadowEnabled: true,
        cardStyle: {backgroundColor: 'transparent'},

      }}
      mode="modal"
  
      >
      <Stack.Screen name="Home" component={BottomTabNavigator} />
      <Stack.Screen name="PrefrenceScreen" component={PrefrenceScreen} />
      <Stack.Screen
        name="WebViewComponentScreen"
        component={WebViewComponent}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          headerShown: true,
          headerBackTitleVisible: false,
          headerLeft: '',
          headerStyle: {
            backgroundColor: color.primary_color,
            borderBottomWidth: 0,
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTitleContainerStyle: {
            flex: 1,
          }
        })}
        name="SearchStack"
        component={SearchStack}
      />
      <Stack.Screen name="SavedVideoScreen" component={SavedVideoScreen} />
      <Stack.Screen name="UserProfileDetailsScreen" component={UserProfileDetails} />
      <Stack.Screen name="RequestSendVideoScreen" component={RequestSendVideoScreen} />
      <Stack.Screen name="RequestReceivedScreen" component={RequestReceivedScreen} />
      <Stack.Screen name="VideoDetailsScreen" component={VideoDetailsScreen} 
          options={{
            gestureEnabled: false,
            transitionSpec:{
              open: { animation: 'timing', config:{ duration: 300 } },
              close: { animation: 'timing', config:{ duration: 300 } }
            },
            //cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
            cardStyleInterpolator: ({ current: {progress} }) => {
              return {
                cardStyle:{
                  opacity: progress,
                  
                }
              }
            }

          }}
      
      />
      <Stack.Screen name="LanguageScreen" initialParams={{
        initial: true
      }} component={Language} />
      <Stack.Screen name="VideoListScreen" component={VideoList} />
      <Stack.Screen name="MyHellosDetailsScreen" component={MyHellosDetails} />
      <Stack.Screen name="PhotoClickScreen" initialParams={{
        initial: true
      }} component={PhotoClick} />
      <Stack.Screen name="ProfileDetailsScreen" component={ProfileDetailsScreen} />
      <Stack.Screen name="FeedbackScreen" component={Feedback} />
      <Stack.Screen name="SwapVideoLoaderScreen" component={SwapVideoLoader} options={{
        gestureEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={
        {
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }
      } />
      <Stack.Screen name="SignupMoreDetails" component={SignupMoreDetails} options={
        {
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }
      } />
      <Stack.Screen name="VerifyPhoneNumber" component={SignupScreen4} options={
        {
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }
      } />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={
        {
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }
      } />
      <Stack.Screen name="ForgotPassword1" component={ForgotPasswordScreen1} options={
        {
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }
      } />
      <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} options={
        {
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }
      } />
      
    </Stack.Navigator>
    
  );
};

const styles = StyleSheet.create({
  inputTxtCont: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#3E464A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginRight: PixcelWidth(25),
    marginLeft: PixcelWidth(0),
  },
  backButtonImg: {
    height: wp('7%'),
    width: wp('2.5%'),
    marginHorizontal: 20,
    marginVertical: 5,
    alignSelf: 'center',
  },
  inputTxt: {
    flex: 1,
    fontFamily: font.MontserratRegular,
    marginLeft: 15,
    fontSize: 15,
    color: '#FFF',

  },
  findIcon: { height: PixcelWidth(17), width: PixcelWidth(17) },
  filter: {
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterIcon: { height: PixcelWidth(15), width: PixcelWidth(26), },
  find: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp("5%"),
  },
})

const mapActionCreators = {};

const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, mapActionCreators)(DashboardScreen);
