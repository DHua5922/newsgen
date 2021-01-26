import axios from "axios";

export const userServices = {
    login: (url, data) => axios.post(url, data),
    signUp: (url, data) => axios.post(url, data)
};