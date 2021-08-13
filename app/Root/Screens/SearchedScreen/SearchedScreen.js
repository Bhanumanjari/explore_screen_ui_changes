import React, { Component } from 'react';
import { Image, TextInput, TouchableOpacity, View, FlatList, Pressable } from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  Content,
  Footer,
  Input,
  Item,
  Picker,
  Icon,
  Button,
  Header,
} from 'native-base';
import styles from './SearchedScreenStyle';
import { MainHeader, TextView } from 'app/Component';
import {
  noHellos,
} from '../../../assets';
//import ForyouRowItem from './ForyouRowItem';
import ReqRowItem from './SearchRowItem';
import { forgotPassword, loginUser } from 'app/store/login';
import { PixcelWidth } from '../../../Utils';
import { cloneDeep } from 'lodash';
import { EmptyList } from '../../../Component/EmptyList';
import { saveSearchVideoList, searchVideoByText } from '../../../store/home';
import { getPopularSearch, getRecentSearch, setSearchQuery } from '../../../store/filter';
import { SearchRowItem } from '../../../Component';
import { LikeSaveVideoLoader } from '../../../ShimmerEffects/ProfileLoaders';
import { color } from '../../../Theme';
import { fetchProfiles } from '../../../store/profile';
import { SearchTagLoader } from '../../../ShimmerEffects/FilterLoader';
import { CategoryLoader } from '../../../ShimmerEffects/HomeLoaders';
import { SearchContex } from './../DashboardScreen/DashboardScreen'
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';

function SearchedScreen(props) {

  const context = useContext(SearchContex)
  console.log(context)
  const [isFilterApplied, setIsFilterApplied] = useState(false)
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(-1)

  useEffect(() => {
    props.getPopularSearch()
    props.getRecentSearch()
  }, [])

  useEffect(() => {
    const _unsubscribeFocus = props.navigation.addListener('focus', () => {
      if (context.setCurrentRoute) {
        context.setCurrentRoute('videoSearch')
      }
    })
    return () => {
      _unsubscribeFocus && _unsubscribeFocus()
    }
  }, [props.navigation])

  const searchByText = (text) => {
    props.setSearchQuery(text)
    if (context.type === 'explore') {
      // if (context.currentRoute === 'videoSearch') {
      props.searchVideoByText(`?sortBy=popular&search=${text}`)
      // } else {
      //   props.fetchProfiles(`?search=${text}`)
      // }
    } else {
      // if (context.currentRoute === 'videoSearch') {
      props.searchVideoByText(`?search=${text}`)
      // } else {
      //   props.fetchProfiles(`?search=${text}`)
      // }
    }
  }

  const searchByCategory = (category, index) => {
    // this.setState({
    //   selectedCategoryIndex: index
    // })
    setSelectedCategoryIndex(index)
    props.setSearchQuery(category.name)
    if (context.type === 'explore') {
      props.searchVideoByText(`?sortBy=popular&categoryId=${category._id}`)
    } else {
      props.searchVideoByText(`?categoryId=${category._id}`)
    }
  }

  const updateVideo = ({ item, index }) => {
    let tmp = cloneDeep(props.searchList)
    tmp[index] = item
    props.saveSearchVideoList(tmp)
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log(nextProps, prevState)
  // }


  return (
    <View style={{
      flex: 1,
      backgroundColor: color.primary_color
    }}>
      {
        props.isSearchListLoading && <LikeSaveVideoLoader />
      }
      <View style={styles.mainLayout}>
        {
          props.isFilterApplied ?
            <React.Fragment>
              <FlatList
                data={props.searchList}
                removeClippedSubviews={true}
                windowSize={11}
                initialNumToRender={5}
                contentContainerStyle={{ paddingHorizontal: 20 }}
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
                keyExtractor={(item) => item._id}
                ListEmptyComponent={() => {
                  if (!props.isSearchListLoading) {
                    return <EmptyList image={noHellos} message={"Sorry! no hellos found :("} />;
                  }
                  return <></>;
                }}
              />
            </React.Fragment>
            : (
              <View style={styles.filterContainer}>
                <View style={{ marginHorizontal: 20 }}>
                  <TextView style={styles.searchTitleTxt}>{'Popular searches'}</TextView>
                  {
                    props.isPopularSearchLoading && <SearchTagLoader />
                  }
                  <View style={styles.searchContainer}>
                    {
                      !props.isPopularSearchLoading && props.popularSearch.length < 1 && <EmptyList message={'No popular searches found'} />
                    }
                    {
                      !props.isPopularSearchLoading && props.popularSearch.map((search, index) => {
                        return (
                          <Pressable onPress={() => {
                            searchByText(search.searchTerm)
                          }} key={index} style={styles.tagContainer}>
                            <TextView style={styles.tagTxt}>{search.searchTerm}</TextView>
                          </Pressable>
                        )

                      })
                    }
                  </View>
                </View>
                <View style={{ marginHorizontal: 20 }}>
                  <TextView style={styles.searchTitleTxt}>{'Recent searches'}</TextView>
                  {
                    props.isRecentSearchLoading && <SearchTagLoader />
                  }
                  <View style={styles.searchContainer}>
                    {
                      !props.isRecentSearchLoading && props.recentSearch.length < 1 && <EmptyList message={'No recent searches found'} />
                    }
                    {
                      !props.isRecentSearchLoading && props.recentSearch.map((search, index) => {
                        return (
                          <Pressable onPress={() => {
                            searchByText(search.searchTerm)
                          }} key={index} style={styles.tagContainer}>
                            <TextView style={styles.tagTxt}>{search.searchTerm}</TextView>
                          </Pressable>
                        )

                      })
                    }
                  </View>
                </View>

                <TextView style={[styles.searchTitleTxt, {
                  paddingHorizontal: 20
                }]}>{'Categories'}</TextView>
                {props.isCategoryLoading && <CategoryLoader />}
                <FlatList
                  horizontal={true}
                  data={props.categoryList}
                  contentContainerStyle={{
                    flex: 0,
                    paddingHorizontal: 20,
                  }}
                  style={styles.flatlistCont}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  renderItem={(item) => (
                    <SearchRowItem
                      {...item}
                      onCategorySelect={(item, index) => {
                        searchByCategory(item, index)
                      }}
                      selectedCategoryIndex={selectedCategoryIndex}
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
              </View>
            )
        }
      </View>
    </View>
  );
}

const mapActionCreators = {
  searchVideoByText,
  getRecentSearch,
  getPopularSearch,
  fetchProfiles,
  setSearchQuery,
  saveSearchVideoList
};

const mapStateToProps = (state) => {
  return {
    searchList: state.home.searchList,
    isSearchListLoading: state.home.isSearchListLoading,
    recentSearch: state.filter.recentSearch,
    popularSearch: state.filter.popularSearch,
    isRecentSearchLoading: state.filter.isRecentSearchLoading,
    isPopularSearchLoading: state.filter.isPopularSearchLoading,
    isFilterApplied: state.filter.isFilterApplied,
    categoryList: state.home.categoryList,
    isCategoryLoading: state.home.isCategoryLoading,
  };
};
export default connect(mapStateToProps, mapActionCreators)(SearchedScreen);
