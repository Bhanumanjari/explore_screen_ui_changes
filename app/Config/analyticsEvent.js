import analytics from '@react-native-firebase/analytics';

/**
 * 
 * @param {EventName} name 
 * @param {Object} eventData 
 */
export async function logAnalyticsEvent(name, eventData){
    await analytics().logEvent(name, eventData)
}