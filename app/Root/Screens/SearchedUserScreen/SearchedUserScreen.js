import React, { Component, useEffect, useContext } from 'react';
import { Image, TextInput, Pressable, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Footer, Input, Item, Picker, Icon, Button } from 'native-base';
import styles from './SearchedUserScreenStyle';
import { MainHeader, TextView } from 'app/Component';
import { noUsers } from '../../../assets';
import RawItem from './SearchRowItem';
import { forgotPassword, loginUser } from 'app/store/login';
import { PixcelWidth } from "../../../Utils";
import { fetchProfiles, saveProfile } from '../../../store/profile';
import { UserProfileListLoader } from '../../../ShimmerEffects/ProfileLoaders';
import { EmptyList } from '../../../Component/EmptyList';
import { SearchContex } from '../DashboardScreen/DashboardScreen';
import { getPopularUserSearch, getRecentUserSearch, setSearchQuery } from '../../../store/filter';
import { SearchTagLoader } from '../../../ShimmerEffects/FilterLoader';

function SearchedUserScreen(props) {

    const context = useContext(SearchContex)
    // console.log(context)
    useEffect(() => {
        props.getPopularUserSearch()
        props.getRecentUserSearch()
    }, [])

    useEffect(() => {
        const _unsubscribeFocus = props.navigation.addListener('focus', () => {
            if (context.setCurrentRoute) {
                context.setCurrentRoute('profileSearch')
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
            //     props.searchVideoByText(`?sortBy=popular&search=${text}`)
            // } else {
            props.fetchProfiles(`?search=${text}`)
            // }
        } else {
            // if (context.currentRoute === 'videoSearch') {
            //     props.searchVideoByText(`?search=${text}`)
            // } else {
            props.fetchProfiles(`?search=${text}`)
            // }
        }
    }

    return (
        <Container style={styles.container}>
            {
                props.isProfilesLoading && <UserProfileListLoader />
            }
            <Content style={styles.mainLayout} showsVerticalScrollIndicator={false}>
                {
                    props.isFilterApplied ? (

                        <FlatList
                            data={props.profileList}
                            removeClippedSubviews={true}
                            windowSize={11}
                            style={{ marginTop: 15, marginHorizontal: 15 }}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            renderItem={(item) => (
                                <RawItem {...item} onItemPress={(item) => {
                                    props.navigation.navigate('UserProfileDetailsScreen', {
                                        data: item
                                    })
                                }} />
                            )}
                            keyExtractor={item => item._id}
                            ListEmptyComponent={() => {
                                return <EmptyList image={noUsers} message="Sorry! no result found :(" />;
                            }}
                        />
                    ) : (
                        <View style={styles.filterContainer}>
                            <View style={{ marginHorizontal: 20 }}>
                                <TextView style={styles.searchTitleTxt}>{'Popular searches'}</TextView>
                                {
                                    props.isPopularUserLoading && <SearchTagLoader />
                                }
                                <View style={styles.searchContainer}>
                                    {
                                        !props.isPopularUserLoading && props.popularUserSearch.length < 1 && <EmptyList message={'No popular searches found'} />
                                    }
                                    {
                                        props.popularUserSearch.map((search, index) => {
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
                                    props.isRecentUserLoading && <SearchTagLoader />
                                }
                                <View style={styles.searchContainer}>
                                    {
                                        !props.isRecentUserLoading && props.recentUserSearch.length < 1 && <EmptyList message={'No recent searches found'} />
                                    }
                                    {

                                        props.recentUserSearch.map((search, index) => {
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
                        </View>
                    )}
            </Content>
        </Container>
    );
}

const mapActionCreators = {
    fetchProfiles,
    getRecentUserSearch,
    getPopularUserSearch,
    setSearchQuery,
    saveProfile
};

const mapStateToProps = (state) => {
    return {
        profileList: state.profile.profileList,
        isProfilesLoading: state.profile.isProfilesLoading,
        isFilterApplied: state.filter.isFilterApplied,
        recentUserSearch: state.filter.recentUserSearch,
        popularUserSearch: state.filter.popularUserSearch,
        isRecentUserLoading: state.filter.isRecentUserLoading,
        isPopularUserLoading: state.filter.isPopularUserLoading,
    };
};
export default connect(mapStateToProps, mapActionCreators)(SearchedUserScreen);
