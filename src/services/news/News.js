import axios from 'axios';

export const newsServices = {
    getTopNews: (url) => axios.get(url),
    signUp: (url, data) => axios.post(url, data)
};