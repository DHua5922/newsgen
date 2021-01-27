import axios from "axios";
import { apiLink } from "../../constants";

export const userServices = {
    login: (url, data) => axios.post(url, data),
    signUp: (url, data) => axios.post(url, data),
    logout: () => axios.post(apiLink.logout),
};