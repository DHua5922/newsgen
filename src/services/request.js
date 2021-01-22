import axios from "axios";
import { apiLink } from "../constants";

axios.interceptors.request.use(function (config) {
    // Modify request before it is sent
    config.url = (process.env.NODE_ENV === 'production' 
        ? "http://newsgen-backend-2091170094.us-west-2.elb.amazonaws.com/" 
        : "http://localhost:5001/") 
        + config.url;

    if(config.url.includes(apiLink.topNews))
        config.withCredentials = false;
    else
        config.withCredentials = true;

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});