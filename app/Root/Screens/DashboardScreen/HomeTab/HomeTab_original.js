import React, { Component, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
  Image
} from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Body, Container, Content, Header, Left, Right } from 'native-base';
import styles from './HomeTabStyle';
import { filter, find } from 'app/assets';
import { color } from 'app/Theme';
import { deviceWidth, PixcelWidth } from '../../../../Utils';
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
import { useContext } from 'react';
import { useState } from 'react';
import { useLayoutEffect } from 'react';
import { useRef } from 'react';
import CategoryItem from '../../../../Component/CategoryItem';
import analytics from '@react-native-firebase/analytics';
import { SharedElement } from 'react-navigation-shared-element';

// const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
const HomeTab = (props) => {
  const authContext = useContext(AuthContext)
  const dispatch = useDispatch()

  const allCategory = useRef({
    name: "All",
    _id: 'all_explore_video'
  })

  const scrollDirection = useRef()

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [categoryVideoConfig, setCategoryVideoConfig] = useState({
    page: 0,
  })
  const [categoryVideoList, setCategoryVideoList] = useState([])
  const [isLoading, setIsLoading] = useState(true) ;

  useEffect(() => {
    //if(isLoading){
      dispatch(setAuthCallback(authContext.setIsSignIn))
      dispatch(getCategoryList('', true))
      dispatch(fetchUserProfile())
      //setIsLoading(false) ;
    //}
  },[])

  useLayoutEffect(() => {
    props.navigation.setOptions({
      header: () => {
        const insets = useSafeAreaInsets()
        return (
          <View style={{ flexDirection: 'row', backgroundColor: color.primary_color, paddingTop: insets.top }}>
            {/* <View style={styles.inputTxtCont}>
              <Pressable
                onPress={() => {
                  redirectToSearchedList()
                }}
                style={styles.searchContainer}>
                <TextView
                  style={styles.searchHereText}>
                  Search here
                </TextView>
              </Pressable>
              <TouchableOpacity onPress={redirectToSearchedList} style={styles.find}>
                <Image style={styles.findIcon} source={find} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => {
              redirectToSearch()
            }} style={styles.filter}>
              <Image style={styles.filterIcon} source={filter} />
            </TouchableOpacity> */}
          </View>
        )
      }
    })
  }, [props.navigation])

  useEffect(() => {
    //const _unsubscribeFocus = props.navigation.addListener('focus', () => {
    //  loadData()
    //})

    if(isLoading == true){
      loadData() ;
      setIsLoading(false) ;
    }

    //return () => {
    //  _unsubscribeFocus()
    //}
  }, [])

  useEffect(() => {
    analytics().setUserProperty("username", props.login.username)
  }, [])

  useEffect(() => {
    let params = {
      limit: 10,
      skip: (categoryVideoConfig.page) * 10,
    }
    if (categoryVideoConfig.categoryId) {
      params.categoryId = categoryVideoConfig.categoryId
    }

    dispatch(getCategoryVideoList(params))
  }, [categoryVideoConfig])

  useEffect(() => {
    if (categoryVideoConfig.page === 0) {
      setCategoryVideoList(props.categoryVideoList)
    } else {
      setCategoryVideoList(categoryVideoList.concat(props.categoryVideoList))
    }
  }, [props.categoryVideoList])

  const triggerAppReview = () => {
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

  const loadData = (isRefreshing = false) => {
    setSelectedCategoryIndex(0)
    setIsRefreshing(isRefreshing)
    dispatch(getForMeVideo('?forme=true'))
    dispatch(getTrendingVideo('?isTrending=true'))
    // dispatch(getCategoryVideoList(`?limit=10&skip=0`))
    setCategoryVideoConfig({
      page: 0
    })
  }

  const onCategorySelect = (category, index) => {
    setSelectedCategoryIndex(index)
    if (index === 0) {
      setCategoryVideoConfig({
        page: 0,
      })
    } else {
      setCategoryVideoConfig({
        page: 0,
        categoryId: category._id
      })
    }
    // let params = {
    //   categoryId: category._id
    // }
    // setCategoryVideoList([])
    // dispatch(getCategoryVideoList(params))
  };

  const onVideoSelect = (item) => { };

  const redirectToSearch = () => {
    dispatch(setFilterStatus(false))
    props.navigation.navigate('SearchStack');
  }

  const redirectToSearchedList = () => {
    dispatch(setFilterStatus(true))
    dispatch(searchVideoByText())
    dispatch(setSearchQuery(''))
    dispatch(fetchProfiles(`?search=`))
    props.navigation.navigate('SearchStack');
  }

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 70;
    if (scrollDirection.current && (contentOffset.y + paddingToBottom) > scrollDirection.current.y) {
      scrollDirection.current = contentOffset
      //return true ;
      return layoutMeasurement.height + contentOffset.y + paddingToBottom >=
        contentSize.height - paddingToBottom;
    } else {
      scrollDirection.current = contentOffset
      return false
    }
  };

  return (
    <Container>
      <Content
        showsVerticalScrollIndicator={false}
        style={styles.subContainer}
        contentContainerStyle={{ paddingBottom: 0 }}
        refreshControl={<RefreshControl
          refreshing={(props.isTrendingLoading || props.isForMeLoading || props.isCategoryVideoLoading) && isRefreshing}
          onRefresh={() => loadData(true)}
          colors={[color.primary_color]}
          tintColor={color.refresh_control_color}
        />}
        onMomentumScrollEnd={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent) && !props.isCategoryVideoLoading) {
            setCategoryVideoConfig({
              ...categoryVideoConfig,
              page: categoryVideoConfig.page + 1
            })
          }
        }}
        scrollEventThrottle={400}
      >
        
        {!props.isTrendingLoading ? (
          <TextView style={styles.listtitle}>TRENDING</TextView>
        ) : (
          <TextLoader />
        )}
        {props.isTrendingLoading ? <TrendingLoader /> : <FlatList
          horizontal={true}
          data={props.trendingVideo}
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
            if (!props.isTrendingLoading) {
              return <EmptyList message={'No videos found'} />;
            }
            return <></>;
          }}
        />}
        {!props.isForMeLoading ? (
          <TextView style={styles.listtitle}>FOR YOU</TextView>
        ) : (
          <TextLoader />
        )}
        {props.isForMeLoading ? <ForMeLoader /> :
          <FlatList
            horizontal={true}
            data={props.forMeVideo}
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
                  onVideoSelect(item);
                }}
              />
            )}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={() => {
              if (!props.isForMeLoading) {
                return <EmptyList message={'No videos found'} />;
              }
              return <></>;
            }}
          />
        }
        {!props.isCategoryLoading ? (
          <TextView style={styles.listtitle}>BEST CATEGORIES</TextView>
        ) : (
          <TextLoader />
        )}
        {props.isCategoryLoading ? <CategoryLoader /> :
          <FlatList
            horizontal={true}
            data={[allCategory.current].concat(props.categoryList)}
            contentContainerStyle={{
              flex: 0,
              paddingHorizontal: PixcelWidth(15),
              marginTop: 10
            }}
            style={styles.flatlistCont}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={(item) => (
              <CategoryItem
                {...item}
                onPressItem={onCategorySelect}
                selectedIndex={selectedCategoryIndex}
              />
            )}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={() => {
              if (!props.isCategoryLoading) {
                return <EmptyList message={'No categories found'} />;
              }
              return <></>;
            }}
          />
        }
        {props.isCategoryVideoLoading && categoryVideoList.length === 0 ? <CategoryVideoLoader /> :

          <FlatList
            data={categoryVideoList}
            removeClippedSubviews={true}
            windowSize={11}
            //initialNumToRender={5}
            contentContainerStyle={{
              flex: 0,
              paddingHorizontal: PixcelWidth(15),
              paddingVertical: PixcelWidth(20),
            }}
            style={styles.flatlistCont}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={(item) => <CategoryListItem {...item}/>  }
            keyExtractor={(item) => item._id}
            ListEmptyComponent={() => {
              if (!props.isCategoryVideoLoading) {
                return <EmptyList message={'We are Brewing more content. Please Come Back Later 🙂'} />;
              }
              return <></>;
            }}
            ListFooterComponent={() => {
              if (props.isCategoryVideoLoading) {
                return (
                  <ActivityIndicator color={"#ffffff"} />
                )
              }
              return <></>
            }}
          />
        }
      </Content>
    </Container>
  )
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

export default connect(mapStateToProps, null)(HomeTab);
