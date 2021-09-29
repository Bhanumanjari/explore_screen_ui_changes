import React, { Component } from 'react';
import {
  Image,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Alert,
  Pressable,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Content, Button, Switch } from 'native-base';
import styles from './ProfileTabStyle';
import { user_profile, setting, edit, plus, newHello } from 'app/assets';
import { color } from '../../../../Theme';
import { font } from '../../../../Theme';
import { TextView } from '../../../../Component';
import RawItem from './ProfileRowItem';
import { removeData } from '../../../../Config/asyncStorage';
import {
  accessToken,
  faceSwipCount,
  userData,
} from '../../../../Utils/storageKeys';
import { getLikedVideo, getRequestSentVideo, getSavedVideo } from '../../../../store/video';
import { cloneDeep } from 'lodash';
import { setGuestProfile } from '../../../../store/guest';
import { removeFace, saveUserNameAvaibility } from '../../../../store/profile/actions';
import { showBottomToast, showToast, showTopToast } from '../../../../Utils';
import { fetchUserProfile } from '../../../../store/login';
import AuthContext from '../../../../context/AuthContext';
import { MyHellosLoader } from '../../../../ShimmerEffects/MyHellosLoader';
import HellosListItem from '../../UserProfileDetails/HellosListItem';
import { EmptyList } from '../../../../Component/EmptyList';
import { menu_dot, noHellosUpload } from '../../../../assets';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { deleteHello, getMyHellos, saveMyHellos } from '../../../../store/myHellos';
import { delay } from '../../../../Utils/globalFun';
import { ABOUT_US, PRIVACY_POLICY, TERMS_CONDITION } from '../../../../Utils/constant';
import { logOut } from '../../../../store/login/actions'
let guest = false ;


class ProfileTab extends Component {
  static contextType = AuthContext
  menuList = [{
    title: "Languages",
    onPress: () => {
      this.props.navigation.navigate('LanguageScreen', {
        initial: false
      });
    }
  },
  {
    title: "About HELLOS",
    onPress: () => this.redirectToWebView({
      title: 'About HELLOS',
      url: ABOUT_US,
    })
  },
  {
    title: "Terms & Conditions",
    onPress: () => this.redirectToWebView({
      title: 'Terms & Conditions',
      url: TERMS_CONDITION,
    })
  },
  {
    title: "Privacy Policy",
    onPress: () => this.redirectToWebView({
      title: 'Privacy Policy',
      url: PRIVACY_POLICY,
    })
  },
  {
    title: "Send Feedback",
    onPress: () => {
      this.props.navigation.navigate("FeedbackScreen")
    }
  },
  /*{
    title: "Sign Up",
    onPress: () => {
      this.props.navigation.navigate("SignupScreen")
    }
  },
  {
    title: "Login",
    onPress: () => {
      this.props.navigation.navigate("LoginScreen")
    }
  },*/
  {
    title: "Log out",
    onPress: () => {
      this.confirmationAlert(this.LogOut);
    }
  }
  ]
  constructor(props) {
    super();
    this.state = {
    };
  }
  state = {
    guest: false 
  }

  componentDidMount = () => {

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.props.getSavedVideo(`?op=save`);
      this.props.getLikedVideo(`?op=like`);
      this.props.getMyHellos()
      this.props.fetchUserProfile()
    });
    //console.log("userdata = ") ;
    //console.log(this.props.user) ;
    //guest = this.props.user.isGuest ;
    //if(guest == undefined){
    //  guest = false ;
    //}
    try{
      let guestTry = this.props.user.isGuest ;
      if(guestTry!=undefined){
        this.setState({
          guest: guestTry 
        })
      }else{
        this.setState({
          guest: false
        })
      }
    }catch{
      console.log("user dosent have a guest property") ;
      
    }
    console.log("guest") ;
    console.log(this.state.guest) ;
    this.setHeader()
  };

  componentWillUnmount = () => {
    this._unsubscribe && this._unsubscribe();
  }

  confirmationAlert = async (callback) => {
    Alert.alert('Log out', 'Are you sure you want to logout?', [
      {
        text: 'No',
        onPress: () => { },
        style: 'default',
      },
      {
        text: 'Yes',
        onPress: callback,
        style: 'default',
      },
    ]);
  };

  LogOut = async () => {
    await removeData(accessToken);
    await removeData(userData);
    await removeData(faceSwipCount);
    this.props.logOut() ;
    console.log(this.context)
    this.context.setInitialRouteName("LoginScreen")
    this.context.setIsSignIn(false)
    // this.props.navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'LoginScreen' }],
    // });
  };

  onLanguage = () => {
    this.props.navigation.navigate('LanguageScreen', {
      initial: false
    });
  };

  redirectToWebView = ({ title, url }) => {
    this.props.navigation.navigate('WebViewComponentScreen', {
      title,
      url,
    });
  };

  onPhotoUpload = () => { };

  deleteFace = (item, index) => {
    // if (this.props.user?.faces?.length > 1)
    Alert.alert('Delete', 'Are you sure you want to delete face? This will also delete associated face swaps.', [
      {
        text: 'Cancel',
        onPress: () => {

        },
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setTimeout(() => {
            this.deleteSelectedFace(item)
          }, 500);
        },
      },
    ]);
  };

  deleteSelectedFace = (item) => {
    console.log(this.props.user)
    let formData = new FormData()
    formData.append('faceId', item._id)
    this.props.removeFace(formData)
  }

  onAddFace = () => {
    if (this.props.user.faces?.length < 5) {
      this.props.navigation.navigate('PhotoClickScreen', {
        onPhotoUpload: this.onPhotoUpload,
        initial: false,
      });
    } else {
      showBottomToast('Maximum 5 faces allowed')
    }
  }

  onItemPress = (item, index) => {
    if (item.status === "APPROVED") {
      this.props.navigation.navigate('MyHellosDetailsScreen', {
        ...cloneDeep(item),
        index,
        // updateVideo: updateVideo
      });
    }
  }

  deleteMyHello = (item, index) => {

    Alert.alert("Delete", "Are you sure to delete hello?", [{
      text: 'Cancel',
      onPress: () => { }
    }, {
      text: 'Delete',
      onPress: () => {
        delay(500)
        this.props.deleteHello(item._id, (response) => {
          if (response) {
            let tmp = cloneDeep(this.props.myHellos)
            tmp.splice(index, 1)
            this.props.saveMyHellos(tmp)
            showBottomToast('Hello deleted successfully')
          }
        })
      },
      style: 'destructive'
    }])
  }

  setHeader = () => {
    this.props.navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      title: "",
      headerRight: () => {
        return (
          /*<Menu>
            <MenuTrigger>
              <Image source={menu_dot} style={styles.menuImage} resizeMode="contain" />
            </MenuTrigger>
            <MenuOptions style={{
              padding: 10,
              backgroundColor: "#fff"
            }}
              customStyles={{
                optionsContainer: {
                  marginTop: 40,
                  right: 100
                }
              }}
            >
              {this.menuList.map((menu, index) => <MenuOption key={index} style={{
                marginVertical: 5
              }} onSelect={menu.onPress}>
                <TextView>
                  {menu.title}
                </TextView>
              </MenuOption>)}
            </MenuOptions>
          </Menu>*/
          <Menu>
            <MenuTrigger>
              <Image source={menu_dot} style={styles.menuImage} resizeMode="contain" />
            </MenuTrigger>
            <MenuOptions style={{
              padding: 10,
              backgroundColor: "#fff"
            }}
              customStyles={{
                optionsContainer: {
                  marginTop: 40,
                  right: 100
                }
              }}
            >
              {this.menuList.map((menu, index) =>{
                if(menu.title!="Log out" && menu.title!="Login" && menu.title!= "Sign Up"){
                 return(<MenuOption key={index} style={{
                  marginVertical: 5
                  }} onSelect={menu.onPress}>
                  <TextView>
                    {menu.title}
                  </TextView>
                </MenuOption>)
                }else if(menu.title == "Login") {
                  if(this.state.guest == true){
                  return(
                  <MenuOption key={index} style={{
                    marginVertical: 5
                    }} onSelect={menu.onPress}>
                    <TextView>
                      {menu.title}
                    </TextView>
                  </MenuOption>)
                  }else{

                  }

                }else if(menu.title == "Sign Up"){
                  if(this.state.guest)
                  {return(
                  <MenuOption key={index} style={{
                    marginVertical: 5
                    }} onSelect={menu.onPress}>
                    <TextView>
                      {menu.title}
                    </TextView>
                  </MenuOption>)}
                  else{

                  }
                }
                else if(menu.title == "Log out") {
                  if(this.state.guest == false){
                  return(
                  <MenuOption key={index} style={{
                    marginVertical: 5
                    }} onSelect={menu.onPress}>
                    <TextView>
                      {menu.title}
                    </TextView>
                  </MenuOption>)
                  }else{
                    
                  }
                }  
              
              
              })
              }
            </MenuOptions>
          </Menu>
        )
      }
    })
  }

  render() {
    let userProfile;
    let isProfile = false
    if (this.props.user?.profileImage?.thumbnail) {
      userProfile = {
        uri: this.props.user.profileImage.thumbnail,
      };
      isProfile = true
    }

    return (
      <Container>
        <Content style={styles.mainLayout} showsVerticalScrollIndicator={false}>
          {/* <Image source={setting} style={styles.settingImg} /> */}
          <View style={styles.userHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {isProfile ?
                <Image source={userProfile} style={styles.profileImg} /> : (
                  <View
                    style={styles.profileImg}
                  >
                    <TextView style={styles.firstCharTxt}>{this.props.user?.username?.charAt(0).toUpperCase() ?? 'H'}</TextView>
                  </View>
                )}
              <View style={styles.userCont}>
                {
                  (this.state.guest == false)?
                  <TextView style={styles.userTitleTxt}>
                    {"@" + this.props.user?.username ?? '--'}
                  </TextView>:<View
                    style={{
                      flex:1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <TouchableOpacity
                      style = {{
                        height: 40,
                        width: 0.25*Dimensions.get('window').width ,
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: color.btnPrimary_color,
                        elevation: 1
                      }}
                      onPress={()=>{this.props.navigation.navigate('SignupScreen');}}
                    >
                      <Text
                        style = {{
                          color: color.txt_white,
                          fontFamily: font.MontserratSemibold,
                          fontSize: 18,
                          
                        }}
                      >
                        Signup
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style = {{
                        height: 40,
                        marginLeft:5,
                        width: 0.25*Dimensions.get('window').width ,
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: color.btnPrimary_color,
                        elevation: 1
                      }}
                      onPress={()=>{this.props.navigation.navigate('LoginScreen');}}
                    >
                      <Text
                        style = {{
                          color: color.txt_white,
                          fontFamily: font.MontserratSemibold,
                          fontSize: 18
                        }}
                      >
                        Login
                      </Text>
                    </TouchableOpacity>
                  </View>
                }
                
                {
                  (this.state.guest == false)?
                  <TextView style={styles.userSubTitleTxt}>
                    {this.props.user?.name ?? '--'}
                  </TextView>:null
                }
              </View>
            </View>
            {
              

              
            (this.state.guest===false)? <TouchableOpacity
              style={{
                marginTop:50
              }}
              onPress={() => {
                this.props.saveUserNameAvaibility(true)
                this.props.navigation.navigate('ProfileDetailsScreen');
              }}>
              <Image source={edit} style={styles.editImg} />
            </TouchableOpacity>:null
            }
          </View>

          {/* =======like & share count ======= */}

          {/* <View style={styles.counterContainer}>
            <View style={styles.subCounterContainer}>
              <TextView style={styles.counterTitleTxt}>{"Likes"}</TextView>
              <View style={styles.counterView}>
                <TextView style={styles.counterTxt}>{this.props.user.liked}</TextView>
              </View>
            </View>
            <View style={styles.subCounterContainer}>
              <TextView style={styles.counterTitleTxt}>{"Shares"}</TextView>
              <View style={styles.counterView}>
                <TextView style={styles.counterTxt}>{this.props.user.shared}</TextView>
              </View>
            </View>
          </View> */}

          <View style={styles.userImgCont}>
            <TouchableOpacity
              onPress={() => {
                //console.log(this.props.user.isGuest) ;
                /*try{
                  let guestTry = this.props.user.isGuest ;
                  if(guestTry!=undefined){
                    this.setState({
                      guest: guestTry 
                    })
                  }else{ 
                    this.setState({
                      guest: false
                    })
                  }
                }catch{
                  console.log("user dosent have a guest property") ;
                  
                }*/
                this.onAddFace()
              }}
              style={styles.addImgCont}>
              <Image source={plus} style={styles.plusImg} />
            </TouchableOpacity>
            <FlatList
              data={this.props.user?.faces ?? []}
              //style={{marginTop: 15}}
              horizontal
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={(item) => (
                <RawItem
                  selectedFaceIndex={0}
                  {...item}
                  onFacePress={this.deleteFace}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          {/* <TextView style={styles.titleTxt}>Requests</TextView>
          <View style={styles.reqCont}>
            <TouchableOpacity
              style={styles.receiveCont}
              onPress={() =>
                this.props.navigation.navigate('RequestReceivedScreen')
              }>
              <TextView style={styles.receiveContTxt}>Recieved</TextView>
              <View style={styles.requestPending}>
                <TextView style={styles.requestPendingNo}>{this.props.user.received}</TextView>
                {this.props.receivedRequestFlag && <View style={styles.unseenDot} />}
              </View>
            </TouchableOpacity>
            <Pressable onPress={() => {
              this.props.navigation.navigate('RequestSendVideoScreen')
            }} style={styles.receiveCont}>
              <TextView style={styles.receiveContTxt}>Sent</TextView>
              <View style={styles.requestPending}>
                <TextView style={styles.requestPendingNo}>{this.props.requestSentCount}</TextView>
              </View>
            </Pressable>
          </View> */}
          <TextView style={styles.titleTxt}>HELLOs</TextView>
          <View style={styles.reqCont}>
            <TouchableOpacity
              style={styles.receiveCont}
              onPress={() =>
                this.props.navigation.navigate('SavedVideoScreen', {
                  type: 'saved',
                })
              }>
              <TextView style={styles.receiveContTxt}>Saved</TextView>
              <View style={styles.requestPending}>
                <TextView style={styles.requestPendingNo}>
                  {this.props.savedCount}
                </TextView>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('SavedVideoScreen', {
                  type: 'liked',
                })
              }
              style={styles.receiveCont}>
              <TextView style={styles.receiveContTxt}>Liked</TextView>
              <View style={styles.requestPending}>
                <TextView style={styles.requestPendingNo}>
                  {this.props.likedCount}
                </TextView>
              </View>
            </TouchableOpacity>
          </View>
          {/* <TextView style={styles.titleTxt}>My Account</TextView> */}
          {/* <View style={styles.themeCont}>
            <TextView style={styles.subtitleTxt}>Dark Mode</TextView>
            <View style={styles.selThemeBtnCont}>
              <Switch
                value={true}
                trackColor={{ false: '#00050', true: '#000' }}
              //sthumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              />
            </View>
          </View>
          <View style={styles.line}></View> */}
          {/* <TextView
            onPress={() => {
              this.onLanguage();
            }}
            style={[styles.subtitleTxt, {
              marginTop: 30
            }]}>
            Languages
          </TextView>
          <View style={styles.line}></View>
          <TextView
            onPress={() => {
              this.redirectToWebView({
                title: 'About HELLO FACE',
                url: 'https://helloface.ai/about',
              });
            }}
            style={styles.subtitleTxt}>
            About HELLO FACE
          </TextView>
          <View style={styles.line}></View>
          <TextView
            onPress={() => {
              this.redirectToWebView({
                title: 'Terms & Conditions',
                url: 'https://helloface.ai/terms-conditions',
              });
            }}
            style={styles.subtitleTxt}>
            Terms & Conditions
          </TextView>
          <View style={styles.line}></View>
          <TextView
            onPress={() => {
              this.redirectToWebView({
                title: 'Privacy Policy',
                url: 'https://helloface.ai/privacy-policy',
              });
            }}
            style={styles.subtitleTxt}>
            Privacy Policy
          </TextView>
          <View style={styles.line}></View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextView style={styles.subtitleTxt}>App Version</TextView>
            <TextView style={styles.subtitleTxt}>{'1.0'}</TextView>
          </View>
          <View style={styles.line}></View>
          <TextView onPress={() => {
            this.props.navigation.navigate("FeedbackScreen")
          }} style={styles.subtitleTxt}>Send Feedback</TextView>
          <View style={styles.line}></View>
          <TextView style={styles.subtitleTxt}>Erase My Personal Data</TextView>
          <View style={styles.line}></View>
          <TextView
            onPress={() => {
              this.confirmationAlert(this.logOut);
            }}
            style={styles.subtitleTxt}>
            Log out
          </TextView>

          <View style={styles.line}></View>
          <View style={{ height: 100 }}></View> */}

          <View style={styles.videoListContainer}>
            <View style={styles.divider} />
            <View style={{ flex: 1 }}>
              <TextView style={styles.labelTxt}>{"MY HELLOs"}</TextView>
              {
                this.props.isMyHellosLoading && <MyHellosLoader />
              }
              <FlatList
                data={this.props.myHellos}
                windowSize={11}
                initialNumToRender={7}
                removeClippedSubviews={true}
                scrollEnabled={false}
                contentContainerStyle={styles.listContainer}
                numColumns={2}
                renderItem={(item) => { return <HellosListItem {...item} onItemPress={this.onItemPress} onItemLongPress={this.deleteMyHello} /> }}
                ListEmptyComponent={() => {
                  if (!this.props.isMyHellosLoading) {
                    return <EmptyList textStyle={{
                      marginTop: 20
                    }} image={noHellosUpload} imageStyle={{
                      marginTop: 20
                    }} message={"Create your own hellos  :-)"} />
                  }
                  return <></>
                }}
                keyExtractor={(item, index) => item._id}
              />
            </View>
          </View>

        </Content>
      </Container>
    );
  }
}

const mapActionCreators = {
  getSavedVideo,
  getLikedVideo,
  setGuestProfile,
  removeFace,
  saveUserNameAvaibility,
  getRequestSentVideo,
  fetchUserProfile,
  getMyHellos,
  deleteHello,
  saveMyHellos,
  logOut,
};

const mapStateToProps = (state) => {
  return {
    user: state.login.data,
    myHellos: state.myHellos.myHellos,
    isMyHellosLoading: state.myHellos.isMyHellosLoading,
    savedCount: state.video.savedVideos?.count ?? 0,
    likedCount: state.video.likedVideos?.count ?? 0,
    requestSentCount: state.video.requestSentVideo?.count ?? 0,
  };
};
export default connect(mapStateToProps, mapActionCreators)(ProfileTab);
