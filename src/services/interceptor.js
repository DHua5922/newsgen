import axios from "axios";
import { apiLink } from "../constants";
import { userServices } from "./user/UserService";

axios.interceptors.request.use(function (config) {
    // Modify request before it is sent
    if(config.url.indexOf(apiLink.baseUrl) === -1)
        config.url = apiLink.baseUrl + config.url;
    config.withCredentials = true;
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // Try request again with new token
    if(error.response.status === 401 || error.response.status === 403) {
        return userServices.refreshToken()
            .then(() => new Promise((resolve, reject) => (
                axios.request(error.config)
                    .then(response => resolve(response))
                    .catch(error => reject(error))
            )))
            .catch(error => Promise.reject(error));
    }
    
    // Reject request if token refresh didn't work
    if (error.config.url.includes(apiLink.refreshToken)) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
});