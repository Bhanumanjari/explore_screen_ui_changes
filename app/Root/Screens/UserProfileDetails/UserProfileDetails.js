import React, { } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { req_user } from "../../../assets";
import { TextView } from "../../../Component";
import BackButton from "../../../Component/BackButton";
import { EmptyList } from "../../../Component/EmptyList";
import FaceSwapReqModal from "../../../Component/FaceSwapReqModal";
import { MyHellosLoader } from "../../../ShimmerEffects/MyHellosLoader";
import { UserProfileDetailLoader } from "../../../ShimmerEffects/ProfileLoaders";
import { getUserProfileById, getUserVideos, saveProfile, saveUserProfile, setUserProfileLoader } from "../../../store/profile";
import { sentRequest } from "../../../store/video";
import { color, font } from "../../../Theme";
import { PixcelWidth, showBottomToast } from "../../../Utils";
import HellosListItem from "./HellosListItem";


function UserProfileDetails(props) {
    const [userInfo, setUserInfo] = useState(props.route.params.data)
    const [isSwapeReqModalVisible, setIsSwapReqModalVisible] = useState(false)
    const [selectedHello, setSelectedHello] = useState({})
    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerShown: true,
            headerLeft: () => <BackButton />,
            title: ''
        })
        return () => {
            props.saveUserProfile({})
        }
    }, [props.navigation])

    useEffect(() => {
        if (props.userDetails._id)
            setUserInfo(props.userDetails)
    }, [props.userDetails])

    useEffect(() => {
        props.getUserProfileById(userInfo._id)
        props.getUserVideos(userInfo._id)
    }, [])

    const onItemPress = (item, index) => {
        if (item.isPublic) {
            props.navigation.navigate('VideoDetailsScreen', {
                ...item
            })
        } else {
            setSelectedHello(item)
            setIsSwapReqModalVisible(true)
        }
    }

    const onSend = () => {
        setIsSwapReqModalVisible(false)
        let data = {
            op: 'add'
        }
        console.log(selectedHello)
        props.sentRequest({ _id: selectedHello._id, data }, (res) => {
            if (res) {

            }
        })
    }

    return (
        <>
            <FaceSwapReqModal
                isVisible={isSwapeReqModalVisible}
                toggle={() => setIsSwapReqModalVisible(!isSwapeReqModalVisible)}
                onSend={onSend}
                data={userInfo}
            />
            <ScrollView style={styles.container}>
                <React.Fragment>
                    <React.Fragment>
                        <View style={styles.profileDetailsContainer}>
                            {userInfo.profileImage?.thumbnail ? <FastImage
                                style={styles.profileImage}
                                source={{
                                    uri: userInfo.profileImage.thumbnail
                                }}
                            /> : <View
                                style={styles.profileImage}
                            >
                                <TextView style={styles.firstCharTxt}>{userInfo?.username?.charAt(0).toUpperCase() ?? 'H'}</TextView>
                            </View>}
                            <TextView style={styles.userNameTxt}>{userInfo?.name}</TextView>
                            <TextView style={styles.nameTxt}>{"@" + userInfo?.username}</TextView>
                        </View>
                        <View style={styles.counterContainer}>
                            <View style={styles.subCounterContainer}>
                                <TextView style={styles.counterTitleTxt}>{"Likes"}</TextView>
                                <View style={styles.counterView}>
                                    <TextView style={styles.counterTxt}>{userInfo?.liked ?? 0}</TextView>
                                </View>
                            </View>
                            <View style={styles.subCounterContainer}>
                                <TextView style={styles.counterTitleTxt}>{"Shares"}</TextView>
                                <View style={styles.counterView}>
                                    <TextView style={styles.counterTxt}>{userInfo?.saved ?? 0}</TextView>
                                </View>
                            </View>
                        </View>
                    </React.Fragment>
                    <View style={styles.videoListContainer}>
                        <View style={styles.divider} />
                        <View style={{ flex: 1 }}>
                            <TextView style={styles.lableTxt}>{"HELLOs"}</TextView>
                            {
                                props.isUserVideoLoading && <MyHellosLoader />
                            }
                            <FlatList
                                data={props.userVideos}
                                scrollEnabled={false}
                                contentContainerStyle={styles.listContainer}
                                numColumns={2}
                                renderItem={(item) => { return <HellosListItem {...item} onItemPress={onItemPress} /> }}
                                ListEmptyComponent={() => {
                                    if (!props.isUserVideoLoading) {
                                        return <EmptyList message={'No videos found'} />
                                    }
                                    return <></>
                                }}
                                keyExtractor={(item, index) => item._id}
                            />
                        </View>
                    </View>
                </React.Fragment>
            </ScrollView>
        </>
    )

}


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: color.primary_color
    },
    profileDetailsContainer: {
        marginVertical: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        // height: '30%'
    },
    profileImage: {
        height: PixcelWidth(79),
        width: PixcelWidth(79),
        borderRadius: PixcelWidth(39),
        borderWidth: 2,
        borderColor: color.txt_white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    userNameTxt: {
        color: color.txt_white,
        fontWeight: '600',
        fontSize: PixcelWidth(20),
        marginTop: 7
    },
    nameTxt: {
        color: color.txt_white,
        marginTop: 7,
        fontSize: PixcelWidth(13),
    },
    counterContainer: {
        flexDirection: 'row',
        marginHorizontal: 15,
        // flex: 1
    },
    subCounterContainer: {
        backgroundColor: color.primary_color,//"#2D363A", //
        flex: 0.5,
        flexDirection: 'row',
        marginHorizontal: 7,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,

        elevation: 5,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { height: 0, width: 0, },
        shadowOpacity: 1,
        shadowRadius: 5,
        margin: 3,
        borderRadius: PixcelWidth(20)
    },
    counterTitleTxt: {
        fontSize: PixcelWidth(13),
        color: color.txt_white
    },
    counterTxt: {
        padding: PixcelWidth(20),
        fontSize: PixcelWidth(13),
        color: color.txt_white,
    },
    counterView: {
        backgroundColor: color.primary_color_dark,
        borderRadius: 20
    },
    divider: {
        height: 2,
        backgroundColor: 'rgba(255,255,255,0.05)',
        marginVertical: PixcelWidth(30)
    },
    videoListContainer: {
        flex: 1
    },
    lableTxt: {
        fontWeight: '600',
        color: color.txt_white,
        lineHeight: PixcelWidth(18),
        fontSize: PixcelWidth(15),
        marginHorizontal: 15
    },
    listContainer: {
        marginHorizontal: 7,
        marginVertical: 10
    },
    firstCharTxt: {
        fontFamily: font.MontserratBold,
        fontSize: PixcelWidth(25),
        color: color.txt_white,
    },
})

const mapStateToProps = (state) => ({
    userDetails: state.profile.userProfileDetail,
    isUserProfileLoading: state.profile.isUserProfileLoading,
    userVideos: state.profile.userVideos,
    isUserVideoLoading: state.profile.isUserVideoLoading,
})

const mapDispatchToProps = {
    saveUserProfile,
    setUserProfileLoader,
    getUserProfileById,
    getUserVideos,
    sentRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileDetails)