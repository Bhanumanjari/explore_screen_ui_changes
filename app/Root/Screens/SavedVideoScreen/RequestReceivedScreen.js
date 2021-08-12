import { cloneDeep } from 'lodash';
import React from 'react'
import { useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { MainHeader } from '../../../Component';
import { EmptyList } from '../../../Component/EmptyList';
import { LikeSaveVideoLoader } from '../../../ShimmerEffects/ProfileLoaders';
import { fetchUserProfile } from '../../../store/login';
import { getRequestReceivedVideo, getRequestSentVideo, markRequestView, saveRequestReceivedVideo } from '../../../store/video';
import { color } from '../../../Theme';
import ReqRowItem from './../RequestScreen/ReqRowItem';

function RequestReceivedScreen(props) {

    useEffect(() => {
        props.getRequestReceivedVideo(`?op=received`)
    }, [])

    const updateVideo = ({ item, index }) => {
        let tmp = cloneDeep(props.requestSentVideo)
        if (tmp.videos) {
            tmp.videos[index] = item
            props.saveLikedVideo(tmp)
        }
    }

    const onReqView = (item, index) => {
        let tmp = cloneDeep(props.requestRecievedVideo)
        // console.log("<><><><><><>", item)
        // console.log("???????", tmp)
        if (tmp.videos) {
            tmp.videos[index] = item
            props.saveRequestReceivedVideo(tmp)
        }
    }

    return (
        <>
            <MainHeader
                title={'Request Received Hellos'}
                onBackPress={() => {
                    props.navigation.goBack();
                }}
            />
            <View style={styles.mainLayout}>
                {props.isRequestReceivedVideoLoading ? <LikeSaveVideoLoader /> :
                    <FlatList
                        data={props.requestRecievedVideo?.videos ?? []}
                        style={{ marginTop: 8, paddingHorizontal: 20 }}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        renderItem={(item) => (
                            <ReqRowItem
                                {...item}
                                isNeedToShowRequest={true}
                                onPress={(item, index) => {
                                    props.navigation.navigate('ReqAcceptScreen', {
                                        item,
                                        index,
                                        onReqView
                                    })
                                }}
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={() => {
                            if (!props.isRequestReceivedVideoLoading) {
                                return <EmptyList message={'No videos found'} />;
                            }
                            return <></>;
                        }}
                    />
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    mainLayout: {
        flex: 1,
        backgroundColor: color.primary_color,
    },
});

const mapActionCreators = {
    getRequestReceivedVideo,
    markRequestView,
    fetchUserProfile,
    saveRequestReceivedVideo
};

const mapStateToProps = (state) => {
    return {
        requestRecievedVideo: state.video.requestRecievedVideo,
        isRequestReceivedVideoLoading: state.video.isRequestReceivedVideoLoading,
    };
};
export default connect(mapStateToProps, mapActionCreators)(RequestReceivedScreen);