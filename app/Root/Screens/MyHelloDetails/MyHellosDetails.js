import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { FlatList, Image, Pressable, SafeAreaView, View } from "react-native"
import { backArrow, menu_dot, smileLoader } from "../../../assets"
import HelloPlayer from "../VideoList/VideoListItem"
import styles from './MyHellosDetailsStyle'
import RawItem from '../DashboardScreen/ProfileTab/ProfileRowItem';
import { color } from "../../../Theme"
import { deviceHeight, deviceWidth, showBottomToast } from "../../../Utils"
import { useDispatch, useSelector } from "react-redux"
import { getMyHellosDetails } from "../../../store/myHellos"
import { MyFacesLoader, MyHellosDetailsLoader } from "../../../ShimmerEffects/MyHellosLoader"
import FastImage from "react-native-fast-image"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import { TextView } from "../../../Component"
import ReportModal from "../../../Component/ReportModal"

const MyHellosDetails = (props) => {

    console.log(":::MyHellosDetails:::")

    const flatListRef = useRef()
    const viewabilityConfig = useRef({
        minimumViewTime: 500,
        viewAreaCoveragePercentThreshold: 95
    })
    const isFirstRender = useRef(true)
    const dispatch = useDispatch()
    const insets = useSafeAreaInsets()

    const myHellosDetails = useSelector(state => state.myHellos.myHellosDetails)
    const isDetailsFetching = useSelector(state => state.myHellos.isDetailsFetching)

    const [faces, setFaces] = useState([])
    const [videoData, setVideoData] = useState(props.route.params)
    const [currentFaceIndex, setCurrentFaceIndex] = useState(0)
    const [currentViewItem, setCurrentViewItem] = useState([])
    const [openReportModal, setOpenReportModal] = useState(false)

    useEffect(() => {
        dispatch(getMyHellosDetails(props.route.params._id))
    }, [])

    useLayoutEffect(() => {

        const reportVideo = async () => {
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
                    optionsContainer : {
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

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        setFaces(myHellosDetails)
    }, [myHellosDetails])

    const onFacePress = (_, index) => {
        setCurrentFaceIndex(index)
        flatListRef.current?.scrollToIndex({
            index,
            animated: true
        })
    }

    const onScrollEnd = (e) => {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;

        let pageNum = Math.floor(contentOffset.x / viewSize.width);
        setCurrentFaceIndex(pageNum)
    }

    const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
        setCurrentViewItem(viewableItems)
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.videoContainer}>
                {isDetailsFetching ? <FastImage
                    style={styles.loaderImag}
                    source={smileLoader}
                    resizeMode={FastImage.resizeMode.contain}
                /> : <FlatList
                    ref={flatListRef}
                    data={faces}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={onScrollEnd}
                    initialNumToRender={1}
                    windowSize={3}
                    snapToAlignment="start"
                    decelerationRate='fast'
                    viewabilityConfig={viewabilityConfig.current}
                    onViewableItemsChanged={onViewableItemsChanged}
                    getItemLayout={(_, index) => (
                        { length: deviceWidth, offset: deviceWidth * index, index }
                    )}
                    renderItem={(item) => {
                        return <HelloPlayer
                            {...item}
                            currentViewItem={currentViewItem}
                            fullScreen={false}
                            videoContainerStyle={{
                                height: deviceHeight - 100 - insets.bottom,
                                width: deviceWidth
                            }}
                            isMyHello={true}
                        />
                    }}
                    keyExtractor={(item) => item._id}
                />}


            </View>
            <View style={[styles.bottomContainer, {
                marginBottom: insets.bottom
            }]}>
                {
                    isDetailsFetching ? <MyFacesLoader /> : (
                        <FlatList
                            data={faces}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => {
                                const newItem = item.face
                                return <RawItem
                                    item={newItem}
                                    index={index}
                                    selectedFaceIndex={currentFaceIndex}
                                    onFacePress={onFacePress}
                                />
                            }}
                        />
                    )
                }
            </View>
            {/* <SafeAreaView /> */}
            <ReportModal visible={openReportModal} toggle={() => setOpenReportModal(!openReportModal)} videoId={currentViewItem[0] ? currentViewItem[0].item._id : ""} />
        </View>
    )
}

export default MyHellosDetails