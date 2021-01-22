import axios from 'axios';

export const newsServices = {
    getTopNews: (url) => axios.get(url)
};