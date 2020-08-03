import store from './store';
import { setState } from './actions';
import Config from './config';

export const fetchPhotos = params => {
    params = params || {};
    const state = store.getState();
    const queryString = Object.keys(params).reduce((queryString, key) => {
        queryString += `${key}=${encodeURI(params[key])}&`;
        return queryString;
    }, `?page=${state.pagination.currentPage}&`);
    return new Promise((resolve, reject) => {
        axios.get(`${Config.serverURL}photos${queryString}`)
            .then(response => {
                // convert photo array to key-ID object
                const photos = response.data.data.reduce((photos, photo) => {
                    photos[photo.id] = photo;
                    return photos;
                }, {});
                const pagination = {
                    currentPage: response.data['current_page'],
                    lastPage: response.data['last_page'],
                    perPage: response.data['per_page'],
                    total: response.data['total']
                };
                store.dispatch(setState({ photos, pagination }));
                resolve(photos);
            })
            .catch(error => reject(error));
    });
};
