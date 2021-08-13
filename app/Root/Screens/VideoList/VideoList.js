import React, { useCallback, useEffect } from "react"
import { useLayoutEffect, useState } from "react"
import { Pressable, View, Image, FlatList, SafeAreaView, StatusBar, Platform, Dimensions } from "react-native"
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useDispatch, useSelector } from "react-redux"
import { backArrow, menu_dot } from "../../../assets"
import { deviceHeight, deviceWidth, downloadFileFromUrl, showBottomToast } from "../../../Utils"
import VideoListItem from "./VideoListItem"
import styles from "./VideoListStyle"
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { TextView } from "../../../Component"
import ReportModal from "../../../Component/ReportModal"
import { getVideoWall, saveVideoWall } from "../../../store/video"
import { useRef } from "react"
import { hideNavigationBar, showNavigationBar } from "react-native-navigation-bar-color"

const ORIGINAL_HEIGHT = Dimensions.get('screen').height

const VideoList = (props) => {

    const isFirstRender = useRef(true)
    const currentPage = Math.abs(parseInt(props.route.params.index / 10))


    const viewabilityConfig = {
        minimumViewTime: 500,
        viewAreaCoveragePercentThreshold: 95
    }
    const exploreVideoList = useSelector(state => state.video.exploreVideoList)
    const videoWallList = useSelector(state => state.video.videoWallList)

    const dispatch = useDispatch()
    const insets = useSafeAreaInsets()
    const [currentViewItem, setCurrentViewItem] = useState([])
    const [openReportModal, setOpenReportModal] = useState(false)
    const [list, setList] = useState([])

    const [pageConfig, setPageConfig] = useState({
        page: currentPage + 1,
        skip: props.route.params.index + videoWallList.length - 10
    })

    useEffect(() => {
        hideNavigationBar()
        return () => {
            showNavigationBar()
        }
    }, [])

    useEffect(() => {
        setList(list.concat(videoWallList))
    }, [videoWallList])

    useEffect(() => {
        if (videoWallList.length < 3) {
            setPageConfig({
                skip: pageConfig.skip + 10
            })
        }
    }, [])

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        let params = {
            limit: 10,
            skip: pageConfig.skip
        }
        dispatch(getVideoWall(params))
    }, [pageConfig])

    useLayoutEffect(() => {
        const reportVideo = () => {
            setOpenReportModal(true)
        }

        props.navigation.setOptions({
            title: '',
            headerLeft: () => <Pressable onPress={() => props.navigation.goBack()}>
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
                        <MenuOption onSelect={() => reportVideo()}>
                            <TextView>
                                Report
                            </TextView>
                        </MenuOption>
                    </MenuOptions>
                </Menu>,
            headerShown: true,
            headerTransparent: true,
        })
    }, [props.navigation])

    const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
        setCurrentViewItem(viewableItems)
    }, [])

    const onScrollEnd = (e) => {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;

        let pageNum = Math.floor(contentOffset.y / viewSize.height);

        if (pageNum === list.length - 2) {
            setPageConfig({
                skip: pageConfig.skip + 10
            })
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <FlatList
                data={list}
                style={{
                    // height: hp("100%")
                }}
                bounces={false}
                snapToAlignment="start"
                pagingEnabled
                decelerationRate='fast'
                // initialScrollIndex={props.route.params.index}
                initialNumToRender={1}
                windowSize={3}
                removeClippedSubviews={true}
                getItemLayout={(_, index) => (
                    { length: ORIGINAL_HEIGHT, offset: ORIGINAL_HEIGHT * index, index }
                )}
                viewabilityConfig={viewabilityConfig}
                onViewableItemsChanged={onViewableItemsChanged}
                onMomentumScrollEnd={onScrollEnd}
                keyExtractor={(item, index) => item._id}
                renderItem={(item) => <VideoListItem {...item} currentViewItem={currentViewItem}
                    videoContainerStyle={{
                        height: ORIGINAL_HEIGHT
                    }}
                />}
            />
            <ReportModal visible={openReportModal} toggle={() => setOpenReportModal(!openReportModal)} videoId={currentViewItem[0] ? currentViewItem[0].item._id : ""} />
        </View>
    )
}

export default VideoList