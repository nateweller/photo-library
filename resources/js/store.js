import { createStore } from 'redux';

const initialState = {
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
        case 'SET_FILTERS': {
            const { filters } = action;
            return { ...state, filters };
        }
        default:
            return state;
    }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
