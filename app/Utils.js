import { Toast } from "native-base";
import { Dimensions } from "react-native";
import { downloadFile } from "react-native-fs";
import ImagePicker, { ImagePickerOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import RNToast from 'react-native-simple-toast';
import { requestStoragePermission } from "./Config/permissions";

export const deviceHeight = Dimensions.get('window').height;
export const deviceWidth = Dimensions.get('window').width;
const baseWidth = 414;
const baseHeight = 896;

export const ToastType = {
  DANGER: 'danger', SUCCESS: 'success', WARNING: 'warning', NORMAL: 'normal'
};
export const ToastPosition = {
  TOP: 'top'
};
export const showToast = (message, type) => {
  Toast.show({ text: message, position: "bottom", type: type, duration: 3000 })
};

/**
 * 
 * @param {ImagePickerOptions} options 
 * @param {Function} callBack 
 */
export const HImagePicker = (option, callBack) => {
  const options = {
    title: 'Select Avatar',
    noData: true,
    storageOptions: {
      skipBackup: true,
    },
    ...option,
  };
  let res;
  ImagePicker.showImagePicker(options, (response) => {
    // console.log('Response = ', response);

    if (response.didCancel) {
      // console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
      // callBack(response.error)
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      // callBack(response.customButton)
    } else {
      // const source = { uri: response.uri };
      callBack(response)
      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      // return source

    }
  });

  // return res
}

export const HVideoPicker = (option, callBack) => {
  const options = {
    title: 'Select video',
    mediaType: 'video',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    ...option,
  };
  let res;
  ImagePicker.launchImageLibrary(options, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      // console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
      // callBack(response.error)
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      // callBack(response.customButton)
    } else {
      callBack(response)
    }
  });

  // return res
}

export const FontSize = {
  extraLarge: hp('4.1%'),
  Large: hp('3%'),
  Medium: hp('2.5%'),
  Regular: hp('2%'),
  Small: hp('1.7%'),
  extraSmall: hp('1.4%')
}


/**
 * @return {number}
 */
export function PixcelWidth(pixcel) {
  const w = (pixcel * 100) / baseWidth;

  return wp(w);
}

/**
 * @return {number}
 */
export function PixcelHeight(pixcel) {
  const h = (pixcel * 100) / baseHeight;
  return wp(h);
}

export const showBottomToast = (message = "") => {
  RNToast.showWithGravity(message, RNToast.SHORT, RNToast.BOTTOM, ['RCTModalHostViewController'])
}

export const showTopToast = (message = "") => {
  RNToast.showWithGravity(message, RNToast.SHORT, RNToast.TOP, ['RCTModalHostViewController'])
}

export const downloadFileFromUrl = (options) => {
  return new Promise((resolve, reject) => {
    requestStoragePermission().then(res => {
      if(res){
        downloadFile(options).promise.then(async res => {
          if (res.statusCode === 200) {
              resolve(true)
          }
        }).catch(err => {
          reject('Error while downloading file') 
        })
      }else {
        reject('Permission not granted')
      }
    })
  })
}

export const pickFromCamera = (callBack, option) => {
  launchCamera({...option}, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      // console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
      // callBack(response.error)
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      // callBack(response.customButton)
    } else {
      callBack(response)
    }
  })
}

export const pickFromGallery = (callBack,option={}) => {
  launchImageLibrary({...option}, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      // console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
      // callBack(response.error)
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      // callBack(response.customButton)
    } else {
      callBack(response)
    }
  })
}