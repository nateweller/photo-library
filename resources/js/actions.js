export const setState = stateUpdates => ({
    type: 'SET_STATE',
    stateUpdates
});

export const setFilters = filters => ({
    type: 'SET_FILTERS',
    filters
});
