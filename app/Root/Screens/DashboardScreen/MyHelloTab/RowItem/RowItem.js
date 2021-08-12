import React from 'react';
import { Image, ImageBackground, Pressable, View } from 'react-native';
import styles from './RowItemStyle';
import { clock, lock, movie, newHello } from 'app/assets';
import { TextView } from 'app/Component';
import { PixcelWidth } from 'app/Utils';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Text } from 'native-base';
import FastImage from 'react-native-fast-image';

const RowItem = ({ item, index, onItemPress, onItemLongPress, onWhyPress, onEditPress }) => {
    const titles = item.title.split('-');
    return (
        <React.Fragment>
            <Pressable onPress={() => {
                onItemPress(item, index)
            }}
                onLongPress={() => {
                    onItemLongPress(item, index)
                }} style={{ flex: 1, borderRadius: 15 }}>
                <FastImage style={styles.flatlistImg}
                    source={{
                        uri: item.video?.thumbnail
                    }}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        colors={['#00000000', '#00000000', '#000000']}
                        style={{ flex: 1 }}>
                        {/* <TextView style={styles.flatlistImgTxt}>{item.title}</TextView> */}
                        <View style={styles.titleContainer}>
                            <TextView numberOfLines={2} style={styles.flatlistImgTxt}>
                                {`${(titles[0] && titles[0]?.trim()) || ''}`}
                            </TextView>
                            <TextView style={styles.subText}>
                                {(titles[1] && titles[1]?.trim()) || ''}
                            </TextView>
                        </View>
                        {item.status === "REJECTED" && <View style={{ flexDirection: 'row', marginTop: PixcelWidth(15), marginLeft: PixcelWidth(15) }}>
                            <View style={{
                                backgroundColor: '#EA7373',
                                height: PixcelWidth(16),
                                width: PixcelWidth(16),
                                borderRadius: PixcelWidth(16),
                            }} />
                            <TextView style={{ color: 'white', marginLeft: PixcelWidth(10) }}>REJECTED!</TextView>
                        </View>}
                        {
                            !item.isPublic &&
                            <Image source={lock} style={styles.centerImage} />
                        }
                        {item.status === "PENDING" && <View style={styles.pendingView}>
                            <Image source={clock} style={styles.clockIcon} />
                            <TextView style={styles.reviewTitle}>{'Reviewing \n' +
                                'In Process..'}</TextView>
                        </View>}
                        {item.status === "REJECTED" && <View style={styles.pendingView}>
                            <Button onPress={() => {
                                onWhyPress(item, index)
                            }} bordered rounded style={styles.statusBtn}>
                                <Text style={styles.statusBtnTxt}>WHY?</Text>
                            </Button>
                            <Button bordered rounded
                                onPress={() => {
                                    onEditPress(item, index)
                                }}
                                style={[styles.statusBtn, {
                                    marginTop: 15
                                }]}>
                                <Text style={styles.statusBtnTxt}>EDIT</Text>
                            </Button>
                        </View>}
                    </LinearGradient>
                </FastImage>
            </Pressable>
            {/* {item.type === 2 &&
            <View style={{flex: 1, borderRadius: 15}}>
                <ImageBackground style={styles.flatlistImg}
                                 source={newHello}>
                    <TextView style={styles.flatlistImgTxt}>{item.title}</TextView>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}}
                                   colors={['#00000000', '#00000083']}
                                    style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{
                            alignSelf: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Image source={clock} style={{
                                height: PixcelWidth(33),
                                width: PixcelWidth(33),
                                marginBottom: PixcelWidth(15),
                            }}/>
                            <TextView style={styles.reviewTitle}>{'Reviewing \n' +
                            'In Process..'}</TextView>
                        </View>
                    </LinearGradient>

                </ImageBackground>

            </View>}
            {item.type === 3 &&
            <View style={{flex: 1, borderRadius: 15}}>
                <ImageBackground style={styles.flatlistImg}
                                 source={newHello}>


                    <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}}
                                   colors={['#00000000', '#00000083']}
                                    style={{flex: 1}}>
                        <TextView style={styles.flatlistImgTxt}>{item.title}</TextView>

                    </LinearGradient>
                </ImageBackground>

            </View>}
            {item.type === 4 &&
            <View style={{flex: 1, borderRadius: 15}}>
                <ImageBackground style={styles.flatlistImg}
                                 source={newHello}>
                    <View style={{flexDirection: 'row',marginTop:PixcelWidth(15),marginLeft:PixcelWidth(15)}}>
                        <View style={{
                            backgroundColor: '#EA7373',
                            height: PixcelWidth(16),
                            width: PixcelWidth(16),
                            borderRadius: PixcelWidth(16),
                        }}/>
                        <TextView style={{color:'white',marginLeft:PixcelWidth(10)}}>REJECTED!</TextView>
                    </View>


                    <TextView style={styles.flatlistImgTxt}>{item.title}</TextView>
                    <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 1}}
                                    colors={['#00000000', '#00000083']}
                                    style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{
                            alignSelf: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Button bordered rounded style={{borderColor: 'white', paddingHorizontal: 20}}>
                                <Text style={{color: 'white'}}>WHY</Text>
                            </Button>
                            <Button bordered rounded
                                    style={{borderColor: 'white', paddingHorizontal: 20, marginTop: PixcelWidth(16)}}>
                                <Text style={{color: 'white'}}>EDIT</Text>
                            </Button>
                        </View>
                    </LinearGradient>

                </ImageBackground>

            </View>} */}
        </React.Fragment>
    );

};


export default RowItem;
