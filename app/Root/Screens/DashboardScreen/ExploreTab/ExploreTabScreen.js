import { chunk, cloneDeep, flatten } from "lodash"
import { Container, Content, Header } from "native-base"

import React, { useCallback } from "react"
import { useState } from "react"
import { useEffect, useLayoutEffect } from "react"
import { ActivityIndicator, FlatList, Image, ImageBackground, Pressable, RefreshControl, ScrollView, StyleSheet, TextInput, View } from "react-native"
import FastImage from "react-native-fast-image"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { connect } from "react-redux"
import { filter, find, newHello, noHellosUpload, video } from "../../../../assets"
import { TextView } from "../../../../Component"
import { EmptyList } from "../../../../Component/EmptyList"
import { ExploreListLoader } from "../../../../ShimmerEffects/ExploreLoader"
import { setFilterStatus, setSearchQuery } from "../../../../store/filter"
import { searchVideoByText } from "../../../../store/home"
import { fetchProfiles } from "../../../../store/profile"
import { getExploreVideo, saveVideoWall } from "../../../../store/video"
import { color, font } from "../../../../Theme"
import { deviceWidth, FontSize, PixcelHeight, PixcelWidth } from "../../../../Utils"
import { delay } from "../../../../Utils/globalFun"
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import HeaderTitle from "../../../../Component/HeaderTitle"
import { useRef } from "react"
import CategoryItem from "../../../../Component/CategoryItem"

