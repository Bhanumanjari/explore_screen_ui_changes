import React, { Component } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { Body, Container, Content, Header, Left, Right } from 'native-base';
import styles from './HomeTabStyle';
import { filter, find } from 'app/assets';
import { color } from 'app/Theme';
import { PixcelWidth } from '../../../../Utils';
import RowItem from './TrendingRowItem';
import ForyouRowItem from './ForyouRowItem';
import { SearchRowItem } from 'app/Component';
import { CategoryListItem } from '../../../../Component/CategoryListItem';
import {
  getCategoryList,
  getCategoryVideoList,
  getForMeVideo,
  getTrendingVideo,
  searchVideoByText,
  setAuthCallback,
} from '../../../../store/home';
import {
  CategoryLoader,
  CategoryVideoLoader,
  ForMeLoader,
  TextLoader,
  TrendingLoader,
} from '../../../../ShimmerEffects/HomeLoaders';
import { EmptyList } from '../../../../Component/EmptyList';
import { TextView } from '../../../../Component';
import { setFilterStatus, setSearchQuery } from '../../../../store/filter';
import { fetchProfiles } from '../../../../store/profile';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fetchUserProfile } from '../../../../store/login';
import InAppReview from 'react-native-in-app-review'
import AuthContext from '../../../../context/AuthContext';

// const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
class HomeTab extends Component {
  static contextType = AuthContext
  constructor(props) {
    super();
    this.state = {
      selectedCategoryIndex: -1,
      isRefreshing: false
    };
  }

  componentDidMount = () => {
    this.props.setAuthCallback(this.context.setIsSignIn)
    this.props.getCategoryList('', true);
    this.props.fetchUserProfile();
    if (InAppReview.isAvailable()) {
      // this.triggerAppReview()
    }
    this.setHeader()
    this._unsubscribeFocus = this.props.navigation.addListener('focus', () => {
      this.loadData()
    })
  };

  triggerAppReview = () => {
    InAppReview.RequestInAppReview()
      .then((hasFlowFinishedSuccessfully) => {
        // when return true in android it means user finished or close review flow
        console.log('InAppReview in android', hasFlowFinishedSuccessfully);

        // when return true in ios it means review flow lanuched to user.
        console.log(
          'InAppReview in ios has lanuched successfully',
          hasFlowFinishedSuccessfully,
        );

        // 1- you have option to do something ex: (navigate Home page) (in android).
        // 2- you have option to do something,
        // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

        // 3- another option:
        if (hasFlowFinishedSuccessfully) {
          // do something for ios
          // do something for android
        }

        // for android:
        // The flow has finished. The API does not indicate whether the user
        // reviewed or not, or even whether the review dialog was shown. Thus, no
        // matter the result, we continue our app flow.

        // for ios
        // the flow lanuched successfully, The API does not indicate whether the user
        // reviewed or not, or he/she closed flow yet as android, Thus, no
        // matter the result, we continue our app flow.
      })
      .catch((error) => {
        //we continue our app flow.
        // we have some error could happen while lanuching InAppReview,
        // Check table for errors and code number that can return in catch.
        console.log(error);
      });
  }

  loadData = (isRefreshing = false) => {
    this.setState({ selectedCategoryIndex: -1, isRefreshing })
    this.props.getForMeVideo('?forme=true');
    this.props.getTrendingVideo('?isTrending=true');
    this.props.getCategoryVideoList();
  }

  componentWillUnmount = () => {
    this._unsubscribeFocus && this._unsubscribeFocus()
  }

  onCategorySelect = (category, index) => {
    this.setState({
      selectedCategoryIndex: index
    })
    this.props.getCategoryVideoList(`?categoryId=${category._id}`);
  };

  onVideoSelect = (item) => { };

  redirectToSearch = () => {
    this.props.setFilterStatus(false)
    this.props.navigation.navigate('SearchStack');
  }
  redirectToSearchedList = () => {
    this.props.setFilterStatus(true)
    this.props.searchVideoByText()
    this.props.setSearchQuery('')
    this.props.fetchProfiles(`?search=`)
    this.props.navigation.navigate('SearchStack');
  }

