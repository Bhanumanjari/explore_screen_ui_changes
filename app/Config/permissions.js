import { Platform } from "react-native"
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export function requestStoragePermission() {
  let permission = Platform.select({
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
  })

  return new Promise((resolve, reject) => {
    check(permission).then(res => {
      console.log(res)
      if (res === RESULTS.BLOCKED || res === RESULTS.DENIED) {
        request(permission, {
          title: "App Storage Permission",
          message: "App needs access to your storage ",
          buttonPositive: "OK",
          buttonNegative: "Cancel",
          buttonNeutral: "Ask Me Later",
        }).then(res => {
          if (res === RESULTS.GRANTED) {
            resolve(true)
          } else if (res === RESULTS.DENIED) {
            resolve(false)
          }
        })
      } else {
        resolve(true)
      }
    })
  })
}

export async function requestCameraPermission() {
  let permission = Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA
  })
  return new Promise((resolve, reject) => {
    try {
      check(permission).then(res => {
        if (res === RESULTS.BLOCKED || res === RESULTS.DENIED) {
          request(permission, {
            title: "App Camera Permission",
            message: "App needs access to your camera ",
            buttonPositive: "OK",
            buttonNegative: "Cancel",
            buttonNeutral: "Ask Me Later",
          }).then(res => {
            if (res === RESULTS.GRANTED) {
              resolve(true)
            } else if (res === RESULTS.DENIED) {
              resolve(false)
            }
          })
        } else {
          resolve(true)
        }
      }).catch(err => {
        resolve(false)
      })
    } catch (err) {
      console.log(err);
      resolve(false)
    }
  })
};