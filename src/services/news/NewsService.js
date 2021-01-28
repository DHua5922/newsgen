import axios from 'axios';
import { apiLink } from '../../constants';

export const newsServices = {
    getTopNews: (url) => axios.get(url),
    getFavNews: () => axios.get(apiLink.favNews),
    markFav: (data) => axios.post(apiLink.markFav, data),
};