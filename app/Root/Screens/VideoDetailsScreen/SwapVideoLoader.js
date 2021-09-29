import React from "react"
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { Alert, Image, View, Pressable, BackHandler } from "react-native"
import FastImage from 'react-native-fast-image';
import { close, smileLoader, swapLoader } from "../../../assets";
import BackButton from "../../../Component/BackButton";
import styles from './VideoDetailsScreenStyle';
import { TestIds, RewardedAd, RewardedAdEventType } from '@react-native-firebase/admob';
import { useDispatch, useSelector } from "react-redux";
import { swapVideo } from "../../../store/video";
import axios from "axios"
import { StackActions } from "@react-navigation/native";
import { useRef } from "react";
import * as Progress from 'react-native-progress';
import { useState } from "react";
import { TextView } from 'app/Component';
import { color } from "../../../Theme";
import moment from "moment";
import { delay, getRewardAdsId } from "../../../Utils/globalFun";
import { hideNavigationBar, showNavigationBar } from "react-native-navigation-bar-color";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { logAnalyticsEvent } from "../../../Config/analyticsEvent";

//const rewardId = TestIds.REWARDED  // uncomment this while developing
//const rewardId = getRewardAdsId() ; // uncomment this while production
const rewardId = __DEV__? TestIds.REWARDED : getRewardAdsId() ;
const rewardAd = RewardedAd.createForAdRequest(rewardId,{
    keywords: ['*'],
});


const SwapVideoLoader = (props) => {

    const appConfig = useSelector(state => state.global.appConfig)
    const user = useSelector(state => state.login.data)

    const source = useRef()
    const interval = useRef()
    const timer = useRef()
    const fraction = useRef(1 / appConfig.loaderTime)
    const dispatch = useDispatch()

    const [progress, setProgress] = useState(0)

    // useEffect(() => {
    //     interval.current = setInterval(() => {
    //         setProgress(progress => progress + fraction.current)
    //     }, 1000);

    //     timer.current = setTimeout(() => {
    //         clearInterval(interval)
    //     }, appConfig.loaderTime * 1000);

    //     // timer.current = setTimeout(() => {
    //     //     // clearInterval(interval)
    //     //     fraction.current = 1/100
    //     // }, 30000);

    //     return () => {
    //         clearInterval(interval.current)
    //         clearTimeout(timer.current)
    //     }
    // }, [])

     useEffect(() => {
         console.log("showing the adds" ) ;
         console.log("rewardId = ", rewardId) ;
         //showRewardAd()
         const eventListener = rewardAd.onAdEvent((type, error, reward) => {
            if (type === RewardedAdEventType.LOADED) {
                console.log('Ad loaded');
                //swapFace() ;
                rewardAd.show()
            }

            if (type === RewardedAdEventType.EARNED_REWARD) {
                console.log('Ad completed');
                console.log("reward = ", reward) ;
            }
        });
        rewardAd.load() ;
        console.log(rewardAd) ;
        console.log(rewardAd.loaded)
        console.log(rewardAd.adUnitId) ;
        //if(rewardAd.loaded){
        //    rewardAd.show();
       // }
        
        return()=>{
            eventListener();
        }
     },[]);

    useEffect(() => {
        setTimeout(() => {
            swapFace();
        }, 4000);
        //swapFace()
    }, [])

    useEffect(() => {
        const backAction = () => {
            if (source.current) {
                source.current.cancel("Swap video request cancelled successfully")
            }
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, []);
    // useEffect(() => {
    //     hideNavigationBar()
    //     return () => {
    //         showNavigationBar()
    //     }
    // }, [])

    // useLayoutEffect(() => {
    //     props.navigation.setOptions({
    //         title: '',
    //         headerLeft: null,
    //         headerRight: () => <Pressable style={{
    //             marginHorizontal: 15
    //         }}
    //             onPress={() => {
    //                 if (source.current) {
    //                     source.current.cancel("Swap video request cancelled successfully")
    //                 }
    //                 props.navigation.goBack()
    //             }}
    //         >
    //             <Image source={close} />
    //         </Pressable>,
    //         headerShown: true,
    //         headerTransparent: true,
    //         gestureEnabled: false
    //     })
    // }, [props.navigation])

    const showRewardAd = () => {
        
        const eventListener = rewardAd.onAdEvent((type, error, reward) => {
            if (type === RewardedAdEventType.LOADED) {
                console.log('Add loaded');
                rewardAd.show()
            }

            if (type === RewardedAdEventType.EARNED_REWARD) {
                console.log('Ad completed');
            }
        });

        rewardAd.load()

    }

    const swapFace = async () => {

        const { faceId, videoId, duration } = props.route.params

        let formData = new FormData()
        formData.append("_id", videoId)
        formData.append("faceId", faceId)
        formData.append("duration", duration)

        source.current = axios.CancelToken.source()

        const resp = await dispatch(swapVideo(formData, source.current.token))
        // if (progress < 1) {
        //     setProgress(1)
        // }
        // await delay(1000)
        if (resp && resp.type === 'SAVE_SWAPE_VIDEO_DATA') {
            if (resp.payload.type === "QUOTA_EXHAUSTED") {
                setTimeout(() => {
                    Alert.alert("Limit Exceeded", `You have exhausted your ${resp.payload.swaps} swaps, Please swap again after ${moment(resp.payload.lockedTill).format("hh:mm A")} Time.`, [{
                        text: "Ok",
                        onPress: () => {
                            props.navigation.goBack()
                        }
                    }])
                }, 500);
            } else {
                props.navigation.dispatch(StackActions.replace("VideoDetailsScreen", { ...resp.payload, videoId: undefined, isFaceSwapped: true }))
                logAnalyticsEvent('swap_video', {
                    username: user.username
                })
            }
        } else {
            props.navigation.goBack()
        }
    };

    return (
        <View style={styles.loaderContainer}>
            {/* <FastImage
                style={styles.loaderImag}
                source={smileLoader}
                resizeMode={FastImage.resizeMode.contain}
            /> */}
            {/* <Progress.Bar height={10} progress={progress} borderColor="#fff" color={color.btnPrimary_color} width={200} /> */}
            <AnimatedCircularProgress
                size={250}
                width={7}
                fill={100}
                tintColor={color.btnPrimary_color}
                rotation={0}
                duration={appConfig.loaderTime * 1000}
            >
                {
                    (fill) => (
                        <FastImage
                            source={swapLoader}
                            style={styles.loaderImag}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    )
                }
            </AnimatedCircularProgress>
            <TextView style={styles.progressTxt}>{"Your Fantasy Is Getting Loaded..."}</TextView>
            <Pressable style={styles.cancelBtn} onPress={() => {
                if (source.current) {
                    source.current.cancel("Swap video request cancelled successfully")
                }
                // props.navigation.goBack()
            }}>
                <TextView style={styles.cancelBtnTxt}>{"Cancel"}</TextView>
            </Pressable>
        </View>
    )

}

export default SwapVideoLoader