import { Platform } from "react-native"
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export function requestStoragePermission(){
    let permission = Platform.select({
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
    })

    return new Promise((resolve, reject) => {
      check(permission).then(res => {
        console.log(res)
        if (res === RESULTS.BLOCKED || res === RESULTS.DENIED) {
          request(permission).then(res => {
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