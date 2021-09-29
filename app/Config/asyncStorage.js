import AsyncStorage from "@react-native-community/async-storage"
// import AsyncStorage from "@react-native-async-storage/async-storage"

/**
 * 
 * @param {String} data 
 * @param {String} key
 * 
 * Saving data to local storage 
 */
export const saveData = async (data,key) => {
    await AsyncStorage.setItem(key,data)
}

/**
 * 
 * @param {String} key 
 * 
 * get the data from local storage
 */
export const getData = async (key) => {
    return new Promise((resolve,reject) => {
        AsyncStorage.getItem(key).then(res => {
            if(res){
                resolve(res)
            }else{
                resolve(false)
            }
        }).catch(err => {
            reject(err)
        })
    })
}

/**
 * 
 * @param {String} key 
 * 
 * removing data from local storage
 */
export const removeData = async (key) => {
    //await AsyncStorage.removeItem(key) ;
    await AsyncStorage.setItem(key,JSON.stringify({})) ;
    await AsyncStorage.removeItem(key) ;

    return ;
}