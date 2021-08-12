import React, { useCallback } from "react"
import { useLayoutEffect, useState } from "react"
import { Pressable, View, Image, FlatList, SafeAreaView, StatusBar, Platform } from "react-native"
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

const ORIGINAL_HEIGHT = hp("100%") - StatusBar.currentHeight
const VideoList = (props) => {
    const viewabilityConfig = {
        minimumViewTime: 500,
        viewAreaCoveragePercentThreshold: 95
    }
    const exploreVideoList = useSelector(state => state.video.exploreVideoList)
    const dispatch = useDispatch()
    const insets = useSafeAreaInsets()
    const [currentViewItem, setCurrentViewItem] = useState([])
    const [openReportModal, setOpenReportModal] = useState(false)


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

    // alert(StatusBar.currentHeight)
    return (
        <View style={styles.container}>
            <FlatList
                data={exploreVideoList}
                style={{
                    height: hp("100%")
                }}
                snapToAlignment="start"
                pagingEnabled
                decelerationRate='fast'
                initialScrollIndex={props.route.params.index}
                initialNumToRender={1}
                windowSize={1}
                getItemLayout={(_, index) => (
                    { length: ORIGINAL_HEIGHT, offset: ORIGINAL_HEIGHT * index, index }
                )}
                viewabilityConfig={viewabilityConfig}
                onViewableItemsChanged={onViewableItemsChanged}
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