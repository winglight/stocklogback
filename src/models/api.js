import axios from 'axios';

let url = 'http://win10:8000';

const instance = axios.create({
    baseURL: url
});

// instance.interceptors.request.use(
//     async config => {
//         const token = await AsyncStorage.getItem('token');
//         const userKey = await AsyncStorage.getItem('userKey');
//         const time = Date.now();
//         const signature = md5.hex_md5(`${userKey}:${token}:${time}`);
//
//         if (token && userKey) {
//             config.headers.token = token;
//             config.headers.time = time;
//             config.headers.signature = signature;
//         }
//         return config;
//     },
//     err => {
//         return Promise.reject(err);
//     }
// );

export default instance;
