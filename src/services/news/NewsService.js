import axios from 'axios';
import { apiLink } from '../../constants';

export const newsServices = {
    getTopNews: (queryString) => axios.get(apiLink.topNews + queryString),
    getFavNews: () => axios.get(apiLink.favNews),
    markFav: (data) => axios.post(apiLink.markFav, data),
    deleteFav: (id) => axios.delete(apiLink.deleteFav(id))
};