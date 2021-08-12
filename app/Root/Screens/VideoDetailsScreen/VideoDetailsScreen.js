import React, { Component } from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  FlatList,
  Pressable,
  Platform,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  Footer,
} from 'native-base';
import styles from './VideoDetailsScreenStyle';
import { TextView } from 'app/Component';
import { backArrow, plus } from 'app/assets';
import RawItem from '../DashboardScreen/ProfileTab/ProfileRowItem';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import * as Progress from 'react-native-progress';
import { deviceWidth, showBottomToast } from '../../../Utils';
import { color } from '../../../Theme';
import { bindActionCreators } from 'redux';
import { apiLoadingStart, apiLoadingStop, themLoaderStart, themLoaderStop } from '../../../store/global';
import ShareModal from '../../../Component/ShareModal';
import RegisterModal from '../../../Component/RegisterModal';
import { getData } from '../../../Config/asyncStorage';
import { faceSwipCount } from './../../../Utils/storageKeys';
import { findIndex, isNumber, remove } from 'lodash';
import * as Animatable from 'react-native-animatable';
import RNFS from 'react-native-fs';
import { SvgXml } from 'react-native-svg';
import { heartSvg, startSvg } from './../../../assets/Svg/svgFiles';
import { getVideoByIdActions, likeVideoAction, saveVideoAction, shareVideoAction, shareVideoOnSocial, swapVideo, updateVideoById } from '../../../store/video/actions';
import FaceSwapReqModal from '../../../Component/FaceSwapReqModal';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import CameraRoll from "@react-native-community/cameraroll";
import { StackActions } from '@react-navigation/native';
import Share from 'react-native-share';
import { explore, menu_dot, shareIcon, socialShare } from '../../../assets';
import { delay } from '../../../Utils/globalFun';
import axios from 'axios'
import ThemLoader from '../../../Component/ThemLoader';
import FastImage from 'react-native-fast-image';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import ReportModal from '../../../Component/ReportModal';
import { bufferConfig } from '../../../Utils/constant';
class VideoDetailsScreen extends Component {
  swapVideoData = {}
  duration = null
  source = null
  state = {
    addedBy: {},
    liked: [],
    preferences: [],
    tags: [],
    saved: [],
    shared: [],
    title: '',
    video: this.props.route.params?.video ?? {},
    isVideoLoading: true,
    isVideoLoaded: false,
    selectedFaceIndex: -1,
    isFaceSwapped: false,
    faceSwipCount: 0,
    isShareVisible: false,
    isRegisterModalVisible: false,
    isPaused: false,
    isLiked: false,
    isSaved: false,
    isUserVideo: false,
    isLoaderVisible: false,
    _id: '',
    openReportModal: false
  };

