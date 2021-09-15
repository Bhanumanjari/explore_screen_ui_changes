import React, { Component } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Footer, Input, Item, Picker, Icon, Button, Row } from 'native-base';
import styles from './ProfileDetailsScreenStyle';
import { MainHeader, TextView } from 'app/Component';
import { lock, mail, user_profile, usericon, camera, phone, award, close } from '../../../assets';

import { forgotPassword, loginUser } from 'app/store/login';
import { HImagePicker, PixcelWidth, showBottomToast } from "../../../Utils";
import { changeUserNameErrorMessage, checkUserNameAvaibility, saveUserNameAvaibility, setUserNameAvaibilityLoader, updateProfileAction } from '../../../store/profile/actions';
import FastImage from 'react-native-fast-image';
import { debounce } from 'lodash';
import { validateUserName } from '../../../Utils/globalFun';
import ImagePickerModal from '../../../Component/ImagePickerModal';
import BackButton from "../../../Component/BackButton";

class ProfileDetailsScreen extends Component {
    state = {
        fullName: this.props.user?.name,
        email: "",
        userName: this.props.user?.username,
        phoneNumber: "",
        showImagePicker: false
    }

    selectProfile = () => {
        this.setState({
            showImagePicker: true
        })
    }

    onImageSelection = (image) => {
        if(image.length < 1){
            return
        }
        let formData = new FormData()
        formData.append("profileImage", {
            uri: image[0].uri,
            type: image[0].type,
            name: image[0]?.fileName ?? "abcd.jpeg"
        })
        this.props.updateProfileAction(formData, {
            onSuccess: () => {
                this.props.navigation.goBack();
            },
            onError: () => {

            }
        })
    }

    removeProfileImage = () => {
        let formData = new FormData()
        formData.append("removeProfileImage", "true")
        this.props.updateProfileAction(formData, {
            onSuccess: () => {
                showBottomToast("Profile Image removed successfully")
            },
            onError: () => {

            }
        })
    }

    removeConfirmation = (removeCallback) => {
        Alert.alert("Remove", "Are you sure you want to remove profile image?", [
            {
                text: "Cancel",
                style: "cancel",
                onPress: () => { }
            },
            {
                text: "Remove",
                style: "destructive",
                onPress: removeCallback
            }
        ])
    }

    onDone = () => {
        const { fullName, userName } = this.state
        const { user } = this.props
        if (fullName === user.name && userName === user.username) {
            this.props.navigation.goBack();
            return
        }
        if (this.state.fullName.trim() === '') {
            showBottomToast('Full name must not be empty')
            return
        }
        if (this.state.userName.trim() === '') {
            showBottomToast('Username must not be empty')
            return
        }
        if (!validateUserName(this.state.userName.trim())) {
            showBottomToast("Username you entered is not valid")
            return
        }
        if (!this.props.userNameAvaibility) {
            showBottomToast('Username is already taken')
            return
        }
        if (this.props.isUserNameValidating) {
            showBottomToast('Please wait we are validating username')
            return
        }
        let formData = new FormData()
        formData.append("name", this.state.fullName)
        formData.append("username", this.state.userName)
        this.props.updateProfileAction(formData, {
            onSuccess: () => {
                this.props.navigation.goBack();
            },
            onError: () => {

            }
        })
    }

    checkAvaibility = debounce(() => {
        if (this.state.userName !== '' && this.state.userName !== this.props.user.username)
            this.props.checkUserNameAvaibility({
                username: this.state.userName
            })
        else
            this.props.changeUserNameErrorMessage('')

    }, 500)

    //componentDidMount = ()=>{
    //    this.setHeader();
   // }

    componentWillUnmount = () => {
        this.props.saveUserNameAvaibility(true)
        this.props.setUserNameAvaibilityLoader(false)
        this.props.changeUserNameErrorMessage('')
    }
    setHeader = () => {
        this.props.navigation.setOptions({
          title: '',
          headerLeft: () => <BackButton />,
          headerShown: true,
          headerTransparent: true,
        })
      }
    

