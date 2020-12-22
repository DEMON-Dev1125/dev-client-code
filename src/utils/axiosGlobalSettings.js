import axios from 'axios'; 
import base_url from '../config/key';

axios.defaults.baseURL = base_url;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use((config) => {

    if (localStorage.jwtToken) {

        config.headers['Authorization'] = localStorage.jwtToken;
    }

    return config;

}, (error) => {

    return Promise.reject(error);
});

export default axios;