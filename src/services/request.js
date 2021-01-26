import axios from "axios";
import { apiLink } from "../constants";

axios.interceptors.request.use(function (config) {
    // Modify request before it is sent
    config.url = (process.env.NODE_ENV === 'production' 
        ? "https://newsgen-backend-1179158377.us-west-2.elb.amazonaws.com/" 
        : "http://localhost:5001/") 
        + config.url;
    config.withCredentials = true;
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});