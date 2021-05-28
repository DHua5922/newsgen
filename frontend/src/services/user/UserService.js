import axios from "axios";
import { apiLink } from "../../constants";

export const userServices = {
    login: (data) => axios.post(apiLink.login, data),
    signUp: (data) => axios.post(apiLink.signup, data),
    logout: () => axios.post(apiLink.logout),
    updateProfile: (data) => axios.patch(apiLink.updateProfile, data),
    getProfile: () => axios.get(apiLink.getProfile),
    deleteAccount: () => axios.delete(apiLink.deleteAccount),
    sendEmail: (data) => axios.post(apiLink.sendEmail, data),
    resetPassword: (data) => axios.post(apiLink.resetPassword, data),
    refreshToken: () => axios.post(apiLink.refreshToken),
};