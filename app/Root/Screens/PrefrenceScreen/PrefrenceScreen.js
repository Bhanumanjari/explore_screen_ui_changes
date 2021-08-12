import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Pressable,
} from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  Content,
  Footer,
  Header,
  Left,
  Body,
  Title,
} from 'native-base';
import styles from './PrefrenceScreenStyle';
import { TextView, Hbutton, EditTextView, MainHeader } from 'app/Component';
import { home, movie, video, smile, checkRound } from '../../../assets';
import { updateProfileAction } from '../../../store/profile/actions';
import { getCategoryList, getCategoryVideoList, getForMeVideo } from '../../../store/home';
import { cloneDeep, includes, indexOf, isEqual } from 'lodash';
import { setGuestProfile } from '../../../store/guest';
import { showBottomToast } from '../../../Utils';
import { PreferenceLoader } from '../../../ShimmerEffects/ProfileLoaders';
import FastImage from 'react-native-fast-image';

const DATA = [
  { title: 'ENTERTAINMENT' },
  { title: 'MOVIES' },
  { title: 'COMEDY' },
  { title: 'ACTION' },
  { title: 'ENTERTAINMENT' },
  { title: 'MOVIES' },
  { title: 'COMEDY' },
  { title: 'ACTION' },
  { title: 'ENTERTAINMENT' },
  { title: 'MOVIES' },
  { title: 'COMEDY' },
  { title: 'ACTION' },
  { title: 'ENTERTAINMENT' },
  { title: 'MOVIES' },
  { title: 'COMEDY' },
  { title: 'ACTION' },
  { title: 'ENTERTAINMENT' },
  { title: 'MOVIES' },
];

class PrefrenceScreen extends Component {
  state = {
    preferences: cloneDeep(this.props.user?.preferences ?? []),
  };

  componentDidMount = () => {
    if (this.props.categoryList.length < 1) {
      this.props.getCategoryList();
    }
  };

  skip = () => {
    this.props.navigation.goBack();
  };

  onDone = () => {
    const oldPref = this.props.user?.preferences ?? [];
    console.log(this.state);
    if (this.state.preferences.length < 1) {
      showBottomToast('Minimum one preference should be selected');
      return;
    }
    if (this.state.preferences.length > 5) {
      showBottomToast('Maximum 5 preferences allowed');
      return;
    }
    if (isEqual(this.state.preferences, oldPref)) {
      this.navigate();
      return;
    }

    this.updatePreferences();
  };

  updatePreferences = () => {
    let formData = new FormData();
    // this.state.preferences.some((preference, index) => {
    //   formData.append(`preferences`, preference);
    // });
    formData.append(`preferences`, JSON.stringify(this.state.preferences));
    this.props.updateProfileAction(formData, {
      onSuccess: () => {
        this.props.getForMeVideo('?forme=true');
        this.props.getCategoryVideoList();
        this.navigate();
      },
      onError: () => { },
    });
  };

  navigate = () => {
    const initial = this.props.route?.params?.initial ?? false;
    if (initial) {
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: 'DashboardScreen' }],
      });
    } else {
      this.props.navigation.goBack();
    }
  };

  onPreference = ({ item, index }) => {
    let pIndex = indexOf(this.state.preferences, item._id);
    if (pIndex > -1) this.state.preferences.splice(pIndex, 1);
    else this.state.preferences.push(item._id);

    this.setState({
      preferences: this.state.preferences,
    });
  };

  render() {
    const { preferences } = this.state;
    const initial = this.props.route?.params?.initial ?? false;
    return (
      <Container style={styles.mainLayout}>
        <MainHeader title={'Prefrences'} />
        {this.props.isCategoryLoading && <PreferenceLoader />}
        <FlatList
          data={this.props.categoryList}
          style={styles.flatlistCont}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          extraData={this.state.preferences}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                onPress={() => {
                  this.onPreference({ item, index });
                }}
                style={styles.flatlistImgCont}>
                <FastImage style={styles.flatlistImg} source={{
                  uri: item.cover
                }}
                  resizeMode={FastImage.resizeMode.contain}
                >
                  {includes(preferences, item._id) && (
                    <Image style={styles.checkImageStyle} source={checkRound} />
                  )}
                  {!item.cover && <TextView style={styles.flatlistImgTxt}>{item.name}</TextView>}
                </FastImage>
              </Pressable>
            );
          }}
          keyExtractor={(item) => item._id}
        />

        <Footer style={styles.footerCont}>
          <View style={styles.bottom}>
            <View style={styles.bottomCont}>
              <TouchableOpacity
                disabled={initial}
                style={styles.declineBtn}
                onPress={() => {
                  this.skip();
                }}>
                {!initial && (
                  <TextView style={styles.declineBtnTxt}>GO BACK</TextView>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.acceptBtn}
                onPress={() => {
                  this.onDone();
                }}>
                <TextView style={styles.acceptBtnTxt}>DONE</TextView>
              </TouchableOpacity>
            </View>
          </View>
        </Footer>
      </Container>
    );
  }
}

const mapActionCreators = {
  updateProfileAction,
  getCategoryList,
  setGuestProfile,
  getForMeVideo,
  getCategoryVideoList
};

const mapStateToProps = (state) => {
  return {
    loading: state.login.loading,
    user: state.login.data,
    categoryList: state.home.categoryList,
    isCategoryLoading: state.home.isCategoryLoading,
  };
};
export default connect(mapStateToProps, mapActionCreators)(PrefrenceScreen);
