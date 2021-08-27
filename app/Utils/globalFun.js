import { Platform } from "react-native";
import { rewardAdAndroid, rewardAdiOS } from "./constant";
import { showNavigationBar, hideNavigationBar } from 'react-native-navigation-bar-color';

/**
 * 
 * @param {String} email 
 * retun if email is valid or not
 * 
 */
export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * 
 * @param {Number} seconds // pass miliseconds 
 * 
 * return promis  
 */
export function delay(seconds = 300) {
    return new Promise((resolve, reject) => setTimeout(resolve, seconds))
}

/**
 * 
 * @param {Number} seconds // pass the seconds 
 */
export function secondsToTime(seconds) {
    var date = new Date(0);
    date.setSeconds(seconds); // specify value for SECONDS here
    var timeString = date.toISOString().substr(14, 5);
    return timeString

}

/**
 * 
 * @param {String} username // pass username 
 * @returns 
 */
export function validateUserName(username) {
    const userNameRegx = /^[a-zA-Z0-9]*$/
    return userNameRegx.test(username)
}

/**
 * 
 * @param {String} phoneNumber // pass number here 
 * @returns 
 */
export function validatePhoneNumber(phoneNumber) {
    const phoneNumberRegX = /[0-9]{4,15}$/
    return phoneNumberRegX.test(phoneNumber)
}

/**
 * 
 * @returns // return the reward ads key based on device type
 */
export function getRewardAdsId() {
    if (Platform.OS === 'ios') {
        return rewardAdiOS
    } else {
        return rewardAdAndroid
    }
}

showNavigation = () => {
    showNavigationBar();
};

hideNavigation = () => {
    hideNavigationBar();
};