function ScreenComponent(props) {

    const scrollDirection = useRef()
    const [videos, setVideos] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [paginationConfig, setPaginationConfig] = useState({
        page: 0
    })

    useEffect(() => {
        let params = {
            limit: 10,
            skip: (paginationConfig.page) * 10,
        }

        if (paginationConfig.categoryId) {
            params.categoryId = paginationConfig.categoryId
        }

        props.getExploreVideo(params)

    }, [paginationConfig])

    useEffect(() => {
        if (paginationConfig.page === 0) {
            setVideos(chunk(props.exploreVideoList, 3))
            if (isRefreshing) {
                setIsRefreshing(false)
            }
        } else {
            setVideos(chunk(flatten(videos).concat(props.exploreVideoList), 3))
        }
    }, [props.exploreVideoList])

    /*useEffect(() => {
        const _unsubscribeFocus = props.navigation.addListener('focus', () => {
            onRefresh(false)
        })
        return () => {
            _unsubscribeFocus && _unsubscribeFocus()
        }
    }, [props.navigation])*/

    useLayoutEffect(() => {
        props.navigation.setOptions({
            header: () => {
                const insets = useSafeAreaInsets()
                return (
                    <View style={{ flexDirection: 'row', backgroundColor: color.primary_color, paddingTop: insets.top }}>
                        {/* <HeaderTitle title={"Explore"}/> */}
                        {/* <View style={styles.inputTxtCont}>
                            <Pressable
                                onPress={redirectToSearchedList}
                                style={styles.searchContainer}>
                                <TextView
                                    style={styles.searchHereText}>
                                    Search here
                                </TextView>
                            </Pressable>
                            <Pressable onPress={redirectToSearchedList} style={styles.find}>
                                <Image style={styles.findIcon} source={find} />
                            </Pressable>
                        </View>
                        <Pressable onPress={redirectToSearch} style={styles.filter}>
                            <Image style={styles.filterIcon}
                                source={filter} />
                        </Pressable> */}
                    </View>
                )
            }
        })
    }, [props.navigation])

    const redirectToVideoDetails = (item) => {
        props.navigation.navigate('VideoDetailsScreen', { ...cloneDeep(item) })
    }

    const redirectToVideoList = (item, index) => {
        let videoWall = flatten(videos).slice(index)
        props.saveVideoWall(videoWall.splice(0, 10))
        props.navigation.navigate('VideoListScreen', {
            index
        })
    }

    const onCategorySelect = (item, index) => {
        setSelectedIndex(index)
        if (index === 0) {
            // props.getExploreVideo()
            setPaginationConfig({
                page: 0
            })
        } else {
            // let params = {
            //     categoryId: item._id
            // }
            // props.getExploreVideo(params)
            setPaginationConfig({
                page: 0,
                categoryId: item._id
            })
        }
    }

    const redirectToSearch = () => {
        props.setFilterStatus(false)
        props.navigation.navigate('SearchStack');
    }
    const redirectToSearchedList = () => {
        props.setFilterStatus(true)
        props.searchVideoByText(`?sortBy=popular`)
        props.setSearchQuery('')
        props.fetchProfiles(`?search=`)
        props.navigation.navigate('SearchStack', {
            type: `explore`
        });
    }

    const allCategory = useRef({
        name: "All",
        _id: 'all_explore_video'
    })

    const onRefresh = async (isRefreshing) => {
        setIsRefreshing(isRefreshing)
        // props.getExploreVideo()
        setPaginationConfig({
            page: 0
        })
        setSelectedIndex(0)
    }

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 70;
        if (scrollDirection.current && contentOffset.y > scrollDirection.current.y) {
            scrollDirection.current = contentOffset
            return layoutMeasurement.height + contentOffset.y >=
                contentSize.height - paddingToBottom;
        } else {
            scrollDirection.current = contentOffset
            return false
        }
    };

    return (
        <Container style={styles.container}>
            {/* <Container style={{ backgroundColor: color.primary_color }}> */}
            <View>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={[allCategory.current].concat(props.categoryList)}
                    // data={categories}
                    contentContainerStyle={{ margin: PixcelWidth(15) }}
                    renderItem={(item) => <CategoryItem {...item} selectedIndex={selectedIndex} onPressItem={onCategorySelect} />}
                    keyExtractor={(item, index) => item._id}
                />
            </View>
            <View style={styles.subContainer}>
                {
                    props.isExploreVideoLoading && videos.length === 0 ? <ExploreListLoader /> :

                        <FlatList
                            showsVerticalScrollIndicator={false}
                            windowSize={11}
                            initialNumToRender={7}
                            removeClippedSubviews={true}
                            data={videos}
                            contentContainerStyle={{ paddingBottom: 70 }}
                            renderItem={(item) => <ExploreList {...item} onPressItem={(item, index) => redirectToVideoList(item, index)} />}
                            ListEmptyComponent={() => {
                                if (!props.isExploreVideoLoading) {
                                    return <EmptyList
                                        textStyle={{
                                            marginTop: hp("10%")
                                        }} image={noHellosUpload}
                                        message={'No videos found'} />;
                                }
                                return <></>;
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            refreshControl={<RefreshControl
                                enabled
                                colors={[color.primary_color]}
                                tintColor={color.refresh_control_color}
                                refreshing={props.isExploreVideoLoading && isRefreshing}
                                onRefresh={() => onRefresh(true)}
                            />}
                            onMomentumScrollEnd={({ nativeEvent }) => {
                                if (isCloseToBottom(nativeEvent) && !props.isCategoryVideoLoading) {
                                    setPaginationConfig({
                                        ...paginationConfig,
                                        page: paginationConfig.page + 1
                                    })
                                }
                            }}
                            ListFooterComponent={() => {
                                if (paginationConfig.page !== 0 && props.isExploreVideoLoading) {
                                    return (
                                        <ActivityIndicator color={"#ffffff"} />
                                    )
                                }
                                return <></>
                            }}
                        />
                }
            </View>
            {/* </Container> */}
        </Container>
    )
}

const ExploreFilterItem = ({ item, index, selectedIndex = -1, onPressItem = () => { } }) => {
    const isSelected = selectedIndex === index
    return (
        <Pressable style={[styles.exploreFilterContainer, {
            borderWidth: isSelected ? 1 : undefined,
            borderColor: isSelected ? color.txt_white : undefined
        }]} onPress={() => onPressItem(item, index)}>
            <TextView style={styles.exploreFilterText}>{item.name}</TextView>
        </Pressable>
    )
}

const ExploreList = ({ item, index, onPressItem = () => { } }) => {
    if (index % 2 === 0) {
        return (
            <View style={styles.listContainer}>
                {
                    item.map((subItem, i) => {
                        const actualIndex = i + index * 3
                        return (
                            <ExploreListItem key={actualIndex} item={subItem} index={actualIndex} onPressItem={onPressItem} />
                        )
                    })
                }
            </View>
        )
    } else {
        let data = chunk(item, 2)
        return (
            <View style={{
                flexDirection: 'row'
            }}>
                {
                    data.map((data1, i) => {
                        return <View key={`${index}${i}`} style={{
                            flexDirection: data.length === 1 ? 'row' : 'column'
                        }}>
                            {
                                data1.map((subItem, i1) => {
                                    const actualIndex = i1 + i * 2 + index * 3
                                    return (
                                        <ExploreListItem key={actualIndex} item={subItem} scale={i === 1} index={actualIndex} onPressItem={onPressItem} />
                                    )
                                })
                            }
                        </View>
                    })
                }
            </View>
        )
    }
}
const ExploreListItem = ({ item, index, scale = false, onPressItem }) => {
    const itemWidth = ((wp('100%') - 24) / (3 / (scale ? 2 : 1))) - 10
    const itemHeight = scale ? hp('44%') + 20 : hp('22%')
    let guestTry =item.addedBy.username ;
    var res = guestTry.substring(0, 5);
    return (
        <Pressable
            onPress={() => {
                onPressItem(item, index)
            }}>
            <FastImage source={{
                uri: item.video.thumbnail
            }} style={[styles.exploreBackImage, {
                width: itemWidth,
                height: itemHeight,
            }]}>
                 {(() => {
              if (res==="USER_"){
                  return (
                    <TextView style={styles.userNameTxt} >{"GUEST"}</TextView>
                  )
              }else{
                  return(
                  <TextView style={styles.userNameTxt} >{`@${item.addedBy?.username}`}</TextView>
                  )
              }
              
              return null;
            })()}
            </FastImage>
        </Pressable>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.primary_color,
    },
    header: {
        backgroundColor: color.primary_color, borderBottomColor: color.primary_color,
    },
    find: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginHorizontal: PixcelWidth(15),
    },
    findIcon: { height: 30, width: 30, resizeMode: 'contain' },
    filter: {
        marginRight: 15,
        alignSelf: 'center',
    },
    filterIcon: { height: 30, width: 30, resizeMode: 'contain' },
    inputTxt: {
        flex: 1,
        fontFamily: font.MontserratRegular,
        marginLeft: 15,
        fontSize: 15,
        color: '#FFF',
    },
    inputTxtCont: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#3E464A',
        borderRadius: 30,
        marginHorizontal: 15,
        height: PixcelWidth(51),
    },
    exploreFilterText: {
        fontFamily: font.MontserratRegular,
        fontSize: FontSize.Small,
        paddingVertical: PixcelWidth(10),
        paddingHorizontal: PixcelWidth(25),
        color: color.txt_white
    },
    exploreFilterContainer: {
        backgroundColor: color.primary_color_dark,
        marginRight: PixcelWidth(12),
        borderRadius: PixcelWidth(20)
    },
    exploreBackImage: {
        // height:PixcelHeight(400),
        // width:PixcelWidth(((deviceWidth-PixcelWidth(24))/3)-10),
        marginHorizontal: 5,
        marginVertical: 10,
        borderRadius: 10
    },
    listContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
    },
    subContainer: {
        // flexDirection: 'row',
        marginHorizontal: 12,
        backgroundColor: color.primary_color,
        // alignItems: 'center'
        // paddingBottom: 100
    },
    searchContainer: {
        flex: 1,
        justifyContent: 'center',
        // marginHorizontal: 15
    },
    searchHereText: {
        fontFamily: font.MontserratRegular,
        marginHorizontal: PixcelWidth(20),
        fontSize: PixcelWidth(15),
        color: color.secondary,
    },
    userNameTxt:{
        position:"absolute",
        bottom:10,      
        fontFamily: font.MontserratSemibold,
        color: color.txt_white,
        marginLeft:15,
        
    },

})

const mapStateToProps = (state) => ({
    exploreVideoList: state.video.exploreVideoList,
    isExploreVideoLoading: state.video.isExploreVideoLoading,
    categoryList: state.home.categoryList,
    // isCategoryLoading: state.home.isCategoryLoading,
})

const mapDispatchToProps = {
    getExploreVideo,
    setFilterStatus,
    searchVideoByText,
    fetchProfiles,
    setSearchQuery,
    saveVideoWall
}

export const ExploreTabScreen = connect(mapStateToProps, mapDispatchToProps)(ScreenComponent)