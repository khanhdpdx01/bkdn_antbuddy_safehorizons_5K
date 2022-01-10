import { actionTypes } from './action';

export const initialState = {
    collections: [],
    categories: [],
    collection: {},
    limit: null,
    page: null,
    totalCategories: null,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        case actionTypes.GET_CATEGORIES_FAILURE:
            return {
                ...state,
                ...{ error: action.error }
            }
        default:
            return state;
    }
}

export default reducer;
