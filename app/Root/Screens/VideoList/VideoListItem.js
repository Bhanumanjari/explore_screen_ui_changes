
import React, { useCallback, useEffect, useRef, useState } from "react"
import { Image, Platform, Pressable, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import Video from "react-native-video"
import { TextView } from "../../../Component"
import { deviceWidth, showBottomToast } from "../../../Utils"
import * as Progress from 'react-native-progress';
import * as Animatable from 'react-native-animatable';
import styles from "./VideoListStyle"
import { findIndex } from "lodash"
import { useDispatch, useSelector } from "react-redux"
import { heartSvg, startSvg } from "../../../assets/Svg/svgFiles"
import { SvgXml } from "react-native-svg"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { likeVideoAction, saveVideoAction, shareVideoAction, shareVideoOnSocial } from "../../../store/video/actions"
import { color } from "../../../Theme"
import { StackActions, useNavigation } from "@react-navigation/native";
import { downloadIcon, shareIcon } from "../../../assets"
import Share from "react-native-share"
import { requestStoragePermission } from "../../../Config/permissions"
import { DocumentDirectoryPath, downloadFile } from "react-native-fs"
import CameraRoll from "@react-native-community/cameraroll"
import { bufferConfig } from "../../../Utils/constant"


const VideoListItem = ({ item, index, currentViewItem = [], paused = true, videoContainerStyle = {}, fullScreen = true, isMyHello = false }) => {
    let videoPlayer = null
    const insets = useSafeAreaInsets()
    const dispatch = useDispatch()
    const titles = item.title?.split('-');
    const isFirstRender = useRef(true)
    const navigation = useNavigation()

    const userId = useSelector(state => state.login.data?._id)

    const [isVideoLoading, setIsVideoLoading] = useState(true)
    const [isVideoBuffering, setIsVideoBuffering] = useState(false)
    const [isPaused, setIsPaused] = useState(paused)
    const [isSaved, setIsSaved] = useState(findIndex(item.saved, { userId }) > -1)
    const [isLiked, setIsLiked] = useState(findIndex(item.liked, { userId }) > -1)
    const [likeCount, setLikeCount] = useState(item.liked.length)
    const [saveCount, setSaveCount] = useState(item.saved.length)
    const [shareCount, setShareCount] = useState(item.shared.length)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        for (const currentView of currentViewItem) {
            if (currentView.index === index && currentView.isViewable) {
                setIsPaused(false)
            } else {
                setIsPaused(true)
            }
        }
    }, [currentViewItem])

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        setLikeCount(item.liked.length)
        setIsLiked(findIndex(item.liked, { userId }) > -1)
    }, [item.liked.length])

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        setSaveCount(item.saved.length)
        setIsSaved(findIndex(item.saved, { userId }) > -1)
    }, [item.saved.length])

    const onLoad = () => {
        // setIsVideoLoading(false)
        console.log("onLoad")
    }
    const onLoadStart = () => {

    }
    const onBuffer = (video) => {
        setIsVideoBuffering(video.isBuffering)
    }
    const onReadyForDisplay = () => {
        setIsVideoLoading(false)
    }
    const onError = (error) => {
        console.log(error)
    }

    const openUserProfile = () => {
        navigation.dispatch(StackActions.replace('UserProfileDetailsScreen', {
            data: item.addedBy
        }))
    }

    const saveUnSavedVideo = () => {
        let data = {
            op: isSaved ? 'remove' : 'add',
        };
        dispatch(saveVideoAction(item._id, data))
        setSaveCount(saveCount + (isSaved ? -1 : 1))
        setIsSaved(!isSaved)
    }

    const likeUnLikeVideo = () => {
        let data = {
            op: isLiked ? 'remove' : 'add',
        };
        dispatch(likeVideoAction(item._id, data))
        setLikeCount(likeCount + (isLiked ? -1 : 1))
        setIsLiked(!isLiked)
    }

    const shareHello = async () => {

        setIsPaused(true)
        dispatch(shareVideoOnSocial(item._id,item.video,(res) => {
            setIsPaused(false)
            if(res){
                setShareCount(shareCount + 1)
            }
        }))
        // try {
        //     setIsPaused(true)
        //     const response = await Share.open({
        //         title: 'Share hello with friends',
        //         message: "Click on below link to explore more hellos like this\n",
        //         url: `helloface://hello/${item._id}`,
        //     })
        //     dispatch(shareVideoAction(item._id, {
        //         op: 'add'
        //     }))
        //     setIsPaused(false)
        //     setShareCount(shareCount + 1)
        // } catch (error) {
        //     setIsPaused(false)
        //     console.log(error)
        // }
    }

    const downloadHello = async () => {
        let isPermission = true
        if(Platform.OS === 'android'){
            isPermission = await requestStoragePermission()
        }
        console.log(isPermission)
        if(!isPermission){
            return
        }
        
        const options = {
            fromUrl: item.video.original,
            toFile: `${DocumentDirectoryPath}/download_${item.video.fileName}`,
        };

        showBottomToast("Video downloading started...")  
        downloadFile(options).promise.then(async res => {
            if (res.statusCode === 200) {
                const isSaved = await CameraRoll.save(`${DocumentDirectoryPath}/${item.video.fileName}`, {
                    type: 'video',
                    album: 'Helloface'
                })
                showBottomToast("Video is downloaded successfully")  
            }
          }).catch(err => {
            console.log(err)
            showBottomToast("Error while downloading video") 
          })
    }

    return (

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
            style={styles.videoListContainer}
        >

            <Video
                ref={(ref) => videoPlayer = ref}
                source={{
                    uri: item.video?.original,
                    // cache: true
                }}
                // hideShutterView
                disableFocus={true}
                paused={isPaused}
                style={{ ...styles.videoContainer, ...videoContainerStyle }}
                repeat
                resizeMode="contain"
                onLoad={onLoad}
                onLoadStart={onLoadStart}
                onBuffer={onBuffer}
                onReadyForDisplay={onReadyForDisplay}
                onError={onError}
                bufferConfig={bufferConfig}
                // poster={item.video?.thumbnail}
                // posterResizeMode='cover'
            />

            <React.Fragment>
                <View style={[styles.userCont, {
                    bottom: fullScreen ? insets.bottom + 20 : 20
                }]}>
                    {(!isMyHello && item.isUserVideo && item.addedBy) && <TextView style={styles.userNameTxt} onPress={() => {
                        openUserProfile()
                    }}>{`@${item.addedBy?.username}`}</TextView>}
                    <TextView style={styles.userTxt} numberOfLines={1}>
                        {titles[0] || ''}
                    </TextView>
                    <TextView style={styles.subTitleTxt} numberOfLines={2}>
                        {titles[1] || ''}
                    </TextView>
                </View>
                <View style={[styles.btnCont, {
                    bottom: fullScreen ? insets.bottom + 20 : 20
                }]}>
                    <Pressable
                        onPress={() => saveUnSavedVideo()}
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
                                {saveCount}
                            </TextView>
                        </View>
                    </Pressable>
                    <Pressable
                        onPress={() => likeUnLikeVideo()}
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
                                {likeCount}
                            </TextView>
                        </View>
                    </Pressable>
                    <Pressable
                        onPress={() => shareHello()}
                        style={styles.starBtnCont}>
                        <Image
                            style={styles.shareImg}
                            source={shareIcon}
                        />
                        <View style={styles.badgeContainer}>
                            <TextView style={styles.badgeText}>
                                {shareCount}
                            </TextView>
                        </View>
                    </Pressable>
                    <Pressable
                        onPress={() => downloadHello()}
                        style={styles.starBtnCont}>
                        <Image
                            style={styles.downloadImg}
                            source={downloadIcon}
                        />
                    </Pressable>
                </View>
            </React.Fragment>

            {(isVideoLoading || isVideoBuffering) && (
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
        </LinearGradient>

    )
}

export default VideoListItem