    render() {
        let userProfile;
        let isProfile = false
        if (this.props.user?.profileImage?.thumbnail) {
            userProfile = {
                uri: this.props.user?.profileImage?.thumbnail
            }
            isProfile = true
        }
        return (
            <Container
              
            >
                
                {<MainHeader
                    //title={'New Hello'}
                    
                    onBackPress={() => {
                        this.props.navigation.goBack();
                    }} />}
                    

                <Content style={styles.mainLayout}>

                    <View style={styles.profileImgCont}>
                        {
                            isProfile ? (
                                <>
                                    <FastImage
                                        source={userProfile}
                                        style={styles.profileImg}
                                    />
                                    <Pressable onPress={() => {
                                        this.removeConfirmation(this.removeProfileImage)
                                    }} style={styles.profileCloseBtn}>
                                        <Image
                                            source={close}
                                            style={styles.profilecloseImg}
                                        />
                                    </Pressable>
                                </>
                            ) : (
                                <View
                                    style={styles.profileImg}
                                >
                                    <TextView style={styles.firstCharTxt}>{this.props.user?.username?.charAt(0).toUpperCase() ?? 'H'}</TextView>
                                </View>
                            )
                        }
                        <Pressable onPress={() => {
                            this.selectProfile()
                        }} style={styles.openCameraCont}>
                            <Image
                                source={camera}
                                style={styles.camImg}
                            />
                        </Pressable>
                    </View>
                    <Item rounded style={styles.inputTxtCont}>
                        <Image source={award} style={styles.inputTxtImg} />
                        <Input defaultValue={this.props.user?.username ?? "--"}
                            placeholderTextColor="#FFFFFF50"
                            style={styles.inputTxt}
                            value={this.state.userName}
                            onChangeText={(text) => {
                                this.setState({
                                    userName: text.trim()
                                }, () => {
                                    this.checkAvaibility()
                                })
                            }}
                            onFocus={() => {
                                this.setState({
                                    userName: ''
                                })
                            }}
                            maxLength={15}
                            autoCapitalize={"none"}
                        />
                        <ActivityIndicator
                            animating={this.props.isUserNameValidating}
                            style={styles.indicatorStyle}
                        />
                    </Item>
                    {!this.props.userNameAvaibility && this.state.userName !== '' && <TextView style={styles.errTxt}>{`${this.props.userNameErrorMessage}`}</TextView>}
                    <Item rounded style={styles.inputTxtCont}>
                        <Image source={usericon} style={styles.inputTxtImg} />
                        <Input defaultValue={this.props.user?.name ?? "--"}
                            placeholderTextColor="#FFFFFF50"
                            style={styles.inputTxt}
                            value={this.state.fullName}
                            onChangeText={(text) => {
                                this.setState({
                                    fullName: text
                                })
                            }}
                            onFocus={() => {
                                this.setState({
                                    fullName: ''
                                })
                            }}
                            autoCapitalize="none"
                            maxLength={40}
                        />
                    </Item>
                    {/* <Item rounded style={styles.inputTxtCont}>
                        <Image source={mail} style={styles.inputTxtImg} />
                        <Input value={this.props.user?.email ?? '--'}
                            editable={false}
                            placeholderTextColor="#FFFFFF50"
                            style={styles.inputTxt}
                            onChangeText={(text) => {
                                this.setState({
                                    email: text.trim()
                                })
                            }}
                        />
                    </Item> */}
                    <Item rounded style={styles.inputTxtCont}>
                        <Image source={phone} style={styles.inputTxtImg} />
                        <Input value={this.props.user?.phoneNumber ?? '--'}
                            editable={false}
                            placeholderTextColor="#FFFFFF50"
                            style={styles.inputTxt}
                            onChangeText={(text) => {
                                this.setState({
                                    phoneNumber: text.trim()
                                })
                            }}
                        />
                    </Item>
                </Content>
                <Footer style={styles.footerCont}>
                    <Button rounded success
                        onPress={() => {
                            this.onDone()
                        }}
                        style={styles.acceptBtn}>
                        <TextView style={styles.acceptBtnTxt}>DONE</TextView>
                    </Button>
                </Footer>
                <ImagePickerModal visible={this.state.showImagePicker} toggle={() => {
                    this.setState({
                        showImagePicker: !this.state.showImagePicker
                    })
                }}
                    onImage={this.onImageSelection}
                />
            </Container>
        );
    }
}

const mapActionCreators = { updateProfileAction, checkUserNameAvaibility, saveUserNameAvaibility, setUserNameAvaibilityLoader, changeUserNameErrorMessage };

const mapStateToProps = (state) => {
    return {
        user: state.login.data,
        userNameAvaibility: state.profile.userNameAvaibility,
        isUserNameValidating: state.profile.isUserNameValidating,
        userNameErrorMessage: state.profile.userNameErrorMessage,
    };
};
export default connect(mapStateToProps, mapActionCreators)(ProfileDetailsScreen);