  setHeader = () => {
    this.props.navigation.setOptions({
      header: () => {
        const insets = useSafeAreaInsets()
        return (
          <View style={{ flexDirection: 'row', backgroundColor: color.primary_color, paddingTop: insets.top }}>
            <View style={styles.inputTxtCont}>
              <Pressable
                onPress={() => {
                  this.redirectToSearchedList()
                }}
                style={styles.searchContainer}>
                <TextView
                  style={styles.searchHereText}>
                  Search here
                </TextView>
              </Pressable>
              <TouchableOpacity onPress={this.redirectToSearchedList} style={styles.find}>
                <Image style={styles.findIcon} source={find} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => {
              this.redirectToSearch()
            }} style={styles.filter}>
              <Image style={styles.filterIcon} source={filter} />
            </TouchableOpacity>
          </View>
        )
      }
    })
  }

  render() {
    return (
      <Container>
        <Content
          showsVerticalScrollIndicator={false}
          style={styles.subContainer}
          contentContainerStyle={{ paddingBottom: 70 }}
          refreshControl={<RefreshControl
            refreshing={(this.props.isTrendingLoading || this.props.isForMeLoading || this.props.isCategoryVideoLoading) && this.state.isRefreshing}
            onRefresh={() => this.loadData(true)}
            colors={[color.primary_color]}
            tintColor={color.refresh_control_color}
          />}
        >
          {!this.props.isTrendingLoading ? (
            <TextView style={styles.listtitle}>TRENDING</TextView>
          ) : (
            <TextLoader />
          )}
          {this.props.isTrendingLoading ? <TrendingLoader /> : <FlatList
            horizontal={true}
            data={this.props.trendingVideo}
            contentContainerStyle={{
              flex: 0,
              paddingHorizontal: PixcelWidth(15),
            }}
            style={styles.flatlistCont}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <RowItem item={item} />}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={() => {
              if (!this.props.isTrendingLoading) {
                return <EmptyList message={'No videos found'} />;
              }
              return <></>;
            }}
          />}
          {!this.props.isForMeLoading ? (
            <TextView style={styles.listtitle}>FOR YOU</TextView>
          ) : (
            <TextLoader />
          )}
          {this.props.isForMeLoading ? <ForMeLoader /> :
            <FlatList
              horizontal={true}
              data={this.props.forMeVideo}
              contentContainerStyle={{
                flex: 0,
                paddingHorizontal: PixcelWidth(15),
              }}
              style={styles.flatlistCont}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ForyouRowItem
                  item={item}
                  onVideoSelect={(item) => {
                    this.onVideoSelect(item);
                  }}
                />
              )}
              keyExtractor={(item) => item._id}
              ListEmptyComponent={() => {
                if (!this.props.isForMeLoading) {
                  return <EmptyList message={'No videos found'} />;
                }
                return <></>;
              }}
            />
          }
          {!this.props.isCategoryLoading ? (
            <TextView style={styles.listtitle}>BEST CATEGORIES</TextView>
          ) : (
            <TextLoader />
          )}
          {this.props.isCategoryLoading ? <CategoryLoader /> :
            <FlatList
              horizontal={true}
              data={this.props.categoryList}
              contentContainerStyle={{
                flex: 0,
                paddingHorizontal: PixcelWidth(15),
              }}
              style={styles.flatlistCont}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={(item) => (
                <SearchRowItem
                  {...item}
                  onCategorySelect={this.onCategorySelect}
                  selectedCategoryIndex={this.state.selectedCategoryIndex}
                />
              )}
              keyExtractor={(item) => item._id}
              ListEmptyComponent={() => {
                if (!this.props.isCategoryLoading) {
                  return <EmptyList message={'No categories found'} />;
                }
                return <></>;
              }}
            />
          }
          {this.props.isCategoryVideoLoading ? <CategoryVideoLoader /> :

            <FlatList
              data={this.props.categoryVideoList}
              contentContainerStyle={{
                flex: 0,
                paddingHorizontal: PixcelWidth(15),
                paddingVertical: PixcelWidth(20),
              }}
              style={styles.flatlistCont}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={(item) => <CategoryListItem {...item} />}
              keyExtractor={(item) => item._id}
              ListEmptyComponent={() => {
                if (!this.props.isCategoryVideoLoading) {
                  return <EmptyList message={'We are Brewing more content. Please Come Back Later 🙂'} />;
                }
                return <></>;
              }}
            />
          }
        </Content>
      </Container>
    );
  }
}

const mapActionCreators = {
  getCategoryList,
  getTrendingVideo,
  getForMeVideo,
  getCategoryVideoList,
  setFilterStatus,
  fetchProfiles,
  searchVideoByText,
  setSearchQuery,
  fetchUserProfile,
  setAuthCallback
};

const mapStateToProps = (state) => {
  return {
    trendingVideo: state.home.trendingList,
    forMeVideo: state.home.forMeList,
    categoryList: state.home.categoryList,
    categoryVideoList: state.home.categoryVideoList,
    isCategoryLoading: state.home.isCategoryLoading,
    isForMeLoading: state.home.isForMeLoading,
    isTrendingLoading: state.home.isTrendingLoading,
    isCategoryVideoLoading: state.home.isCategoryVideoLoading,
    login: state.login.data,
  };
};
export default connect(mapStateToProps, mapActionCreators)(HomeTab);
