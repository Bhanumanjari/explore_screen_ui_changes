import React, { Component } from 'react';
import {
  Image,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';
import { MainHeader, TextView } from 'app/Component';
import ReqRowItem from './../RequestScreen/ReqRowItem';
import { forgotPassword, loginUser } from 'app/store/login';
import { PixcelWidth } from '../../../Utils';
import { color } from '../../../Theme';
import { getLikedVideo, getSavedVideo, saveLikedVideo, saveSavedVideo } from '../../../store/video';
import { useEffect } from 'react';
import { cloneDeep } from 'lodash';
import { LikeSaveVideoLoader } from '../../../ShimmerEffects/ProfileLoaders';
import { EmptyList } from '../../../Component/EmptyList';

function SavedVideo(props) {
  const { type } = props.route?.params;
  useEffect(() => {
    if (type === 'saved') {
      props.getSavedVideo(`?op=save`);
    } else {
      props.getLikedVideo(`?op=like`);
    }
  }, []);

  const updateVideo = ({ item, index }) => {
    if (type === 'saved') {
      let tmp = cloneDeep(props.savedVideos)
      if (tmp.videos) {
        tmp.videos[index] = item
        props.saveSavedVideo(tmp)
      }
    } else {
      let tmp = cloneDeep(props.likedVideos)
      if (tmp.videos) {
        tmp.videos[index] = item
        props.saveLikedVideo(tmp)
      }
    }
  }

  // console.log(props)

  return (
    <Container>
      <MainHeader
        title={type === 'saved' ? 'Saved Hellos' : 'Liked Hellos'}
        onBackPress={() => {
          props.navigation.goBack();
        }}
      />

      <Content style={styles.mainLayout}>
        {props.isVideoLoading && <LikeSaveVideoLoader />}
        <FlatList
          data={type === 'saved' ? props.savedVideos?.videos ?? [] : props.likedVideos?.videos ?? []}
          style={{ marginTop: 8, paddingHorizontal: 20 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={(item) => (
            <ReqRowItem
              {...item}
              onPress={(item, index) => {
                props.navigation.navigate('VideoDetailsScreen', {
                  ...cloneDeep(item),
                  index,
                  updateVideo: updateVideo
                });
              }}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => {
            if (!props.isVideoLoading) {
              return <EmptyList message={'No videos found'} />;
            }
            return <></>;
          }}
        />
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  mainLayout: {
    backgroundColor: color.primary_color,
  },
});
const mapActionCreators = {
  getSavedVideo,
  getLikedVideo,
  saveLikedVideo,
  saveSavedVideo
};

const mapStateToProps = (state) => {
  return {
    likedVideos: state.video.likedVideos,
    savedVideos: state.video.savedVideos,
    isVideoLoading: state.video.isLikeVideoLoading,
  };
};
export default connect(mapStateToProps, mapActionCreators)(SavedVideo);
