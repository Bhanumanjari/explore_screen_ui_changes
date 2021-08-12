import React from 'react';
import { Alert, Image, ImageBackground, Pressable, View } from 'react-native';
import styles from './ProfileRowItemStyle';
import { close, user_profile } from '../../../../../assets';
import { TextView } from 'app/Component';
import { PixcelWidth } from 'app/Utils';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Text } from 'native-base';
import { color } from '../../../../../Theme';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import { updateProfileAction } from '../../../../../store/profile/actions';
import { cloneDeep } from 'lodash';
import { setProfile } from '../../../../../store/login';
import { setGuestProfile } from '../../../../../store/guest';

const RowItem = ({
  item,
  index,
  selectedFaceIndex = -1,
  user,
  setGuestProfile,
  onFacePress = () => { },
  needToDisable = false,
}) => {
  const isSelected = selectedFaceIndex === index;
  const deleteFace = () => {
    Alert.alert('Delete', 'Are you sure you want to delete face?', [
      {
        text: 'Cancel',
        onPress: () => { },
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          let faces = cloneDeep(user.faces);
          if (user.isGuest) {
            faces.splice(index, 1);
            console.log({ ...user, faces });
            setGuestProfile({ ...user, faces }, { loading: false });
          }
        },
      },
    ]);
  };

  // console.log(item);
  return (
    <Pressable
      onPress={() => {
        onFacePress(item, index);
      }}
      style={isSelected ? styles.selectedImgCont : styles.addImgCont}>
      <Image
        source={{
          uri: item?.original ?? item?.uri,
        }}
        style={[styles.userImg]}
      />
      {needToDisable && selectedFaceIndex != -1 && !isSelected && (
        <View style={styles.disableImg} />
      )}
    </Pressable>
  );
};

const mapStateToProps = (state) => ({
  user: state.login.data,
});

const mapDispatchToProps = {
  updateProfileAction,
  setGuestProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(RowItem);