  componentDidMount = async () => {
    // await saveData('0', faceSwipCount);
    // console.log(this.props.route);
    this.setState({ ...this.props.route.params }, () => {
      // console.log(this.state);
      this.setVideoLike();
      this.setVideoSave();
      if (!this.state.isFaceSwapped)
        this.fetchDetails()
    });
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({
        isPaused: false,
      });
    });
    this._unsubscribeBlur = this.props.navigation.addListener('blur', () => {
      this.setState({
        isPaused: true,
      });
    });
    this.setFaceSwipCount();
    this.setHeader()
  };

  fetchDetails = () => {
    const { _id } = this.state;
    this.props.get(_id, (res) => {
      if (res) {
        this.setState({ ...res })
      }
    })
  }

  setFaceSwipCount = () => {
    getData(faceSwipCount).then((res) => {
      if (res) {
        let count = Number(res);
        console.log(count);
        if (isNumber(count)) {
          this.setState({
            faceSwipCount: count,
          });
        }
      }
    });
  };

  setVideoSave = () => {
    const { _id } = this.props.user;
    if (findIndex(this.state.saved, { userId: _id }) > -1) {
      this.setState({
        isSaved: true,
      });
    }
  };

  setVideoLike = () => {
    const { _id } = this.props.user;
    if (findIndex(this.state.liked, { userId: _id }) > -1) {
      this.setState({
        isLiked: true,
      });
    }
  };

  componentWillUnmount = () => {
    this._unsubscribe && this._unsubscribe();
    this._unsubscribeBlur && this._unsubscribeBlur();
  };

  onLoad = (e) => {
    this.duration = e.duration
    this.setState({
      isVideoLoading: false,
    });
  };

  onLoadStart = () => {
    this.setState({
      isVideoLoading: true,
    });
  };

  onBuffer = (video) => {
    this.setState({
      isVideoLoading: video.isBuffering,
    });
  };

  onReadyForDisplay = () => {
    this.setState({
      isVideoLoading: false,
      isVideoLoaded: true,
    });
  };

  onFacePress = async (item, index) => {

    if (!this.duration) {
      showBottomToast("Please wait until video loaded fully")
      return
    }

    this.setState({
      isLoaderVisible: true
    })
    this.pause();
    let formData = new FormData()
    formData.append("_id", this.state._id)
    formData.append("faceId", item._id)
    formData.append("duration", this.duration)

    if (this.source) {
      this.source.cancel()
    }

    this.source = axios.CancelToken.source()

    const resp = await this.props.swap(formData, this.source.token)
    if (resp && resp.type === 'SAVE_SWAPE_VIDEO_DATA') {
      // this.swapVideoData = resp.payload
      if (resp.payload.type === "QUOTA_EXHAUSTED") {
        setTimeout(() => {
          Alert.alert("Limit Exceeded", resp.payload.message)
        }, 500);
      } else {
        this.props.navigation.dispatch(StackActions.replace("VideoDetailsScreen", { ...resp.payload, videoId: undefined, isFaceSwapped: true }))
      }
      // this.setState({
      //   ...resp.payload,
      //   videoId: undefined,
      //   // selectedFaceIndex: index,
      //   isFaceSwapped: true
      // })
    } else {
      // showBottomToast("Failed to swap video. Please check your face in image that is clearly visible ?")
    }
    this.setState({
      isPaused: false,
      isLoaderVisible: false
    }, () => this.startVideo());
  };

  startVideo = () => {
    if (this.videoPlayer && !this.state.isVideoLoading) {
      this.videoPlayer.seek(0)
    }
  }

  requestStoragePermission = () => {
    let permission = Platform.select({
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
    })

    return new Promise((resolve, reject) => {
      check(permission).then(res => {
        console.log(res)
        if (res === RESULTS.BLOCKED || res === RESULTS.DENIED) {
          request(permission).then(res => {
            if (res === RESULTS.GRANTED) {
              resolve(true)
            } else if (res === RESULTS.DENIED) {
              resolve(false)
            }
          })
        } else {
          resolve(true)
        }
      })
    })
  }

  onSave = async () => {
    const { video } = this.state;
    const options = {
      fromUrl: video.original,
      toFile: `${RNFS.DocumentDirectoryPath}/${video.fileName}`,
    };
    console.log(options);
    let permission = true
    if (Platform.OS === 'android') {
      permission = await this.requestStoragePermission()
    }
    console.log(permission)
    if (!permission)
      return
    this.props.startApiLoader();
    this.pause();
    RNFS.downloadFile(options)
      .promise.then(async (res) => {
        console.log(res)
        if (res.statusCode === 200) {

          const isSaved = await CameraRoll.save(`${RNFS.DocumentDirectoryPath}/${video.fileName}`, {
            type: 'video',
            album: 'Helloface'
          })
          // await RNFS.copyFile(`${RNFS.DocumentDirectoryPath}/${video.fileName}`, `${RNFS.DocumentDirectoryPath}/Helloface/${video.fileName}`)
          console.log("isSaved", isSaved)
          showBottomToast('Video saved successfully');

        } else {
          showBottomToast('We are fetching issue while saving video.');
        }
      }).catch(err => {
        console.log(err)
        showBottomToast('Error while saving video');
      })
      .finally(() => {
        this.props.stopApiLoader();
        this.play();
      });
  };

  onShare = () => {
    // this.setState({
    //   isShareVisible: true,
    // });
  };

  closeShare = () => {
    this.setState({
      isShareVisible: false,
    });
  };

  closeReg = () => {
    this.setState({
      isRegisterModalVisible: false,
    });
  };

  pause = () => {
    this.setState({
      isPaused: true,
    });
  };

  play = () => {
    this.setState({
      isPaused: false,
    });
  };

  likeUnLikeVideo = () => {
    const { _id, isLiked } = this.state;
    if (isLiked) {
      remove(this.state.liked, (like) => like.userId === this.props.user._id);
    } else {
      this.state.liked.push({
        userId: this.props.user._id,
      });
    }
    this.setState(
      {
        liked: this.state.liked,
      },
      this.setVideoLike,
    );
    let data = {
      op: isLiked ? 'remove' : 'add',
    };
    this.props.like(_id, data, (res) => {
      if (res) {
        const { index, updateVideo = () => { } } = this.props.route.params
        updateVideo({ item: this.state, index })
      }
    });
    this.setState({ isLiked: !isLiked });
  };

  saveUnSavedVideo = () => {
    const { _id, isSaved } = this.state;
    if (isSaved) {
      remove(this.state.saved, (like) => like.userId === this.props.user._id);
    } else {
      this.state.saved.push({
        userId: this.props.user._id,
      });
    }
    this.setState(
      {
        saved: this.state.saved,
      },
      this.setVideoSave,
    );
    let data = {
      op: isSaved ? 'remove' : 'add',
    };
    this.props.save(_id, data, (res) => {
      if (res) {
        const { index, updateVideo = () => { } } = this.props.route.params
        updateVideo({ item: this.state, index })
      }
    });
    this.setState({ isSaved: !isSaved });
  };

  onAddFace = () => {
    if (this.props.user.faces?.length < 5) {
      this.props.navigation.navigate('PhotoClickScreen', {
        initial: false,
      });
    } else {
      showBottomToast('Maximum 5 faces allowed')
    }
  }

  onShareToFeed = () => {

    this.pause()
    let formData = new FormData()

    formData.append("isPublic", 'true')

    let data = {
      _id: this.state._id,
      formData
    }
    this.props.startApiLoader()
    this.props.updateVideo(data, (response) => {
      if (response) {
        showBottomToast('Video posted successfully')
        this.props.navigation.goBack()
      }
      this.props.stopApiLoader()
    })
  }

  onShareToSocial = async () => {
    const { video, _id } = this.state

    const options = {
      fromUrl: video.original,
      toFile: `${RNFS.DocumentDirectoryPath}/share_${video.fileName}`,
    };

    let permission = true
    if (Platform.OS === 'android') {
      permission = await this.requestStoragePermission()
    }
    // console.log(permission)
    if (!permission)
      return
    this.props.startApiLoader();
    this.pause();

    RNFS.downloadFile(options).promise.then(async res => {
      if (res.statusCode === 200) {
        this.props.stopApiLoader();
        await delay(500)
        const response = await Share.open({
          title: 'Share hello',
          message: Platform.OS === 'android' ? 'Share hellos with friends' : undefined,
          url: `file://${RNFS.DocumentDirectoryPath}/share_${video.fileName}`,
          type: "video/mp4"
        })
        // console.log(response)
        this.props.share(_id, {
          op: 'add'
        })
      }
    }).catch(err => {
      console.log(err)
      this.props.stopApiLoader();
    }).finally(() => {
      this.play();
    });
  }

  setHeader = () => {
    this.props.navigation.setOptions({
      title: '',
      headerLeft: () => <Pressable onPress={() => this.props.navigation.goBack()}>
        <Image source={backArrow} style={styles.headerImg} />
      </Pressable>,
      headerRight: () =>
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
            <MenuOption onSelect={() => this.setState({ openReportModal: true })}>
              <TextView>
                Report
                  </TextView>
            </MenuOption>
          </MenuOptions>
        </Menu>,
      headerShown: true,
      headerTransparent: true,
    })
  }

  openUserProfile = () => {
    this.props.navigation.dispatch(StackActions.replace('UserProfileDetailsScreen', {
      data: this.state.addedBy
    }))
  }

  shareHello = async () => {
    const { _id, video } = this.state
    this.pause()
    this.props.shareOnSocial(_id, video, (res) => {
      this.play()
      if (res) {
        this.state.shared.push({
          userId: this.props.user._id,
        });
        this.setState({
          shared: this.state.shared
        })
      }
    })
    // try {
    //   this.pause()
    //   const response = await Share.open({
    //     title: 'Share hello with friends',
    //     message: "Click on below link to explore more hellos like this\n",
    //     url: `https://hellos.ai/hello/${_id}`,
    //   })
    //   this.play()
    //   this.props.share(_id, {
    //     op: 'add'
    //   })
    //   this.state.shared.push({
    //     userId: this.props.user._id,
    //   });
    //   this.setState({
    //     shared: this.state.shared
    //   })
    // } catch (error) {
    //   console.log(error)
    //   this.play()
    // }
  }

  cancelRequest = () => {
    this.setState({
      isLoaderVisible: false
    })
    this.source.cancel("Swap video request cancelled successfully")
  }

  render() {
    const {
      addedBy,
      liked,
      preferences,
      tags,
      saved,
      title,
      video,
      selectedFaceIndex,
      isLiked,
      isSaved,
      shared
    } = this.state;
    const titles = title?.split('-');
    return (
      <Container>
        <LinearGradient
          colors={[
            '#000000',
            'rgba(0,0,0,0)',
            'rgba(0,0,0,0)',
            'rgba(0,0,0,0)',
            'rgba(0,0,0,0)',
            'rgba(0,0,0,0)',
            '#000000',
          ]}
          style={{ flex: 1 }}>
          <View style={styles.videoInnerContainer}>
            <Video
              ref={(ref) => this.videoPlayer = ref}
              source={{
                uri: video?.original // "https://helloface1.s3.ap-south-1.amazonaws.com/297_Pic_1395084196034_Animated_Vid_327822514145.mp4" //"https://objectstore.e2enetworks.net/helloface/Videos/alia_gangubai_del1.mp4" //
              }}
              // hideShutterView
              disableFocus={true}
              paused={this.state.isPaused}
              style={styles.videoContainer}
              repeat
              resizeMode="contain"
              onLoad={this.onLoad}
              onLoadStart={this.onLoadStart}
              onBuffer={this.onBuffer}
              onReadyForDisplay={this.onReadyForDisplay}
              onError={(err) => console.log(err)}
              bufferConfig={bufferConfig}
            // maxBitRate={2000000}
            // poster={video.thumbnail}
            // posterResizeMode='cover'
            />
            {/* {!this.state.isVideoLoaded && (
              <FastImage
                style={styles.thumbnailImage}
                source={{
                  uri: video.thumbnail,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            )} */}
            {this.state.isVideoLoading && (
              <Progress.Bar
                style={{ position: 'absolute', bottom: 0 }}
                borderWidth={0}
                borderRadius={0}
                color={'#fff'}
                indeterminate
                height={2}
                width={deviceWidth}
              />
            )}
            {/* {!this.state.isFaceSwapped ? ( */}
            <React.Fragment>
              <View style={styles.userCont}>
                {this.state.isUserVideo && addedBy.username && <TextView style={styles.userNameTxt} onPress={() => {
                  this.openUserProfile()
                }}>{`@${addedBy?.username}`}</TextView>}
                <TextView style={styles.userTxt} numberOfLines={1}>
                  {titles[0] || ''}
                </TextView>
                <TextView style={styles.subTitleTxt} numberOfLines={2}>
                  {titles[1] || ''}
                </TextView>
              </View>
              <View style={styles.btnCont}>
                <Pressable
                  onPress={() => this.saveUnSavedVideo()}
                  style={styles.starBtnCont}>
                  {isSaved ? (
                    <Animatable.View animation="zoomIn">
                      <SvgXml
                        xml={startSvg({
                          fillcolor: color.start_color,
                          strokWidth: 0,
                        })}
                      />
                    </Animatable.View>
                  ) : (
                    <Animatable.View>
                      <SvgXml xml={startSvg({})} />
                    </Animatable.View>
                  )}
                  <View style={styles.badgeContainer}>
                    <TextView style={styles.badgeText}>
                      {saved.length}
                    </TextView>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => this.likeUnLikeVideo()}
                  style={styles.starBtnCont}>
                  {isLiked ? (
                    <Animatable.View animation="zoomIn">
                      <SvgXml
                        xml={heartSvg({
                          fillcolor: color.heart_color,
                          strokWidth: 0,
                        })}
                      />
                    </Animatable.View>
                  ) : (
                    <Animatable.View>
                      <SvgXml xml={heartSvg({})} />
                    </Animatable.View>
                  )}
                  <View style={styles.badgeContainer}>
                    <TextView style={styles.badgeText}>
                      {liked.length}
                    </TextView>
                  </View>
                </Pressable>
                {this.state.isFaceSwapped ? <Pressable
                  onPress={() => this.shareHello()}
                  style={styles.starBtnCont}>
                  <Image
                    style={styles.shareImg}
                    source={shareIcon}
                  />
                  <View style={styles.badgeContainer}>
                    <TextView style={styles.badgeText}>
                      {shared.length}
                    </TextView>
                  </View>
                </Pressable> : null}
              </View>
            </React.Fragment>
            {/* // ) : null} */}
          </View>
        </LinearGradient>
        {!this.state.videoId && <Footer style={styles.footerCont}>
          {!this.state.isFaceSwapped ?
            <React.Fragment>
              <FlatList
                data={this.props.user?.faces ?? []}
                horizontal
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={(item) => (
                  <RawItem
                    {...item}
                    selectedFaceIndex={0}
                    onFacePress={this.onFacePress}
                    needToDisable
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
                extraData={this.state.selectedFaceIndex}
              />
              <TouchableOpacity
                onPress={() => {
                  this.onAddFace()
                }}
                style={styles.addImgCont}>
                <Image source={plus} style={styles.plusImg} />
              </TouchableOpacity>
            </React.Fragment> : (<View style={styles.btnContainer}>
              <Pressable onPress={this.onShareToFeed} style={styles.shareBtn}>
                <Image
                  style={styles.exploreImg}
                  source={explore}
                />
                <TextView style={styles.shareBtnTxt}>POST</TextView>
              </Pressable>
              <Pressable onPress={this.onSave} style={styles.saveBtn}>
                <TextView style={styles.saveBtnTxt}>DOWNLOAD</TextView>
              </Pressable>
            </View>)}
        </Footer>}

        <ShareModal
          visible={this.state.isShareVisible}
          close={this.closeShare}
          navigation={this.props.navigation}
          data={video}
          onShareToFeed={this.onShareToFeed}
          onShareToSocial={this.onShareToSocial}
          onShare={() => {

          }}
        />
        <RegisterModal
          visible={this.state.isRegisterModalVisible}
          close={this.closeReg}
        />

        <ThemLoader visible={this.state.isLoaderVisible} cancelRequest={this.cancelRequest} />
        <FaceSwapReqModal
          isVisible={false}
        />
        <ReportModal visible={this.state.openReportModal} toggle={() => this.setState({ openReportModal: !this.state.openReportModal })} videoId={this.state._id} />
      </Container>
    );
  }
}

const mapActionCreators = (dispatch) => ({
  startApiLoader: bindActionCreators(apiLoadingStart, dispatch),
  stopApiLoader: bindActionCreators(apiLoadingStop, dispatch),
  like: bindActionCreators(likeVideoAction, dispatch),
  save: bindActionCreators(saveVideoAction, dispatch),
  share: bindActionCreators(shareVideoAction, dispatch),
  get: bindActionCreators(getVideoByIdActions, dispatch),
  swap: bindActionCreators(swapVideo, dispatch),
  updateVideo: bindActionCreators(updateVideoById, dispatch),
  shareOnSocial: bindActionCreators(shareVideoOnSocial, dispatch)
});

const mapStateToProps = (state) => {
  return {
    user: state.login.data,
  };
};
export default connect(mapStateToProps, mapActionCreators)(VideoDetailsScreen);
