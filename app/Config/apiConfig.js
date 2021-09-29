import axios from "axios"

const CancelToken = axios.CancelToken
export const source = CancelToken.source()

const instance = axios.create({
    //baseURL: 'http://hellofaceprodbackend-env.eba-cz6m5ugr.ap-south-1.elasticbeanstalk.com/', //'http://bdc59b395e13.ngrok.io/'
    //baseURL: 'http://74-80-245-232.ic2net.net:9000',
    
    baseURL: 'https://backend-mobile.hellos.ai/',
    cancelToken: source.token
});

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    // console.log("Request-----", config)
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log("Response-----", response)
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default instance