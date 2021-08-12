import { cloneDeep } from 'lodash';
import React from 'react'
import { useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { MainHeader } from '../../../Component';
import { EmptyList } from '../../../Component/EmptyList';
import { LikeSaveVideoLoader } from '../../../ShimmerEffects/ProfileLoaders';
import { getRequestSentVideo } from '../../../store/video';
import { color } from '../../../Theme';
import ReqRowItem from './../RequestScreen/ReqRowItem';

function RequestSendVideoScreen(props) {

    useEffect(() => {
        props.getRequestSentVideo(`?op=requested`)
    }, [])

    const updateVideo = ({ item, index }) => {

    }

    const onItemPress = (item, index, requestStatus) => {
        // console.log(requestStatus)
        if (requestStatus) {
            if (requestStatus.status === "APPROVED") {
                props.navigation.navigate('VideoDetailsScreen', {
                    ...cloneDeep(item),
                    index,
                    updateVideo: updateVideo
                });
            }
        }
    }

    return (
        <>
            <MainHeader
                title={'Request Sent Hellos'}
                onBackPress={() => {
                    props.navigation.goBack();
                }}
            />
            <View style={styles.mainLayout}>
                {props.isRequestSentVideoLoading ? <LikeSaveVideoLoader /> :
                    <FlatList
                        data={props.requestSentVideo?.videos ?? []}
                        style={{ marginTop: 8, paddingHorizontal: 20 }}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        renderItem={(item) => (
                            <ReqRowItem
                                {...item}
                                isNeedToShowRequestStatus={true}
                                onPress={onItemPress}
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={() => {
                            if (!props.isRequestSentVideoLoading) {
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
    getRequestSentVideo
};

const mapStateToProps = (state) => {
    return {
        requestSentVideo: state.video.requestSentVideo,
        isRequestSentVideoLoading: state.video.isRequestSentVideoLoading,
    };
};
export default connect(mapStateToProps, mapActionCreators)(RequestSendVideoScreen);