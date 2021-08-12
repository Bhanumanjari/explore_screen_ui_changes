import React, { Component, useEffect, useLayoutEffect, useState } from 'react';
import { Alert, FlatList, Image, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Container, Header } from 'native-base';
import styles from './MyHelloTabStyle';
import { filter } from 'app/assets';
import { color } from 'app/Theme';
import { TextView } from 'app/Component';
import { PixcelWidth } from 'app/Utils';
import RowItem from './RowItem';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getMyHellos, saveMyHellos } from '../../../../store/myHellos';
import { MyHellosLoader } from '../../../../ShimmerEffects/MyHellosLoader';
import { EmptyList } from '../../../../Component/EmptyList';
import { deleteVideoById } from '../../../../store/video';
import { deleteHello } from '../../../../store/myHellos';
import { cloneDeep } from 'lodash';
import { showBottomToast } from '../../../../Utils';
import { noHellosUpload } from '../../../../assets';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RejectedHellosModal from '../../../../Component/RejectedHellosModal';
import HeaderTitle from '../../../../Component/HeaderTitle';

const MyHelloTab = (props) => {

    const [isRejectedModalVisible, setIsRejectedModalVisible] = useState(false)
    const [selectedData, setSelectedData] = useState({})

    useEffect(() => {
        props.getMyHellos()
    }, [])

    console.log("::: MyHelloTab :::")
    useLayoutEffect(() => {
        props.navigation.setOptions({
            header: () => {
                const insets = useSafeAreaInsets()
                return (
                    <View style={{ flexDirection: 'row', backgroundColor: color.primary_color, paddingTop: insets.top }}>
                        <HeaderTitle title={"My Hellos"}/>
                        {/* <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                            <Button rounded success
                                style={styles.createBtn}
                                onPress={() => {
                                    this.props.navigation.navigate('VideoShootScreen');
                                }}>
                                <TextView style={styles.acceptBtnTxt}>CREATE</TextView>
                            </Button>
                            <TouchableOpacity style={styles.filter}>
                                <Image style={styles.filterIcon}
                                    source={filter} />
                            </TouchableOpacity>
                        </View> */}
                    </View>
                )
            }
        })
    }, [props.navigation])

    const deleteMyHello = (item, index) => {

        Alert.alert("Delete", "Are you sure to delete hello?", [{
            text: 'Cancel',
            onPress: () => { }
        }, {
            text: 'Delete',
            onPress: () => {
                props.deleteHello(item._id, (response) => {
                    if (response) {
                        let tmp = cloneDeep(props.myHellos)
                        tmp.splice(index, 1)
                        props.saveMyHellos(tmp)
                        showBottomToast('Hello deleted successfully')
                    }
                })
            },
            style: 'destructive'
        }])
    }

    const onWhyPress = (item, index) => {
        setIsRejectedModalVisible(true)
        setSelectedData(item)
    }

    const onEditPress = (item, index) => {
        props.navigation.navigate("VideoShootScreen", {
            videoData: item.video,
            isEdit: true,
            data: item
        })
    }

    const onItemPress = (item, index) => {
        if (item.status === "APPROVED") {
            props.navigation.navigate('MyHellosDetailsScreen', {
                ...cloneDeep(item),
                index,
                updateVideo: updateVideo
            });
        }
    }

    const updateVideo = () => {

    }


    return (
        <Container style={{ paddingTop: 10, backgroundColor: color.primary_color }}>
            {
                props.isMyHellosLoading ? <MyHellosLoader /> :

                    <FlatList
                        data={props.myHellos}
                        contentContainerStyle={{ paddingBottom: PixcelWidth(110) }}
                        style={styles.flatlistCont}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        renderItem={({ item }) =>
                            <RowItem item={item} onItemPress={onItemPress} onItemLongPress={deleteMyHello} onWhyPress={onWhyPress} onEditPress={onEditPress}
                            />
                        }
                        keyExtractor={item => item._id}
                        ListEmptyComponent={() => {
                            if (!props.isMyHellosLoading) {
                                return <EmptyList textStyle={{
                                    marginTop: hp("10%")
                                }} image={noHellosUpload} message={"Create your own hellos  :-)"} />
                            }
                            else {
                                return <></>
                            }
                        }}
                    />
            }

            <RejectedHellosModal isVisible={isRejectedModalVisible}
                selectedData={selectedData}
                toggle={() => {
                    setIsRejectedModalVisible(!isRejectedModalVisible)
                }} />
        </Container>
    );

}

const mapActionCreators = {
    getMyHellos,
    deleteVideoById,
    deleteHello,
    saveMyHellos,
};

const mapStateToProps = (state) => {
    return {
        myHellos: state.myHellos.myHellos,
        isMyHellosLoading: state.myHellos.isMyHellosLoading,
    };
};
export default connect(mapStateToProps, mapActionCreators)(MyHelloTab);
