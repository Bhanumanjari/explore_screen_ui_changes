import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import styles from './HBottomTabBarStyle';
import { explore, home, smile, video } from '../../assets';
import { TextView } from '../index';
import FastImage from 'react-native-fast-image';
import { color } from '../../Theme';
const BottomTabImages = [{ name: home }, { name: explore }, { name: smile }] //{ name: video }

export default function HBottomTabBar({ state, descriptors, navigation }) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }
    return <SafeAreaView style={styles.bottomTab}>
        {
            state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index

                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    isFocused ? (
                        <View
                            key={index}
                            style={styles.homeTab}
                        >
                            <View style={styles.topIndicator} />
                            <FastImage
                                source={BottomTabImages[index]['name']}
                                resizeMode={FastImage.resizeMode.contain}
                                style={styles.Img}
                                // tintColor={color.txt_white}
                            />
                            {/* <TextView style={styles.homeTabTxt}>{label}</TextView> */}
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={styles.homeTab}
                            key={index}
                            onPress={onPress}
                            onLongPress={onLongPress}>
                            <FastImage
                                source={BottomTabImages[index]['name']}
                                resizeMode={FastImage.resizeMode.contain}
                                style={styles.selectImg}
                                tintColor='#96969a'
                            />
                        </TouchableOpacity>
                    )
                )
            })
        }

    </SafeAreaView>
    return (
        <View style={styles.bottomTab}>
            {this.state.selectedIndex === 0 ?
                <View

                    style={styles.homeTab}>
                    <Image
                        source={home}
                        resizeMode={'contain'}
                        style={styles.Img}
                    />
                    <TextView style={styles.homeTabTxt}>HOME</TextView>
                </View>
                : <TouchableOpacity onPress={() => {
                    this.setState({
                        selectedIndex: 0,
                    }, () => {
                        onTabSelect && onTabSelect('HomeTab');
                    });
                }
                }>
                    <Image
                        source={home}
                        resizeMode={'contain'}
                        style={styles.selectImg}
                    />
                </TouchableOpacity>
            }


            {this.state.selectedIndex === 1 ?
                <View style={styles.homeTab}>
                    <Image
                        source={explore}
                        resizeMode={'contain'}
                        style={styles.Img}
                    />
                    <TextView style={styles.homeTabTxt}>EXPLORE</TextView>
                </View>
                : <TouchableOpacity onPress={() => {
                    this.setState({
                        selectedIndex: 1,
                    }, () => {
                        onTabSelect && onTabSelect('ExploreTab');
                    });
                }
                }>
                    <Image
                        source={explore}
                        resizeMode={'contain'}
                        style={styles.selectImg}
                    />
                </TouchableOpacity>
            }

            {this.state.selectedIndex === 2 ?
                <View style={styles.homeTab}>
                    <Image
                        source={video}
                        resizeMode={'contain'}
                        style={styles.Img}
                    />
                    <TextView style={styles.homeTabTxt}>HELLOS</TextView>
                </View>
                : <TouchableOpacity onPress={() => {
                    this.setState({
                        selectedIndex: 2,
                    }, () => {
                        onTabSelect && onTabSelect('MyHelloTab');
                    });
                }
                }>
                    <Image
                        source={video}
                        resizeMode={'contain'}
                        style={styles.selectImg}
                    />
                </TouchableOpacity>
            }
            {this.state.selectedIndex === 3 ?
                <View style={styles.homeTab}>
                    <Image
                        source={smile}
                        resizeMode={'contain'}
                        style={styles.Img}
                    />
                    <TextView style={styles.homeTabTxt}>PROFILE</TextView>
                </View>
                : <TouchableOpacity onPress={() => {
                    this.setState({
                        selectedIndex: 3,
                    }, () => {
                        onTabSelect && onTabSelect('ProfileTab');
                    });
                }
                }>
                    <Image
                        source={smile}
                        resizeMode={'contain'}
                        style={styles.selectImg}
                    />
                </TouchableOpacity>
            }
        </View>
    );
}
