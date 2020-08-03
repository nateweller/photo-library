import { createStore } from 'redux';

const initialState = {
    photos: [],
    pagination: {
        currentPage: 1,
        lastPage: 1,
        perPage: 25,
        total: 0
    },
    filters: {
        collection: '',
        orientation: 'any'
    },
    collections: [
        { id: 1, name: 'Test' },
        { id: 2, name: 'tseT' }
    ]
};

export default createStore((state = initialState, action) => {
    switch (action.type) {
        case 'SET_STATE': {
            const { stateUpdates } = action;
            return { ...state, ...stateUpdates }
        }
        case 'SET_FILTERS': {
            const { filters } = action;
            return { ...state, filters };
        }
        default:
            return state;
    }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
