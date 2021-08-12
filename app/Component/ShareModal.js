import React from 'react';
import { FlatList, StyleSheet, View, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Share from 'react-native-share';
import { TextView } from '.';
import {
  whatsappIcon,
  messageIcon,
  emailIcon,
  fbIcon,
  instagramIcon,
  close as closeImageBtn,
  linkdnIcon,
  twitterIcon,
} from '../assets';
import { color } from '../Theme';
import { FontSize, PixcelHeight, PixcelWidth, showBottomToast } from '../Utils';
import Modal from 'react-native-modal'

const sharePlatform = [
  // {
  //   name: 'message',
  //   icon: messageIcon,
  //   social:Share.Social.SMS
  // },
  {
    name: 'instagram',
    icon: instagramIcon,
    social: Share.Social.INSTAGRAM,
  },
  {
    name: 'facebook',
    icon: fbIcon,
    social: Share.Social.FACEBOOK,
  },
  {
    name: 'whatsapp',
    icon: whatsappIcon,
    social: Share.Social.WHATSAPP,
  },
  {
    name: 'email',
    icon: emailIcon,
    social: Share.Social.EMAIL,
  },
  // {
  //   name: 'linkedn',
  //   icon: linkdnIcon,
  //   social: Share.Social.LINKEDIN,
  // },
  // {
  //   name: 'twitter',
  //   icon: twitterIcon,
  //   social: Share.Social.TWITTER,
  // },
];
function ShareModal({ visible, close, onShareToSocial, navigation, data, onShare, onShareToFeed }) {
  const share = (item) => {
    console.log(item);
    close();
    onShareToSocial(item)
  };

  return (
    <>
      <Modal isVisible={visible} style={styles.modal}
        onBackButtonPress={close}
        onBackdropPress={close}
      >
        <View style={styles.modalTopLine} />
        <View style={styles.subContainer}>
          {/* <Pressable style={{ alignSelf: 'flex-end' }} onPress={close}>
              <FastImage
                style={styles.closeIcon}
                source={closeImageBtn}
                resizeMode={FastImage.resizeMode.contain}
              />
            </Pressable> */}
          {/* <TextView style={styles.shareTxt}>Share to Social Media</TextView>
          <View style={{ marginVertical: PixcelWidth(15) }}>
            <FlatList
              data={sharePlatform}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <Pressable
                    onPress={() => {
                      share(item);
                    }}
                    style={styles.socialView}>
                    <FastImage style={styles.socialIcon} source={item.icon} resizeMode={FastImage.resizeMode.contain} />
                  </Pressable>
                );
              }}
            />
          </View>
          <View style={styles.horizontalLine} /> */}
          <TextView style={styles.shareTxt}>Share to Feed</TextView>

          <View style={styles.btnContainer}>
            <Pressable onPress={() => {
              onShareToFeed('public')
            }} style={styles.publicBtn}>
              <TextView style={styles.btntnTxt}>Public</TextView>
            </Pressable>
            <Pressable onPress={() => {
              onShareToFeed('private')
            }} style={styles.publicBtn}>
              <TextView style={styles.btntnTxt}>Private</TextView>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalTopLine: {
    width: PixcelWidth(30),
    height: 3,
    marginVertical: 7,
    borderRadius: 50,
    alignSelf: 'center',
    backgroundColor: '#DFDFDF'
  },
  subContainer: {
    backgroundColor: color.modal_background_color,
    paddingHorizontal: wp("4%"),
    paddingVertical: wp('4%'),
    borderTopRightRadius: PixcelWidth(25),
    borderTopLeftRadius: PixcelWidth(25),
  },
  shareTxt: {
    fontWeight: '600',
    color: color.txt_white,
    fontSize: FontSize.Small,
    marginVertical: wp('5%'),
  },
  socialView: {
    marginRight: PixcelWidth(25),
  },
  socialIcon: {
    height: PixcelWidth(40),
    width: PixcelWidth(40),
  },
  horizontalLine: {
    height: PixcelWidth(1),
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginVertical: wp('4%'),
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: PixcelWidth(20),
  },
  publicBtn: {
    flex: 0.5,
    alignSelf: 'center',
    borderColor: '#fff',
    borderRadius: 20,
    marginHorizontal: PixcelWidth(5),
    backgroundColor: color.modal_background_color_dark //'#1E292F',
  },
  btntnTxt: {
    fontSize: PixcelWidth(15),
    color: color.txt_white,
    paddingVertical: 10,
    textAlign: 'center',
  },
  closeIcon: {
    height: PixcelWidth(26),
    width: PixcelWidth(26),
    alignSelf: 'flex-end',
    marginHorizontal: PixcelWidth(12),
    // marginVertical: PixcelWidth(18),
  },
});
export default ShareModal;
